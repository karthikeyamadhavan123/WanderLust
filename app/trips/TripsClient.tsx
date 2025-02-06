"use client"
import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeReservation } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
interface TripsProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}
const TripsClient: React.FC<TripsProps> = ({ reservations, currentUser }) => {
    const router = useRouter()
    const [deletingid, setdeletingid] = useState('')
    const onCancel = useCallback((id: string) => {
        setdeletingid(id)
        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success('Reservations Cancelled')
            router.refresh()
        }).catch((error:any)=>{
            toast.error(error?.response?.data?.error)
        }).finally(()=>{
            setdeletingid('')
        })
    }, [router])
    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been where you are going" center />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
{
    reservations.map((reservation)=>(
        <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingid === reservation.id} actionLabel="Cancel Reservation" currentUser={currentUser}/>
    ))
}
            </div>
        </Container>
    );
}

export default TripsClient;