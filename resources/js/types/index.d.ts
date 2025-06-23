import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type Conversation = {
    id: number;
    sender_id: number;
    receiver_id: number;
    blocked_at: string;
    last_message_id: number;
    last_message_date: string;
    created_at: string;
    updated_at: string;
};

interface User {
    id: number;
    avatar_url: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    is_admin: boolean;
    last_message: string;
    last_message_sent: string;
}
