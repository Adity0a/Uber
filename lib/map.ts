import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

// Helper function to calculate distance between two coordinates in km (Haversine formula)
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    const timesPromises = markers.map(async (marker) => {
      try {
        const responseToUser = await fetch(
          `https://us1.locationiq.com/v1/directions/driving/${marker.longitude},${marker.latitude};${userLongitude},${userLatitude}?key=${directionsAPI}&overview=full`,
        );
        const dataToUser = await responseToUser.json();

        let timeToUser = 0;
        if (dataToUser.error || !dataToUser.routes || dataToUser.routes.length === 0) {
          console.warn("LocationIQ Directions Warning (User):", dataToUser.error || "No routes found. Using fallback.");
          // Fallback: Straight line distance / average speed (30km/h)
          const distance = getDistance(marker.latitude, marker.longitude, userLatitude, userLongitude);
          timeToUser = (distance / 30) * 3600; // time in seconds
        } else {
          timeToUser = dataToUser.routes[0].duration; // Time in seconds
        }

        const responseToDestination = await fetch(
          `https://us1.locationiq.com/v1/directions/driving/${userLongitude},${userLatitude};${destinationLongitude},${destinationLatitude}?key=${directionsAPI}&overview=full`,
        );
        const dataToDestination = await responseToDestination.json();

        let timeToDestination = 0;
        if (dataToDestination.error || !dataToDestination.routes || dataToDestination.routes.length === 0) {
          console.warn("LocationIQ Directions Warning (Destination):", dataToDestination.error || "No routes found. Using fallback.");
          // Fallback: Straight line distance / average speed (30km/h)
          const distance = getDistance(userLatitude, userLongitude, destinationLatitude, destinationLongitude);
          timeToDestination = (distance / 30) * 3600; // time in seconds
        } else {
          timeToDestination = dataToDestination.routes[0].duration; // Time in seconds
        }

        const totalTime = Math.round((timeToUser + timeToDestination) / 60); // Total time in minutes (rounded)
        const price = (totalTime * 0.5 + 2).toFixed(2); // Calculate price based on time + base fare

        return { ...marker, time: totalTime, price };
      } catch (error) {
        console.error("Error calculating driver time for marker:", marker.id, error);
        
        // Final fallback if even the fetch or logic fails
        const dist1 = getDistance(marker.latitude, marker.longitude, userLatitude, userLongitude);
        const dist2 = getDistance(userLatitude, userLongitude, destinationLatitude, destinationLongitude);
        const fallbackTime = Math.round(((dist1 + dist2) / 30) * 60); // total time in minutes (rounded)
        return { ...marker, time: fallbackTime, price: (fallbackTime * 0.5 + 2).toFixed(2) };
      }
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
  }
};
