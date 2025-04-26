"use client";

import { Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Clase = {
  id: number;
  nombre: string;
  fecha: string;
  materia: {
    nombre: string;
  };
};

export default function ClasesTable() {
  const [clases, setClases] = useState<Clase[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/clases")
      .then((res) => res.json())
      .then((data) => setClases(data))
      .catch((err) => console.error("Error cargando clases:", err));
  }, []);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Materia</Table.ColumnHeader>
          <Table.ColumnHeader>Nombre</Table.ColumnHeader>
          <Table.ColumnHeader>Fecha</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {clases.map((clase) => (
          <Table.Row key={clase.id}>
            <Table.Cell>{clase.materia?.nombre}</Table.Cell>
            <Table.Cell>{clase.nombre}</Table.Cell>
            <Table.Cell textAlign="end">{clase.fecha}</Table.Cell>{" "}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
