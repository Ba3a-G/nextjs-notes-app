import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Single array of notes that everyone can access
const notes: Array<{ id: string; content: string; createdAt: string; author: string }> = [];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { content } = await request.json();
    const note = {
      id: Math.random().toString(36).substring(7),
      content,
      createdAt: new Date().toISOString(),
      author: session.user.email,
    };

    notes.unshift(note);
    return NextResponse.json(note);
  } catch (error) {
    console.error('Failed to create note:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new NextResponse('Note ID is required', { status: 400 });
    }

    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return new NextResponse('Note not found', { status: 404 });
    }

    notes.splice(noteIndex, 1);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete note:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 