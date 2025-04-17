'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function ItemsPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [materias, setMaterias] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarDatos();
  }, [token]);

  const cargarDatos = async () => {
    const [itemsRes, materiasRes] = await Promise.all([
      fetch('http://localhost:3000/items', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
      fetch('http://localhost:3000/materias', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
    ]);

    setItems(itemsRes);
    setMaterias(materiasRes);
  };

  const crear = async () => {
    await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        valor,
        materiaId: materiaId ? Number(materiaId) : null,
      }),
    });
    resetForm();
    cargarDatos();
  };

  const editar = async (id: number) => {
    await fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        valor,
        materiaId: materiaId ? Number(materiaId) : null,
      }),
    });
    resetForm();
    cargarDatos();
  };

  const eliminar = async (id: number) => {
    await fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarDatos();
  };

  const resetForm = () => {
    setNombre('');
    setValor('');
    setMateriaId('');
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Items</h1>

      <div className="mb-6 space-y-2">
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
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
            Crear item
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((i: any) => (
          <li key={i.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{i.nombre}</p>
              <p className="text-sm text-gray-600">{i.valor}</p>
              {i.materia && (
                <p className="text-xs text-gray-500">Materia: {i.materia.nombre}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(i.id);
                  setNombre(i.nombre);
                  setValor(i.valor);
                  setMateriaId(i.materia?.id || '');
                }}
                className="text-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(i.id)}
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