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
    const result2 = {
        "message": null,
        //"url": "https://punchout.cloud/oci/cart-viewer",
        'url': `${process.env.OCI_FORM_ACTION_URL}/${punchoutId}`,
        "data_array": [
            { "key": "NEW_ITEM-CURRENCY[2]", "value": "EUR", },
            { "key": "NEW_ITEM-QUANTITY[3]", "value": "1" },
            { "key": "NEW_ITEM-VENDORMAT[2]", "value": "" },
            { "key": "NEW_ITEM-DESCRIPTION[3]", "value": "Plate,filler" },
            { "key": "NEW_ITEM-PRICE[2]", "value": "0" },
            { "key": "NEW_ITEM-PRICEUNIT[3]", "value": "1" },
            { "key": "NEW_ITEM-VENDORMAT[3]", "value": "" },
            { "key": "NEW_ITEM-QUANTITY[2]", "value": "12" },
            { "key": "NEW_ITEM-VENDORMAT[1]", "value": "" },
            { "key": "NEW_ITEM-DESCRIPTION[1]", "value": "Gearbox, 6S1611BO+INT3" },
            { "key": "NEW_ITEM-QUANTITY[1]", "value": "1" },
            { "key": "NEW_ITEM-PRICEUNIT[1]", "value": "1" },
            { "key": "NEW_ITEM-MATGROUP[1]", "value": "" },
            { "key": "NEW_ITEM-PRICE[1]", "value": "0" },
            { "key": "NEW_ITEM-MANUFACTMAT[2]", "value": "" },
            { "key": "NEW_ITEM-LEADTIME[3]", "value": "" },
            { "key": "NEW_ITEM-LEADTIME[1]", "value": "" },
            { "key": "NEW_ITEM-CURRENCY[1]", "value": "EUR" },
            { "key": "NEW_ITEM-LEADTIME[2]", "value": "" },
            { "key": "NEW_ITEM-UNIT[1]", "value": "EA" },
            { "key": "NEW_ITEM-MANUFACTMAT[1]", "value": "" },
            { "key": "NEW_ITEM-MATGROUP[2]", "value": "" },
            { "key": "NEW_ITEM-UNIT[3]", "value": "EA" },
            { "key": "NEW_ITEM-MANUFACTMAT[3]", "value": "" },
            { "key": "NEW_ITEM-DESCRIPTION[2]", "value": "Bolt,flange, M10X70 DAF9257" },
            { "key": "NEW_ITEM-MATGROUP[3]", "value": "" },
            { "key": "NEW_ITEM-PRICE[3]", "value": "0" },
            { "key": "NEW_ITEM-UNIT[2]", "value": "EA" },
            { "key": "NEW_ITEM-CURRENCY[3]", "value": "EUR" },
            { "key": "NEW_ITEM-PRICEUNIT[2]", "value": "1" }
        ],
        "method": null,
        "action": null
    }

    return new NextResponse(JSON.stringify(result2), { status: 201 });
}