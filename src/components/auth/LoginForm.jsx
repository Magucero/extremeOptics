"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaLogin } from "@/lib/validaciones";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginForm() {
  const router = useRouter();
  const { consultarSesion } = useAuth();
  const [errorServidor, setErrorServidor] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(datos) {
    setErrorServidor("");

    try {
      const respuesta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        setErrorServidor(resultado.error || "No se pudo iniciar sesión.");
        return;
      }

      // Actualizamos el contexto con la sesión recién creada.
      await consultarSesion();

      // Redirigimos al inicio.
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error de autenticación:", error);

      setErrorServidor(
        "No se pudo conectar con el servidor. Intentá nuevamente.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Usuario
        </label>

        <input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="Tu usuario"
          disabled={isSubmitting}
          {...register("username")}
          className="w-full border border-black/20 bg-white px-4 py-3 outline-none transition-colors focus:border-[#855230] disabled:opacity-50"
        />

        {errors.username && (
          <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Tu contraseña"
          disabled={isSubmitting}
          {...register("password")}
          className="w-full border border-black/20 bg-white px-4 py-3 outline-none transition-colors focus:border-[#855230] disabled:opacity-50"
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {errorServidor && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorServidor}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#855230] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
