'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import getServerSession from 'next-auth'; 
import { authConfig } from '~/server/auth/config';
import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface CalculatedData {

  userId: string; 
  AdditionalChargesp?: number; 
  AnnualRentIncreaseP?: number; 
  latePaymentPenalty?: number; 
  LeaseType?: string; 
  MaintenanceFeep?: number; 
  SecurityDepositp?: number;
  monthlyRentAmount?: number; 
  StartDate?: string; 
  UtilitiesIncluded?: boolean; 
  EndDate?: string; 
  BaseRentp?: number,
  LatepaymentP:number,

}
export async function storeCalculatedData(data: CalculatedData) {
  console.log('Storing data on the server:', data);

  const { userId, ...leaseData } = data;

  if (!userId) {
    throw new Error('User ID is missing');
  }

  try {
    const newLease = await prisma.lease.create({
      data: {
        userId,
        additionalCharges: leaseData.AdditionalChargesp ?? 100,
        annualRentIncrease: leaseData.AnnualRentIncreaseP ?? 5.0,
        endDate: leaseData.EndDate ? new Date(leaseData.EndDate) : new Date(),
        latePaymentPenalty: leaseData.LatepaymentP ?? 50.0,
        leaseType: leaseData.LeaseType ?? 'defaultLeaseType',
        maintenanceFees: leaseData.MaintenanceFeep ?? 200.0,
        monthlyRentAmount: leaseData.BaseRentp ?? 1000.0,
        securityDeposit: leaseData.SecurityDepositp ?? 500.0,
        startDate: leaseData.StartDate ? new Date(leaseData.StartDate) : new Date(),
        utilitiesIncluded: leaseData.UtilitiesIncluded ?? true, // Use nullish coalescing for booleans
      },
    });

    console.log('Data saved to database:', newLease);

    return {
      message: 'Data stored successfully',
      lease: newLease,
    };
  } catch (error) {
    console.error('Error saving data:', error);
    throw new Error('Failed to store data');
  }
}
