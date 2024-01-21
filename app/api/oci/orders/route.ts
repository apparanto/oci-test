import { saveOrder } from "@/lib/orders";
import { getPunchoutSession } from "@/lib/punchout";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const token = searchParams.get('token');

    console.log('Posting order for sessionId: ' + sessionId + ' and token: ' + token);

    if (!sessionId || !token) return new NextResponse('Bad request', { status: 401 });

    const punchoutSession = getPunchoutSession(token);
    if (!punchoutSession) return new NextResponse('Stale session', { status: 404 });

    if (!punchoutSession || punchoutSession.sessionId !== sessionId)
        return new NextResponse('Invalid sessionId', { status: 401 });

    const json = await request.json();
    const jsonString = JSON.stringify(json);
    console.log(jsonString);
    await saveOrder(sessionId, jsonString);
    const result = {
        'redirectURL': `${process.env.OCI_REDIRECT_URL}${sessionId}`,
        'formActionURL': `${process.env.OCI_FORM_ACTION_URL}`,
        'formData': [
            {
                'key': 'orderId',
                'value': sessionId
            },
            {
                'key': 'created',
                'value': new Date().toISOString()
            }
        ]
    }
    return new NextResponse(JSON.stringify(result), { status: 201 });
}