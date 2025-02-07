import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
interface Iparams{
  listingId?:string
}
export async function POST(
  request: Request,
  {params}:{params:Iparams} // Make params a Promise
) {
  const { listingId } =  params; // Await params before accessing listingId

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }  // Make params a Promise
) {
  const { listingId } =  params; // Await params before accessing listingId

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const favoriteIds = (currentUser.favoriteIds || []).filter(
    (id) => id !== listingId
  );

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
