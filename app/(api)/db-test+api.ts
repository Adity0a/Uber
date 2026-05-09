import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Check connection and list tables
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return Response.json({ 
      success: true, 
      message: "Connection Successful", 
      tables: result.map(t => t.table_name)
    });
  } catch (error) {
    console.error("Database Connection Test Failed:", error);
    return Response.json({ 
      success: false, 
      message: "Connection Failed", 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
