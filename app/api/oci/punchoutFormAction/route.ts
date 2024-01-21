import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    console.log(formData);
    return new NextResponse('OK');
}