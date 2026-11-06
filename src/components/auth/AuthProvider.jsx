"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function cargarSesion() {
      try {
        const respuesta = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!respuesta.ok) {
          if (!cancelado) {
            setUsuario(null);
          }
          return;
        }

        const datos = await respuesta.json();

        if (!cancelado) {
          setUsuario(datos.usuario ?? null);
        }
      } catch (error) {
        console.error("Error al consultar la sesión:", error);

        if (!cancelado) {
          setUsuario(null);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarSesion();

    return () => {
      cancelado = true;
    };
  }, []);

  async function consultarSesion() {
    setCargando(true);

    try {
      const respuesta = await fetch("/api/auth/session", {
        method: "GET",
        cache: "no-store",
      });

      if (!respuesta.ok) {
        setUsuario(null);
        return;
      }

      const datos = await respuesta.json();
      setUsuario(datos.usuario ?? null);
    } catch (error) {
      console.error("Error al consultar la sesión:", error);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }

  async function cerrarSesion() {
    try {
      const respuesta = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!respuesta.ok) {
        console.error("No se pudo cerrar la sesión correctamente.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUsuario(null);
      router.replace("/");
      router.refresh();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        autenticado: Boolean(usuario),
        consultarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return contexto;
}
