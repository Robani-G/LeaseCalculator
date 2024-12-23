import { ZodError } from "zod";
import { StringMap } from "../_types/lease";

export const convertZodErrors = (error: ZodError): StringMap => {
    return error.issues.reduce((acc: { [key: string]: string }, issue) => {
        const key = issue.path[0]; // Safely extract the key
        if (typeof key === "string" || typeof key === "number") {
            acc[key] = issue.message;
        }
        return acc;
    }, {});
};
