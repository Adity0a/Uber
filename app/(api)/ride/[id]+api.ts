import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            rides.ride_id,
            rides.origin_address,
            rides.destination_address,
            rides.origin_latitude,
            rides.origin_longitude,
            rides.destination_latitude,
            rides.destination_longitude,
            rides.ride_time,
            rides.fare_price,
            rides.payment_status,
            rides.created_at,
            'driver', json_build_object(
                'driver_id', drivers.id,
                'first_name', drivers.first_name,
                'last_name', drivers.last_name,
                'profile_image_url', drivers.profile_image_url,
                'car_image_url', drivers.car_image_url,
                'car_seats', drivers.car_seats,
                'rating', drivers.rating
            ) AS driver 
        FROM 
            rides
        INNER JOIN
            drivers ON rides.driver_id = drivers.id
        WHERE 
            rides.user_id = ${id}
        ORDER BY 
            rides.created_at DESC;
    `;

    if (response.length === 0) {
      // Fallback dummy rides if user has no rides mapped in Neon DB yet
      return Response.json({
        data: [
          {
            ride_id: "1",
            origin_address: "Kathmandu, Nepal",
            destination_address: "Pokhara, Nepal",
            origin_latitude: 27.717245,
            origin_longitude: 85.323961,
            destination_latitude: 28.2096,
            destination_longitude: 83.9856,
            ride_time: 391,
            fare_price: "19500.00",
            payment_status: "paid",
            created_at: new Date().toISOString(),
            driver: {
              driver_id: "2",
              first_name: "David",
              last_name: "Brown",
              profile_image_url:
                "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
              car_image_url:
                "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
              car_seats: 5,
              rating: "4.60",
            },
          },
          {
            ride_id: "2",
            origin_address: "Jamshedpur, Jharkhand",
            destination_address: "Ranchi, Jharkhand",
            origin_latitude: 22.8046,
            origin_longitude: 86.2029,
            destination_latitude: 23.3441,
            destination_longitude: 85.3096,
            ride_time: 156,
            fare_price: "3200.00",
            payment_status: "paid",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            driver: {
              driver_id: "1",
              first_name: "James",
              last_name: "Wilson",
              profile_image_url:
                "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
              car_image_url:
                "https://ucarecdn.com/a2dc52b2-8bf7-4e49-8a32-3eb3ef5b8d15/-/preview/465x466/",
              car_seats: 4,
              rating: "4.80",
            },
          },
          {
            ride_id: "3",
            origin_address: "Mumbai, Maharashtra",
            destination_address: "Pune, Maharashtra",
            origin_latitude: 19.0760,
            origin_longitude: 72.8777,
            destination_latitude: 18.5204,
            destination_longitude: 73.8567,
            ride_time: 180,
            fare_price: "2500.00",
            payment_status: "paid",
            created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            driver: {
              driver_id: "3",
              first_name: "Michael",
              last_name: "Johnson",
              profile_image_url:
                "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
              car_image_url:
                "https://ucarecdn.com/289764fb-55b6-4427-bab1-4410ffea1539/-/preview/499x499/",
              car_seats: 4,
              rating: "4.70",
            },
          },
        ]
      });
    }

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching recent rides:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
