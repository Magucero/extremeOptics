"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const consultarSesion = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    consultarSesion();
  }, [consultarSesion]);

  async function cerrarSesion() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
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
