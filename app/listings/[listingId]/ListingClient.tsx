"use client"
import Container from "@/app/components/Container"
import { categories } from "@/app/components/navbar/Categories"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import ListingHead from "../../components/listings/ListingHead"
import ListingInfo from "../../components/listings/ListingInfo"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import toast from "react-hot-toast"
import ListingReservation from "@/app/components/listings/ListingReservation"
import { Range } from "react-date-range"
const intialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}
interface ListingclientProps {
    reservations?: SafeReservation[],
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}
const ListingClient: React.FC<ListingclientProps> = ({ listing, currentUser, reservations = [] }) => {
    const loginModal = useLoginModal()
    const router = useRouter()
    const disabledDates = useMemo(() => {
        let dates: Date[] = []
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])

    const [isLoading, setisLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setdateRange] = useState<Range>(intialDateRange)


    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        setisLoading(true)
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success('Reservation Successful')
            setdateRange(intialDateRange)
            router.push('/trips')
        }).catch(() => {
            toast.error('Something went wrong')
        }).finally(() => {
            setisLoading(false)
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if (dayCount>0 && listing.price) {
                setTotalPrice(dayCount * listing.price)
            }
            else{
                setTotalPrice(listing.price)
            }
          
        }
    }, [dateRange, listing.price])
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto pl-4">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo user={listing.user} category={category}
                        description={listing.description} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} roomCount={listing.roomCount} locationValue={listing.locationValue} />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) =>
                            setdateRange(value)
                        } dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
