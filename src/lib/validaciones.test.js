import { describe, it, expect } from "vitest";
import {
  esquemaLogin,
  esquemaRegistro,
  esquemaAnteojo,
} from "@/lib/validaciones";

const mensajes = (resultado) => resultado.error.issues.map((i) => i.message);

const registroValido = {
  nombre: "Ana",
  apellido: "García",
  email: "ana@example.com",
  dni: "30123456",
  telefono: "3584123456",
  direccion: "Sobremonte 123",
  password: "secreta123",
  confirmarPassword: "secreta123",
};

const anteojoValido = {
  nombre: "Brooklyn Carey",
  sku: "SOL-BRK-001",
  marca: 1,
  categoria: 2,
  material: 1,
  tipos_lente: [1],
  forma: "Redondo",
  genero: "Unisex",
  color_marco: "Carey",
  color_lente: "Negro",
  precio: "45000.50",
  stock: "10",
  activo: true,
  destacado: false,
  descripcion: "",
};

describe("esquemaLogin", () => {
  it("rechaza usuario y contraseña vacíos con un mensaje por campo", () => {
    const resultado = esquemaLogin.safeParse({ username: "", password: "" });

    expect(resultado.success).toBe(false);
    expect(mensajes(resultado)).toEqual([
      "Ingresá tu usuario",
      "Ingresá tu contraseña",
    ]);
  });
});

describe("esquemaRegistro", () => {
  it("marca el error en confirmarPassword cuando las contraseñas no coinciden", () => {
    const resultado = esquemaRegistro.safeParse({
      ...registroValido,
      confirmarPassword: "otraClave123",
    });

    expect(resultado.success).toBe(false);
    expect(resultado.error.issues[0]).toMatchObject({
      path: ["confirmarPassword"],
      message: "Las contraseñas no coinciden.",
    });
  });
});

describe("esquemaAnteojo", () => {
  it("convierte a número el precio y el stock que llegan como texto del formulario", () => {
    const resultado = esquemaAnteojo.safeParse(anteojoValido);

    expect(resultado.success).toBe(true);
    expect(resultado.data.precio).toBe(45000.5);
    expect(resultado.data.stock).toBe(10);
  });

  it("rechaza precio vacío, stock negativo y la falta de tipos de lente", () => {
    const resultado = esquemaAnteojo.safeParse({
      ...anteojoValido,
      precio: "",
      stock: "-3",
      tipos_lente: [],
    });

    expect(resultado.success).toBe(false);
    const campos = resultado.error.issues.map((i) => i.path[0]);
    expect(campos).toEqual(
      expect.arrayContaining(["precio", "stock", "tipos_lente"]),
    );
    expect(mensajes(resultado)).toContain("El stock no puede ser negativo");
  });
});
