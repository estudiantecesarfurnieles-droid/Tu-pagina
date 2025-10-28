# 🚀 Despliegue en Vercel - Sistema de Login

## 📋 Archivos Necesarios para Vercel

Para que el sistema de login funcione en Vercel, necesitas estos archivos adicionales:

### ✅ Archivos Creados:
- `vercel.json` - Configuración de Vercel
- `package.json` - Configuración del proyecto
- `requirements.txt` - Dependencias de Python
- `api/login.py` - Función serverless para login
- `api/register.py` - Función serverless para registro
- `api/check-user.py` - Función serverless para verificar usuarios

## 🔧 Cómo Desplegar en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Agregar sistema de login"
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

### Opción 2: Desde CLI de Vercel

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Despliega:**
   ```bash
   vercel
   ```

3. **Sigue las instrucciones en pantalla**

## 🌐 URLs de las APIs en Vercel

Una vez desplegado, las APIs estarán disponibles en:

- **Login:** `https://tu-proyecto.vercel.app/api/login`
- **Registro:** `https://tu-proyecto.vercel.app/api/register`
- **Verificar usuarios:** `https://tu-proyecto.vercel.app/api/check-user`

## ⚠️ Consideraciones Importantes

### Base de Datos Temporal
- Las funciones serverless de Vercel usan `/tmp/` para almacenamiento temporal
- Los datos se pueden perder entre deployments
- Para producción, considera usar una base de datos externa

### Alternativa con Base de Datos Externa

Si necesitas persistencia de datos, puedes usar:

1. **Supabase** (PostgreSQL gratuito)
2. **PlanetScale** (MySQL gratuito)
3. **MongoDB Atlas** (MongoDB gratuito)

## 🔄 Actualizar tu Despliegue Actual

Para actualizar tu página en [https://tu-pagina-seven.vercel.app/](https://tu-pagina-seven.vercel.app/):

1. **Agrega los nuevos archivos** a tu repositorio
2. **Haz push** a GitHub
3. **Vercel se actualizará automáticamente**

## 🎯 Resultado Final

Después del despliegue:
- Tu página seguirá funcionando igual
- Ahora tendrás el sistema de login activo
- Los usuarios serán redirigidos automáticamente al login
- Solo se pueden crear hasta 2 usuarios

## 🆘 Solución de Problemas

### Error: "Function not found"
- Verifica que los archivos estén en la carpeta `api/`
- Revisa la configuración en `vercel.json`

### Error: "Database not accessible"
- Es normal en el primer uso
- Los datos se crearán automáticamente

### Error: "CORS"
- Los headers CORS están configurados en `vercel.json`
- Debería funcionar automáticamente

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en el dashboard de Vercel
2. Verifica que todos los archivos estén subidos
3. Asegúrate de que `vercel.json` esté en la raíz del proyecto
