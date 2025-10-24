# Render Deployment Troubleshooting Guide

## Quick Fix for "Exited with status 127" Error

This error occurs when the Maven wrapper doesn't have execute permissions on Render's servers, or when Render detects the wrong environment.

### Current Issue: "bash: line 1: ./mvnw: No such file or directory"

This happens when:
1. Render detects your project as Node.js instead of Java
2. The Maven wrapper path is incorrect
3. The build environment isn't set up properly

### Immediate Solutions (Try in Order):

#### 1. **Use Simple Configuration** ✅ (Recommended)
Use `render-simple.yaml` which uses system Maven:
- Rename `render-simple.yaml` to `render.yaml`
- This avoids Maven wrapper issues entirely

#### 2. **Use Updated Configuration** ✅
Your `render.yaml` has been updated with the fix:
```yaml
buildCommand: chmod +x mvnw && ./mvnw clean package -DskipTests
```

#### 3. **Manual Configuration in Render Dashboard**
In your Render dashboard:
1. Go to your service settings
2. Under "Build & Deploy"
3. Set Environment to: `Java`
4. Set Build Command to: `mvn clean package -DskipTests`
5. Set Start Command to: `java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar`

#### 4. **Alternative: Use Maven Directly**
If the wrapper still doesn't work, use `render-alternative.yaml`:
- Rename `render-alternative.yaml` to `render.yaml`
- This uses Maven directly instead of the wrapper

### Step-by-Step Fix:

1. **Commit your changes** (the updated render.yaml)
2. **Push to your repository**
3. **Redeploy on Render** - it should automatically detect the new configuration
4. **If it still fails**, try the alternative configuration

### What Was Fixed:

- ✅ Added `chmod +x ./mvnw` to make Maven wrapper executable
- ✅ Created alternative configuration using system Maven
- ✅ Updated deployment documentation with troubleshooting steps

### Verification:

After successful deployment, your app should:
- ✅ Build without errors
- ✅ Start successfully
- ✅ Respond to health checks at `/actuator/health`
- ✅ Be accessible at your Render URL

---

**Need more help?** Check the full `RENDER_DEPLOYMENT.md` guide for comprehensive troubleshooting.
