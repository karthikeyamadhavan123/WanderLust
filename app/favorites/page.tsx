import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoritesListings"
import FavoriteClient from "./FavoriteClient"
const FavoritePage = async() => {
    const listings = await getFavoriteListings()
    const currentUser= await getCurrentUser()
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites Found" subtitle="Looks like you haven't no favorite listings"/>
            </ClientOnly>
        )
    }

  return (
   <ClientOnly>
    <FavoriteClient listings={listings} currentUser={currentUser}/>
   </ClientOnly>
  )
}

export default FavoritePage
