# OneMillion Frontend

Una aplicación React moderna y elegante construida con TypeScript, Tailwind CSS y las mejores prácticas de desarrollo.

## 🚀 Características

- **React 18** con TypeScript para un desarrollo robusto
- **Tailwind CSS** para un diseño hermoso y responsivo
- **React Router** para navegación fluida
- **Arquitectura limpia** con separación clara de responsabilidades
- **Componentes reutilizables** con sistema de diseño consistente
- **Hooks personalizados** para lógica compartida
- **Servicios API** con Axios para comunicación con el backend
- **Responsive design** optimizado para todos los dispositivos

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes UI básicos
│   └── layout/         # Componentes de layout
├── pages/              # Páginas de la aplicación
├── hooks/              # Hooks personalizados
├── services/           # Servicios y API
├── types/              # Definiciones de TypeScript
├── utils/              # Utilidades y helpers
└── context/            # Contextos de React
```

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework:** React 18
- **Lenguaje:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Icons:** Heroicons
- **Build Tool:** Vite
- **Linting:** ESLint
- **Package Manager:** npm

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd prueba-OneMillion-Frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño basado en Tailwind CSS con:

- **Paleta de colores personalizada** con variaciones primary y secondary
- **Componentes reutilizables** como Button, Input, Card, Modal
- **Utilidades CSS personalizadas** para casos de uso comunes
- **Animaciones fluidas** y transiciones suaves
- **Tipografía consistente** con la fuente Inter

## 🧱 Componentes Principales

### Componentes Common
- `Button` - Botón versátil con múltiples variantes
- `Input` - Campo de entrada con validación
- `Card` - Contenedor con diferentes estilos
- `Modal` - Diálogo modal accesible
- `Loading` - Indicadores de carga

### Componentes Layout
- `Layout` - Layout principal de la aplicación
- `Header` - Barra de navegación superior
- `Footer` - Pie de página

## 🔧 Configuración

### Variables de Entorno

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Environment
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0
```

### Tailwind CSS

El proyecto está configurado con Tailwind CSS y incluye:
- Colores personalizados
- Animaciones custom
- Componentes reutilizables
- Responsive design

## 📱 Páginas

- **HomePage** - Página de inicio con hero, características y testimonios
- **AboutPage** - Información sobre la empresa y equipo
- **ContactPage** - Formulario de contacto e información

## 🔌 API Integration

El proyecto incluye un servicio API configurado con:
- Interceptores para autenticación
- Manejo de errores
- Métodos CRUD genéricos
- Soporte para upload de archivos

## 🎯 Mejores Prácticas

- **TypeScript** para type safety
- **Componentes funcionales** con hooks
- **Props tipadas** para todos los componentes
- **Separación de lógica** en hooks personalizados
- **Código reutilizable** y modular
- **Naming conventions** consistentes

## 🚀 Deployment

Para hacer deploy de la aplicación:

1. Construye el proyecto:
```bash
npm run build
```

2. Los archivos estáticos se generarán en la carpeta `dist/`

3. Puedes servir estos archivos con cualquier servidor web estático

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- Email: soporte@onemillion.com
- Documentación: [docs.onemillion.com](https://docs.onemillion.com)

---

Hecho con ❤️ por el equipo de OneMillion
