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
        'data_array': [
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
    const items = [];
    const articles = json['cart']['MendixVDL']['orderLines'];
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        items.push({
            'key': `NEW_ITEM-VENDORMAT[${i + 1}]`,
            'value': article['articleNr']
        })
        items.push({
            'key': `NEW_ITEM-DESCRIPTION[${i + 1}]`,
            'value': article['description']
        });
        items.push({
            'key': `NEW_ITEM-QUANTITY[${i + 1}]`,
            'value': article['quantity']
        });
        items.push({
            'key': `NEW_ITEM-CURRENCY[${i + 1}]`,
            'value': 'EUR'
        });
        items.push({
            'key': `NEW_ITEM-UNIT[${i + 1}]`,
            'value': 'EA'
        });
    }
    const result2 = {
        "message": null,
        //"url": "https://punchout.cloud/oci/cart-viewer",
        'url': `${process.env.OCI_FORM_ACTION_URL}/${punchoutId}`,
        "data_array": items,
        "method": null,
        "action": null
    }

    return new NextResponse(JSON.stringify(result2), { status: 201 });
}