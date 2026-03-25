# 📋 Pensionados MX v22

App web progresiva (PWA) para gestión de beneficiarios de programas sociales. Funciona **100% sin internet** después de la primera carga, y se puede instalar en cualquier dispositivo como app nativa.

---

## 📱 Compatibilidad

| Dispositivo | Estado |
|-------------|--------|
| iPhone / Safari iOS 15+ | ✅ Completo |
| iPhone / Safari iOS 14 | ✅ Con fallback |
| Android / Chrome | ✅ Completo |
| Android / Firefox | ✅ Completo |
| iPad | ✅ Completo |
| Desktop (Chrome, Edge, Firefox, Safari) | ✅ Completo |

---

## 🗂️ Archivos del proyecto

```
/
├── index.html      → App completa (HTML + CSS + JS en un solo archivo)
├── sw.js           → Service Worker para modo offline
├── manifest.json   → Configuración PWA (nombre, iconos, colores)
├── icon-192.png    → Ícono 192×192 px
├── icon-512.png    → Ícono 512×512 px
└── .gitignore
```

---

## 🚀 Cómo publicar en GitHub Pages

1. Sube estos archivos a un repositorio en GitHub
2. Ve a **Settings → Pages**
3. En **Source**, selecciona `main` y carpeta `/ (root)`
4. Guarda — en unos segundos tendrás una URL del tipo:
   `https://tuusuario.github.io/pensionados-mx/`
5. Abre esa URL en tu iPhone y toca **"Agregar a pantalla de inicio"**

---

## 🔧 Mejoras incluidas en v22

- **IndexedDB** para almacenamiento de datos (sin límite de 5MB de iOS)
- **Fix de teclado iOS** — la barra inferior ya no se desacomoda al escribir
- **`100dvh`** — la pantalla ya no se corta por la barra de Safari
- **Service Worker sincronizado** — detecta actualizaciones automáticamente
- **Barra de "Nueva versión disponible"** con botón para actualizar
- **Blur reducido** en iPhones lentos para evitar congelamiento
- **Doble respaldo** de datos: IndexedDB principal + localStorage como copia

---

## 💾 Almacenamiento de datos

Los datos se guardan **localmente en el dispositivo** usando IndexedDB. No se envía nada a ningún servidor. Para hacer respaldo manual, usa el botón **"Exportar JSON"** dentro de la app.

---

## 🔄 Cómo actualizar la app

Cuando hagas cambios al código:
1. Cambia `CACHE_NAME` en `sw.js` a la siguiente versión (ej. `pensionados-v23`)
2. Actualiza el `<title>` en `index.html`
3. Sube los archivos al repositorio
4. La próxima vez que el usuario abra la app, verá la barra azul de actualización

---

## 📲 Instalar en iPhone

1. Abre Safari y ve a la URL de GitHub Pages
2. Toca el botón de compartir (cuadro con flecha)
3. Selecciona **"Agregar a pantalla de inicio"**
4. La app queda instalada como ícono nativo

> **Importante:** En iPhone, la app debe instalarse desde **Safari** (no Chrome ni otro navegador) para funcionar correctamente como PWA.
