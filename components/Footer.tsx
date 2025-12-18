import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold">JobBoard</span>
                        </Link>
                        <p className="text-sm text-gray-500">
                            Connecting talent with opportunity. Find your dream job today.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">For Candidates</h3>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-blue-600">Browse Jobs</Link></li>
                            <li><Link href="/companies" className="hover:text-blue-600">Browse Companies</Link></li>
                            <li><Link href="/salaries" className="hover:text-blue-600">Salary Search</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">For Employers</h3>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/admin" className="hover:text-blue-600">Post a Job</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                            <li><Link href="/resources" className="hover:text-blue-600">Resources</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/help" className="hover:text-blue-600">Help Center</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} JobBoard. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
