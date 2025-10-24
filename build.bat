@echo off
echo 🚀 Building Phoniix Portfolio for production...

echo 📦 Running Maven clean package...
call mvnw.cmd clean package -DskipTests

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 📁 JAR file created: target\PhoniixPortfolio-0.0.1-SNAPSHOT.jar
    echo.
    echo To run locally:
    echo java -jar target\PhoniixPortfolio-0.0.1-SNAPSHOT.jar
    echo.
    echo To run with production profile:
    echo java -jar target\PhoniixPortfolio-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
) else (
    echo ❌ Build failed!
    exit /b 1
)
