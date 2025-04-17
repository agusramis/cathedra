"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("alumno");

  const register = async () => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rol }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Registro</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <select
        value={rol}
        onChange={(e) => setRol(e.target.value)}
        className="w-full mb-4 p-2 border"
      >
        <option value="alumno">Alumno</option>
        <option value="profesor">Profesor</option>
      </select>
      <button
        onClick={register}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Registrarse
      </button>
    </div>
  );
}
