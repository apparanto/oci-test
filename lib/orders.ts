import fs from 'fs';
import path from 'path';

const ordersDirectory = path.join(process.cwd(), 'data/orders');
export async function saveOrder(orderId: string, json: string) {
    console.log(`Saving order ${orderId}...`);
    console.log(json);

    const filePath = path.join(ordersDirectory, `${orderId}.json`);
    fs.writeFileSync(filePath, json);

    return filePath;
}

export async function readOrder(orderId: string) {
    const filePath = path.join(ordersDirectory, `${orderId}.json`);
    const json = fs.readFileSync(filePath, 'utf8');
    return json;
}