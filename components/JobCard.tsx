import Link from 'next/link';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Job } from '@/lib/data';

interface JobCardProps {
    job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl mb-2">
                            <Link href={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                                {job.title}
                            </Link>
                        </CardTitle>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {job.type}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                        <MapPin className="mr-1.5 h-4 w-4" />
                        {job.location}
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="mr-1.5 h-4 w-4" />
                        {job.salary}
                    </div>
                    <div className="flex items-center">
                        <Clock className="mr-1.5 h-4 w-4" />
                        Posted {job.postedAt}
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                    {job.description}
                </p>
            </CardContent>
            <CardFooter>
                <Link href={`/jobs/${job.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
