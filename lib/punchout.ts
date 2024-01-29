import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

type PunchoutSession = {
    headers: {},
    action: string,
    body: string,
    email: string;
    username: string,
    password: string,
    name: string,
    firstname: string,
    lastname: string,
    company: string,
    company_id: string | null,
    netsuite_customer_id: string | null,
    group_id: string | null,
    website_id: string | null,
    store_id: string | null,
    account_id: string | null,
    profile_id: string | null,
    properties: {} | null,
    punchout_id: string,
    redirect: string | null,
    carts: [],
}

const sessionsDirectory = path.join(process.cwd(), 'data/sessions');

export function createPunchoutSession(email: string, password: string): string {
    if (!email || !password) throw new Error('Invalid credentials');

    const punchout_id = crypto.randomBytes(16).toString('hex');

    const session: PunchoutSession = {
        headers: {},
        action: 'login',
        body: '',
        email,
        username: email,
        password,
        name: 'OCI Tester',
        firstname: 'OCI',
        lastname: 'Test',
        company: 'VDL Customer',
        company_id: null,
        netsuite_customer_id: null,
        group_id: null,
        website_id: null,
        store_id: null,
        account_id: null,
        profile_id: null,
        properties: null,
        punchout_id,
        redirect: null,
        carts: [],
    } as PunchoutSession;

    const filePath = path.join(sessionsDirectory, `${punchout_id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(session));

    console.log(`Created punchout session for ${email}: ${punchout_id}`);
    return punchout_id;
}

export function getPunchoutSession(punchout_id: string): PunchoutSession | null {
    console.log(`Getting punchout session for ${punchout_id}`);
    const filePath = path.join(sessionsDirectory, `${punchout_id}.json`);
    if (!fs.existsSync(filePath)) return null;

    const json = fs.readFileSync(filePath, 'utf8');
    const session = JSON.parse(json) as PunchoutSession;
    return session;
}