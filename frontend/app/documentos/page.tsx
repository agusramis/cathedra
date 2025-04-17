'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function DocumentosPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [documentos, setDocumentos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarDocumentos();
  }, [token]);

  const cargarDocumentos = async () => {
    const res = await fetch('http://localhost:3000/documentos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDocumentos(data);
  };

  const subirPorURL = async () => {
    await fetch('http://localhost:3000/documentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, url }),
    });
    setTitulo('');
    setUrl('');
    cargarDocumentos();
  };

  const subirArchivo = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titulo', titulo);

    await fetch('http://localhost:3000/documentos/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    setTitulo('');
    setFile(null);
    cargarDocumentos();
  };

  const eliminar = async (id: number) => {
    await fetch(`http://localhost:3000/documentos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarDocumentos();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Documentos</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold">Subir por URL</h2>
          <input
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <input
            placeholder="URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <button
            onClick={subirPorURL}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Subir URL
          </button>
        </div>

        <div>
          <h2 className="font-semibold">Subir archivo</h2>
          <input
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border mb-2"
          />
          <button
            onClick={subirArchivo}
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Subir archivo
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {documentos.map((doc: any) => (
          <li key={doc.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{doc.titulo}</h2>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                Ver documento
              </a>
            </div>
            <button
              onClick={() => eliminar(doc.id)}
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