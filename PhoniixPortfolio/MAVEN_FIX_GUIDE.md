# Maven "Command Not Found" Fix Guide

## Current Issue
Render is using Node.js environment but trying to run Maven commands. The error `mvn: command not found` occurs because Maven is not installed in the Node.js environment.

## Solutions (Try in Order)

### Solution 1: Use Maven Wrapper ✅ (Updated Configuration)

I've updated your `render.yaml` to use the Maven wrapper instead of system Maven:

```yaml
buildCommand: |
  # Make Maven wrapper executable
  chmod +x mvnw
  # Build the application using Maven wrapper
  ./mvnw clean package -DskipTests
```

**Steps:**
1. Commit and push this updated configuration
2. Redeploy on Render

### Solution 2: Manual Configuration in Render Dashboard

If the YAML still doesn't work, configure manually:

1. **Go to your Render service settings**
2. **Under "Build & Deploy" section:**
   - Set **Environment** to: `Node`
   - Set **Build Command** to:
     ```
     chmod +x mvnw && ./mvnw clean package -DskipTests
     ```
   - Set **Start Command** to: `java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar`
3. **Under "Environment Variables":**
   - Add `SPRING_PROFILES_ACTIVE` = `production`
   - Add `PORT` = `10000`

### Solution 3: Alternative Build Commands

Try these alternative build commands in Render dashboard:

**Option A (Maven Wrapper):**
```
chmod +x mvnw && ./mvnw clean package -DskipTests
```

**Option B (Install Maven first):**
```
apt-get update && apt-get install -y maven && mvn clean package -DskipTests
```

**Option C (Use Docker):**
Rename `render-docker.yaml` to `render.yaml` and use Docker approach.

## Why This Happens

- Render is using Node.js environment (which doesn't have Maven installed)
- The Maven wrapper (`mvnw`) should work because it downloads Maven automatically
- The issue was that the wrapper wasn't executable

## Quick Fix Steps

1. **Try the updated render.yaml first** (Solution 1)
2. **If that doesn't work**, try manual configuration (Solution 2)
3. **If still failing**, try the Docker approach (Solution 3)

## Verification

After successful deployment, your app should:
- ✅ Build without errors
- ✅ Start successfully
- ✅ Be accessible at your Render URL
- ✅ Respond to health checks at `/actuator/health`

---

**Note**: The Maven wrapper approach (Solution 1) should work because it downloads Maven automatically and doesn't rely on system installation.
