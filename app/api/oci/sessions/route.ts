import { getPunchoutSession } from '@/lib/punchout';
import { NextRequest, NextResponse } from 'next/server'

type SessionQuery = {
    query: {
        id: string;
    }
}

export async function POST(request: NextRequest) {
    const { query }: SessionQuery = await request.json();

    if (!query || !query.id) return new NextResponse('Bad request', { status: 401 });

    const punchoutSession = getPunchoutSession(query.id);
    if (!punchoutSession) return new NextResponse('Invalid token', { status: 403 });

    return NextResponse.json(punchoutSession);
}