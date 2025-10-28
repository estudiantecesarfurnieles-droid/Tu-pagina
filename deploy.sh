#!/bin/bash
# Script para desplegar automáticamente en Vercel

echo "🚀 Preparando despliegue en Vercel..."

# Verificar que estamos en el directorio correcto
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: No se encontró vercel.json. Ejecuta este script desde el directorio del proyecto."
    exit 1
fi

# Verificar que existen los archivos necesarios
echo "📋 Verificando archivos necesarios..."

required_files=(
    "vercel.json"
    "package.json"
    "requirements.txt"
    "api/login.py"
    "api/register.py"
    "api/check-user.py"
    "login.html"
    "css/login.css"
    "js/login.js"
    "js/user-manager.js"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: No se encontró $file"
        exit 1
    else
        echo "✅ $file encontrado"
    fi
done

echo ""
echo "📦 Archivos verificados correctamente"
echo ""

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI no está instalado."
    echo "📥 Instalando Vercel CLI..."
    npm install -g vercel
fi

echo "🌐 Iniciando despliegue..."
echo ""

# Desplegar en Vercel
vercel --prod

echo ""
echo "✅ ¡Despliegue completado!"
echo ""
echo "🔗 Tu página con sistema de login estará disponible en:"
echo "   https://tu-pagina-seven.vercel.app/"
echo ""
echo "💡 Recuerda:"
echo "   - Los usuarios serán redirigidos automáticamente al login"
echo "   - Solo se pueden crear hasta 2 usuarios"
echo "   - La primera vez verás el formulario de registro"
echo ""
