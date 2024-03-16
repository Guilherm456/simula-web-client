import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-12">
          Página não encontrada
        </h2>
        <p className="mb-9 text-gray-11">
          A página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="flex justify-center gap-2 text-primary underline"
        >
          Volte para a página inicial <Home className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
