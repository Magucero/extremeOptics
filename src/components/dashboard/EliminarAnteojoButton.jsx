"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { eliminarAnteojo } from "@/services/anteojos";

export default function EliminarAnteojoButton({ id, nombre }) {
  const router = useRouter();
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState("");

  async function manejarEliminar() {
    const confirmado = window.confirm(
      `¿Querés eliminar "${nombre}"? Esta acción no se puede deshacer.`
    );

    if (!confirmado) {
      return;
    }

    setEliminando(true);
    setError("");

    try {
      await eliminarAnteojo(id);
      router.refresh();
    } catch (error) {
      setError(error.message || "No se pudo eliminar el anteojo.");
    } finally {
      setEliminando(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={manejarEliminar}
        disabled={eliminando}
        aria-label={`Eliminar ${nombre}`}
        className="text-sm font-semibold text-red-700 underline underline-offset-4 hover:text-red-900 disabled:cursor-wait disabled:opacity-50"
      >
        {eliminando ? "Eliminando..." : "Eliminar"}
      </button>

      {error && (
        <p role="alert" className="mt-2 max-w-xs text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}