import prisma from '@/app/libs/prismadb';
import { Prisma } from '@prisma/client';
interface Iparams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: Iparams) {
    try {
        const { listingId, userId, authorId } =  params;
    
        const query: Prisma.ReservationWhereInput = {};  
    
        if (listingId) {
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.listing = { userId: authorId };
        }
    
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
    const safereservations = reservations.map((reservation)=>({
        ...reservation,
        createdAt:reservation.createdAt.toISOString(),
        startDate:reservation.startDate.toISOString(),
        endDate:reservation.endDate.toISOString(),
        listing:{
            ...reservation.listing,
            createdAt:reservation.listing.createdAt.toISOString()
        }
    }))
        return safereservations;
    } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message || "Error fetching Reservations");
        } else {
          throw new Error("An unknown error occurred");
        }
      }
  
}
