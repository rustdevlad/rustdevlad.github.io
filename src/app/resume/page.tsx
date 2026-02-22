import type { Metadata } from 'next';
import Resume from '@/components/Resume';

export const metadata: Metadata = {
    title: "Vladislav Podolyako - Resume",
    description: "Full Stack Developer Resume",
};

export default function ResumePage() {
    return <Resume />;
}