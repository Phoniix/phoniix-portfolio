# Render Deployment Fix Guide

## Current Issue
Render is still using the old build command `./mvnw` instead of the updated `mvn` command, even after updating the render.yaml file.

## Solutions (Try in Order)

### Solution 1: Manual Configuration in Render Dashboard ✅ (Recommended)

Since the YAML configuration isn't working, configure manually:

1. **Go to your Render service settings**
2. **Under "Build & Deploy" section:**
   - Set **Environment** to: `Node` (since Java isn't available)
   - Set **Build Command** to: `mvn clean package -DskipTests`
   - Set **Start Command** to: `java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar`
3. **Under "Environment Variables":**
   - Add `SPRING_PROFILES_ACTIVE` = `production`
   - Add `PORT` = `10000`
4. **Save and redeploy**

### Solution 2: Use Docker Configuration

1. **Rename `render-docker.yaml` to `render.yaml`**
2. **Commit and push the changes**
3. **Redeploy on Render**

This uses a Dockerfile approach which should be more reliable.

### Solution 3: Force Render to Use New Configuration

1. **Delete the current service on Render**
2. **Create a new service**
3. **Connect your repository again**
4. **Use the updated render.yaml configuration**

### Solution 4: Alternative Build Command

Try these alternative build commands in Render dashboard:

**Option A:**
```
mvn clean package -DskipTests
```

**Option B:**
```
chmod +x mvnw && ./mvnw clean package -DskipTests
```

**Option C:**
```
./mvnw clean package -DskipTests
```

## Why This Happens

Render sometimes caches the old configuration or doesn't properly read the updated render.yaml file. This is a common issue with Render's auto-detection system.

## Quick Fix Steps

1. **Try Solution 1 first** (Manual configuration)
2. **If that doesn't work**, try Solution 2 (Docker)
3. **If still failing**, try Solution 3 (Delete and recreate service)

## Verification

After successful deployment, your app should:
- ✅ Build without errors
- ✅ Start successfully
- ✅ Be accessible at your Render URL
- ✅ Respond to health checks at `/actuator/health`

---

**Note**: The manual configuration in Solution 1 is the most reliable approach when YAML configurations aren't working properly.
