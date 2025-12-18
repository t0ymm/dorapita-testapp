import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Header = () => {
    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">JobBoard</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Find Jobs
                    </Link>
                    <Link href="/companies" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Companies
                    </Link>
                    <Link href="/salaries" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Salaries
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            Post a Job
                        </Button>
                    </Link>
                    <Button size="sm">Sign In</Button>
                </div>
            </div>
        </header>
    );
};
