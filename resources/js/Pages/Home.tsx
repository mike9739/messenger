import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ReactNode } from 'react';

function Home() {
    return <>Messages</>;
}

Home.layout = (page: ReactNode) => {
    return (
        <AuthenticatedLayout>
            <ChatLayout> {page}</ChatLayout>
        </AuthenticatedLayout>
    );
};

export default Home;
