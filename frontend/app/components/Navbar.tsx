'use client';
import Link from 'next/link';
import { useAuth } from '../context/auth-context';

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link href="/principal" className="text-blue-600 font-semibold">Inicio</Link>
        <Link href="/materias" className="text-blue-600">Materias</Link>
        <Link href="/clases" className="text-blue-600">Clases</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}