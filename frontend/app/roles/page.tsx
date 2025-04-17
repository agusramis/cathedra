'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function RolesPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [nombreRol, setNombreRol] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<number[]>([]);

  const [clavePermiso, setClavePermiso] = useState('');
  const [descripcionPermiso, setDescripcionPermiso] = useState('');

  const [userId, setUserId] = useState('');
  const [rolId, setRolId] = useState('');

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarTodo();
  }, [token]);

  const cargarTodo = async () => {
    const [r, p, u] = await Promise.all([
      fetch('http://localhost:3000/roles', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
      fetch('http://localhost:3000/permisos', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
      fetch('http://localhost:3000/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
    ]);
    setRoles(r);
    setPermisos(p);
    setUsuarios(u);
  };

  const crearPermiso = async () => {
    await fetch('http://localhost:3000/permisos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ clave: clavePermiso, descripcion: descripcionPermiso }),
    });
    setClavePermiso('');
    setDescripcionPermiso('');
    cargarTodo();
  };

  const crearRol = async () => {
    await fetch('http://localhost:3000/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre: nombreRol, permisoIds: permisosSeleccionados }),
    });
    setNombreRol('');
    setPermisosSeleccionados([]);
    cargarTodo();
  };

  const asignarRolAUsuario = async () => {
    await fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rolId: Number(rolId) }),
    });
    setUserId('');
    setRolId('');
    cargarTodo();
  };

  const togglePermiso = (id: number) => {
    setPermisosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-xl font-bold">Gestión de Roles y Permisos</h1>

      <section>
        <h2 className="font-semibold mb-2">Crear Permiso</h2>
        <input
          placeholder="clave"
          value={clavePermiso}
          onChange={e => setClavePermiso(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          placeholder="descripcion"
          value={descripcionPermiso}
          onChange={e => setDescripcionPermiso(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={crearPermiso} className="bg-blue-600 text-white py-1 px-3 rounded">
          Crear permiso
        </button>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Crear Rol</h2>
        <input
          placeholder="nombre del rol"
          value={nombreRol}
          onChange={e => setNombreRol(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <div className="grid grid-cols-2 gap-2 mb-2">
          {permisos.map((p: any) => (
            <label key={p.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={permisosSeleccionados.includes(p.id)}
                onChange={() => togglePermiso(p.id)}
              />
              {p.clave}
            </label>
          ))}
        </div>
        <button onClick={crearRol} className="bg-green-600 text-white py-1 px-3 rounded">
          Crear rol
        </button>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Asignar rol a usuario</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <select value={userId} onChange={e => setUserId(e.target.value)} className="border p-2">
            <option value="">Usuario</option>
            {usuarios.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
          <select value={rolId} onChange={e => setRolId(e.target.value)} className="border p-2">
            <option value="">Rol</option>
            {roles.map((r: any) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>
          <button onClick={asignarRolAUsuario} className="bg-purple-600 text-white px-3 rounded">
            Asignar
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Roles existentes</h2>
        <ul className="space-y-2">
          {roles.map((r: any) => (
            <li key={r.id} className="border p-3 rounded">
              <p className="font-bold">{r.nombre}</p>
              <ul className="text-sm list-disc ml-5">
                {r.permisos.map((p: any) => (
                  <li key={p.id}>{p.clave} — {p.descripcion}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}