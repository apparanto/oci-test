import { saveOrder } from "@/lib/orders";
import { getPunchoutSession } from "@/lib/punchout";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params: { punchoutId } }: { params: { punchoutId: string } }) {
    console.log('Posting order for sessionId: ' + punchoutId);

    if (!punchoutId) return new NextResponse('Bad request', { status: 401 });

    const punchoutSession = getPunchoutSession(punchoutId);

    if (!punchoutSession || punchoutSession.punchout_id !== punchoutId)
        return new NextResponse('Invalid sessionId', { status: 401 });

    const json = await request.json();
    const jsonString = JSON.stringify(json);
    console.log(jsonString);
    await saveOrder(punchoutId, jsonString);
    const result = {
        'url': `${process.env.OCI_FORM_ACTION_URL}/${punchoutId}`,
        'method': `POST`,
        'form': [
            {
                'key': 'orderId',
                'value': punchoutId
            },
            {
                'key': 'created',
                'value': new Date().toISOString()
            }
        ]
    }
    return new NextResponse(JSON.stringify(result), { status: 201 });
}