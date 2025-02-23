
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
export async function POST(request:Request) {
    const currentUser=await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }
    const body = await request.json()
    const {title,description,price,imageSrc,bathroomCount,roomCount,guestCount,location,category}=body
    const listing = await prisma.listing.create({
        data:{
           title,
           description,
           price:parseInt(price,10),
           category,
           roomCount,
           bathroomCount,
           imageSrc,
           guestCount,
           locationValue:location.value,
           userId:currentUser.id

        }
    })
    return NextResponse.json(listing)

}