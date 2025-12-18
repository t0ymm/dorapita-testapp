import { jobs } from '@/lib/data';
import { ApplicationForm } from '@/components/ApplicationForm';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateStaticParams() {
    return jobs.map((job) => ({
        id: job.id,
    }));
}

export default function ApplyPage({ params }: PageProps) {
    const job = jobs.find((j) => j.id === params.id);

    if (!job) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ApplicationForm jobTitle={job.title} />
        </div>
    );
}
