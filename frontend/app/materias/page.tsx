'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function MateriasPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [materias, setMaterias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarMaterias();
  }, [token]);

  const cargarMaterias = async () => {
    const res = await fetch('http://localhost:3000/materias', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMaterias(data);
  };

  const crearMateria = async () => {
    await fetch('http://localhost:3000/materias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, descripcion }),
    });
    setNombre('');
    setDescripcion('');
    cargarMaterias();
  };

  const editarMateria = async (id: number) => {
    await fetch(`http://localhost:3000/materias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, descripcion }),
    });
    setEditId(null);
    setNombre('');
    setDescripcion('');
    cargarMaterias();
  };

  const eliminarMateria = async (id: number) => {
    await fetch(`http://localhost:3000/materias/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarMaterias();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Materias</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          className="w-full p-2 border"
        />
        {editId ? (
          <button
            onClick={() => editarMateria(editId)}
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={crearMateria}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Crear materia
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {materias.map((m: any) => (
          <li key={m.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{m.nombre}</h2>
              <p className="text-sm text-gray-600">{m.descripcion}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(m.id);
                  setNombre(m.nombre);
                  setDescripcion(m.descripcion);
                }}
                className="text-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarMateria(m.id)}
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