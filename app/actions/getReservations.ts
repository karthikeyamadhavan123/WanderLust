import prisma from '@/app/libs/prismadb';

interface Iparams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: Iparams) {
    try {
        const { listingId, userId, authorId } = await params;
    
        const query: any = {};  
    
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
    } catch (error:any) {
        throw new Error(error.message ||"Failed to fetch reservations")
    }
  
}
