# Extreme Optics — Guía de colaboración: registro de usuarios

**Fecha: 2 de noviembre de 2026**

Este archivo sirve para que un compañero continúe la creación de cuentas con su propia IA sin perder el contexto del equipo. Los prompts son instrucciones para copiar en otra conversación; no describen trabajo ya terminado.

## 1. Prompt para entender el proyecto

Copiá el siguiente bloque como primer mensaje y adjuntá o compartí los archivos actuales de ambos repositorios.

```text
Estamos desarrollando Extreme Optics, una web de óptica para el Examen Final Integrador 2026 de Programación III. Necesito que entiendas el proyecto antes de modificarlo. Trabajá paso a paso y esperá mi OK entre pasos.

FRONTEND
- Repositorio: https://github.com/Magucero/extremeOptics
- Next.js App Router, React, JavaScript, Tailwind CSS y ESLint.
- Las nuevas páginas y componentes usan .jsx; pueden seguir existiendo layout.js y page.js generados inicialmente. No crees duplicados .js/.jsx para la misma ruta.
- Estética editorial: fondo crema #fcf9f2, texto #1c1c18, acento marrón #855230, botones negros, títulos grandes en mayúsculas.
- Navbar compartido desde el layout raíz, con links a Inicio, Anteojos, Categorías, Contacto, Panel, Login y Registro.
- Rutas principales: /, /anteojos, /categorias, /contacto, /dashboard, /login y /registro.
- Catálogo anidado: /anteojos/sol, /anteojos/luz-azul, /anteojos/recetados.
- Detalle dinámico: /anteojos/[id].
- Administración: /dashboard/anteojos/nuevo y /dashboard/anteojos/[id]/editar. Son estructuras iniciales, no CRUD funcional.
- Layouts anidados de anteojos y dashboard.
- not-found.jsx global; loading.jsx y error.jsx en anteojos.
- Componentes trabajados: Navbar, Hero, AnteojoCard, BuscadorAnteojos y Paginacion. Revisá el repositorio para confirmar los archivos presentes.
- src/services/anteojos.js exporta obtenerAnteojos(filtros = {}) y obtenerAnteojoPorId(id). Usa fetch con cache: "no-store". El detalle devuelve null ante 404.
- src/services/categorias.js exporta obtenerCategorias().
- .env.local contiene API_BASE_URL=http://127.0.0.1:8000/api. Es una variable de servidor, sin prefijo NEXT_PUBLIC_. No se puede leer directamente desde componentes cliente.
- Ya funcionan listado real, fotos, detalle, 404 de producto inexistente, búsqueda por search, filtros por categoría y paginación del catálogo general.
- La búsqueda está a la derecha del título en escritorio, con aproximadamente la mitad del ancho del contenedor. Conservá ese diseño.
- Se muestran las categorías reales y sus descripciones. Quedó indicado agregar los botones "Ver colección"; confirmar si ese último cambio ya está aplicado en la rama que recibas.
- Login y registro todavía son páginas de estructura. No hay autenticación del frontend, contexto de sesión ni protección de rutas.
- Se propuso instalar react-hook-form, zod y @hookform/resolvers, pero NO se confirmó su instalación: revisá package.json antes de repetirla.

BACKEND
- Repositorio: https://github.com/lneira1754/EFI_ING_API
- Django + Django REST Framework. Servidor local en http://127.0.0.1:8000.
- Se levantó con uv, migraciones y cargar_datos. En la ejecución local observada se usó SQLite, aunque el README también describe PostgreSQL/Supabase y Docker.
- Dominio: catálogo (anteojos, marcas, categorías, materiales, tipos de lente e imágenes), clientes (perfil, profesionales, recetas y turnos) y ventas (pedidos y reseñas).
- GET /api/anteojos/ y GET /api/categorias/ devuelven {count,next,previous,results}.
- Categorías verificadas en esta base: id 1 Luz Azul, slug luz-azul; id 2 Sol, slug sol; id 3 Recetados, slug recetados. Esos IDs no son universales para todas las bases.
- El listado de anteojos devuelve relaciones anidadas, imágenes con imagen/es_modelo/orden y precio como texto decimal.
- Se corrigió AnteojoViewSet.get_serializer_class(): list y retrieve usan AnteojoListSerializer; las escrituras conservan AnteojoSerializer con IDs. El cambio se confirmó funcionando y fue commiteado y pusheado en feature/detalle-anteojos; NO se confirmó su merge a develop/main.
- EsAdminOSoloLectura protege la escritura del catálogo. No debilites ese permiso para facilitar el frontend.
- Login JWT probado: POST /api/token/ con {username,password} devuelve access y refresh.
- Renovación: POST /api/token/refresh/.
- El JWT observado incluye user_id, pero no is_staff ni rol. Falta confirmar un mecanismo para consultar identidad y permisos desde el frontend.
- GET/PATCH /api/clientes/me/ está documentado para perfil propio, pero no se confirmó que sirva para un administrador sin perfil Cliente.
- NO se confirmó un endpoint de registro público. No inventes /api/register/ ni supongas que POST /api/clientes/ permite registro anónimo: el README lo describe restringido.
- Documentación local: /api/docs/ y /api/schema/.

REQUISITOS DEL EXAMEN
- 6 rutas principales, 1 anidada, 2 dinámicas, Link, layout raíz y anidado; not-found/loading/error.
- 8 componentes reutilizables sin contar páginas, Server y Client Components justificados.
- CRUD de al menos un recurso, búsqueda/filtros y carga/error visibles.
- Login JWT, logout, token en escrituras y rutas protegidas.
- Al menos 2 formularios distintos con React Hook Form + Zod y resolver, errores de validación y API.
- Context API con createContext/useContext.
- Vitest y al menos 4 tests unitarios pasando.
- Despliegue público del front y API, variables de entorno de producción.
- Kanban con responsables, GitFlow main/develop/feature/*, commits y pull requests.
- README con instalación, variables, tests, enlaces, capturas e integrantes.
- Entrega backend: 2/11/2026. Frontend: 5/11/2026.

Primero revisá el código actual y presentá un resumen de lo confirmado y lo pendiente. No implementes ni asumas endpoints todavía. No modifiques catálogo, Hero o navegación sin necesidad para tu tarea.
```

