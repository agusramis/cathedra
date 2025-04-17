'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';

export default function PrincipalPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Bienvenido {user.email}</h1>
      <p>Tu rol: <strong>{user.rol}</strong></p>
      <button onClick={logout} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
        Cerrar sesión
      </button>
    </div>
  );
}