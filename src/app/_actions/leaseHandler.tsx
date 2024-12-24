"use server"

import { leaseSchema } from "../_schemas/leaseSchema"
import { Leaseformstate } from "../_types/lease";
import { convertZodErrors } from "../_utils/errors";

export const formHandlerAction= async(formdata:FormData):Promise<Leaseformstate>=>{
  const getStringValue = (key: string): string => {
    const value = formdata.get(key);
    if (value instanceof File) {
      return ""; // Or whatever default value you want for File types
    }
    // Ensure it's not an object or handle accordingly
    if (typeof value === 'object' && value !== null) {
      console.warn(`Expected a string, but got an object for ${key}:`, value);
      return ""; // Default empty string for object cases
    }
    return value ? value.toString().trim() : "";
  };

  const unvalidatedlease = {
    StartDate: getStringValue("StartDate"),
    EndDate: getStringValue("EndDate"),
    BaseRent: getStringValue("BaseRent") || "0",
    AdditionalCharges: getStringValue("AdditionalCharges"),
    MaintenanceFee: getStringValue("MaintenanceFee") || "0",
    SecurityDeposit: getStringValue("SecurityDeposit") || "0",
    AnnualRentIncrease: getStringValue("AnnualRentIncrease") || "0",
    UtilitiesIncluded: formdata.get("Utilities") === "true",
    LatePaymentPenalty: getStringValue("LatePaymentPenalty"),
    LeaseType: getStringValue("LeaseType"),
    userId: getStringValue("userId"),
  };

const Validatedlease = leaseSchema.safeParse(unvalidatedlease);

if (!Validatedlease.success) {
    const errors = convertZodErrors(Validatedlease.error);
    console.log(errors);
    return {errors};
} else {

    const {
      StartDate,
      EndDate,
      BaseRent,
      AnnualRentIncrease,
      AdditionalCharges,
      MaintenanceFee,
      SecurityDeposit,
      LeaseType,
      UtilitiesIncluded,
      LatePaymentPenalty
    } = Validatedlease.data;
    const leaseDurationInMonths =
    (new Date(EndDate).getFullYear() - new Date(StartDate).getFullYear()) * 12 +
    (new Date(EndDate).getMonth() - new Date(StartDate).getMonth());
// console.log(formdata.get("BaseRent"));
  // Calculate rent for each year
  const fullYears = Math.floor(leaseDurationInMonths / 12);
  const remainingMonths = leaseDurationInMonths % 12;
  const BaseRentp=Number(BaseRent);
  const AnnualRentIncreaseP=Number(AnnualRentIncrease);
  const AdditionalChargesp=Number(AdditionalCharges);
  const MaintenanceFeep=Number(MaintenanceFee);
  const SecurityDepositp=Number(SecurityDeposit);
  const LatepaymentP=Number(LatePaymentPenalty);


  let totalBaseRent = 0;
  let yearlyRent = BaseRentp * 12;  // BaseRent is now a number
  for (let i = 0; i < fullYears; i++) {
    totalBaseRent += yearlyRent;
    yearlyRent += yearlyRent * (AnnualRentIncreaseP / 100);  // AnnualRentIncrease is now a number
  }
  totalBaseRent += (yearlyRent / 12) * remainingMonths;  // Ensure this is a number
  

  // Additional charges and maintenance fees
  const totalAdditionalCharges = AdditionalChargesp * leaseDurationInMonths;  // Ensure this is a number
  const totalMaintenanceFees = MaintenanceFeep * leaseDurationInMonths;  // Ensure this is a number

  // Total lease cost
  const totalLeaseCost = totalBaseRent + totalAdditionalCharges + totalMaintenanceFees + SecurityDepositp;  // All are numbers
    const calculatedData = {
      totalLeaseCost: totalLeaseCost, // This is now correctly structured
      totalAdditionalCharges: totalAdditionalCharges, // This is now correctly structured
      totalMaintenanceFees: totalMaintenanceFees, // This is now correctly structured
      totalBaseRent:totalBaseRent,
      BaseRentp:BaseRentp,
      MaintenanceFeep:MaintenanceFeep,
      SecurityDepositp:SecurityDepositp,
      AdditionalChargesp:AdditionalChargesp,
      leaseDurationInMonths:leaseDurationInMonths,
      AnnualRentIncreaseP:AnnualRentIncreaseP,
      LeaseType:LeaseType,
      EndDate:EndDate,
      LatepaymentP:LatepaymentP,
      StartDate:StartDate,
      UtilitiesIncluded:UtilitiesIncluded,
      userId: formdata.get("userId")?.toString().trim() ?? ""



  };
  // console.log(calculatedData.totalBaseRent);
    // Return the summed rent along with the success message
    return {
        successMsg: "Lease Added successfully",
        calculatedData: calculatedData // Ensure this is an object
    };
}
}