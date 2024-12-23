"use client"
import React, { useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '~/components/ui/button'
import DatePickerDemo from '../ui/DatePicker'
import { Checkbox } from '../ui/checkbox'
import { formHandlerAction } from '~/app/_actions/leaseHandler'
import { StringMap } from '~/app/_types/lease'
import toast from 'react-hot-toast'
import Invoice from './Invoice'


export default function Leaseform() {
  const [errors,setErrors]=useState<StringMap>({});
  const [calculatedData, setCalculatedData] = useState<any>(null); // Store calculated data
  const formRef=useRef<HTMLFormElement>(null);    
  
  const handleformsubmit=async(formdata:FormData)=>{
    
const {errors,successMsg}= await formHandlerAction(formdata);

const response = await formHandlerAction(formdata);

    if (response.errors) {
      setErrors(response.errors);
    } else {
      // setSuccessMsg(response.successMsg);
      setCalculatedData(response.calculatedData); // Store the calculated data
      toast.success("Lease Calculated Successfully"); // Show success toast
    }
  }
 
  return (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-3 lg:space-y-0 lg:space-x-3 p-4 min-h-full">
    <Card className="sm:w-[520px] w-[350px]">
    <CardHeader>
      <CardTitle>Lease Calculator</CardTitle>
      <CardDescription>Calculate Your lease.</CardDescription>
   
    </CardHeader>
    <CardContent>
    <form action={handleformsubmit} ref={formRef}>
    <div className="grid w-full items-center gap-4">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-3 lg:space-y-0 lg:space-x-3 ">
        <div>
        <Label htmlFor="framework">Start Date</Label>
        <DatePickerDemo  name="StartDate"/>
        {errors?.StartDate && (<small className='text-red-500'>
          {errors.StartDate} 
          </small>)}
        </div>
        <div>
        <Label htmlFor="framework">End Date</Label>
        <DatePickerDemo  name="EndDate"/>
        {errors?.EndDate && (<small className='text-red-500'>
          {errors.EndDate} 
          </small>)}
        </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-3 lg:space-y-0 lg:space-x-3 ">
          <div className='w-full'>
        <Label htmlFor="BaseRent">Base Rent</Label>
        <Input id="BaseRent" placeholder="2999$" name="BaseRent" type='number' />
        {errors?.BaseRent && (<small className='text-red-500'>
          {errors.BaseRent} 
          </small>)}
        </div>
        <div className='w-full'>
        <Label htmlFor="framework">Maintenance Fee</Label>
        <Input id="name" placeholder="200$" name="MaintenanceFee" type='number' />
        {errors?.MaintenanceFee && (<small className='text-red-500'>
          {errors.MaintenanceFee} 
          </small>)}
        </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-3 lg:space-y-0 lg:space-x-3 ">
          <div className='w-full'>
        <Label htmlFor="framework">Security Deposit</Label>
        <Input id="name" placeholder="2999$" name="SecurityDeposit" type='number' />
        {errors?.SecurityDeposit && (<small className='text-red-500'>
          {errors.SecurityDeposit} 
          </small>)}
        </div>
        <div className='w-full'>
        <Label htmlFor="framework">Annual rent increase percentage</Label>
        <Input id="name" placeholder="200$" name="AnnualRentIncrease" type='number' />
        {errors?.AnnualRentIncrease && (<small className='text-red-500'>
          {errors.AnnualRentIncrease} 
          </small>)}
        </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-3 lg:space-y-0 lg:space-x-3 ">
          <div className='w-full'>
        <Label htmlFor="framework"> Additional charges</Label>
        <Input id="name" placeholder="2999$" name="AdditionalCharges" type='number'  />
        {errors?.AdditionalCharges && (<small className='text-red-500'>
          {errors.AditionalCharges} 
          </small>)}
        </div>
        <div className='w-full'>
        <Label htmlFor="framework">Late payment penalty </Label>
        <Input id="name" placeholder="fixed amount" name="LatePaymentPenalty" type='number' />
        {errors?.LatePaymentPenalty && (<small className='text-red-500'>
          {errors.LatePaymentPenalty} 
          </small>)}
      </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-3 lg:space-y-0 lg:space-x-3 ">
          <div className='w-full'>
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Lease Type</Label>
            <Select name='LeaseType'>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
             
              </SelectContent>
            </Select>

          </div>
        </div>
        <div className='w-full'>
        <Label htmlFor="framework">Utilities</Label>
        <div className="flex items-center space-x-2">

      <Checkbox id="terms" name="Utilties" value="true" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Yes Included
      </label>
    </div>
      </div>
          </div>
    
        </div>
        <CardFooter className="flex justify-end">
      {/* <Button variant="outline">Cancel</Button> */}
      {/* {calculatedData&&} */}
      <Button>Calculate</Button>
    </CardFooter>
      </form>
    </CardContent>
 
  </Card>
  <Invoice calculatedData={calculatedData}/>
  </div>
  )
}


