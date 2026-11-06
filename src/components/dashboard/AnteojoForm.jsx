"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { crearAnteojo, actualizarAnteojo } from "@/services/anteojos";

import { obtenerCatalogos } from "@/services/catalogos";

// Convierte los campos numéricos y rechaza valores vacíos.
const numeroObligatorio = z.preprocess(
  (valor) =>
    valor === "" || valor === null || valor === undefined
      ? Number.NaN
      : Number(valor),
  z.number(),
);

const esquemaAnteojo = z.object({
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

const valoresIniciales = {
  nombre: "",
  sku: "",
  marca: 0,
  categoria: 0,
  material: 0,
  tipos_lente: [],
  forma: "",
  genero: "",
  color_marco: "",
  color_lente: "",
  precio: "",
  stock: "",
  activo: true,
  destacado: false,
  descripcion: "",
};

const formas = [
  "Redondo",
  "Rectangular",
  "Aviador",
  "Cat Eye",
  "Wayfarer",
  "Hexagonal",
  "Otro",
];

const generos = ["Unisex", "Hombre", "Mujer", "Niños"];

const clasesCampo =
  "w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#855230]";

const clasesEtiqueta =
  "mb-2 block text-xs font-semibold uppercase tracking-wider";

export default function AnteojoForm({ anteojo = null }) {
  const router = useRouter();

  const [catalogos, setCatalogos] = useState(null);
  const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
  const [errorCatalogos, setErrorCatalogos] = useState("");
  const [errorFormulario, setErrorFormulario] = useState("");
  const [guardando, setGuardando] = useState(false);

  const esEdicion = Boolean(anteojo?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaAnteojo),
    defaultValues: valoresIniciales,
  });

  // Cargar catálogos desde el backend.
  useEffect(() => {
    let cancelado = false;

    async function cargarCatalogos() {
      try {
        const datos = await obtenerCatalogos();

        if (!cancelado) {
          setCatalogos(datos);
        }
      } catch (error) {
        if (!cancelado) {
          setErrorCatalogos(error.message);
        }
      } finally {
        if (!cancelado) {
          setCargandoCatalogos(false);
        }
      }
    }

    cargarCatalogos();

    return () => {
      cancelado = true;
    };
  }, []);

  // Cargar los datos existentes cuando se edita.
  useEffect(() => {
    if (!anteojo) return;

    reset({
      ...valoresIniciales,
      ...anteojo,
      marca: Number(anteojo.marca),
      categoria: Number(anteojo.categoria),
      material: Number(anteojo.material),
      tipos_lente: (anteojo.tipos_lente || []).map(Number),
      precio: String(anteojo.precio ?? ""),
      stock: String(anteojo.stock ?? ""),
    });
  }, [anteojo, reset]);

  // Crear o actualizar el anteojo.
  async function guardarAnteojo(datos) {
    setGuardando(true);
    setErrorFormulario("");

    try {
      const datosApi = {
        ...datos,
        precio: Number(datos.precio),
        stock: Number(datos.stock),
      };

      if (esEdicion) {
        await actualizarAnteojo(anteojo.id, datosApi);
      } else {
        await crearAnteojo(datosApi);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setErrorFormulario(error.message);
    } finally {
      setGuardando(false);
    }
  }

  if (cargandoCatalogos) {
    return (
      <p className="py-8 text-sm text-[#444748]">
        Cargando opciones del formulario...
      </p>
    );
  }

  if (errorCatalogos) {
    return (
      <p role="alert" className="py-8 text-sm text-red-700">
        {errorCatalogos}
      </p>
    );
  }

  if (!catalogos) return null;

  return (
    <form onSubmit={handleSubmit(guardarAnteojo)} className="space-y-8">
      {/* INFORMACIÓN GENERAL */}
      <section>
        <h2 className="mb-5 text-lg font-bold uppercase">
          Información general
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={clasesEtiqueta}>Nombre</label>

            <input {...register("nombre")} className={clasesCampo} />

            {errors.nombre && (
              <p className="mt-1 text-xs text-red-600">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={clasesEtiqueta}>SKU</label>

            <input {...register("sku")} className={clasesCampo} />

            {errors.sku && (
              <p className="mt-1 text-xs text-red-600">{errors.sku.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={clasesEtiqueta}>Descripción</label>

            <textarea
              {...register("descripcion")}
              rows={3}
              className={clasesCampo}
            />
          </div>
        </div>
      </section>

      {/* CLASIFICACIÓN */}
      <section>
        <h2 className="mb-5 text-lg font-bold uppercase">Clasificación</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              nombre: "marca",
              etiqueta: "Marca",
              opciones: catalogos.marcas,
            },
            {
              nombre: "categoria",
              etiqueta: "Categoría",
              opciones: catalogos.categorias,
            },
            {
              nombre: "material",
              etiqueta: "Material",
              opciones: catalogos.materiales,
            },
          ].map((campo) => (
            <div key={campo.nombre}>
              <label className={clasesEtiqueta}>{campo.etiqueta}</label>

              <select
                {...register(campo.nombre, {
                  valueAsNumber: true,
                })}
                className={clasesCampo}
              >
                <option value={0}>Seleccionar...</option>

                {campo.opciones.map((opcion) => (
                  <option key={opcion.id} value={opcion.id}>
                    {opcion.nombre}
                  </option>
                ))}
              </select>

              {errors[campo.nombre] && (
                <p className="mt-1 text-xs text-red-600">
                  {errors[campo.nombre].message}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className={clasesEtiqueta}>Tipos de lente</label>

            <select
              multiple
              className={`${clasesCampo} min-h-36`}
              {...register("tipos_lente", {
                setValueAs: (valores) =>
                  Array.isArray(valores) ? valores.map(Number) : [],
              })}
            >
              {catalogos["tipos-lente"].map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre} (+${tipo.precio_adicional})
                </option>
              ))}
            </select>

            <p className="mt-1 text-xs text-[#666]">
              Mantené presionada la tecla Ctrl para seleccionar varias opciones.
            </p>

            {errors.tipos_lente && (
              <p className="mt-1 text-xs text-red-600">
                {errors.tipos_lente.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section>
        <h2 className="mb-5 text-lg font-bold uppercase">Características</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={clasesEtiqueta}>Forma</label>

            <select {...register("forma")} className={clasesCampo}>
              <option value="">Seleccionar...</option>

              {formas.map((forma) => (
                <option key={forma} value={forma}>
                  {forma}
                </option>
              ))}
            </select>

            {errors.forma && (
              <p className="mt-1 text-xs text-red-600">
                {errors.forma.message}
              </p>
            )}
          </div>

          <div>
            <label className={clasesEtiqueta}>Género</label>

            <select {...register("genero")} className={clasesCampo}>
              <option value="">Seleccionar...</option>

              {generos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))}
            </select>

            {errors.genero && (
              <p className="mt-1 text-xs text-red-600">
                {errors.genero.message}
              </p>
            )}
          </div>

          <div>
            <label className={clasesEtiqueta}>Color del marco</label>

            <input {...register("color_marco")} className={clasesCampo} />

            {errors.color_marco && (
              <p className="mt-1 text-xs text-red-600">
                {errors.color_marco.message}
              </p>
            )}
          </div>

          <div>
            <label className={clasesEtiqueta}>Color del lente</label>

            <input {...register("color_lente")} className={clasesCampo} />

            {errors.color_lente && (
              <p className="mt-1 text-xs text-red-600">
                {errors.color_lente.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* COMERCIALIZACIÓN */}
      <section>
        <h2 className="mb-5 text-lg font-bold uppercase">Comercialización</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={clasesEtiqueta}>Precio</label>

            <input
              type="number"
              step="0.01"
              min="0.01"
              {...register("precio")}
              className={clasesCampo}
            />

            {errors.precio && (
              <p className="mt-1 text-xs text-red-600">
                {errors.precio.message}
              </p>
            )}
          </div>

          <div>
            <label className={clasesEtiqueta}>Stock</label>

            <input
              type="number"
              min="0"
              step="1"
              {...register("stock")}
              className={clasesCampo}
            />

            {errors.stock && (
              <p className="mt-1 text-xs text-red-600">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-8">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("activo")} />
            Activo
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("destacado")} />
            Destacado
          </label>
        </div>
      </section>

      {/* ERRORES Y ACCIONES */}
      {errorFormulario && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorFormulario}
        </p>
      )}

      <div className="flex flex-wrap gap-4 border-t border-black/10 pt-6">
        <button
          type="submit"
          disabled={guardando}
          className="bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#855230] disabled:opacity-50"
        >
          {guardando
            ? "Guardando..."
            : esEdicion
              ? "Guardar cambios"
              : "Crear anteojo"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="border border-black/20 px-8 py-3 text-xs font-semibold uppercase tracking-widest"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
