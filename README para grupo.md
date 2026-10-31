# Extreme Optics — Frontend

**Última actualización: 31 de octubre de 2026**

Aplicación web de una óptica, desarrollada como parte del Examen Final Integrador 2026 de Programación III. El frontend utiliza Next.js con App Router y está destinado a consumir la API REST Django + Django REST Framework del grupo de Ingeniería de Software.

## Estado actual

El proyecto se encuentra en la etapa de estructura y navegación. Las páginas muestran contenido inicial; todavía no consumen la API desde el frontend.

- Home con componente Hero de estilo editorial, fondo crema y tipografía negra.
- Navbar reutilizable incluido en el layout raíz.
- Navegación interna con Link de Next.js.
- Páginas iniciales de catálogo, categorías, contacto, panel, login y registro.
- Ruta dinámica de detalle de anteojo.
- Estructura propuesta para la ruta dinámica de edición dentro del panel, pendiente de confirmar en el repositorio.
- Espacios reservados para las fotografías del Hero.

Las páginas de login y registro son únicamente visuales. El panel todavía no tiene protección ni operaciones de administración implementadas.

## Tecnologías

- Next.js con App Router.
- React y JavaScript.
- JSX para componentes y nuevas páginas.
- Tailwind CSS.
- ESLint.
- Git y GitHub.

React Hook Form, Zod y Vitest forman parte de los requisitos pendientes de incorporar.

## Instalación y ejecución local

Se requiere Node.js y npm compatibles con la versión de Next.js declarada en package.json.

```bash
git clone git@github.com:Magucero/extremeOptics.git
cd extremeOptics
npm install
npm run dev
```

Abrir http://localhost:3000 o la dirección indicada por la terminal.

Si el proyecto ya está clonado, ejecutar los comandos de instalación y arranque desde su carpeta local.

## Rutas

| Ruta | Propósito | Estado |
| --- | --- | --- |
| `/` | Inicio con Hero | Implementada visualmente |
| `/anteojos` | Catálogo | Estructura inicial |
| `/categorias` | Categorías del catálogo | Estructura inicial |
| `/contacto` | Información de contacto | Estructura inicial |
| `/dashboard` | Panel de administración | Estructura inicial, sin protección |
| `/login` | Inicio de sesión | Sin formulario funcional |
| `/registro` | Registro de usuarios | Sin formulario funcional |
| `/anteojos/[id]` | Detalle de un anteojo | Muestra el parámetro de la URL |
| `/dashboard/anteojos/[id]/editar` | Edición de un anteojo | Estructura indicada, pendiente de confirmar |

Ejemplo de ruta dinámica: `/anteojos/1`. La página lee el ID de la URL, pero todavía no comprueba la existencia del producto en el backend.

## Estructura principal

```text
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   ├── anteojos/
│   │   ├── page.jsx
│   │   └── [id]/
│   │       └── page.jsx
│   ├── categorias/
│   │   └── page.jsx
│   ├── contacto/
│   │   └── page.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   ├── login/
│   │   └── page.jsx
│   └── registro/
│       └── page.jsx
└── components/
    ├── Navbar.jsx
    └── Hero.jsx
```

La estructura refleja los archivos trabajados hasta esta fecha. La ruta de edición se incorporará o confirmará en el próximo avance.

## Backend

Repositorio de la API del grupo: https://github.com/lneira1754/EFI_ING_API

La API se levantó localmente, se aplicaron las migraciones y se cargaron los datos de prueba. Se comprobó una respuesta exitosa del listado de anteojos con seis productos y la obtención de tokens de acceso y renovación. Estas comprobaciones se realizaron directamente contra el backend; la integración con el frontend sigue pendiente.

Dirección de desarrollo: http://127.0.0.1:8000

Documentación Swagger local: http://127.0.0.1:8000/api/docs/

### Endpoints relevantes

| Método | Endpoint | Uso previsto |
| --- | --- | --- |
| GET | `/api/anteojos/` | Listado paginado y filtrado |
| GET | `/api/anteojos/{id}/` | Detalle |
| POST | `/api/anteojos/` | Creación |
| PATCH | `/api/anteojos/{id}/` | Edición |
| DELETE | `/api/anteojos/{id}/` | Eliminación |
| GET | `/api/anteojos/destacados/` | Destacados del home |
| GET | `/api/categorias/` | Categorías |
| GET | `/api/marcas/` | Marcas |
| GET | `/api/materiales/` | Materiales |
| GET | `/api/tipos-lente/` | Tipos de lente |
| POST | `/api/token/` | Login JWT |
| POST | `/api/token/refresh/` | Renovación del token |

El endpoint de registro no figura en el README recibido del backend y debe verificarse antes de implementar el formulario.

### Formato del catálogo verificado

La respuesta del listado contiene `count`, `next`, `previous` y `results`. Cada producto incluye marca, categoría y material como objetos anidados; tipos de lente e imágenes como listas; precio como texto decimal; y stock como número.

## Variables de entorno

Todavía no se configuró el consumo de la API desde el frontend. Se documentarán el nombre y el uso de la variable de URL base cuando se implemente la integración. Las páginas iniciales no requieren credenciales del backend.

## Próximos pasos

- Confirmar la segunda ruta dinámica y agregar un layout anidado para el dashboard.
- Incorporar estados de carga, error y página no encontrada.
- Completar las imágenes e identidad visual del home.
- Integrar catálogo, detalle, búsqueda y filtros con la API.
- Crear formularios con React Hook Form y Zod.
- Implementar el CRUD de anteojos.
- Agregar autenticación, cierre de sesión y permisos.
- Incorporar Context API y alcanzar el mínimo de ocho componentes reutilizables.
- Configurar Vitest y al menos cuatro tests unitarios.
- Publicar la API y el frontend, y configurar producción.
- Completar tablero Kanban, integrantes, capturas y enlaces de entrega.

## Tests

Vitest aún no está configurado. El comando `npm run test` se agregará junto con las pruebas unitarias.

## Organización del trabajo

El flujo requerido por la consigna utiliza `main`, `develop` y ramas `feature/*`, con commits descriptivos y pull requests. Su configuración y uso en equipo están pendientes de confirmar.

- Repositorio frontend: https://github.com/Magucero/extremeOptics
- Tablero Kanban: pendiente.
- Aplicación desplegada: pendiente.
- Capturas de pantalla: pendientes.

## Integrantes

Pendiente de completar con los nombres y apellidos de todos los integrantes del grupo.

## Fechas de entrega

- Backend — Ingeniería de Software: 2 de noviembre de 2026.
- Frontend — Programación III: 5 de noviembre de 2026.
- Defensa oral: a coordinar a partir de la entrega.
