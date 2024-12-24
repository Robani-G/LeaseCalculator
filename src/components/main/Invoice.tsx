"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IoIosSend } from "react-icons/io";
import { Button } from '~/components/ui/button'

import  { useRef, useState } from 'react'
import { storeCalculatedData } from '~/app/_actions/StroreCaulatedData'
import { getSession, useSession } from 'next-auth/react'
import toast from 'react-hot-toast';

const Invoice = ({ calculatedData }: { calculatedData: any }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession()
  

  const handleSubmit = async () => {
    if (!calculatedData) {
      console.error('Calculated data is missing');
      toast.error('Calculated data is required');
      return;
    }
  
    // Redirect to signin if the session is missing
    if (!session) {
      toast.error('You need to sign in first!');
      window.location.href = '/auth/signin';
      return;
    }
  
    // Ensure session has user ID
    const userId = session.user?.id;
    if (!userId) {
      console.error('Session does not contain user ID');
      toast.error('Authentication error: user ID missing');
      return;
    }
  
    const payload = {
      ...calculatedData,
      userId,
    };
  
    setLoading(true);
    try {
      const response = await storeCalculatedData(payload);
  
      // Display the success message
      toast.success(response.message || 'Data stored successfully');
    } catch (error) {
      console.error('Error storing data:', error);
      toast.error('Failed to store data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  
  if (!calculatedData) {
    return (
    <>
   <Card className="sm:w-[520px] w-[350px] p-2">
  <CardHeader>
    <CardTitle>Lease Calculation Logic</CardTitle>
    <CardDescription>
      Overview of the lease calculation process.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>The lease calculation is based on the following formula:</p>
    <ul className='flex flex-col gap-4'>
      <li><strong>Base Rent Calculation:</strong> 
      <CardDescription>
        Monthly Rent × Lease Duration (in months) 
    </CardDescription>
      </li>
      <li><strong>Annual Rent Increase:</strong> 
      <CardDescription>
      Applies to the second year (if applicable) 
          </CardDescription>
       
      </li>
      <li><strong>Additional Charges:</strong> 
        <CardDescription>
        Additional Charges × Lease Duration 
          </CardDescription>
      </li>
      <li><strong>Maintenance Fees:</strong> 
        <CardDescription>
        Maintenance Fees × Lease Duration 
          </CardDescription>
      </li>
      <li><strong>Security Deposit:</strong> 
        <CardDescription>
        One-time fee 
          </CardDescription>
      </li>
      <li><strong>Total Lease Cost:</strong> 
        <CardDescription>
        Base Rent + Additional Charges + Maintenance Fees + Security Deposit 
          </CardDescription>
      </li>
    </ul>
  </CardContent>
  <CardFooter>
  </CardFooter>
</Card>
  </>
  )

  }  
  return (
    <Card className="sm:w-[520px] w-[350px] p-2">
         {calculatedData && (
     
     
    <div className="px-4 sm:px-6 lg:px-8">
  <div className="sm:flex sm:items-center">
    <div className="sm:flex-auto">
      <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>

      <p className="mt-2 text-sm text-gray-700">
  {calculatedData.UtilitiesIncluded ? "Utilities are included in your lease agreement." : "Utilities are not included in your lease agreement"} 
</p>    </div>
    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <div className='flex flex-row space-x-3'>

      <Button onClick={handleSubmit} disabled={loading}>Save</Button>
      {/* {loading ? 'Submitting...' : 'Submit'} */}
      {/* {message && <p>{message}</p>} */}


      
      </div>
    

    </div>
  </div>
  <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Type</th>
          <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">Duration In Month</th>
          <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">Rate</th>
          <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">Maintenance</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-200">
          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
            <div className="font-medium text-gray-900">{calculatedData.LeaseType}</div>
            <div className="mt-0.5 text-gray-500 sm:hidden">12.0 hours at $75.00</div>
          </td>
          <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{calculatedData.leaseDurationInMonths} M </td>
          <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{calculatedData.AnnualRentIncreaseP} %</td>
          <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">${calculatedData.totalMaintenanceFees}</td>
        </tr>

      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colSpan={3} className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0">Total Base Rent</th>
          <th scope="row" className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Total Base Rent</th>
          <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">${calculatedData.totalBaseRent}</td>
        </tr>
        <tr>
          <th scope="row" colSpan={3} className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0">Additional Charges</th>
          <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Additional Charges</th>
          <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">${calculatedData.totalAdditionalCharges}</td>
        </tr>
        <tr>
          <th scope="row" colSpan={3} className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0">Total Lease</th>
          <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total Lease</th>
          <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">${calculatedData.totalLeaseCost}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
 )}
  </Card>
  )
}
export default Invoice;
