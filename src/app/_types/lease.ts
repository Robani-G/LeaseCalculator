import { StringToBoolean } from "class-variance-authority/types";

export interface Leaseformstate{
errors?:StringMap;
successMsg?:string;
data?:any;
blurs?:StringToBooleanMap;
calculatedData?: {

    totalLeaseCost?: number;

    totalAdditionalCharges?: number;

    totalMaintenanceFees?: number;

    totalBaseRent?: number;

    SecurityDepositp?: number;

    leaseDurationInMonths?: number;
    AnnualRentIncreaseP?: number;
    userId:string


};

}
export interface StringMap{
    [key:string]:string;
}
export interface StringToBooleanMap{
    [key:string]:string;
}