# Railway.com Deployment Guide

This guide will help you deploy your Phoniix Portfolio to Railway.com.

## Prerequisites

- A Railway.com account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository

Your project is now properly structured in the root directory:
```
phoniix-portfolio/
├── pom.xml
├── mvnw
├── mvnw.cmd
├── src/
│   └── main/
│       ├── java/
│       │   └── com/Phoniix/PhoniixPortfolio/
│       └── resources/
│           ├── application.properties
│           ├── application-prod.properties
│           └── static/
├── railway.json
└── README.md
```

**Note**: The Java project files have been moved to the root directory so Railway can properly detect your Java project.

### 2. Create a New Project on Railway

1. Go to [Railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Connect your Git repository
5. Select your `phoniix-portfolio` repository

### 3. Configure the Service

Railway should automatically detect your Java project. If not, configure manually:

1. **Service Settings:**
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar`

2. **Environment Variables:**
   - `SPRING_PROFILES_ACTIVE` = `production`
   - `PORT` = `$PORT` (Railway automatically sets this)

### 4. Deploy

1. Click "Deploy"
2. Railway will automatically:
   - Build your application using Maven
   - Deploy it to their infrastructure
   - Provide you with a public URL

## Configuration Details

### Production Profile
The application uses a production profile with optimized settings:
- Reduced logging levels
- Proper caching headers
- Health check endpoints
- Security headers

### Health Checks
The application includes Spring Boot Actuator for health monitoring:
- Health endpoint: `/actuator/health`
- Info endpoint: `/actuator/info`

### Environment Variables
Railway automatically provides:
- `PORT` - The port your application should listen on
- You can add custom environment variables in the Railway dashboard

## Custom Domain (Optional)

To use a custom domain:
1. Go to your service settings
2. Click "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Monitoring

Railway provides built-in monitoring for:
- Application health
- Resource usage
- Response times
- Error rates
- Logs

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that Java 17 is available
   - Verify all dependencies are resolved
   - Check the build logs in Railway dashboard

2. **Application Won't Start**
   - Verify the JAR file is created correctly
   - Check the start command
   - Review application logs

3. **Health Check Fails**
   - Ensure Spring Boot Actuator is included
   - Check that the health endpoint is accessible
   - Verify the application is running on the correct port

### Logs

Access logs through:
1. Railway Dashboard → Your Service → Logs
2. Or use Railway CLI: `railway logs`

## Performance Optimization

### Recommendations

1. **Enable HTTP/2** (automatically enabled on Railway)
2. **Use CDN** for static assets (Railway provides this automatically)
3. **Monitor Resource Usage** through Railway dashboard
4. **Set up Alerts** for error rates and response times

### Scaling

Railway automatically scales your application based on traffic. You can also manually scale:
1. Go to service settings
2. Adjust the instance count
3. Configure auto-scaling rules

## Security

### Production Security Features

- Secure session cookies
- HTTPS enforcement
- Security headers
- Error information hiding

### Environment Variables

Store sensitive information in environment variables:
1. Go to service settings
2. Click "Variables"
3. Add your environment variables

## Cost Optimization

- Use the free tier for development/testing
- Monitor resource usage
- Set up auto-scaling rules
- Use appropriate instance sizes

## Support

For issues specific to Railway:
- Check [Railway Documentation](https://docs.railway.app)
- Contact Railway Support through their dashboard
- Join the Railway Community

---

Your portfolio is now ready for deployment on Railway.com! 🚀

## Quick Start Commands

```bash
# Build locally (optional)
./mvnw clean package -DskipTests

# Run locally (optional)
java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar
```

Railway will handle the build and deployment process automatically!
