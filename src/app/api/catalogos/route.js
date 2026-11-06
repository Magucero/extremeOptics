import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.API_BASE_URL?.replace(/\/+$/, "");

    if (!baseUrl) {
      return NextResponse.json(
        { detail: "La URL de la API no está configurada." },
        { status: 500 },
      );
    }

    const recursos = ["marcas", "categorias", "materiales", "tipos-lente"];

    const respuestas = await Promise.all(
      recursos.map((recurso) =>
        fetch(`${baseUrl}/${recurso}/`, {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        }),
      ),
    );

    const respuestaConError = respuestas.find((respuesta) => !respuesta.ok);

    if (respuestaConError) {
      return NextResponse.json(
        { detail: "No se pudieron cargar los catálogos." },
        { status: respuestaConError.status },
      );
    }

    const datos = await Promise.all(
      respuestas.map((respuesta) => respuesta.json()),
    );

    const catalogos = Object.fromEntries(
      recursos.map((recurso, index) => [
        recurso,
        datos[index].results ?? datos[index],
      ]),
    );

    return NextResponse.json(catalogos);
  } catch (error) {
    console.error("Error al cargar los catálogos:", error);

    return NextResponse.json(
      { detail: "Error de comunicación con el servidor." },
      { status: 500 },
    );
  }
}
