
import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import TripsClient from "./TripsClient"
const Trips = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({ userId: currentUser.id })
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No trips Found" subtitle="Looks like you haven't reserved any trips" />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default Trips
