import { jobs } from '@/lib/data';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Browse thousands of job openings from top companies and startups.
          Your next career move starts here.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button size="lg" className="px-8">
            Search
          </Button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Opportunities</h2>
          <span className="text-gray-500">{jobs.length} jobs found</span>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
