import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  context: { params: Promise<IParams> } // Wrap params in a Promise
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Await the params promise
  const { listingId } = await context.params;

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    // Delete the listing if it belongs to the current user
    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id, // Ensure the listing belongs to the current user
      },
    });

    // If no listing was deleted, return a 404 error
    if (listing.count === 0) {
      return NextResponse.json(
        { error: 'Listing not found or not owned by the user' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}