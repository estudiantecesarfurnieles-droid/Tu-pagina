# 🚀 Instrucciones de Despliegue en Vercel - Sistema de Login con 2 Usuarios

## ✅ Lo que has hecho hasta ahora

Has actualizado tu proyecto con un **sistema de login que permite máximo 2 usuarios**. Los cambios incluyen:

### Archivos Actualizados:
- ✅ `index.html` - Ahora usa las APIs del backend
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `api/_auth_storage.py` - Sistema centralizado de autenticación
- ✅ `api/register.py` - API de registro (máximo 2 usuarios)
- ✅ `api/login.py` - API de login
- ✅ `api/check-user.py` - API para verificar usuarios registrados

## 🎯 Cómo Funciona

1. **Límite de 2 usuarios**: Solo se pueden registrar 2 usuarios en total
2. **Autenticación segura**: Las contraseñas se guardan encriptadas
3. **Pantalla de login**: Los visitantes ven la pantalla de login antes de entrar
4. **Registro automático**: Si hay menos de 2 usuarios, se muestra el formulario de registro

## 📋 Pasos para Desplegar en Vercel

### Opción 1: Desde el Dashboard de Vercel (Más fácil)

1. **Ve a tu proyecto en Vercel**: https://vercel.com/dashboard
2. **Encuentra tu proyecto** `tu-pagina-seven`
3. **Abre la configuración** (Settings)
4. **Sube los archivos actualizados**:
   - Ve a la sección "Git"
   - Asegúrate de que tu repositorio esté conectado
   - Haz push de los cambios a GitHub (si usas Git)

### Opción 2: Desde Git/GitHub (Recomendado)

Si tu proyecto está en GitHub:

```bash
# 1. Ir al directorio de tu proyecto
cd "C:\Users\Kamilo\Desktop\Tu pagina\proyecto-cumple"

# 2. Agregar los cambios
git add .

# 3. Hacer commit
git commit -m "Agregar sistema de login con máximo 2 usuarios"

# 4. Push a GitHub
git push origin main
```

**Vercel detectará los cambios automáticamente y desplegará la nueva versión**

### Opción 3: Desde Vercel CLI

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Ir al directorio del proyecto
cd "C:\Users\Kamilo\Desktop\Tu pagina\proyecto-cumble"

# 3. Desplegar
vercel --prod
```

## ⚠️ IMPORTANTE: Persistencia de Datos en Vercel

### El Problema
Las funciones serverless de Vercel usan `/tmp/` para almacenamiento, que es **efímero** (se borra periódicamente). Esto significa:
- ❌ Los usuarios registrados pueden perderse si Vercel reinicia el servidor
- ❌ No hay persistencia garantizada a largo plazo

### Soluciones

#### Solución 1: Usar para Testing Temporal ⏱️
Si solo necesitas probar el sistema o usarlo por un tiempo corto, la configuración actual funciona bien. Los usuarios se mantendrán mientras el servidor esté activo.

#### Solución 2: Base de Datos Externa (Recomendado para Producción) 💾

Para persistencia real, usa una de estas opciones gratuitas:

1. **Supabase** (PostgreSQL gratuito)
   - Ve a https://supabase.com
   - Crea un proyecto gratuito
   - Configura las variables de entorno en Vercel

2. **Vercel Postgres** (Integración nativa)
   - Ve a tu proyecto en Vercel
   - Integrations → Postgres
   - Sigue las instrucciones

3. **MongoDB Atlas** (MongoDB gratuito)
   - Ve a https://www.mongodb.com/cloud/atlas
   - Crea un cluster gratuito
   - Configura las variables de entorno en Vercel

#### Solución 3: Hardcodear los 2 Usuarios (Más Simple) 🔒

Si sabes quiénes serán los 2 usuarios desde el principio:

1. Crea los usuarios localmente primero:
   ```bash
   # Inicia el servidor local
   python proyecto-cumple/server.py
   ```

2. Registra los 2 usuarios en http://localhost:8000

3. Copia los datos de usuarios y configúralos como variables de entorno en Vercel:
   - Ve a Settings → Environment Variables en Vercel
   - Agrega las credenciales

## 🧪 Probar Localmente Primero

Antes de desplegar, prueba localmente:

```bash
# 1. Ir al directorio del proyecto
cd "C:\Users\Kamilo\Desktop\Tu pagina\proyecto-cumple"

# 2. Iniciar servidor local
python server.py

# 3. Abrir en el navegador
# Ve a http://localhost:8000
```

Deberías ver:
1. ✅ Pantalla de login
2. ✅ Formulario de registro (si no hay usuarios)
3. ✅ Mensaje cuando se registran 2 usuarios
4. ✅ Solo login disponible después de 2 usuarios

## 📝 Verificar que Todo Funciona en Vercel

Después de desplegar:

1. **Ve a tu URL**: https://tu-pagina-seven.vercel.app/

2. **Prueba el registro**:
   - Deberías ver el formulario de registro
   - Crea el primer usuario
   - Cierra sesión
   - Crea el segundo usuario
   - Intenta crear un tercero → Debería dar error

3. **Prueba el login**:
   - Cierra sesión
   - Inicia sesión con las credenciales creadas
   - Deberías entrar a la página principal

## 🆘 Solución de Problemas

### Error: "Las APIs no responden"
- Verifica que `vercel.json` esté en la raíz del proyecto
- Revisa los logs en el dashboard de Vercel
- Asegúrate de que los archivos de la carpeta `api/` se hayan subido

### Error: "Los usuarios se borran"
- Es normal en Vercel con SQLite temporal
- Considera usar una base de datos externa (ver Solución 2)

### Error: "CORS"
- Los headers CORS están configurados en `vercel.json`
- Si persiste, revisa la configuración en Vercel Dashboard

### La página principal se muestra sin login
- Limpia el caché del navegador
- Verifica que `index.html` se haya actualizado correctamente
- Abre la consola del navegador (F12) y busca errores

## 📊 Verificar el Estado del Sistema

En la consola del navegador (F12 → Console), deberías ver:

```
🚀 Inicializando sistema de login con backend API...
👥 Usuarios registrados: 0 / 2
```

## 🎉 Resultado Final

Una vez desplegado y funcionando:
- ✅ Tu página requiere login para acceder
- ✅ Solo 2 personas pueden crear cuentas
- ✅ Sistema de autenticación seguro con contraseñas encriptadas
- ✅ Interfaz romántica que combina con tu tema

## 💡 Notas Adicionales

### Seguridad
- Las contraseñas se guardan encriptadas con PBKDF2
- Los tokens de sesión son seguros
- Las APIs usan HTTPS en Vercel automáticamente

### Personalización
- Para cambiar el número máximo de usuarios, edita `max_users` en `api/_auth_storage.py`
- Para cambiar los mensajes, edita los archivos en `api/`
- Para cambiar el diseño, edita los estilos en `index.html`

### Próximos Pasos
Si necesitas persistencia permanente:
1. Configura Vercel Postgres o Supabase
2. Actualiza `api/_auth_storage.py` para usar la base de datos externa
3. Agrega las credenciales en las variables de entorno de Vercel

---

¿Necesitas ayuda con algún paso? Revisa los logs en Vercel Dashboard o prueba localmente primero.

