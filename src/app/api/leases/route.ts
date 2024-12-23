// app/api/leases/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leases = await prisma.lease.findMany(); // Fetch all leases from the database
    return new Response(JSON.stringify(leases), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch leases', { status: 500 });
  }
}
