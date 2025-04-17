'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function ConsultasPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [consultas, setConsultas] = useState([]);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [respondiendoId, setRespondiendoId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return router.push('/login');
    cargarConsultas();
  }, [token]);

  const cargarConsultas = async () => {
    const res = await fetch('http://localhost:3000/consultas', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setConsultas(data);
  };

  const crearConsulta = async () => {
    await fetch('http://localhost:3000/consultas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pregunta, autorId: user.id, materiaId: 1 }),
    });
    setPregunta('');
    cargarConsultas();
  };

  const responderConsulta = async (id: number) => {
    await fetch(`http://localhost:3000/consultas/${id}/responder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ respuesta, respondidoPorId: user.id }),
    });
    setRespuesta('');
    setRespondiendoId(null);
    cargarConsultas();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Consultas</h1>

      {user && user.rol === 'alumno' && (
        <div className="mb-6 space-y-2">
          <textarea
            placeholder="Escribí tu consulta"
            value={pregunta}
            onChange={e => setPregunta(e.target.value)}
            className="w-full p-2 border h-24"
          />
          <button
            onClick={crearConsulta}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Enviar consulta
          </button>
        </div>
      )}

      <ul className="space-y-4">
        {consultas.map((c: any) => (
          <li key={c.id} className="border p-4 rounded">
            <p><strong>Pregunta:</strong> {c.pregunta}</p>
            {c.respuesta ? (
              <p className="text-green-600 mt-2">
                <strong>Respuesta:</strong> {c.respuesta}
              </p>
            ) : user.rol === 'profesor' ? (
              <div className="mt-2 space-y-2">
                {respondiendoId === c.id ? (
                  <>
                    <textarea
                      placeholder="Escribí la respuesta"
                      value={respuesta}
                      onChange={e => setRespuesta(e.target.value)}
                      className="w-full p-2 border"
                    />
                    <button
                      onClick={() => responderConsulta(c.id)}
                      className="bg-green-600 text-white py-1 px-3 rounded"
                    >
                      Enviar respuesta
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setRespondiendoId(c.id)}
                    className="text-blue-600"
                  >
                    Responder
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">Sin respuesta aún</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}