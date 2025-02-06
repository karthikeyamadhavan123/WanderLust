import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing,
"createdAt"> &{
    createdAt:string,
}

export type SafeUser = Omit<User,
"createdAt" | "updatedAt" | "emailVerified"> &{
    createdAt:string,
    updatedAt:string,
    emailVerified:string | null
}
export type SafeReservation = Omit<Reservation,
"createdAt" | "endDate" | "startDate"| "listing"> &{
    createdAt:string,
    startDate:string
    endDate:string
    listing:SafeListing
}
