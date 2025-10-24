# Single Page Application (SPA) Setup Guide

## Overview

Your portfolio is now set up as a fully functional Single Page Application with live URL updates and client-side routing. The router uses the HTML5 History API to provide seamless navigation without page reloads.

## How It Works

### 1. Router System (`/js/router.js`)

The router is the core of the SPA. It handles:
- **URL Management**: Updates browser URLs without page reloads
- **Page Loading**: Dynamically loads HTML content from the `/pages` directory
- **Navigation**: Intercepts link clicks and handles them client-side
- **History**: Supports browser back/forward buttons
- **Transitions**: Smooth fade effects between pages

#### Key Features:
```javascript
// Navigate programmatically
router.navigateTo('/about');

// Add new routes dynamically
router.addRoute('/blog', '/pages/blog.html');

// Get current path
const currentPath = router.getCurrentPath();
```

### 2. Main Application (`/js/main.js`)

This file initializes the router and handles page-specific functionality:
- Initializes the router on page load
- Listens for page change events
- Runs page-specific initialization code
- Handles form submissions and interactions

### 3. Navigation Structure

All navigation links use the `data-link` attribute to enable SPA routing:
```html
<a href="/about" data-link>About</a>
```

**Important**: Always include the `data-link` attribute on navigation links!

## File Structure

```
static/
├── index.html          # Main HTML file (shell of the app)
├── css/
│   └── main.css       # Styling for all pages
├── js/
│   ├── router.js      # SPA routing logic
│   └── main.js        # Application initialization
└── pages/
    ├── home.html      # Home page content
    ├── about.html     # About page content
    ├── projects.html  # Projects page content
    ├── skills.html    # Skills page content
    └── contact.html   # Contact page content
```

## Available Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `/pages/home.html` | Landing page |
| `/about` | `/pages/about.html` | About section |
| `/projects` | `/pages/projects.html` | Portfolio projects |
| `/skills` | `/pages/skills.html` | Skills and technologies |
| `/contact` | `/pages/contact.html` | Contact form |

## Adding New Pages

To add a new page to your portfolio:

1. **Create the HTML file**:
   ```html
   <!-- /pages/newpage.html -->
   <section class="newpage-section">
     <h1>New Page</h1>
     <!-- Your content here -->
   </section>
   ```

2. **Add the route in router.js**:
   ```javascript
   defineRoutes() {
     this.routes = {
       // ... existing routes
       '/newpage': '/pages/newpage.html'
     };
   }
   ```

3. **Add navigation link**:
   ```html
   <li><a href="/newpage" class="nav-link" data-link>New Page</a></li>
   ```

4. **Update page title** (optional):
   ```javascript
   updatePageTitle(path) {
     const pageTitles = {
       // ... existing titles
       '/newpage': 'New Page - Phoniix Portfolio'
     };
     // ...
   }
   ```

5. **Add page initialization** (optional):
   ```javascript
   function initializePageFeatures(path) {
     switch(path) {
       // ... existing cases
       case '/newpage':
         initNewPage();
         break;
     }
   }
   
   function initNewPage() {
     console.log('New page initialized');
     // Add page-specific functionality
   }
   ```

## Page-Specific JavaScript

Each page can have its own initialization logic in `main.js`:

```javascript
function initContactPage() {
  // Example: Handle form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}
```

## Events

The router dispatches a custom `pageLoaded` event whenever a new page is loaded:

```javascript
window.addEventListener('pageLoaded', (e) => {
  console.log('Page loaded:', e.detail.path);
  // Run custom logic on page load
});
```

## Styling

The CSS uses CSS custom properties (variables) for easy theming. Key variables:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  /* ... more variables */
}
```

## Server Configuration

For the SPA to work correctly on your Spring Boot server, you need to configure it to serve `index.html` for all routes. Add this configuration:

```java
// In a new Configuration class
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:\\w+}")
                .setViewName("forward:/index.html");
    }
}
```

Or add this to your application.properties:
```properties
spring.web.resources.add-mappings=true
```

## Best Practices

1. **Always use `data-link` attribute** on navigation links
2. **Keep page HTML files focused** on content only (no full HTML structure)
3. **Use the provided CSS classes** for consistent styling
4. **Initialize page-specific functionality** in the `initializePageFeatures` function
5. **Test browser back/forward buttons** to ensure routing works correctly

## Customization

### Changing Transition Speed
In `router.js`, adjust the timeout value:
```javascript
await new Promise(resolve => setTimeout(resolve, 150)); // Change 150 to desired milliseconds
```

### Adding Loading Spinner
Replace the `showLoading()` method in `router.js` with your loading component.

### Custom Page Transitions
Modify the CSS transition in `router.js`:
```javascript
this.appContainer.style.transition = 'opacity 0.15s ease-in-out';
```

## Troubleshooting

**Issue**: Pages don't load
- Check browser console for errors
- Verify file paths in `routes` object
- Ensure files exist in `/pages` directory

**Issue**: Navigation doesn't update URL
- Make sure `data-link` attribute is on all navigation links
- Check if router is initialized properly in `main.js`

**Issue**: Browser back button doesn't work
- Verify the `popstate` event listener is set up in router
- Check browser console for errors

**Issue**: Styling not applied
- Verify `main.css` is linked in `index.html`
- Clear browser cache
- Check CSS file path

## Next Steps

1. Customize the content in each page file
2. Add your own projects, skills, and information
3. Replace placeholder images with real content
4. Customize colors and styling in `main.css`
5. Add your contact information and social links
6. Implement actual form submission logic
7. Add animations and interactive elements
8. Optimize for performance and SEO

Enjoy building your portfolio! 🚀



