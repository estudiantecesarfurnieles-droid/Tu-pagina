# Script de PowerShell para desplegar en Vercel
# Ejecutar con: .\deploy.ps1

Write-Host "🚀 Preparando despliegue en Vercel..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "vercel.json")) {
    Write-Host "❌ Error: No se encontró vercel.json. Ejecuta este script desde el directorio del proyecto." -ForegroundColor Red
    exit 1
}

# Verificar que existen los archivos necesarios
Write-Host "📋 Verificando archivos necesarios..." -ForegroundColor Yellow

$requiredFiles = @(
    "vercel.json",
    "package.json", 
    "requirements.txt",
    "api/login.py",
    "api/register.py",
    "api/check-user.py",
    "login.html",
    "css/login.css",
    "js/login.js",
    "js/user-manager.js"
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "❌ Error: No se encontró $file" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "✅ $file encontrado" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📦 Archivos verificados correctamente" -ForegroundColor Green
Write-Host ""

# Verificar si Vercel CLI está instalado
try {
    $vercelVersion = vercel --version 2>$null
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Vercel CLI no está instalado." -ForegroundColor Yellow
    Write-Host "📥 Instalando Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "🌐 Iniciando despliegue..." -ForegroundColor Cyan
Write-Host ""

# Desplegar en Vercel
vercel --prod

Write-Host ""
Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Tu página con sistema de login estará disponible en:" -ForegroundColor Cyan
Write-Host "   https://tu-pagina-seven.vercel.app/" -ForegroundColor White
Write-Host ""
Write-Host "💡 Recuerda:" -ForegroundColor Yellow
Write-Host "   - Los usuarios serán redirigidos automáticamente al login" -ForegroundColor White
Write-Host "   - Solo se pueden crear hasta 2 usuarios" -ForegroundColor White
Write-Host "   - La primera vez verás el formulario de registro" -ForegroundColor White
Write-Host ""
