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

    const respuesta = await fetch(`${process.env.API_BASE_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    const tokens = await respuesta.json();

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: "Usuario o contraseña incorrectos." },
        { status: respuesta.status },
      );
    }

    if (!tokens.access || !tokens.refresh) {
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
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor." },
      { status: 500 },
    );
  }
}
