// app/dashboard/page.tsx
import AppLayout from '@/components/AppLayout';
import DashboardView from '@/components/DashboardView';

export default function DashboardPage() {
    return (
        <AppLayout>
            <DashboardView />
        </AppLayout>
    );
}
