import './globals.css';
import { AuthProvider } from './context/auth-context';
import Navbar from './components/Navbar';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
<Navbar />
<AuthProvider> className="bg-gray-100 text-gray-900">{children}</AuthProvider></body>
    </html>
  );
}