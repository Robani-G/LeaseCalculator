
export interface LeaseFormState {
    errors?: Record<string, string>; // Assuming errors map to string messages
    successMsg?: string;
    data?: unknown; // Use `unknown` instead of `any` for stricter typing
    blurs?: Record<string, boolean>; // Replacing `StringToBooleanMap`
    calculatedData?: {
      totalLeaseCost?: number;
      totalAdditionalCharges?: number;
      totalMaintenanceFees?: number;
      totalBaseRent?: number;
      SecurityDepositp?: number; // Is this a typo? Consider renaming to `securityDeposit`.
      leaseDurationInMonths?: number;
      AnnualRentIncreaseP?: number; // Consider renaming to `annualRentIncrease`.
      userId: string;
    };
  }
  


export interface StringMap{
    [key:string]:string;
}
export interface StringToBooleanMap{
    [key:string]:string;
}