export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f2] px-5 py-12 text-[#1c1c18] lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#855230]">
          Tu cuenta
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Iniciar sesión
        </h1>

        <p className="mt-5 leading-7 text-[#444748]">
          Accedé a tu cuenta para gestionar tus datos.
        </p>

        <section
          aria-label="Acceso a la cuenta"
          className="mt-10 border border-black/10 bg-white p-8"
        >
          <p className="text-[#444748]">
            Acá incorporaremos el formulario de inicio de sesión.
          </p>
        </section>
      </div>
    </main>
  );
}