## 2. Prompt para implementar el registro

Usá este bloque después de que la IA haya leído el contexto y el código actual.

```text
Tu tarea es implementar el registro público de clientes en Extreme Optics, integrado con nuestro backend Django y la página existente /registro. Vamos de a un paso y no avances al siguiente sin mi OK.

1. Relevamiento primero:
- Revisá URLs, serializers, vistas, modelo de usuario, Cliente y permisos del backend, y los archivos actuales del frontend.
- Confirmá si existe un endpoint de registro público y su contrato: URL, método, campos obligatorios, validaciones, respuesta y errores. No asumas que POST /api/clientes/ registra usuarios anónimos.
- Confirmá cómo se vincula User con Cliente y si hay signals que ya crean perfiles. Evitá perfiles duplicados.
- Mostrame lo encontrado antes de modificar código. Si no tenés acceso a los archivos, pedime solo los necesarios.

2. Backend, si el registro público todavía no existe:
- Proponé un contrato concreto para registrar un usuario normal y su perfil Cliente, usando los campos reales de los modelos. No impongas email como identificador: el login verificado utiliza username.
- Implementá creación atómica de User y Cliente según las relaciones existentes.
- Guardá la contraseña con create_user/set_password y aplicá los validadores de contraseña configurados en Django. No guardes ni registres contraseñas en texto plano.
- Validá unicidad y formatos según el modelo y la política real del proyecto. Devolvé errores claros por campo.
- No permitas que el registro público asigne is_staff, is_superuser, permisos o grupos privilegiados. Los nuevos registros son clientes sin privilegios administrativos.
- No cambies los permisos de las operaciones actuales de clientes o catálogo.
- No expongas password/password_hash en respuestas. Considerá las signals existentes y la documentación OpenAPI.
- Coordiná el cambio con el equipo de Back y entregalo en una rama feature con su PR; no publiques directo en main.

3. Frontend:
- Reutilizá /registro y creá un componente cliente RegistroForm.jsx; mantené la página como Server Component cuando no necesite interacción.
- Usá React Hook Form, Zod y @hookform/resolvers. Verificá si están instalados. Usá Controller cuando corresponda para cumplir el requisito docente de campos controlados.
- Definí las validaciones en un archivo separado, por ejemplo src/schemas/registroSchema.js, coherentes con el backend. Incluí confirmación de contraseña en el formulario y no la envíes si el contrato no la admite.
- Mostrá labels accesibles, mensajes junto a cada campo, errores de la API, estado de envío y confirmación de éxito. Evitá envíos duplicados mientras se procesa.
- Conservá fondo crema, tipografía y botones del proyecto. Mantené el link "Ya tengo cuenta" hacia /login.
- No uses localStorage como base de usuarios ni guardes contraseñas en el navegador.
- API_BASE_URL es privada del servidor: no la uses directamente en un componente cliente. Para el registro, preferí un Route Handler de Next.js (por ejemplo app/api/auth/registro/route.js) que llame desde el servidor al endpoint Django confirmado. El formulario llamará a esa ruta local. Reutilizá una arquitectura equivalente si el equipo ya la implementó.
- En el intermediario, enviá solo los campos admitidos, conservá los errores de validación útiles de Django y tratá fallos de red sin exponer detalles internos.
- Tras el éxito, indicá que la cuenta fue creada y ofrecé ir a /login. No implementes login automático ni almacenamiento de JWT sin coordinarlo con el responsable de sesión.

4. Verificación:
- Registro válido crea exactamente un usuario y un perfil sin privilegios, con contraseña hasheada y posibilidad de obtener tokens desde /api/token/.
- Contraseñas distintas, débiles, campos inválidos y duplicados muestran errores y no dejan usuarios/perfiles parciales.
- La UI maneja validaciones rechazadas por Django y backend no disponible; permite reintentar después del fallo.
- Intentar enviar campos administrativos no concede privilegios.
- Probá la validación Zod y las reglas del endpoint con tests útiles, usando la configuración de testing existente o coordinando su incorporación.

Entregá los archivos modificados, el contrato final del endpoint, instrucciones de prueba y variables necesarias. No incluyas contraseñas ni tokens reales en documentación o commits. No modifiques funciones que estén siendo trabajadas por otro compañero sin coordinar.

Empezá únicamente por el relevamiento del punto 1 y esperá mi OK.
```

