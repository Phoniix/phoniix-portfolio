# Render.com Deployment Guide

This guide will help you deploy your Phoniix Portfolio to Render.com.

## Prerequisites

- A Render.com account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your project is pushed to a Git repository with the following structure:
```
PhoniixPortfolio/
├── render.yaml
├── pom.xml
├── src/
│   └── main/
│       ├── java/
│       │   └── com/Phoniix/PhoniixPortfolio/
│       └── resources/
│           ├── application.properties
│           ├── application-prod.properties
│           └── static/
└── README.md
```

### 2. Create a New Web Service on Render

1. Go to [Render.com Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Render will automatically detect the `render.yaml` file

### 3. Configure the Service

The `render.yaml` file is already configured with:
- **Build Command**: `./mvnw clean package -DskipTests`
- **Start Command**: `java -jar target/PhoniixPortfolio-0.0.1-SNAPSHOT.jar`
- **Environment**: Java
- **Health Check**: `/actuator/health`

### 4. Environment Variables

The following environment variables are automatically set:
- `SPRING_PROFILES_ACTIVE=production`
- `PORT=10000` (Render's default port)

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically:
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

### Static Resource Caching
In production, static resources are cached for 1 year to improve performance.

### Logging
Logs are written to `/app/logs/portfolio.log` and are accessible through Render's dashboard.

## Custom Domain (Optional)

To use a custom domain:
1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Monitoring

Render provides built-in monitoring for:
- Application health
- Resource usage
- Response times
- Error rates

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that Java 17 is available
   - Verify all dependencies are resolved
   - Check the build logs in Render dashboard

2. **Application Won't Start**
   - Verify the JAR file is created correctly
   - Check the start command in render.yaml
   - Review application logs

3. **Health Check Fails**
   - Ensure Spring Boot Actuator is included
   - Check that the health endpoint is accessible
   - Verify the application is running on the correct port

### Logs

Access logs through:
1. Render Dashboard → Your Service → Logs
2. Or use Render CLI: `render logs --service <service-name>`

## Performance Optimization

### Recommendations

1. **Enable HTTP/2** (automatically enabled on Render)
2. **Use CDN** for static assets (Render provides this automatically)
3. **Monitor Resource Usage** through Render dashboard
4. **Set up Alerts** for error rates and response times

### Scaling

Render automatically scales your application based on traffic. You can also manually scale:
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
2. Click "Environment"
3. Add your environment variables

## Backup and Recovery

Render automatically handles:
- Application backups
- Database backups (if using Render's database services)
- Disaster recovery

## Cost Optimization

- Use the free tier for development/testing
- Monitor resource usage
- Set up auto-scaling rules
- Use appropriate instance sizes

## Support

For issues specific to Render:
- Check [Render Documentation](https://render.com/docs)
- Contact Render Support through their dashboard
- Join the Render Community

---

Your portfolio is now ready for production deployment on Render.com! 🚀
