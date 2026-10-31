import Link from "next/link";

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Sumate a nuestra óptica
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Crear cuenta
        </h1>

        <p className="mt-5 leading-7 text-[#444748]">
          Registrate para acceder a tu cuenta y gestionar tus datos.
        </p>

        <section
          aria-label="Registro de cuenta"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <p className="text-[#444748]">
            Acá incorporaremos el formulario de registro.
          </p>

          <p className="mt-6 text-sm text-[#444748]">
            ¿Ya tenés una cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-black underline underline-offset-4 hover:text-[#855230]"
            >
              Iniciá sesión
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}