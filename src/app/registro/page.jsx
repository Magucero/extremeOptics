import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Crear cuenta | Extreme Optics",
  description: "Registrate en Extreme Optics y creá tu cuenta.",
};

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#855230]">
            Extreme Optics
          </p>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Crear una cuenta
          </h1>

          <p className="text-sm text-black/60">
            Completá tus datos para registrarte en nuestra óptica.
          </p>
        </div>

        <div className="border border-black/10 bg-white p-6 shadow-sm sm:p-10">
          <RegisterForm />

          <div className="mt-8 border-t border-black/10 pt-6 text-center">
            <p className="text-sm text-black/60">¿Ya tenés una cuenta?</p>

            <Link
              href="/login"
              className="mt-2 inline-block text-sm font-bold text-[#855230] transition-colors hover:text-black"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
