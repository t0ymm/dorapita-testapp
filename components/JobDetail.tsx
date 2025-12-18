import Link from 'next/link';
import { MapPin, Clock, DollarSign, Building, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Job } from '@/lib/data';

interface JobDetailProps {
    job: Job;
}

export const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
            </Link>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center">
                                <Building className="mr-1.5 h-4 w-4" />
                                {job.company}
                            </div>
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

                        <div className="prose max-w-none">
                            <h3 className="text-xl font-semibold mb-3">Description</h3>
                            <p className="text-gray-600 mb-6">{job.description}</p>

                            <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Apply for this position</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href={`/apply/${job.id}`} className="block w-full">
                                <Button className="w-full" size="lg">
                                    Apply Now
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full">
                                Save Job
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 className="font-semibold text-lg">About the Company</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                {job.company} is a leading company in the industry. We are passionate about innovation and growth.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
