import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña son obligatorios." },
        { status: 400 },
      );
    }

    const apiBaseUrl = process.env.API_BASE_URL;

    if (!apiBaseUrl) {
      console.error("Falta configurar API_BASE_URL.");
      return NextResponse.json(
        { error: "La URL de la API no está configurada." },
        { status: 500 },
      );
    }

    const url = `${apiBaseUrl.replace(/\/+$/, "")}/token/`;

    console.log("Intentando conectar con Django:", url);

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    const contenido = await respuesta.text();

    let tokens;

    try {
      tokens = JSON.parse(contenido);
    } catch {
      console.error("Django devolvió una respuesta no JSON:", contenido);
      return NextResponse.json(
        { error: "La API devolvió una respuesta inválida." },
        { status: 502 },
      );
    }

    if (!respuesta.ok) {
      console.error("Error de autenticación Django. Estado:", respuesta.status);

      return NextResponse.json(
        { error: tokens.detail || "Usuario o contraseña incorrectos." },
        { status: respuesta.status },
      );
    }

    if (!tokens.access || !tokens.refresh) {
      console.error("Respuesta JWT incompleta:", tokens);

      return NextResponse.json(
        { error: "La API devolvió una respuesta de autenticación inválida." },
        { status: 502 },
      );
    }

    const response = NextResponse.json({
      message: "Inicio de sesión exitoso.",
    });

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("access_token", tokens.access, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    response.cookies.set("refresh_token", tokens.refresh, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Error interno en /api/auth/login:", error);

    return NextResponse.json(
      { error: "No se pudo conectar con el servidor." },
      { status: 500 },
    );
  }
}
