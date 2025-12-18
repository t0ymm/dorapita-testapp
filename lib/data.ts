export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Tokyo, Japan',
    type: 'Full-time',
    salary: '¥6M - ¥9M',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building modern web applications using React and Next.js.',
    requirements: ['3+ years of experience with React', 'Experience with TypeScript', 'Knowledge of TailwindCSS'],
    postedAt: '2023-10-27',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'Data Systems',
    location: 'Remote',
    type: 'Full-time',
    salary: '¥7M - ¥10M',
    description: 'Join our backend team to build scalable APIs and microservices. You will work with Node.js, PostgreSQL, and AWS.',
    requirements: ['Experience with Node.js and Express', 'Strong database knowledge', 'Cloud infrastructure experience'],
    postedAt: '2023-10-26',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Osaka, Japan',
    type: 'Contract',
    salary: '¥500k - ¥800k / month',
    description: 'We need a creative designer to help us craft beautiful user interfaces. You will work closely with developers and product managers.',
    requirements: ['Portfolio demonstrating UI/UX skills', 'Proficiency in Figma', 'Understanding of frontend development'],
    postedAt: '2023-10-25',
  },
];
