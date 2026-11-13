import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Protected route: every page under /dashboard requires an active session.
export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();

  if (!cookieStore.get("access_token")?.value) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#1c1c18]">
      <div className="border-b border-black/10 bg-[#f1eee7] px-5 py-4 lg:px-8">
        <nav
          aria-label="Navegación del panel"
          className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider"
        >
          <span className="text-[#855230]">Administración</span>

          <Link href="/dashboard" className="hover:text-[#855230]">
            Resumen
          </Link>
          <Link
            href="/dashboard/anteojos/nuevo"
            className="hover:text-[#855230]"
            >
            Nuevo anteojo
        </Link>

          <Link href="/anteojos" className="hover:text-[#855230]">
            Ver catálogo
          </Link>
        </nav>
      </div>

      {children}
    </div>
  );
}