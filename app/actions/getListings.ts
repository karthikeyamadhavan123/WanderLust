import prisma from '@/app/libs/prismadb'
import { Prisma } from '@prisma/client';
export interface IlistingParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}
export default async function getListings(params: IlistingParams) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } =  params
    const query: Prisma.ListingWhereInput = {};

    if (userId) {
      query.userId = userId
    }
    if (category) {
      query.category = category
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    if (locationValue) {
      query.locationValue = locationValue
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })


    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))
    return safeListings
  }catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error fetching  listings");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}