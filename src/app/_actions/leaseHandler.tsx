"use server"

import { leaseSchema } from "../_schemas/leaseSchema"
import { Leaseformstate } from "../_types/lease";
import { convertZodErrors } from "../_utils/errors";

export const formHandlerAction= async(formdata:FormData):Promise<Leaseformstate>=>{
  const unvalidatedlease = {
    StartDate: formdata.get("StartDate") instanceof File || typeof formdata.get("StartDate") === 'object'
    ? ""  // or some other default value
    : formdata.get("StartDate") ? formdata.get("StartDate")!.toString().trim() : "",
      EndDate: formdata.get("EndDate") ? formdata.get("EndDate")!.toString().trim() : "",
    BaseRent: formdata.get("BaseRent") instanceof File
      ? "0"
      : formdata.get("BaseRent")?.toString().trim() ?? "0",
    AdditionalCharges: formdata.get("AdditionalCharges")?.toString().trim() ?? "",
    MaintenanceFee: formdata.get("MaintenanceFee") instanceof File
      ? "0"
      : formdata.get("MaintenanceFee")?.toString().trim() ?? "",
    SecurityDeposit: formdata.get("SecurityDeposit") instanceof File
      ? "0"
      : formdata.get("SecurityDeposit")?.toString().trim() ?? "",
    AnnualRentIncrease: formdata.get("AnnualRentIncrease") instanceof File
      ? "0"
      : formdata.get("AnnualRentIncrease")?.toString().trim() ?? "",
    UtilitiesIncluded: formdata.get("Utilities") === "true",
    LatePaymentPenalty: formdata.get("LatePaymentPenalty")?.toString().trim() ?? "",
    LeaseType: formdata.get("LeaseType")?.toString().trim() ?? "",
    userId: formdata.get("userId")?.toString().trim() ?? "",
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