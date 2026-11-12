"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaRegistro } from "@/lib/validaciones";

const campos = [
  {
    nombre: "nombre",
    etiqueta: "Nombre",
    tipo: "text",
    placeholder: "Tu nombre",
    autocomplete: "given-name",
  },
  {
    nombre: "apellido",
    etiqueta: "Apellido",
    tipo: "text",
    placeholder: "Tu apellido",
    autocomplete: "family-name",
  },
  {
    nombre: "email",
    etiqueta: "Correo electrónico",
    tipo: "email",
    placeholder: "correo@ejemplo.com",
    autocomplete: "email",
  },
  {
    nombre: "dni",
    etiqueta: "DNI",
    tipo: "text",
    placeholder: "Tu número de documento",
    autocomplete: "off",
  },
  {
    nombre: "telefono",
    etiqueta: "Teléfono",
    tipo: "tel",
    placeholder: "Tu número de teléfono",
    autocomplete: "tel",
  },
  {
    nombre: "direccion",
    etiqueta: "Dirección",
    tipo: "text",
    placeholder: "Tu dirección",
    autocomplete: "street-address",
  },
  {
    nombre: "password",
    etiqueta: "Contraseña",
    tipo: "password",
    placeholder: "Mínimo 8 caracteres",
    autocomplete: "new-password",
  },
  {
    nombre: "confirmarPassword",
    etiqueta: "Confirmar contraseña",
    tipo: "password",
    placeholder: "Repetí tu contraseña",
    autocomplete: "new-password",
  },
];

export default function RegisterForm() {
  const router = useRouter();

  const [errorServidor, setErrorServidor] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaRegistro),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      telefono: "",
      direccion: "",
      password: "",
      confirmarPassword: "",
    },
  });

  async function onSubmit(datos) {
    setErrorServidor("");
    setRegistroExitoso(false);

    try {
      const respuesta = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        setErrorServidor(
          resultado.error || "No se pudo completar el registro.",
        );
        return;
      }

      setRegistroExitoso(true);

      // El usuario deberá iniciar sesión después del registro.
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error durante el registro:", error);

      setErrorServidor(
        "No se pudo conectar con el servidor. Intentá nuevamente.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {campos.map((campo) => (
          <div
            key={campo.nombre}
            className={
              campo.nombre === "direccion" ||
              campo.nombre === "password" ||
              campo.nombre === "confirmarPassword"
                ? "sm:col-span-2"
                : ""
            }
          >
            <label
              htmlFor={campo.nombre}
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-black"
            >
              {campo.etiqueta}
            </label>

            <input
              id={campo.nombre}
              type={campo.tipo}
              placeholder={campo.placeholder}
              autoComplete={campo.autocomplete}
              disabled={isSubmitting}
              {...register(campo.nombre)}
              className="w-full border border-black/20 bg-white px-4 py-3 text-black placeholder:text-gray-500 outline-none transition-colors focus:border-[#855230] disabled:opacity-50"
            />

            {errors[campo.nombre] && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {errors[campo.nombre].message}
              </p>
            )}
          </div>
        ))}
      </div>

      {errorServidor && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorServidor}
        </div>
      )}

      {registroExitoso && (
        <div
          role="status"
          className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          ¡Registro realizado correctamente! Ya podés iniciar sesión.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#855230] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Registrando..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tenés una cuenta?{" "}
        <Link
          href="/login"
          className="font-bold text-[#855230] hover:text-black"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
