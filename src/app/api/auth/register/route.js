import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const datos = await request.json();

    const {
      nombre,
      apellido,
      email,
      dni,
      telefono,
      direccion,
      password,
      confirmarPassword,
    } = datos;

    // Validación básica de los datos recibidos.
    if (
      !nombre ||
      !apellido ||
      !email ||
      !dni ||
      !telefono ||
      !direccion ||
      !password ||
      !confirmarPassword
    ) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres." },
        { status: 400 },
      );
    }

    if (password !== confirmarPassword) {
      return NextResponse.json(
        { error: "Las contraseñas no coinciden." },
        { status: 400 },
      );
    }

    // No inventamos el endpoint de Django.
    // Se configurará cuando confirmemos la ruta real de registro.
    const registroApiUrl = process.env.REGISTRO_API_URL;

    if (!registroApiUrl) {
      return NextResponse.json(
        {
          error:
            "El servicio de registro todavía no está conectado. Contactá al administrador.",
        },
        { status: 503 },
      );
    }

    // Adaptación de los datos del formulario al contrato de registro.
    const datosRegistro = {
      username: email.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      first_name: nombre.trim(),
      last_name: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim(),
      direccion: direccion.trim(),
      password,
    };

    const respuesta = await fetch(registroApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosRegistro),
      cache: "no-store",
    });

    const contenido = await respuesta.text();

    let resultado;

    try {
      resultado = contenido ? JSON.parse(contenido) : {};
    } catch {
      return NextResponse.json(
        { error: "El servidor devolvió una respuesta inválida." },
        { status: 502 },
      );
    }

    if (!respuesta.ok) {
      return NextResponse.json(
        {
          error:
            resultado.detail ||
            resultado.error ||
            "No se pudo completar el registro.",
          detalles: resultado,
        },
        { status: respuesta.status },
      );
    }

    return NextResponse.json(
      {
        message: "Registro realizado correctamente.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error interno en /api/auth/register:", error);

    return NextResponse.json(
      { error: "No se pudo conectar con el servicio de registro." },
      { status: 500 },
    );
  }
}
