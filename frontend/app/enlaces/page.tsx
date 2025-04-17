'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function EnlacesPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [enlaces, setEnlaces] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [materias, setMaterias] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarDatos();
  }, [token]);

  const cargarDatos = async () => {
    const enlacesRes = await fetch('http://localhost:3000/enlaces', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json());

    const materiasRes = await fetch('http://localhost:3000/materias', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json());

    setEnlaces(enlacesRes);
    setMaterias(materiasRes);
  };

  const crear = async () => {
    await fetch('http://localhost:3000/enlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo,
        url,
        materiaId: materiaId ? Number(materiaId) : null,
      }),
    });
    resetForm();
    cargarDatos();
  };

  const editar = async (id: number) => {
    await fetch(`http://localhost:3000/enlaces/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo,
        url,
        materiaId: materiaId ? Number(materiaId) : null,
      }),
    });
    resetForm();
    cargarDatos();
  };

  const eliminar = async (id: number) => {
    await fetch(`http://localhost:3000/enlaces/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarDatos();
  };

  const resetForm = () => {
    setTitulo('');
    setUrl('');
    setMateriaId('');
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Enlaces</h1>

      <div className="mb-6 space-y-2">
        <input
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full p-2 border"
        />
        <select
          value={materiaId}
          onChange={e => setMateriaId(e.target.value)}
          className="w-full p-2 border"
        >
          <option value="">Sin materia asociada</option>
          {materias.map((m: any) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>
        {editId ? (
          <button
            onClick={() => editar(editId)}
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={crear}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Crear enlace
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {enlaces.map((e: any) => (
          <li key={e.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{e.titulo}</p>
              <a href={e.url} className="text-sm text-blue-600" target="_blank">{e.url}</a>
              {e.materia && (
                <p className="text-xs text-gray-500">Materia: {e.materia.nombre}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(e.id);
                  setTitulo(e.titulo);
                  setUrl(e.url);
                  setMateriaId(e.materia?.id || '');
                }}
                className="text-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(e.id)}
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