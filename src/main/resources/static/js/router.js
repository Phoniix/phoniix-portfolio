/**
 * SPA Router - Handles client-side routing with live URL updates
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPath = null;
    this.appContainer = null;
  }

  /**
   * Initialize the router
   * @param {string} containerId - ID of the container element where pages will be loaded
   */
  init(containerId = 'app') {
    this.appContainer = document.getElementById(containerId);
    
    if (!this.appContainer) {
      console.error(`Container element with id "${containerId}" not found`);
      return;
    }

    // Define routes
    this.defineRoutes();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Handle initial page load
    this.handleRoute(window.location.pathname);
  }

  /**
   * Define all available routes and their corresponding page files
   */
  defineRoutes() {
    this.routes = {
      '/': '/pages/home.html',
      '/about': '/pages/about.html',
      '/projects': '/pages/projects.html',
      '/projects-admin': '/pages/projects-admin.html',
      '/contact': '/pages/contact.html'
    };
  }

  /**
   * Check if admin access is authorized
   * @param {string} path - The path being accessed
   * @returns {boolean} - Whether access is authorized
   */
  isAdminAccessAuthorized(path) {
    // Check if accessing admin page
    if (path === '/projects-admin') {
      // Check for admin key in URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const adminKey = urlParams.get('key');
      
      // You can change this key to whatever you want
      const validAdminKey = 'admin2025';
      
      if (adminKey === validAdminKey) {
        return true;
      } else {
        // Redirect to home page if not authorized
        this.navigateTo('/');
        return false;
      }
    }
    return true;
  }

  /**
   * Set up event listeners for navigation
   */
  setupEventListeners() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      // Check if clicked element or its parent has data-link attribute
      const link = e.target.closest('[data-link]');
      
      if (link && link.href) {
        e.preventDefault();
        const url = new URL(link.href);
        this.navigateTo(url.pathname);
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      this.handleRoute(window.location.pathname);
    });
  }

  /**
   * Navigate to a specific path
   * @param {string} path - The path to navigate to
   */
  navigateTo(path) {
    // Update browser history
    window.history.pushState({}, '', path);
    
    // Handle the route
    this.handleRoute(path);
  }

  /**
   * Handle a specific route
   * @param {string} path - The path to handle
   */
  async handleRoute(path) {
    // Normalize path
    path = path || '/';
    
    // Check admin access authorization
    if (!this.isAdminAccessAuthorized(path)) {
      return; // Access denied, redirect handled in isAdminAccessAuthorized
    }
    
    // Check if route exists
    const pageUrl = this.routes[path] || this.routes['/'];
    
    console.log('🔍 Router Debug:', { path, pageUrl, routes: this.routes });
    
    // Update active navigation link
    this.updateActiveNavLink(path);
    
    // Load the page content
    await this.loadPage(pageUrl, path);
    
    // Update current path
    this.currentPath = path;
    
    // Update page title
    this.updatePageTitle(path);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }

  /**
   * Load page content from HTML file
   * @param {string} url - URL of the page to load
   * @param {string} path - Current path
   */
  async loadPage(url, path) {
    try {
      // Show loading state
      this.showLoading();
      
      console.log('📄 Loading page:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to load page: ${response.status}`);
      }
      
      const html = await response.text();
      console.log('✅ HTML loaded, first 200 chars:', html.substring(0, 200));
      
      // Add fade-out effect
      this.appContainer.style.opacity = '0';
      
      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Update content
      this.appContainer.innerHTML = html;
      console.log('✅ HTML inserted into DOM');
      
      // Fade in
      this.appContainer.style.opacity = '1';
      
      // Execute any scripts in the loaded content
      this.executePageScripts();
      
      // Trigger custom event for page load
      this.dispatchPageLoadEvent(path);
      
    } catch (error) {
      console.error('Error loading page:', error);
      this.showError();
    }
  }

  /**
   * Show loading state
   */
  showLoading() {
    // You can customize this with a loader component
    this.appContainer.style.transition = 'opacity 0.15s ease-in-out';
  }

  /**
   * Show error page
   */
  showError() {
    this.appContainer.innerHTML = `
      <section class="error-section">
        <h1>Oops! Something went wrong</h1>
        <p>We couldn't load the page you requested.</p>
        <a href="/" data-link class="btn-primary">Go Home</a>
      </section>
    `;
    this.appContainer.style.opacity = '1';
  }

  /**
   * Update active navigation link
   * @param {string} path - Current path
   */
  updateActiveNavLink(path) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`.nav-link[href="${path}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  /**
   * Update page title based on current path
   * @param {string} path - Current path
   */
  updatePageTitle(path) {
    const pageTitles = {
      '/': 'Phoniix Portfolio',
      '/about': 'About - Phoniix Portfolio',
      '/projects': 'Projects - Phoniix Portfolio',
      '/contact': 'Contact - Phoniix Portfolio'
    };
    
    document.title = pageTitles[path] || 'Phoniix Portfolio';
  }

  /**
   * Execute scripts in the loaded page content
   */
  executePageScripts() {
    const scripts = this.appContainer.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      script.parentNode.replaceChild(newScript, script);
    });
  }

  /**
   * Dispatch custom event when page is loaded
   * @param {string} path - Current path
   */
  dispatchPageLoadEvent(path) {
    const event = new CustomEvent('pageLoaded', {
      detail: { path, router: this }
    });
    window.dispatchEvent(event);
  }

  /**
   * Add a new route dynamically
   * @param {string} path - Route path
   * @param {string} pageUrl - URL of the page to load
   */
  addRoute(path, pageUrl) {
    this.routes[path] = pageUrl;
  }

  /**
   * Get current path
   * @returns {string} Current path
   */
  getCurrentPath() {
    return this.currentPath;
  }
}

// Export router instance
const router = new Router();


