
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
interface Iparams{
    reservationId?:string
}
export async function DELETE(request: Request,context:{params:Promise<Iparams>}) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const {reservationId} =  await context.params

    if (!reservationId) {
        throw new Error("Invalid Id")
    }

    const Reservation = await prisma.reservation.delete({
        where: {
            id: reservationId,
            OR:[{userId:currentUser.id},{
                listing:{userId:currentUser.id}
            }]
        },
       
    })
    return NextResponse.json(Reservation)

}