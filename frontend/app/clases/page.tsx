'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function ClasesPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [clases, setClases] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarClases();
  }, [token]);

  const cargarClases = async () => {
    const res = await fetch('http://localhost:3000/clases', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setClases(data);
  };

  const crearClase = async () => {
    await fetch('http://localhost:3000/clases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, contenido }),
    });
    setTitulo('');
    setContenido('');
    cargarClases();
  };

  const editarClase = async (id: number) => {
    await fetch(`http://localhost:3000/clases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, contenido }),
    });
    setEditId(null);
    setTitulo('');
    setContenido('');
    cargarClases();
  };

  const eliminarClase = async (id: number) => {
    await fetch(`http://localhost:3000/clases/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarClases();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Clases</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="w-full p-2 border"
        />
        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={e => setContenido(e.target.value)}
          className="w-full p-2 border h-24"
        />
        {editId ? (
          <button
            onClick={() => editarClase(editId)}
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={crearClase}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Crear clase
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {clases.map((c: any) => (
          <li key={c.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{c.titulo}</h2>
              <p className="text-sm text-gray-600">
                {c.visible ? 'Visible' : 'Oculta'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(c.id);
                  setTitulo(c.titulo);
                  setContenido(c.contenido);
                }}
                className="text-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarClase(c.id)}
                className="text-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}