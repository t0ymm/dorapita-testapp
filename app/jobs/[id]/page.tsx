import { jobs } from '@/lib/data';
import { JobDetail } from '@/components/JobDetail';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        id: string;
    };
}

// In Next.js 15 (and recent 14), params is a Promise or needs to be awaited in some contexts, 
// but for standard page component it's passed as props. 
// However, let's stick to standard server component pattern.
// Note: In Next.js 15, params is async. But let's assume standard behavior for now or handle it.
// Actually, for static generation `generateStaticParams` is good.

export async function generateStaticParams() {
    return jobs.map((job) => ({
        id: job.id,
    }));
}

export default function JobPage({ params }: PageProps) {
    const job = jobs.find((j) => j.id === params.id);

    if (!job) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <JobDetail job={job} />
        </div>
    );
}
