# 05 - Requerimientos No Funcionales

Lista completa de los 19 requerimientos no funcionales de FemBloom.

---

## RNF-001 — Seguridad de la plataforma

**Descripción:** Medidas robustas contra accesos no autorizados, ataques y vulnerabilidades.

**Categoría:** Seguridad

**Criterios:**
- HTTPS con TLS 1.2 o superior en todas las comunicaciones
- Contraseñas con hashing (bcrypt o Argon2)
- Protección contra OWASP Top 10
- Tokens JWT con expiración
- Políticas CORS estrictas

**Prioridad:** Alta

---

## RNF-002 — Protección de datos personales

**Descripción:** Recolección, almacenamiento y tratamiento seguro y transparente.

**Categoría:** Privacidad / Seguridad

**Criterios:**
- Consentimiento explícito en recolección
- Política de privacidad clara y accesible
- Exportación y eliminación de datos por la usuaria
- Sin compartir con terceros sin consentimiento
- Logs de acceso a datos sensibles

**Prioridad:** Alta

---

## RNF-003 — Privacidad de información médica y reproductiva

**Descripción:** Encriptación en reposo y en tránsito de datos de salud.

**Categoría:** Privacidad

**Criterios:**
- Encriptación AES-256 (o equivalente) en PostgreSQL
- Solo la usuaria autenticada accede a sus datos
- Sin anuncios personalizados basados en salud
- Anonimización en análisis estadísticos
- Acceso técnico bajo protocolo documentado

**Prioridad:** Alta

---

## RNF-004 — Rendimiento del sistema

**Descripción:** Tiempos de respuesta óptimos bajo uso normal y pico.

**Categoría:** Rendimiento

**Criterios:**
- Páginas principales cargan en menos de 2 segundos (4G)
- Lecturas de datos en menos de 1 segundo
- Soporta 500 usuarias concurrentes
- Escrituras en menos de 500 ms
- API responde en menos de 300 ms

**Prioridad:** Alta

---

## RNF-005 — Disponibilidad de la plataforma

**Descripción:** Alta disponibilidad del servicio.

**Categoría:** Disponibilidad

**Criterios:**
- Disponibilidad mínima 99.5% mensual (SLA)
- Mantenimiento no excede 2 horas/mes con aviso
- Monitoreo activo 24/7
- Incidentes críticos resueltos en menos de 4 horas
- Mecanismo de failover

**Prioridad:** Alta

---

## RNF-006 — Escalabilidad

**Descripción:** Arquitectura escalable horizontalmente.

**Categoría:** Escalabilidad

**Criterios:**
- Escalado horizontal con contenedores (Docker/Kubernetes)
- Particionamiento y réplicas de lectura en PostgreSQL
- Frontend en CDN
- Escala de 500 a 5,000 usuarias sin cambios de código
- Caché (Redis o similar) para datos frecuentes

**Prioridad:** Alta

---

## RNF-007 — Compatibilidad móvil y web

**Descripción:** Funciona en navegadores modernos y dispositivos móviles.

**Categoría:** Compatibilidad

**Criterios:**
- Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Android 10+ e iOS 14+
- Pantallas de 320px a 2560px
- Sin plugins ni extensiones
- Notificaciones push compatibles con Web Push API

**Prioridad:** Alta

---

## RNF-008 — Accesibilidad

**Descripción:** Cumple con estándares WCAG para usuarias con discapacidades.

**Categoría:** Accesibilidad

**Criterios:**
- Cumple WCAG 2.1 nivel AA
- Navegable por teclado
- Textos alternativos en imágenes
- Contraste mínimo 4.5:1
- Formularios con etiquetas y errores claros

**Prioridad:** Media

---

## RNF-009 — Usabilidad

**Descripción:** Intuitiva, fácil de aprender, agradable.

**Categoría:** Usabilidad

**Criterios:**
- Registro de primer ciclo en menos de 3 minutos sin ayuda
- Tasa de abandono en registro menor al 15%
- Máximo 3 niveles de navegación
- Ayuda contextual en funciones complejas
- Flujos principales en máximo 3 clics/toques

**Prioridad:** Alta

---

## RNF-010 — Mantenibilidad

**Descripción:** Código estructurado, documentado y organizado.

**Categoría:** Mantenibilidad

