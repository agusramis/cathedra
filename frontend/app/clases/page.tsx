import ClasesTable from "../components/ClasesTable";

export default function ClasesPage() {
  return (
    <main className="p-6">
      <div className="content-heading">
        <div>
          Clases
          <small className="block text-sm text-gray-500">
            Clases de todas las materias.
          </small>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header flex justify-between items-center">
          <a href="/materias" className="btn btn-primary">
            Volver
          </a>
        </div>
        <div className="card-body">
          <ClasesTable />
        </div>
      </div>
    </main>
  );
}
