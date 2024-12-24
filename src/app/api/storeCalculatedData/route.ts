import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the expected structure of lease data
interface LeaseData {
  AdditionalChargesp?: number;
  AnnualRentIncreaseP?: number;
  EndDate?: string;
  LatepaymentP?: number;
  LeaseType?: string;
  MaintenanceFeep?: number;
  BaseRentp?: number;
  SecurityDepositp?: number;
  StartDate?: string;
  UtilitiesIncluded?: boolean;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, ...leaseData }: { userId: string } & LeaseData = body;

  if (!userId) {
    return NextResponse.json({ message: 'User ID is missing' }, { status: 400 });
  }

  try {

    const newLease = await prisma.lease.create({
      data: {
        userId,
        additionalCharges: leaseData.AdditionalChargesp || 100,
        annualRentIncrease: leaseData.AnnualRentIncreaseP || 5.0,
        endDate: leaseData.EndDate ? new Date(leaseData.EndDate) : new Date(),
        latePaymentPenalty: leaseData.LatepaymentP || 50.0,
        leaseType: leaseData.LeaseType || 'defaultLeaseType',
        maintenanceFees: leaseData.MaintenanceFeep || 200.0,
        monthlyRentAmount: leaseData.BaseRentp || 1000.0,
        securityDeposit: leaseData.SecurityDepositp || 500.0,
        startDate: leaseData.StartDate ? new Date(leaseData.StartDate) : new Date(),
        utilitiesIncluded: leaseData.UtilitiesIncluded ?? true,
      },
    });

    return NextResponse.json({
      message: 'Data stored successfully',
      lease: newLease,
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Failed to store data' }, { status: 500 });
  }
}
