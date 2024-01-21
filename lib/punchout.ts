import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

type PunchoutSession = {
    email: string;
    sessionId: string;
    created: Date;
    dataURL: string;
}

const sessionsDirectory = path.join(process.cwd(), 'data/sessions');

export function createPunchoutSession(email: string, password: string): string {
    if (!email || !password) throw new Error('Invalid credentials');

    const sessionId = crypto.randomBytes(16).toString('hex');
    const dataURL = encodeURIComponent(`${process.env.OCI_PROCESS_ORDER_URL}`);
    const created = new Date();

    const session = {
        email,
        sessionId,
        created,
        dataURL
    } as PunchoutSession;

    const token = crypto.randomBytes(16).toString('hex');
    const filePath = path.join(sessionsDirectory, `${token}.json`);
    fs.writeFileSync(filePath, JSON.stringify(session));

    console.log(`Created punchout session for ${email}: ${token}`);
    return token;
}

export function getPunchoutSession(token: string): PunchoutSession | null {
    console.log(`Getting punchout session for ${token}`);
    const filePath = path.join(sessionsDirectory, `${token}.json`);
    if (!fs.existsSync(filePath)) return null;
    const json = fs.readFileSync(filePath, 'utf8');
    const session = JSON.parse(json) as PunchoutSession;
    return session;
}