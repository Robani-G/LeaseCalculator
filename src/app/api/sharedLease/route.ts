import { PrismaClient } from '@prisma/client';


import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

// POST method to handle sharing a lease
export async function POST(req: NextRequest) {
  try {
    const { leaseId, userId } = await req.json(); // Get data from the request body

    if (!leaseId || !userId) {
      return NextResponse.json({ message: 'leaseId and userId are required' }, { status: 400 });
    }

    // Create a new entry in the sharedLease table in the database
    await prisma.sharedLease.create({
      data: {
        leaseId,
        userId,
      },
    });

    return NextResponse.json({ message: 'Lease shared successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sharing lease:', error);
    return NextResponse.json({ message: 'Failed to share lease' }, { status: 500 });
  }
}

// GET method to fetch shared leases
export async function GET(req: NextRequest) {
    try {
      // Fetch the list of shared leases with related lease and user data
      const sharedLeases = await prisma.sharedLease.findMany({
        
        include: {
          lease: true,  // Include related lease data
          user: true,   // Include related user data
        },
      });
  
      return NextResponse.json(sharedLeases, { status: 200 });
    } catch (error) {
      console.error('Error fetching shared leases:', error);
      return NextResponse.json({ message: 'Failed to fetch shared leases' }, { status: 500 });
    }
  }