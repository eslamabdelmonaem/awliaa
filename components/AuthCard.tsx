import { JSX, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthCardProps {
  title?: string;
  children: ReactNode;
  footerText?: string | JSX.Element;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export default function AuthCard({ title, children, footerText, footerLinkText, footerLinkHref }: AuthCardProps) {
  return (
    <div className="auth-card">
      <h2 className="card-title">{title}</h2>
      {children}
      <div className="text-center">
        <span className="text-[#71717A]">{footerText}</span>{' '}
        <Link href={footerLinkHref || '#'} className="auth-links font-bold">
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
}
