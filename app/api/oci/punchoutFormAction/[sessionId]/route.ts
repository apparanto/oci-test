import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params: { sessionId } }: { params: { sessionId: string } }) {
    const formData = await request.formData();
    console.log(formData);
    return new NextResponse(`${JSON.stringify(Object.fromEntries(formData))}}`);
}