## 3. Pasos pendientes del proyecto completo

El siguiente orden separa dependencias funcionales. El registro puede trabajarse en paralelo con el login si se acuerdan contratos y archivos.

| Paso | Trabajo pendiente | Criterio de cierre |
| --- | --- | --- |
| 1 | Guardar y compartir el avance actual mediante rama, commit y PR según el flujo del equipo. Confirmar merge del arreglo del detalle en Back. | Todos trabajan sobre una base compatible. |
| 2 | Confirmar botones de las categorías y navegación completa. | Todos los enlaces abren rutas existentes. |
| 3 | Acordar contrato del registro y fuente de identidad/permisos. | Campos, respuestas y errores documentados; registro no concede privilegios. |
| 4 | Implementar registro, tarea de esta guía. | Un cliente se registra y luego puede iniciar sesión. |
| 5 | Implementar login con RHF/Zod y JWT; decidir almacenamiento, expiración, renovación y logout. | Sesión funcional y errores visibles. |
| 6 | Incorporar Context API para información de sesión o tema. | createContext/useContext compartidos entre componentes cliente. |
| 7 | Proteger dashboard y escrituras; verificar identidad de administrador contra Back. | Sin sesión se redirige a login; un cliente no puede administrar. Django sigue validando permisos. |
| 8 | Revisar contrato de creación/edición de anteojos y cargar opciones de marcas, categorías, materiales y lentes. | Formularios basados en campos y valores reales, sin asumir serializers. |
| 9 | Implementar alta con RHF/Zod y token. | Producto persistido y visible en catálogo; errores de API visibles. |
| 10 | Implementar listado de gestión y edición real en la ruta dinámica existente. | Botón Editar por producto y cambios persistidos. |
| 11 | Implementar borrado con confirmación y token; manejar relaciones que impidan eliminar. | Eliminación comprobada o error claro sin romper la página. |
| 12 | Completar home, fotos y enlaces del Hero, identidad comercial y contacto real. | Sin enlaces a secciones inexistentes ni textos de ejemplo importantes. |
| 13 | Revisar paginación en las categorías de productos y de la página Categorías, según el volumen real; hoy solo se conectó la del catálogo general. | No se omiten resultados por mostrar solo la primera página. |
| 14 | Cubrir carga, errores y resultados vacíos en todas las consultas; agregar límites de error/carga para categorías si corresponde. | Backend caído o respuesta inválida produce una UI comprensible. |
| 15 | Revisar modularidad y contar al menos 8 componentes reutilizables, sin contar páginas ni asumir que archivos especiales suman al requisito. | Componentes con responsabilidad clara y explicación Server/Client. |
| 16 | Configurar Vitest y npm run test; escribir al menos 4 tests útiles. | Pruebas pasando y reproducibles. |
| 17 | Publicar Back y servir media en producción; configurar URL de API, CORS y hosts según arquitectura. | API e imágenes públicas, sin depender de localhost. |
| 18 | Publicar Front y verificar flujo completo en producción. | Catálogo, registro/login y CRUD funcionan desde la URL pública. |
| 19 | Completar Kanban, asignaciones, GitFlow, PR, README, integrantes, capturas y enlaces. | Entrega documentada y trazable. |
| 20 | Preparar defensa oral y revisión de R1–R8. | El grupo explica rutas, renderizado, validación, JWT, Context, tests y despliegue. |

## 4. Archivos y contratos para coordinar entre compañeros

- **Registro:** página /registro, RegistroForm, esquema y servicio de registro; Route Handler si se acuerda; endpoint Django de alta.
- **Sesión/login:** formulario de login, almacenamiento de tokens, renovación, logout, Context y consulta de identidad/permisos.
- **Administración:** formularios y servicios CRUD, opciones de catálogos auxiliares y protección del dashboard.
- **Diseño:** Navbar/Hero/layouts compartidos. Evitar cambios simultáneos sin acuerdo.

Trabajar con ramas feature/* sobre la rama de integración acordada (develop según la consigna). No asumir que existe o está actualizada: verificar antes. Excluir .env.local, entornos virtuales, node_modules, bases de datos locales y credenciales de los commits. Conservar archivos .env.example sin secretos cuando se documenten las variables.

## 5. Resumen para el compañero

Tu parte es **crear cuentas reales de cliente en Django desde el formulario /registro**, con RHF/Zod, validación en servidor y errores visibles. No es crear usuarios en localStorage. Antes de programar, confirmar el endpoint y acordar cómo convivirá con el login y la sesión que hará el equipo.
