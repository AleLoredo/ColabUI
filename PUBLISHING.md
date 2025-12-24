# Publicación en Chrome Web Store

## Pasos para actualizar y reenviar

### 1. Preparar el Paquete
1.  Asegúrate de tener la última versión del código (con los arreglos de `manifest.json` y logs).
2.  Comprime los siguientes archivos en un archivo ZIP (`ColabUI-0.1.0.zip`):
    *   `manifest.json`
    *   `popup.html`
    *   `popup.js`
    *   `content.js`
    *   `styles.css`
    *   Iconos (`icon16.png`, `icon32.png`, `icon48.png`, `icon128.png` - si existen)
    *   **NO** incluyas: `.git`, `.gitignore`, `README.md`, `PUBLISHING.md`, `task.md`, ni capturas de pantalla.

### 2. Subir a Developer Dashboard
1.  Ve al [Panel de control para desarrolladores de Chrome](https://chrome.google.com/webstore/dev/dashboard).
2.  Selecciona el ítem **ColabUI** (ID: `oejjfkjlaaojhbfpkkdacdofikgecfga`).
3.  Ve a **Paquete** (Package) en el menú izquierdo.
4.  Haz clic en **Subir nuevo paquete** (Upload new package).
5.  Sube el archivo `ColabUI-0.1.0.zip` recién creado.

### 3. Justificación de Permisos (IMPORTANTE)
El rechazo anterior se debió al permiso `storage`. Ahora que el uso es explícito, debes comunicarlo si te lo solicitan o en la sección de "Privacy".

1.  Ve a la pestaña **Privacidad** (Privacy).
2.  En la sección **Justificación de permisos** (Permissions justification):
    *   **storage**: Escribe algo como: *"The extension allows users to toggle UI optimizations on/off. This preference is persisted using `chrome.storage.local` so it applies automatically on future visits. We have added console logs (`ColabUI Popup: Saved...`) in this version to demonstrate this usage during review."*

### 4. Enviar a Revisión
1.  Haz clic en **Enviar a revisión** (Submit for review).
