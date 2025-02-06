import prisma from '@/app/libs/prismadb'
interface Iparams{
    listingId?:string
}

export default async function getListingById(params:Iparams){
try {
    const {listingId} = await params
    const listing = await prisma.listing.findUnique({
        where:{
            id:listingId
        },
        include:{
            user:true
        }
    })
    if(!listing){
        return null
    }
    return {
        ...listing,
        createdAt:listing.createdAt.toISOString(),
        user:{
            ...listing.user,
            createdAt:listing.user.createdAt.toISOString(),
            updatedAt:listing.user.createdAt.toISOString(),
            emailVerified:listing.user.emailVerified?.toISOString() || null,
        }
    }
} catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error fetching  listings");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}