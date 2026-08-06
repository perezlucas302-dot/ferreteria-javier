# Ferretería Javier

Sitio web de la ferretería: landing pública con pedido de presupuesto por WhatsApp, más una herramienta interna para armar presupuestos en mostrador.

## Estructura del proyecto

```
ferreteria-javier/
├── index.html              # Entrada de la app React (sitio público)
├── public/
│   ├── images/             # Assets estáticos (logo, fotos del hero, etc.)
│   │   └── logo.png
│   └── tools/              # Herramientas internas (HTML standalone, no React)
│       └── presupuesto.html
├── src/
│   ├── App.jsx             # Landing completa (nav, hero, presupuesto, footer)
│   ├── main.jsx            # Punto de entrada React
│   └── index.css           # Estilos globales (Tailwind)
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala dependencias (primera vez o tras clonar) |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila para producción |
| `npm run preview` | Preview de la build de producción |
| `npm run lint` | Revisa el código con ESLint |

## URLs en desarrollo

Con `npm run dev` (por defecto `http://localhost:5173`):

| URL | Qué es |
|-----|--------|
| `/` | Sitio público (React) |
| `/tools/presupuesto.html` | Herramienta interna de presupuestos (Firebase + impresión) |

## Imágenes del hero

Colocar en `public/images/`:

- `entrada-afuera.jpg` — foto exterior (fade out al hacer scroll)
- `entrada-adentro.jpg` — foto interior (fade in al hacer scroll)

## Deploy

Producción: [ferreteria-javier.vercel.app](https://ferreteria-javier.vercel.app)

Tras mover el logo a `public/images/`, la preview de WhatsApp/redes usa:

`https://ferreteria-javier.vercel.app/images/logo.png`
