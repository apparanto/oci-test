import { createPunchoutSession, getPunchoutSession } from '@/lib/punchout';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token')
    if (!token) return new NextResponse('Bad request', { status: 401 });

    const punchoutSession = getPunchoutSession(token);
    if (!punchoutSession) return new NextResponse('Invalid token', { status: 403 });

    return NextResponse.json(punchoutSession);

}

export async function POST(request: NextRequest) {
    const { userId, password } = await request.json();

    const token = createPunchoutSession(userId as string, password as string);
    if (!token) return new NextResponse('Invalid credentials', { status: 403 });

    const webshopURL = `${process.env.WEBSHOP_OCI_URL}?token=${token}&key=${process.env.WEBSHOP_OCI_KEY}`;

    return NextResponse.json({ webshopURL });

}