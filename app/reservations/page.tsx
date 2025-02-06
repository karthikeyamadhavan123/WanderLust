import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ReservationClient from "./ReservationClient"
const  ReservationPage = async() => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({ authorId: currentUser.id })
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No reservations Found" subtitle="Looks like you dont have any reservations on your property!" />
            </ClientOnly>
        )
    }

  return (
    <div>
      <ClientOnly>
        <ReservationClient reservations={reservations} currentUser={currentUser}/>
      </ClientOnly>
    </div>
  )
}

export default  ReservationPage
