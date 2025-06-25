import { Conversation, PageProps, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TextInput from "@/Components/TextInput";

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
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const [localConversations, setLocalConversations] = useState<
        Conversation[]
    >([]);
    const [sortedConversations, setSortedConversations] = useState<
        Conversation[]
    >([]);
    const isUserOnline = (userId: User['id']) => onlineUsers[userId];
    const onSearch = () => {};
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
            <div className="flex w-full flex-1 overflow-hidden">
                <div
                    className={`md:w-[300px]} sm:w-[220px flex w-full flex-col overflow-hidden bg-slate-800 transition-all ${selectedConversation ? '-ml-[100%] sm:ml-0' : ''} `}
                >
                    <div className="flex items-center justify-between px-3 py-2 text-xl font-medium">
                        My Conversations
                        <div
                            className="tooltip tooltip-left"
                            data-tip="Create new Group"
                        >
                            <button className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="ml-2 inline-block h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filters users and groups"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">

                    </div>
                </div>
                <div className="flex-1 flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
}
