import { Conversation, PageProps, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';

interface ChatPageProps extends PageProps {
    props: {
        conversations: Conversation[];
        selectedConversations: Conversation;
    };
}

interface ChatLayoutProps {
    children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    const page = usePage<ChatPageProps>();
    const conversations = page.props.conversation;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const [localConversations, setLocalConversations] = useState<
        Conversation[]
    >([]);
    const [sortedConversations, setSortedConversations] = useState<
        Conversation[]
    >([]);
    const isUserOnline = (userId: User['id']) => onlineUsers[userId];
    useEffect(() => {
        if (localConversations.length > 0) {
            setSortedConversations(
                localConversations.sort((a, b) => {
                    if (a.blocked_at && b.blocked_at) {
                        return a.blocked_at > b.blocked_at ? 1 : -1;
                    } else if (a.blocked_at) {
                        return 1;
                    } else if (b.blocked_at) {
                        return -1;
                    }

                    if (a.last_message_date && b.last_message_date) {
                        return b.last_message_date.localeCompare(
                            a.last_message_date,
                        );
                    } else if (a.last_message_date) {
                        return -1;
                    } else if (b.last_message_date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }),
            );
        }
    }, [localConversations]);

    useEffect(() => {
        Echo.join('online')
            .here((users: User[]) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user]),
                );
                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUsersObj };
                });
            })
            .joining((user: User) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user: User) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            })
            .error((error: Error) => {
                console.log(error);
            });
        Echo.leave('online');
    }, []);

    return (
        <>
            <div>{children}</div>
        </>
    );
}