**Criterios:**
- Convenciones ESLint y Prettier aplicadas en CI
- Cobertura de tests mínimo 70% en módulos críticos
- Backend organizado en módulos por dominio
- Tests automatizados antes de merge
- Documentación de API (OpenAPI/Swagger)

**Prioridad:** Media

---

## RNF-011 — Respaldo y recuperación de datos

**Descripción:** Estrategia robusta de backups y recuperación.

**Categoría:** Disponibilidad / Seguridad

**Criterios:**
- Respaldo automático mínimo diario
- Almacenado en nube externa
- RTO menor o igual a 4 horas
- RPO menor o igual a 24 horas
- Conservación mínima 30 días
- Pruebas de recuperación trimestrales

**Prioridad:** Alta

---

## RNF-012 — Autenticación con Google OAuth

**Descripción:** Integración OAuth 2.0 segura.

**Categoría:** Seguridad

**Criterios:**
- OAuth 2.0 con Authorization Code + PKCE
- Tokens no almacenados en frontend
- Validación de estado para prevenir CSRF
- Solo scopes mínimos: perfil y correo
- Invalidación al revocar acceso desde Google

**Prioridad:** Alta

---

## RNF-013 — Tiempo de respuesta

**Descripción:** Respuestas percibidas como inmediatas.

**Categoría:** Rendimiento

**Criterios:**
- TTFB menor a 800 ms
- LCP menor a 2.5 segundos (Google Core Web Vitals)
- API REST menor a 300 ms en percentil 95
- Confirmación de registros en menos de 1 segundo
- PDF generado en menos de 10 segundos

**Prioridad:** Alta

---

## RNF-014 — Sistema de notificaciones

**Descripción:** Confiable, oportuno, respetuoso con privacidad.

**Categoría:** Rendimiento / Usabilidad

**Criterios:**
- Entrega con desfase máximo 5 minutos
- Soporta Web Push (Service Workers) y correo
- Solo con permiso explícito
- Personalizables por tipo
- Respeta modo discreto

**Prioridad:** Alta

---

## RNF-015 — Generación de reportes PDF

**Descripción:** Documentos de alta calidad y bien formateados.

**Categoría:** Rendimiento / Usabilidad

**Criterios:**
- Tamaño máximo 5 MB (hasta 6 meses)
- Generación en menos de 10 segundos
- Legible en cualquier visor estándar
- Encabezado con nombre, fechas, logo
- Tablas y gráficos claros, optimizados para impresión

**Prioridad:** Media

---

## RNF-016 — Integridad de la información

**Descripción:** Datos exactos, sin pérdidas ni inconsistencias.

**Categoría:** Integridad

**Criterios:**
- Transacciones ACID en PostgreSQL
- Consistencia entre calendario, historial y reportes
- Validación de entradas antes de persistir
- Sin guardado parcial en errores
- Recálculo de predicciones automático

**Prioridad:** Alta

---

## RNF-017 — Experiencia visual amigable y humanizada

**Descripción:** Identidad cálida, femenina, empática. No dashboard.

**Categoría:** Usabilidad / Diseño

**Criterios:**
- Paleta cálida: rosas, malvas, verdes suaves, blancos
- Sin tablas crudas ni gráficos fríos ni layouts corporativos
- Tipografías redondeadas y femeninas
- Íconos coherentes, originales, estilo orgánico
- Satisfacción visual mayor a 8/10 en pruebas

**Prioridad:** Alta

---

## RNF-018 — Diseño responsive

**Descripción:** Adaptación óptima a cualquier tamaño de pantalla.

**Categoría:** Compatibilidad / Diseño

**Criterios:**
- Funciona de 320px a 1920px
- Sin scroll horizontal
- Elementos táctiles mínimo 44x44 px
- Calendario y mapas táctiles
- Pruebas en al menos 5 tamaños representativos

**Prioridad:** Alta

---

## RNF-019 — Arquitectura tecnológica

**Descripción:** Next.js (frontend), Supabase (backend + datos), arquitectura modular.

**Categoría:** Mantenibilidad / Arquitectura

**Criterios:**
- Next.js 14+ con App Router, SSR y SSG
- Backend mediante API Routes con módulos por dominio
- Supabase como capa de datos y autenticación
- Comunicación frontend-backend vía API REST
- Despliegue automatizado en Vercel

**Prioridad:** Alta
