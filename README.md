# flujo. — Guía de publicación

## Estructura del proyecto
```
flujo-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← Tu app principal
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## PASO 1 — Configura Lemon Squeezy (para cobrar)

Abre `src/App.jsx` y busca `LS_CONFIG` al inicio del archivo.
Reemplaza las URLs con las de tu cuenta:

```js
const LS_CONFIG = {
  monthly: {
    checkoutUrl: "https://TU_TIENDA.lemonsqueezy.com/checkout/buy/TU_VARIANT_ID",
    ...
  },
  ...
}
```

---

## PASO 2 — Sube el código a GitHub

1. Ve a https://github.com y crea una cuenta gratis
2. Clic en "New repository"
3. Nombre: `flujo-app` → clic "Create repository"
4. En la página del repo, clic en "uploading an existing file"
5. Arrastra TODOS los archivos de esta carpeta y súbelos
6. Clic "Commit changes"

---

## PASO 3 — Publica en Vercel

1. Ve a https://vercel.com y regístrate con tu cuenta de GitHub
2. Clic "Add New Project"
3. Selecciona el repo `flujo-app`
4. En "Framework Preset" selecciona **Vite**
5. Clic "Deploy" — espera ~2 minutos
6. ¡Tu app está viva en `flujo-app.vercel.app`!

---

## PASO 4 — Compra tu dominio

1. Ve a https://namecheap.com
2. Busca `useflujo.com` o `flujo.app` (~$10-15/año)
3. Compra y anota tu dominio

---

## PASO 5 — Conecta el dominio a Vercel

1. En Vercel → tu proyecto → "Settings" → "Domains"
2. Escribe tu dominio (ej: `useflujo.com`) → "Add"
3. Vercel te dará 2 registros DNS (tipo A y CNAME)
4. Ve a Namecheap → "Domain List" → "Manage" → "Advanced DNS"
5. Agrega los registros que te dio Vercel
6. Espera 5-30 minutos → ¡listo!

---

## PASO 6 — Conecta tu cuenta bancaria en Lemon Squeezy

1. En Lemon Squeezy → Settings → Payouts
2. Agrega tu cuenta bancaria en dólares
3. Los pagos llegarán cada 2 semanas automáticamente

---

## ¿Problemas?

- GitHub: https://docs.github.com/es
- Vercel: https://vercel.com/docs
- Lemon Squeezy: https://docs.lemonsqueezy.com
