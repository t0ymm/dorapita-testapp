import { AdminJobTable } from '@/components/AdminJobTable';

export default function AdminPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your job postings and applications.</p>
            </div>

            <AdminJobTable />
        </div>
    );
}
