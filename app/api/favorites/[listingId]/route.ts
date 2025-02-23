import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams } // Correctly destructure params
) {
  const { listingId } = params; // No need to await params

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
  { params }: { params: IParams } // Correctly destructure params
) {
  const { listingId } = params; // No need to await params

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