import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calculator',
  description: 'A simple web calculator',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-gray-950 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
