import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Fusion Framework',
    template: '%s | Fusion Framework',
  },
  description:
    'Fusion enables you to build high-quality backends with a unified developer experience across Node.js, Python, and C#',
  icons: {
    icon: '/images/logo-fusion.jpg',
    apple: '/images/logo-fusion.jpg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
