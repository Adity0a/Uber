import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM drivers`;

    if (response.length === 0) {
      return Response.json({
        data: [
          {
            id: "1",
            first_name: "James",
            last_name: "Wilson",
            profile_image_url:
              "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            car_image_url:
              "https://ucarecdn.com/a2dc52b2-8bf7-4e49-8a32-3eb3ef5b8d15/-/preview/465x466/",
            car_seats: 4,
            rating: "4.80",
          },
          {
            id: "2",
            first_name: "David",
            last_name: "Brown",
            profile_image_url:
              "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
            car_image_url:
              "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
            car_seats: 5,
            rating: "4.60",
          },
        ]
      });
    }

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
