# Quick Setup Script for Windows PowerShell
# Run this from the project root directory

Write-Host "🚀 Starting MERN Magic Setup..." -ForegroundColor Cyan
Write-Host ""

# Backend Setup
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow
Set-Location backend
npm install
Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
Set-Location ..

# Frontend Setup
Write-Host ""
Write-Host "📦 Setting up Frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
Write-Host "✅ Frontend dependencies installed!" -ForegroundColor Green
Set-Location ..

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a .env file in the backend folder with:" -ForegroundColor White
Write-Host "   URI=mongodb://localhost:27017/mernapp" -ForegroundColor Gray
Write-Host "   PORT=5000" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start MongoDB service" -ForegroundColor White
Write-Host ""
Write-Host "3. Open two terminals:" -ForegroundColor White
Write-Host "   Terminal 1: cd backend ; npm start" -ForegroundColor Gray
Write-Host "   Terminal 2: cd frontend ; npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "🌟 Enjoy your exciting MERN application!" -ForegroundColor Magenta
