#!/bin/bash

# Build script for Phoniix Portfolio
echo "🚀 Building Phoniix Portfolio for production..."

# Clean and package
echo "📦 Running Maven clean package..."
./mvnw clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 JAR file created: target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar"
    echo ""
    echo "To run locally:"
    echo "java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar"
    echo ""
    echo "To run with production profile:"
    echo "java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar --spring.profiles.active=production"
else
    echo "❌ Build failed!"
    exit 1
fi
