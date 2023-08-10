import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/providers/AuthProvider';

const poppins = Poppins({
  subsets: ['devanagari'],
  weight: ['400', '600'],
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'SSU-BC Webinar Mangaement System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
