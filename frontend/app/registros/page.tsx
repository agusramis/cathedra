'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function RegistrosPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [materiaId, setMateriaId] = useState('');

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarDatos();
  }, [token]);

  const cargarDatos = async () => {
    const [u, m, r] = await Promise.all([
      fetch('http://localhost:3000/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
      fetch('http://localhost:3000/materias', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
      fetch('http://localhost:3000/registros', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
    ]);
    setUsuarios(u);
    setMaterias(m);
    setRegistros(r);
  };

  const asignar = async () => {
    await fetch('http://localhost:3000/registros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        usuarioId: Number(usuarioId),
        materiaId: Number(materiaId),
      }),
    });
    setUsuarioId('');
    setMateriaId('');
    cargarDatos();
  };

  const eliminar = async (id: number) => {
    await fetch(`http://localhost:3000/registros/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarDatos();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Asignación de usuarios a materias</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <select
          value={usuarioId}
          onChange={e => setUsuarioId(e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.email} ({u.rol})
            </option>
          ))}
        </select>
        <select
          value={materiaId}
          onChange={e => setMateriaId(e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Seleccionar materia</option>
          {materias.map((m: any) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>
        <button
          onClick={asignar}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Asignar
        </button>
      </div>

      <ul className="space-y-2">
        {registros.map((r: any) => (
          <li
            key={r.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              <strong>{r.usuario.email}</strong> ({r.usuario.rol}) →{' '}
              <strong>{r.materia.nombre}</strong>
            </span>
            <button
              onClick={() => eliminar(r.id)}
              className="text-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}