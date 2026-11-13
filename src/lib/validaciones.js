import { z } from "zod";

export const esquemaLogin = z.object({
  username: z.string().min(1, "Ingresá tu usuario"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

export const esquemaRegistro = z
  .object({
    nombre: z.string().trim().min(2, "Ingresá tu nombre."),
    apellido: z.string().trim().min(2, "Ingresá tu apellido."),
    email: z.string().trim().email("Ingresá un correo válido."),
    dni: z
      .string()
      .trim()
      .min(7, "El DNI debe tener al menos 7 caracteres.")
      .max(20, "El DNI no puede superar los 20 caracteres."),
    telefono: z.string().trim().min(6, "Ingresá un teléfono válido."),
    direccion: z.string().trim().min(5, "Ingresá tu dirección."),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
    confirmarPassword: z.string().min(1, "Confirmá tu contraseña."),
  })
  .refine((datos) => datos.password === datos.confirmarPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarPassword"],
  });

// Convierte los campos numéricos y rechaza valores vacíos.
const numeroObligatorio = z.preprocess(
  (valor) =>
    valor === "" || valor === null || valor === undefined
      ? Number.NaN
      : Number(valor),
  z.number(),
);

export const esquemaAnteojo = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(160, "El nombre no puede superar los 160 caracteres"),

  sku: z
    .string()
    .trim()
    .min(1, "El SKU es obligatorio")
    .max(50, "El SKU no puede superar los 50 caracteres"),

  marca: z.number().int().positive("Seleccioná una marca"),

  categoria: z.number().int().positive("Seleccioná una categoría"),

  material: z.number().int().positive("Seleccioná un material"),

  tipos_lente: z
    .array(z.number().int().positive())
    .min(1, "Seleccioná al menos un tipo de lente"),

  forma: z.string().min(1, "Seleccioná una forma"),

  genero: z.string().min(1, "Seleccioná un género"),

  color_marco: z.string().trim().min(1, "Ingresá el color del marco"),

  color_lente: z.string().trim().min(1, "Ingresá el color del lente"),

  precio: numeroObligatorio.pipe(
    z.number().positive("El precio debe ser mayor a cero"),
  ),

  stock: numeroObligatorio.pipe(
    z
      .number()
      .int("El stock debe ser un número entero")
      .min(0, "El stock no puede ser negativo"),
  ),

  activo: z.boolean(),
  destacado: z.boolean(),

  descripcion: z.string(),
});
