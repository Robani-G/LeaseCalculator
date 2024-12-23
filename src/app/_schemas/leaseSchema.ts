import {z} from "zod";
export const leaseSchema=z.object({
    StartDate: z
    .string()
    .min(1, "Start date is required") 
    .datetime({ message: "Start date must be a valid datetime" }),
  EndDate: z
    .string()
    .min(1, "End date is required") 
    .datetime({ message: "End date must be a valid datetime" }),

   BaseRent:   z.string()
   .min(1, "BaseRent  is required") ,
     
   MaintenanceFee: z.string()
    .min(1, "Maintenance is required") ,

      SecurityDeposit:z.string()
    .min(1, "SecurityDeposit is required") ,
    AnnualRentIncrease: z.string()
       .min(1, "AnnualRate is required") ,
      LatePaymentPenalty: z.string()
      .min(1, "AnnualRate is required") ,
      AdditionalCharges: z.string()
      .min(1, "AdditionalCharges is required") ,
      LeaseType: z.string()
      .min(1, "LeaseType is required") ,
      UtilitiesIncluded: z.boolean()
      // .min(1, "LeaseType is required") ,
   

    
   
})