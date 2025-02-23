import ListingCard from "./components/listings/ListingCard";
import getListings, { IlistingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getCurrentUser from "./actions/getCurrentUser";
interface Props {
  searchParams: Promise<IlistingParams>
}
const Home:React.FC<Props> = async ({searchParams}:Props) => {
  const resolvedSearchParams = await searchParams;
  const listings = await getListings(resolvedSearchParams)
  const currentUser = await getCurrentUser()
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )


  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8 pl-7">
          {
            listings.map((listing) => (
              <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
            ))
          }
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home
