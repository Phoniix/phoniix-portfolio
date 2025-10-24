# Render Deployment Troubleshooting Guide

## Quick Fix for "Exited with status 127" Error

This error occurs when the Maven wrapper doesn't have execute permissions on Render's servers.

### Immediate Solutions (Try in Order):

#### 1. **Use Updated Configuration** ✅ (Recommended)
Your `render.yaml` has been updated with the fix:
```yaml
buildCommand: chmod +x ./mvnw && ./mvnw clean package -DskipTests
```

#### 2. **Alternative: Use Maven Directly**
If the wrapper still doesn't work, use `render-alternative.yaml`:
- Rename `render-alternative.yaml` to `render.yaml`
- This uses Maven directly instead of the wrapper

#### 3. **Manual Build Command Override**
In your Render dashboard:
1. Go to your service settings
2. Under "Build & Deploy"
3. Set Build Command to: `chmod +x ./mvnw && ./mvnw clean package -DskipTests`

#### 4. **Use System Maven**
If wrapper issues persist, set Build Command to: `mvn clean package -DskipTests`

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
