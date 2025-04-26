import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("./principal");
  return <div className="text-center p-8">Bienvenido a Cathedra Frontend</div>;
}
