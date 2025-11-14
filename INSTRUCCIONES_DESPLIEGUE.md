# 🚀 Instrucciones para Desplegar la Página

## Opción 1: Desplegar en Vercel (Recomendado - Más Fácil)

### Método A: Usando la Interfaz Web de Vercel (Sin instalar nada)

1. **Crear cuenta en Vercel:**
   - Ve a: https://vercel.com
   - Crea una cuenta gratuita (puedes usar GitHub, GitLab o email)

2. **Subir el proyecto:**
   - Una vez dentro de Vercel, haz clic en "Add New Project"
   - Selecciona "Upload" o "Import Git Repository"
   - Si usas "Upload", arrastra la carpeta `proyecto-cumple` completa
   - Si usas Git, conecta tu repositorio

3. **Configuración:**
   - Framework Preset: "Other" o "Static Site"
   - Root Directory: `proyecto-cumple` (si subiste todo el proyecto)
   - Build Command: (déjalo vacío o usa: `echo "No build needed"`)
   - Output Directory: `.` (punto)

4. **Desplegar:**
   - Haz clic en "Deploy"
   - ¡Listo! Tu página estará online en segundos

### Método B: Usando Vercel CLI (Requiere Node.js)

Si tienes Node.js instalado:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Navegar al proyecto
cd proyecto-cumple

# Desplegar
vercel

# Seguir las instrucciones en pantalla
```

## Opción 2: Desplegar en GitHub Pages (Gratis)

1. **Subir a GitHub:**
   - Crea un repositorio en GitHub
   - Sube todos los archivos de `proyecto-cumple`

2. **Activar GitHub Pages:**
   - Ve a Settings > Pages
   - Source: selecciona la rama `main` o `master`
   - Folder: `/ (root)`
   - Guarda

3. **Tu página estará en:**
   - `https://tu-usuario.github.io/nombre-repositorio/`

## Opción 3: Desplegar en Netlify (Gratis)

1. **Ve a:** https://www.netlify.com
2. **Crea cuenta gratuita**
3. **Arrastra la carpeta `proyecto-cumple`** a la zona de deploy
4. **¡Listo!** Tu página estará online

## Opción 4: Desplegar en Firebase Hosting

1. **Instala Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicializa Firebase:**
   ```bash
   cd proyecto-cumple
   firebase login
   firebase init hosting
   ```

3. **Despliega:**
   ```bash
   firebase deploy
   ```

## 📝 Notas Importantes

- ✅ El proyecto ya está configurado para Vercel (tiene `vercel.json`)
- ✅ No requiere compilación, es HTML/CSS/JS puro
- ✅ Todas las rutas están configuradas correctamente
- ✅ El login funciona con sessionStorage (no requiere backend)

## 🔗 Enlaces Útiles

- Vercel: https://vercel.com
- GitHub Pages: https://pages.github.com
- Netlify: https://www.netlify.com
- Firebase: https://firebase.google.com

---

**Recomendación:** Usa Vercel (Opción 1, Método A) - Es el más fácil y rápido, y tu proyecto ya está configurado para eso.

