"use client"
import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeListing } from "../types";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
interface PropertiesProps {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}
interface ErrorResponse {
    error: string;
}
const PropertiesClient: React.FC<PropertiesProps> = ({ listings, currentUser }) => {
    const router = useRouter()
    const [deletingid, setdeletingid] = useState('')
    const onCancel = useCallback((id: string) => {
        setdeletingid(id)
        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success('Listing Cancelled')
            router.refresh()
        }).catch((error: AxiosError<ErrorResponse>) => {
            toast.error(error?.response?.data?.error)
        }).finally(() => {
            setdeletingid('')
        })
    }, [router])
    return (
        <Container>
            <Heading title="Properties" subtitle="List of your properties" center />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    listings.map((listing) => (
                        <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onCancel} disabled={deletingid === listing.id} actionLabel="Delete Property" currentUser={currentUser} />
                    ))
                }
            </div>
        </Container>
    );
}

export default PropertiesClient;