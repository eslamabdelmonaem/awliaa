import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthCardProps {
  title?: string;
  children: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export default function AuthCard({ title, children, footerText, footerLinkText, footerLinkHref }: AuthCardProps) {
  return (
    <div className="auth-card">
      <h2 className="card-title">{title}</h2>
      {children}
      <div className="text-center text-sm">
        <span className="text-gray-600">{footerText}</span>{' '}
        <Link href={footerLinkHref || '#'} className="font-medium text-blue-600 hover:text-blue-500">
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
}
