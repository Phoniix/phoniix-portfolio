/**
 * Theme Management
 * Initialize theme before anything else to prevent flash of wrong theme
 */

// Apply saved theme immediately (before DOM loads to prevent flash)
(function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Get current theme
  const getCurrentTheme = () => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  };

  // Set theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    console.log('🎨 Theme changed to:', theme);
    
    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Add click event listener
  themeToggle.addEventListener('click', toggleTheme);

  console.log('🌓 Theme toggle initialized. Current theme:', getCurrentTheme());
}

/**
 * Persistent Background Logo Storage
 * These variables store the background logo components so they persist across page navigation
 */
let persistentBgRenderer = null;
let persistentBgScene = null;
let persistentBgCamera = null;
let persistentBackgroundLogo = null;

/**
 * Cutscene animation controller
 */
function initCutscene() {
  // Check if cutscene has already been shown this session
  if (sessionStorage.getItem('cutsceneShown') === 'true') {
    const overlay = document.getElementById('cutscene-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
    return;
  }

  // Detect mobile/tablet
  const isMobile = window.innerWidth <= 768;
  
  const nameDisplay = document.getElementById('name-display');
  const matrixOverlay = document.getElementById('matrix-overlay');
  const overlay = document.getElementById('cutscene-overlay');
  const greetingText = document.getElementById('greeting-text');
  const introText = document.querySelector('.intro-text');

  if (!nameDisplay || !overlay || !greetingText || !introText) return;

  // Hide matrix overlay on mobile (not used)
  if (isMobile && matrixOverlay) {
    matrixOverlay.style.display = 'none';
  }

  // Use lightweight mobile animation or full desktop animation
  if (isMobile) {
    console.log('📱 Mobile detected - using lightweight animation');
    startMobileCutscene(nameDisplay, overlay, greetingText, introText);
  } else {
    console.log('🖥️ Desktop detected - using full animation');
    startDesktopCutscene(nameDisplay, matrixOverlay, overlay, greetingText, introText);
  }
}

/**
 * Lightweight mobile cutscene animation (optimized for performance)
 * Uses simple fades instead of heavy matrix effects and complex animations
 */
function startMobileCutscene(nameDisplay, overlay, greetingText, introText) {
  // Set initial styles for performance (use CSS classes for better rendering)
  nameDisplay.textContent = 'Sean Smith';
  nameDisplay.style.color = '#E91E63';
  nameDisplay.style.fontWeight = 'bold';
  nameDisplay.style.textShadow = '0 0 20px rgba(233, 30, 99, 0.6)';
  
  // Use requestAnimationFrame for smoother animations
  requestAnimationFrame(() => {
    // Show intro text after 0.5s
    setTimeout(() => {
      introText.style.transition = 'opacity 0.8s ease-out';
      introText.style.opacity = '1';
    }, 500);

    // Show name after 1.5s with simple fade (no typewriter effect on mobile)
    setTimeout(() => {
      nameDisplay.style.transition = 'opacity 0.8s ease-out';
      nameDisplay.style.opacity = '1';
    }, 1500);

    // Show greeting after name appears
    setTimeout(() => {
      greetingText.style.transition = 'opacity 0.6s ease-out';
      greetingText.style.opacity = '1';
    }, 2300);

    // Fade out everything and close after 3.5 seconds (shorter than desktop)
    setTimeout(() => {
      // Fade out intro and greeting simultaneously
      introText.style.transition = 'opacity 0.5s ease-out';
      greetingText.style.transition = 'opacity 0.5s ease-out';
      
      requestAnimationFrame(() => {
        introText.style.opacity = '0';
        greetingText.style.opacity = '0';
      });

      // Fade out name slightly after
      setTimeout(() => {
        nameDisplay.style.transition = 'opacity 0.4s ease-out';
        nameDisplay.style.opacity = '0';
      }, 200);

      // Fade out overlay
      setTimeout(() => {
        overlay.classList.add('fade-out');
      }, 700);

      // Hide overlay completely
      setTimeout(() => {
        overlay.classList.add('hidden');
        sessionStorage.setItem('cutsceneShown', 'true');
        console.log('📱 Mobile cutscene complete!');
      }, 1700);
    }, 3500);
  });
}

/**
 * Full desktop cutscene animation (original with all effects)
 */
function startDesktopCutscene(nameDisplay, matrixOverlay, overlay, greetingText, introText) {
  if (!matrixOverlay) return;

  // Matrix characters for the effect
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  // Wait 3 seconds, then start the transformation
  setTimeout(() => {
    startMatrixTransformation();
  }, 3000);

  function startMatrixTransformation() {
    const originalText = 'Phoniix';
    const targetText = 'Sean Smith';
    let scrambleCount = 0;
    const maxScrambles = 15;
    let matrixInterval;

    // Matrix glitch effect
    matrixInterval = setInterval(() => {
      // Generate random matrix text
      let matrixText = '';
      for (let i = 0; i < Math.max(originalText.length, targetText.length); i++) {
        matrixText += matrixChars[Math.floor(Math.random() * matrixChars.length)];
      }
      matrixOverlay.textContent = matrixText;
      matrixOverlay.style.animation = 'matrixGlitch 0.1s ease-in-out';
    }, 50);

    // Gradually transform the text
    const transformInterval = setInterval(() => {
      scrambleCount++;
      
      // Scramble effect on original text
      if (scrambleCount < maxScrambles) {
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() > 0.5) {
            scrambled += matrixChars[Math.floor(Math.random() * matrixChars.length)];
          } else {
            scrambled += originalText[i];
          }
        }
        nameDisplay.textContent = scrambled;
        nameDisplay.style.animation = 'textScramble 0.1s ease-in-out';
      } else {
        // Clear matrix effect
        clearInterval(matrixInterval);
        matrixOverlay.style.opacity = '0';
        
        // CRITICAL: Clear all animations and reset opacity to make visible!
        nameDisplay.style.animation = 'none';
        nameDisplay.style.opacity = '1';
        nameDisplay.style.transition = 'none';
        nameDisplay.style.transform = 'none';
        
        // Reset text styling for visibility - remove gradient effect
        nameDisplay.style.background = 'none';
        nameDisplay.style.webkitTextFillColor = '#E91E63';
        nameDisplay.style.webkitBackgroundClip = 'initial';
        nameDisplay.style.backgroundClip = 'initial';
        nameDisplay.style.color = '#E91E63';
        nameDisplay.style.textShadow = '0 0 30px rgba(233, 30, 99, 0.8), 0 0 60px rgba(233, 30, 99, 0.5)';
        nameDisplay.style.fontWeight = 'bold';
        nameDisplay.style.fontSize = '5rem';
        nameDisplay.style.position = 'relative';
        nameDisplay.style.zIndex = '10';
        
        // Create typing cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.style.fontSize = '5rem'; // Match the name text size
        nameDisplay.parentNode.appendChild(cursor);
        
        // Reveal final name with typewriter effect
        let revealIndex = 0;
        nameDisplay.textContent = '';
        const halfwayPoint = Math.floor(targetText.length / 2);
        
        // Wait 100ms to show cursor before typing starts
        setTimeout(() => {
          const typeInterval = setInterval(() => {
            if (revealIndex < targetText.length) {
              nameDisplay.textContent = targetText.substring(0, revealIndex + 1);
              
              // Show "Nice to meet you" when halfway through typing
              if (revealIndex === halfwayPoint) {
                greetingText.style.opacity = '1';
              }
              
              revealIndex++;
            } else {
              clearInterval(typeInterval);
              
              // Fade out cursor after typing completes (don't remove, just hide)
              setTimeout(() => {
                if (cursor) {
                  cursor.style.transition = 'opacity 0.2s ease-out';
                  cursor.style.opacity = '0';
                  cursor.style.animation = 'none'; // Stop blinking
                }
              }, 300);
              
              // Wait a moment, then animate to home page position
              setTimeout(() => {
                animateToHomePage();
              }, 1000);
            }
          }, 80);
        }, 100);
        
        clearInterval(transformInterval);
      }
    }, 70);
  }

  function animateToHomePage() {
    // Don't fade greeting text here - will fade with intro text at pop time
    
    // Get the current position of the cutscene text
    const cutsceneRect = nameDisplay.getBoundingClientRect();
    const cutsceneX = cutsceneRect.left;
    const cutsceneY = cutsceneRect.top;
    const cutsceneWidth = cutsceneRect.width;
    const cutsceneHeight = cutsceneRect.height;
    
    console.log('📍 Cutscene starting position:', { x: cutsceneX, y: cutsceneY, width: cutsceneWidth, height: cutsceneHeight });
    
    // Function to wait for target element and ensure it's positioned
    function waitForTargetElement(callback, maxAttempts = 20) {
      let attempts = 0;
      
      const checkElement = () => {
        const heroName = document.getElementById('hero-name');
        attempts++;
        
        if (heroName) {
          const rect = heroName.getBoundingClientRect();
          // Check if element is actually positioned (not 0,0)
          if (rect.width > 0 && rect.height > 0 && (rect.top > 0 || rect.left > 0)) {
            console.log('✅ Target element found and positioned:', rect);
            callback(heroName);
            return;
          }
        }
        
        if (attempts < maxAttempts) {
          console.log(`⏳ Waiting for target element... attempt ${attempts}`);
          setTimeout(checkElement, 50);
        } else {
          console.warn('⚠️ Target element not found after max attempts');
          fadeOutCutscene();
        }
      };
      
      checkElement();
    }
    
    // Wait for target element to be ready
    waitForTargetElement((heroName) => {
      // Force a layout recalculation to ensure positions are accurate
      void heroName.offsetHeight;
      
      if (heroName) {
        const targetRect = heroName.getBoundingClientRect();
        const targetX = targetRect.left;
        const targetY = targetRect.top;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;
        
        // Get computed font size of target for better scale calculation
        const targetStyle = window.getComputedStyle(heroName);
        const targetFontSize = parseFloat(targetStyle.fontSize);
        const currentFontSize = parseFloat(window.getComputedStyle(nameDisplay).fontSize);
        const scale = targetFontSize / currentFontSize;
        
        // Calculate center-to-center positioning for more accurate alignment
        const currentCenterX = cutsceneX + (cutsceneWidth / 2);
        const currentCenterY = cutsceneY + (cutsceneHeight / 2);
        const targetCenterX = targetX + (targetWidth / 2);
        const targetCenterY = targetY + (targetHeight / 2);
        
        // Calculate the translation needed from center to center
        const deltaX = targetCenterX - currentCenterX;
        const deltaY = targetCenterY - currentCenterY;
        
        // Make the text fixed position so it can move freely
        nameDisplay.style.position = 'fixed';
        nameDisplay.style.left = cutsceneX + 'px';
        nameDisplay.style.top = cutsceneY + 'px';
        nameDisplay.style.margin = '0';
        nameDisplay.style.zIndex = '10001';
        nameDisplay.style.transformOrigin = 'center center';
        
        // Animate the text to the target position with smooth easing
        setTimeout(() => {
          console.log('🚀 Starting movement animation');
          // Smooth ease-out without bounce
          nameDisplay.style.transition = 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
          nameDisplay.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
          console.log('Target scale:', scale);
        }, 50);
        
        // POP slightly earlier (1.3s) - glow only, no scale change
        setTimeout(() => {
          console.log('💥 POP EFFECT STARTING!');
          
          nameDisplay.style.transition = 'text-shadow 0.15s ease-out';
          nameDisplay.style.textShadow = '0 0 30px rgba(233, 30, 99, 0.8), 0 0 60px rgba(233, 30, 99, 0.6), 0 0 90px rgba(233, 30, 99, 0.4)';
          
          console.log('Glow applied');
        }, 1300);
        
        // Fade away "Hi, I am" and "Nice to meet you" together when pop happens
        setTimeout(() => {
          console.log('👻 Fading "Hi, I am" and "Nice to meet you" together');
          
          // Stop all animations and transitions first
          introText.style.animation = 'none';
          introText.style.transition = 'none';
          greetingText.style.animation = 'none';
          greetingText.style.transition = 'none';
          
          // Force reflow to ensure changes are applied
          void introText.offsetHeight;
          void greetingText.offsetHeight;
          
          // Now set the same transition and fade both at exactly the same time
          introText.style.transition = 'opacity 0.5s ease-out';
          greetingText.style.transition = 'opacity 0.5s ease-out';
          
          // Fade out simultaneously in the next frame
          requestAnimationFrame(() => {
            introText.style.opacity = '0';
            greetingText.style.opacity = '0';
            console.log('Both texts set to fade:', introText.style.opacity, greetingText.style.opacity);
          });
        }, 1300);
        
        // Reduce glow slightly
        setTimeout(() => {
          console.log('📉 Reducing glow');
          nameDisplay.style.transition = 'text-shadow 0.25s ease-in-out';
          nameDisplay.style.textShadow = '0 0 20px rgba(233, 30, 99, 0.6), 0 0 40px rgba(233, 30, 99, 0.4)';
        }, 1500);
        
        // Start fading out the background AFTER other text fades
        setTimeout(() => {
          overlay.classList.add('fade-out');
          console.log('🌫️ Background fading out');
        }, 1900);
        
        // Hold for a moment, then fade out name text
        setTimeout(() => {
          nameDisplay.style.opacity = '0';
          nameDisplay.style.transition = 'opacity 0.6s ease-out';
          console.log('👋 Name text fading out');
        }, 2400);
        
        // Clean up
        setTimeout(() => {
          overlay.classList.add('hidden');
          sessionStorage.setItem('cutsceneShown', 'true');
          console.log('🏁 Cutscene complete!');
        }, 3100);
      } else {
        // This shouldn't happen since we checked above
        console.error('❌ Hero name element lost');
        fadeOutCutscene();
      }
    });
  }
  
  function fadeOutCutscene() {
    overlay.classList.add('fade-out');
    
    // Mark as shown and remove from DOM after fade
    setTimeout(() => {
      overlay.classList.add('hidden');
      sessionStorage.setItem('cutsceneShown', 'true');
    }, 1000);
  }
}

// Call cutscene before everything else
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCutscene);
} else {
  initCutscene();
}

/**
 * Main application initialization
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the router
  router.init('app');
  
  // Add any global event listeners or initializations here
  initializeApp();
});

/**
 * Initialize application-wide features
 */
function initializeApp() {
  // Initialize theme toggle
  initThemeToggle();
  
  // Listen for page load events
  window.addEventListener('pageLoaded', (e) => {
    console.log('Page loaded:', e.detail.path);
    
    // Add any page-specific initialization here
    initializePageFeatures(e.detail.path);
  });
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Initialize ambient particles
  initAmbientParticles();
}

/**
 * Initialize features specific to each page
 * @param {string} path - Current page path
 */
function initializePageFeatures(path) {
  switch(path) {
    case '/':
      initHomePage();
      break;
    case '/about':
      initAboutPage();
      break;
    case '/projects':
      initProjectsPage();
      break;
    case '/projects-admin':
      initProjectsAdminPage();
      break;
    case '/contact':
      initContactPage();
      break;
  }
}

// Page-specific initialization functions
function initHomePage() {
  console.log('Home page initialized');
  
  // Initialize 3D logo
  init3DLogo();
}

function init3DLogo() {
  const container = document.getElementById('logo-3d-container');
  if (!container) return;

  // Detect mobile/tablet devices
  const isMobile = window.innerWidth <= 768;

  // Check if background logo already exists
  const existingBgCanvas = document.querySelector('canvas[data-bg-logo="true"]');
  let bgScene, bgCamera, bgRenderer, backgroundLogo;
  
  // Skip background logo on mobile for better performance
  if (!existingBgCanvas && !isMobile) {
    // First time - create background scene (desktop only)
    console.log('🎨 Creating background logo for the first time');
    
    bgScene = new THREE.Scene();
    bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Disable antialiasing on mobile for better performance
    bgRenderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio
    bgRenderer.setClearColor(0x000000, 0);
    bgRenderer.domElement.style.position = 'fixed';
    bgRenderer.domElement.style.top = '0';
    bgRenderer.domElement.style.left = '0';
    bgRenderer.domElement.style.width = '100%';
    bgRenderer.domElement.style.height = '100%';
    bgRenderer.domElement.style.zIndex = '-1';
    bgRenderer.domElement.style.pointerEvents = 'none';
    bgRenderer.domElement.setAttribute('data-bg-logo', 'true');
    
    document.body.appendChild(bgRenderer.domElement);
    bgCamera.position.set(0, 0, 5);

    // Lighting for background scene - softer pink lighting
    const bgAmbientLight = new THREE.AmbientLight(0xE91E63, 1.2);
    bgScene.add(bgAmbientLight);
    
    const bgPinkLight1 = new THREE.PointLight(0xE91E63, 2.5, 200);
    bgPinkLight1.position.set(-10, 10, 10);
    bgScene.add(bgPinkLight1);

    const bgPinkLight2 = new THREE.PointLight(0xFF69B4, 2.0, 200);
    bgPinkLight2.position.set(10, -5, 5);
    bgScene.add(bgPinkLight2);
    
    // Store globally so we can reuse on return visits
    persistentBgRenderer = bgRenderer;
    persistentBgScene = bgScene;
    persistentBgCamera = bgCamera;
  } else if (existingBgCanvas && !isMobile) {
    // Reuse existing background (desktop only)
    console.log('✅ Background logo already exists, reusing it');
    bgScene = persistentBgScene;
    bgCamera = persistentBgCamera;
    bgRenderer = persistentBgRenderer;
    backgroundLogo = persistentBackgroundLogo;
  } else {
    // Mobile: no background logo
    bgScene = null;
    bgCamera = null;
    bgRenderer = null;
    backgroundLogo = null;
  }

  // Main scene setup
  const scene = new THREE.Scene();
  
  // Function to get responsive size based on container
  function getLogoSize() {
    const containerRect = container.getBoundingClientRect();
    // Use actual container size or fallback to 400px
    const width = containerRect.width || container.offsetWidth || 400;
    const height = containerRect.height || container.offsetHeight || 400;
    const containerSize = Math.min(width, height);
    // Cap at 400px for desktop, but allow smaller for mobile
    return Math.min(Math.max(containerSize, 200), 400);
  }
  
  // Get initial size (wait a tick for layout to settle)
  let finalSize = getLogoSize();
  if (finalSize < 200) {
    // If container not ready, use computed style or default
    const computedStyle = window.getComputedStyle(container);
    const width = parseInt(computedStyle.width) || 400;
    const height = parseInt(computedStyle.height) || 400;
    finalSize = Math.min(Math.min(width, height), 400);
  }
  
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1:1
  // Optimize renderer settings for mobile
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: !isMobile, // Disable antialiasing on mobile for performance
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  });
  
  // Set renderer size to match container
  renderer.setSize(finalSize, finalSize);
  // Cap pixel ratio on mobile for better performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  
  // Center the canvas element with CSS
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.margin = '0 auto';
  renderer.domElement.style.position = 'relative';
  
  container.appendChild(renderer.domElement);

  // Lighting for main scene - Theme-aware lighting
  const ambientLight = new THREE.AmbientLight(0xE91E63, 1.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add strong lights for dramatic shadow effect
  const pinkLight1 = new THREE.PointLight(0xE91E63, 3.0, 100);
  pinkLight1.position.set(-5, 5, 5);
  scene.add(pinkLight1);

  const pinkLight2 = new THREE.PointLight(0xFF69B4, 2.5, 100);
  pinkLight2.position.set(5, -3, 3);
  scene.add(pinkLight2);

  // Add another light from bottom for more coverage
  const pinkLight3 = new THREE.PointLight(0xE91E63, 2.0, 100);
  pinkLight3.position.set(0, -5, 2);
  scene.add(pinkLight3);

  // Add rim light for edge definition
  const rimLight = new THREE.DirectionalLight(0xE91E63, 1.5);
  rimLight.position.set(-5, 0, -5);
  scene.add(rimLight);
  
  // Function to update lighting based on theme
  function updateLighting() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
      // Dark mode: Use dark/neutral lighting for dark shadows
      ambientLight.color.setHex(0x808080); // Neutral gray
      ambientLight.intensity = 0.8;
      pinkLight1.color.setHex(0x404040); // Dark gray
      pinkLight1.intensity = 2.0;
      pinkLight2.color.setHex(0x505050); // Slightly lighter gray
      pinkLight2.intensity = 1.5;
      pinkLight3.color.setHex(0x404040); // Dark gray
      pinkLight3.intensity = 1.2;
      rimLight.color.setHex(0x606060); // Medium gray for rim
      rimLight.intensity = 1.0;
    } else {
      // Light mode: Use pink lighting for pink ambient occlusion
      ambientLight.color.setHex(0xE91E63); // Pink
      ambientLight.intensity = 1.5;
      pinkLight1.color.setHex(0xE91E63); // Primary pink
      pinkLight1.intensity = 3.0;
      pinkLight2.color.setHex(0xFF69B4); // Hot pink
      pinkLight2.intensity = 2.5;
      pinkLight3.color.setHex(0xE91E63); // Primary pink
      pinkLight3.intensity = 2.0;
      rimLight.color.setHex(0xE91E63); // Pink rim
      rimLight.intensity = 1.5;
    }
  }

  // Load your GLTF logo
  const loader = new THREE.GLTFLoader();
  let logo = null;
  // backgroundLogo declared above in the reuse check
  
  // Function to update logo colors based on theme
  function updateLogoColors() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    console.log('🎨 Updating logo colors. Dark mode:', isDarkMode);
    
    // Update lighting
    updateLighting();
    console.log('✅ Lighting updated');
    
    if (logo) {
      logo.traverse((child) => {
        if (child.isMesh) {
          if (isDarkMode) {
            child.material.color.setHex(0xF50057); // Primary-dark color for dark mode
            child.material.emissive.setHex(0xF50057); // Matching emissive glow
            child.material.emissiveIntensity = 0.3;
          } else {
            child.material.color.setHex(0x000000); // Black base color for light mode
            child.material.emissive.setHex(0x1a0010); // Very subtle dark pink glow
            child.material.emissiveIntensity = 0.2;
          }
        }
      });
      console.log('✅ Main logo colors updated');
    }
    
    // Use persistentBackgroundLogo instead of local backgroundLogo variable
    if (persistentBackgroundLogo) {
      persistentBackgroundLogo.traverse((child) => {
        if (child.isMesh) {
          if (isDarkMode) {
            child.material.color.setHex(0xFF4081); // Brighter pink for dark mode background
            child.material.emissive.setHex(0xFF4081);
          } else {
            child.material.color.setHex(0xE91E63); // Primary pink color for light mode
            child.material.emissive.setHex(0xE91E63);
          }
        }
      });
      console.log('✅ Background logo colors updated');
    }
  }
  
  loader.load('/images/logo.gltf', (gltf) => {
    // First, create main logo
    logo = gltf.scene;
    
    // Apply material with theme-aware colors
    logo.traverse((child) => {
      if (child.isMesh) {
        child.material.color.setHex(0x000000); // Black base color
        child.material.metalness = 0.7; // Higher metalness for better light reflection
        child.material.roughness = 0.3; // Lower roughness for shinier surface
        child.material.emissive.setHex(0x1a0010); // Very subtle dark pink glow
        child.material.emissiveIntensity = 0.2;
      }
    });
    
    // Apply initial theme colors
    updateLogoColors();
    
    // Calculate proper scale to fit the container
    const box = new THREE.Box3().setFromObject(logo);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDimension; // Scale to fit in a 3-unit cube
    
    logo.scale.set(scale, scale, scale);
    logo.position.set(0, 0, 0);
    scene.add(logo);
    
    // Only create background logo if it doesn't exist yet and not on mobile
    if (!persistentBackgroundLogo && !isMobile && bgScene) {
      console.log('🎨 Creating background logo');
      
      // Clone for background logo (full screen)
      backgroundLogo = gltf.scene.clone();
      
      // Apply blurred/transparent material to background logo
      backgroundLogo.traverse((child) => {
        if (child.isMesh) {
          child.material = child.material.clone(); // Clone material to avoid affecting main logo
          child.material.color.setHex(0xE91E63); // Primary pink color
          child.material.metalness = 0.4;
          child.material.roughness = 0.8; // Higher roughness for softer appearance
          child.material.transparent = true;
          child.material.opacity = 0.15; // More transparent for subtle background effect
          child.material.emissive.setHex(0xE91E63); // Pink emissive glow
          child.material.emissiveIntensity = 0.3;
        }
      });
      
      // Scale background logo 2.5x (half of previous 5x)
      const bgScale = scale * 2.5;
      backgroundLogo.scale.set(bgScale, bgScale, bgScale);
      backgroundLogo.position.set(0, 0, 0);
      bgScene.add(backgroundLogo);
      
      // Store for reuse
      persistentBackgroundLogo = backgroundLogo;
      
      // Apply initial theme colors to background logo
      updateLogoColors();
    } else {
      console.log('✅ Reusing existing background logo');
      backgroundLogo = persistentBackgroundLogo;
    }
    
    // Start cursor interaction
    initCursorInteraction();
    
    // Listen for theme changes and update logo colors
    window.addEventListener('themeChanged', () => {
      console.log('🎨 Theme changed - updating logo colors');
      updateLogoColors();
    });
    
    console.log('3D Logo loaded successfully');
  }, undefined, (error) => {
    console.error('Error loading GLTF:', error);
    // Fallback: show a message
    container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary);">3D Logo Loading...</div>';
  });

  camera.position.set(0, 0, 5); // More head-on view

  // Cursor interaction variables
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let isMouseMoving = false;
  let mouseIdleTimeout;
  
  // Drag-to-spin variables
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let manualRotationX = 0;
  let manualRotationY = 0;
  let lastDragTime = 0;
  let dragIdleTimeout;

  function initCursorInteraction() {
    // Get the fidget hint element
    const fidgetHint = document.getElementById('logo-fidget-hint');
    let hintHidden = false;
    
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Update hint text based on device type
    if (fidgetHint) {
      const hintLabel = fidgetHint.querySelector('.fidget-label');
      if (hintLabel) {
        if (isTouchDevice) {
          hintLabel.textContent = 'Touch and drag to spin';
        } else {
          hintLabel.textContent = 'Drag to spin • Hover to tilt';
        }
      }
    }
    
    // Function to hide the hint on first interaction
    function hideHintOnFirstInteraction() {
      if (!hintHidden && fidgetHint) {
        fidgetHint.classList.add('hidden');
        hintHidden = true;
      }
    }
    
    // Function to get coordinates from event (works for both mouse and touch)
    function getEventCoordinates(e) {
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
      return {
        x: e.clientX,
        y: e.clientY
      };
    }
    
    // Hover interaction (subtle tilt) - Desktop only
    if (!isTouchDevice) {
      container.addEventListener('mousemove', (e) => {
        if (isDragging) return; // Don't do hover effect while dragging
        
        // Hide hint on first hover
        hideHintOnFirstInteraction();
        
        isMouseMoving = true;
        
        // Clear any existing timeout
        clearTimeout(mouseIdleTimeout);
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Limit rotation to 30 degrees maximum (0.52 radians)
        targetRotationY = Math.max(-0.52, Math.min(0.52, (deltaX / rect.width) * 0.52));
        targetRotationX = Math.max(-0.52, Math.min(0.52, -(deltaY / rect.height) * 0.52));
        
        // Set timeout to return to idle animation
        mouseIdleTimeout = setTimeout(() => {
          isMouseMoving = false;
          targetRotationX = 0;
          targetRotationY = 0;
        }, 1000);
      });
    }

    // Function to start dragging
    function startDrag(clientX, clientY) {
      hideHintOnFirstInteraction();
      
      isDragging = true;
      isMouseMoving = false;
      previousMouseX = clientX;
      previousMouseY = clientY;
      velocityX = 0;
      velocityY = 0;
      clearTimeout(dragIdleTimeout);
      
      if (!isTouchDevice) {
        container.style.cursor = 'grabbing';
      }
    }

    // Function to handle drag move
    function handleDragMove(clientX, clientY) {
      if (!isDragging) return;

      const deltaX = clientX - previousMouseX;
      const deltaY = clientY - previousMouseY;

      // Update rotation based on drag distance (increased sensitivity for mobile)
      const sensitivity = isTouchDevice ? 0.015 : 0.01;
      manualRotationY += deltaX * sensitivity;
      manualRotationX -= deltaY * sensitivity;

      // Calculate velocity for momentum
      velocityX = deltaY * sensitivity;
      velocityY = deltaX * sensitivity;

      previousMouseX = clientX;
      previousMouseY = clientY;
      lastDragTime = Date.now();
    }

    // Function to end dragging
    function endDrag() {
      if (isDragging) {
        isDragging = false;
        
        if (!isTouchDevice) {
          container.style.cursor = 'grab';
        }
        
        // Check if there was recent movement for momentum
        const timeSinceLastDrag = Date.now() - lastDragTime;
        if (timeSinceLastDrag > 50) {
          // If no movement for a while, kill velocity
          velocityX = 0;
          velocityY = 0;
        }

        // Set timeout to return to idle animation (5 seconds after stopping)
        dragIdleTimeout = setTimeout(() => {
          isMouseMoving = false;
          targetRotationX = 0;
          targetRotationY = 0;
          manualRotationX = 0;
          manualRotationY = 0;
        }, 5000);
      }
    }

    // Mouse events (Desktop)
    container.addEventListener('mousedown', (e) => {
      const coords = getEventCoordinates(e);
      startDrag(coords.x, coords.y);
    });

    window.addEventListener('mousemove', (e) => {
      const coords = getEventCoordinates(e);
      handleDragMove(coords.x, coords.y);
    });

    window.addEventListener('mouseup', () => {
      endDrag();
    });

    // Touch events (Mobile)
    container.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Prevent scrolling
      const coords = getEventCoordinates(e);
      startDrag(coords.x, coords.y);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling while dragging
      const coords = getEventCoordinates(e);
      handleDragMove(coords.x, coords.y);
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (isDragging) {
        e.preventDefault(); // Prevent click/tap after drag
      }
      endDrag();
    }, { passive: false });

    window.addEventListener('touchcancel', () => {
      endDrag();
    });

    // Set initial cursor style (Desktop only)
    if (!isTouchDevice) {
      container.style.cursor = 'grab';
    }
  }

  // Handle window resize for background (only add once, desktop only)
  if (!existingBgCanvas && !isMobile) {
    window.addEventListener('resize', () => {
      if (persistentBgCamera && persistentBgRenderer && !isMobile) {
        persistentBgCamera.aspect = window.innerWidth / window.innerHeight;
        persistentBgCamera.updateProjectionMatrix();
        persistentBgRenderer.setSize(window.innerWidth, window.innerHeight);
        persistentBgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });
  }

  // Handle window resize for main logo (responsive sizing)
  // Store references in a way accessible to resize handler
  const logoContainer = container;
  const logoRenderer = renderer;
  const logoCamera = camera;
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    // Debounce resize events for better performance
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (logoContainer && logoRenderer && logoCamera) {
        // Get new container size
        const containerRect = logoContainer.getBoundingClientRect();
        const width = containerRect.width || logoContainer.offsetWidth || 400;
        const height = containerRect.height || logoContainer.offsetHeight || 400;
        const containerSize = Math.min(width, height);
        const newSize = Math.min(Math.max(containerSize, 200), 400);
        
        // Update renderer size
        logoRenderer.setSize(newSize, newSize);
        logoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Camera aspect ratio is 1:1 (square), so no need to update
        // But update projection matrix just in case
        logoCamera.updateProjectionMatrix();
      }
    }, 100);
  });

  // Animation loop with mobile optimization
  let lastFrameTime = 0;
  const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile
  const frameInterval = 1000 / targetFPS;
  
  function animate(currentTime) {
    // Throttle animation on mobile for better performance
    if (isMobile) {
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (deltaTime % frameInterval);
    }
    
    requestAnimationFrame(animate);
    
    if (logo) {
      if (isDragging) {
        // Direct drag control - apply manual rotation
        logo.rotation.x = manualRotationX;
        logo.rotation.y = manualRotationY;
        
        // Background logo follows exactly the same rotation
        if (persistentBackgroundLogo) {
          persistentBackgroundLogo.rotation.x = manualRotationX;
          persistentBackgroundLogo.rotation.y = manualRotationY;
        }
      } else if (Math.abs(velocityX) > 0.001 || Math.abs(velocityY) > 0.001) {
        // Apply momentum after drag release
        manualRotationX -= velocityX;
        manualRotationY += velocityY;
        logo.rotation.x = manualRotationX;
        logo.rotation.y = manualRotationY;
        
        // Background logo follows exactly
        if (persistentBackgroundLogo) {
          persistentBackgroundLogo.rotation.x = manualRotationX;
          persistentBackgroundLogo.rotation.y = manualRotationY;
        }
        
        // Dampen velocity (friction)
        velocityX *= 0.95;
        velocityY *= 0.95;
        
        // Reset velocity when it gets very small
        if (Math.abs(velocityX) < 0.001) velocityX = 0;
        if (Math.abs(velocityY) < 0.001) velocityY = 0;
        
        // Reset drag idle timeout while spinning
        clearTimeout(dragIdleTimeout);
        dragIdleTimeout = setTimeout(() => {
          isMouseMoving = false;
          targetRotationX = 0;
          targetRotationY = 0;
          manualRotationX = 0;
          manualRotationY = 0;
        }, 5000);
      } else if (isMouseMoving) {
        // Hover interaction - smooth rotation
        logo.rotation.x += (targetRotationX - logo.rotation.x) * 0.1;
        logo.rotation.y += (targetRotationY - logo.rotation.y) * 0.1;
        
        // Background logo follows exactly
        if (persistentBackgroundLogo) {
          persistentBackgroundLogo.rotation.x = logo.rotation.x;
          persistentBackgroundLogo.rotation.y = logo.rotation.y;
        }
      } else {
        // Idle animation - gentle floating and oscillating rotation (back and forth)
        const time = Date.now() * 0.0005; // Slower time for gentle movement
        
        // Oscillate between -60 and 60 degrees (converted to radians: ±1.047)
        const targetY = Math.sin(time) * 1.047; // -60° to 60° oscillation
        const targetX = Math.sin(time * 0.7) * 0.15; // Slight up/down tilt
        
        // Smooth floating motion
        logo.position.y = Math.sin(time * 2) * 0.1;
        
        // Very slowly and smoothly interpolate to target rotation
        logo.rotation.x += (targetX - logo.rotation.x) * 0.01;
        logo.rotation.y += (targetY - logo.rotation.y) * 0.01;
        
        // Background logo follows exactly the same rotation
        if (persistentBackgroundLogo) {
          persistentBackgroundLogo.rotation.x = logo.rotation.x;
          persistentBackgroundLogo.rotation.y = logo.rotation.y;
        }
      }
    }
    
    // Render scenes (skip background on mobile)
    if (bgRenderer && bgScene && bgCamera && !isMobile) {
      bgRenderer.render(bgScene, bgCamera);
    }
    renderer.render(scene, camera);
    
    // Continue animation loop (handled at start of function)
    if (!isMobile) {
      // Desktop: already called requestAnimationFrame at start
    }
  }
  
  animate(0);
}

function initAboutPage() {
  console.log('About page initialized');
  // Add about page specific functionality here
}

// Global variable to store all projects for filtering
let allProjects = [];

function initProjectsPage() {
  console.log('Projects page initialized');
  loadProjectsFromJSON();
}

/**
 * Load projects from JSON file and render them
 */
async function loadProjectsFromJSON() {
  const projectsGrid = document.getElementById('projects-grid');
  
  if (!projectsGrid) {
    console.error('Projects grid not found');
    return;
  }
  
  try {
    console.log('Fetching projects from JSON...');
    const response = await fetch('/data/projects.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    allProjects = data.projects.filter(p => p.published); // Only show published projects
    
    console.log(`Loaded ${allProjects.length} projects`);
    
    if (allProjects.length === 0) {
      projectsGrid.innerHTML = '<p class="no-projects">No projects to display yet. Check back soon!</p>';
      return;
    }
    
    // Sort by display order
    allProjects.sort((a, b) => a.displayOrder - b.displayOrder);
    
    // Populate technology filter
    populateTechnologyFilter(allProjects);
    
    // Setup filter event listeners
    setupProjectFilters();
    
    // Render all projects initially
    renderProjects(allProjects);
    
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsGrid.innerHTML = `
      <div class="error-message">
        <p>Failed to load projects. Please try again later.</p>
        <small>Error: ${error.message}</small>
      </div>
    `;
  }
}

/**
 * Render projects to the grid
 */
function renderProjects(projects) {
  const projectsGrid = document.getElementById('projects-grid');
  const resultsCount = document.getElementById('results-count');
  
  if (projects.length === 0) {
    projectsGrid.innerHTML = `
      <div class="no-results">
        <h3>No projects found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>
    `;
    if (resultsCount) {
      resultsCount.textContent = 'No results';
    }
    return;
  }
  
  // Update results count
  if (resultsCount) {
    resultsCount.textContent = `${projects.length} project${projects.length !== 1 ? 's' : ''} found`;
  }
  
  // Render project cards
  projectsGrid.innerHTML = projects.map(project => {
    const description = escapeHtml(project.description);
    const maxLength = 150; // Character limit for preview
    const needsCollapse = description.length > maxLength;
    const preview = needsCollapse ? description.substring(0, maxLength) + '...' : description;
    
    return `
      <div class="project-card" data-project-id="${project.id}">
        <div class="project-image">
          ${project.imageUrl 
            ? `<img src="${project.imageUrl}" alt="${escapeHtml(project.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'image-placeholder\\'>🚀</div>'">`
            : '<div class="image-placeholder">🚀</div>'
          }
        </div>
        <div class="project-content">
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <div class="project-description-container">
            <p class="project-description-preview">${preview}</p>
            ${needsCollapse ? `
              <p class="project-description-full">${description}</p>
              <button class="description-toggle" onclick="toggleDescription(${project.id})">
                <span class="toggle-text">Show more</span>
                <span class="toggle-icon">▼</span>
              </button>
            ` : ''}
          </div>
          <div class="project-tech">
            ${project.technologies.map(tech => 
              `<span class="tech-tag">${escapeHtml(tech)}</span>`
            ).join('')}
          </div>
          <div class="project-links">
            ${project.liveUrl ? 
              `<a href="${escapeHtml(project.liveUrl)}" class="project-link" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                View Live
              </a>` 
              : ''
            }
            ${project.codeUrl ? 
              `<a href="${escapeHtml(project.codeUrl)}" class="project-link" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                View Code
              </a>` 
              : ''
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Populate the technology filter dropdown
 */
function populateTechnologyFilter(projects) {
  const filterTech = document.getElementById('filter-tech');
  if (!filterTech) return;
  
  // Collect all unique technologies
  const allTechs = new Set();
  projects.forEach(project => {
    project.technologies.forEach(tech => allTechs.add(tech));
  });
  
  // Sort technologies alphabetically
  const sortedTechs = Array.from(allTechs).sort();
  
  // Populate dropdown (keep the "All Technologies" option)
  const options = sortedTechs.map(tech => 
    `<option value="${escapeHtml(tech)}">${escapeHtml(tech)}</option>`
  ).join('');
  
  filterTech.innerHTML = '<option value="">All Technologies</option>' + options;
}

/**
 * Setup event listeners for filters
 */
function setupProjectFilters() {
  const searchInput = document.getElementById('search-projects');
  const techFilter = document.getElementById('filter-tech');
  
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
  
  if (techFilter) {
    techFilter.addEventListener('change', applyFilters);
  }
}

/**
 * Apply filters to projects
 */
function applyFilters() {
  const searchInput = document.getElementById('search-projects');
  const techFilter = document.getElementById('filter-tech');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedTech = techFilter ? techFilter.value : '';
  
  let filteredProjects = [...allProjects];
  
  // Apply technology filter
  if (selectedTech) {
    filteredProjects = filteredProjects.filter(project => 
      project.technologies.includes(selectedTech)
    );
  }
  
  // Apply search filter
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(searchTerm);
      const descMatch = project.description.toLowerCase().includes(searchTerm);
      const techMatch = project.technologies.some(tech => 
        tech.toLowerCase().includes(searchTerm)
      );
      return titleMatch || descMatch || techMatch;
    });
  }
  
  renderProjects(filteredProjects);
}

/**
 * Toggle project description visibility
 * @param {number} projectId - The ID of the project to toggle
 */
function toggleDescription(projectId) {
  const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
  if (!projectCard) return;
  
  const preview = projectCard.querySelector('.project-description-preview');
  const fullDescription = projectCard.querySelector('.project-description-full');
  const toggleButton = projectCard.querySelector('.description-toggle');
  const toggleText = toggleButton.querySelector('.toggle-text');
  const toggleIcon = toggleButton.querySelector('.toggle-icon');
  
  if (!preview || !fullDescription || !toggleButton) return;
  
  const isExpanded = fullDescription.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse: hide full description, show preview
    fullDescription.classList.remove('expanded');
    preview.style.display = 'block';
    toggleText.textContent = 'Show more';
    toggleIcon.textContent = '▼';
    toggleIcon.classList.remove('expanded');
  } else {
    // Expand: hide preview, show full description
    fullDescription.classList.add('expanded');
    preview.style.display = 'none';
    toggleText.textContent = 'Show less';
    toggleIcon.textContent = '▲';
    toggleIcon.classList.add('expanded');
  }
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * ========================================
 * PROJECTS ADMIN PAGE FUNCTIONALITY
 * ========================================
 */

// Global variables for admin
let adminProjects = [];
let pendingImages = new Map(); // Store uploaded images temporarily
let editingProjectId = null;

function initProjectsAdminPage() {
  console.log('Projects admin page initialized');
  
  // Debug: Check what's in the DOM
  const adminSection = document.querySelector('.admin-section');
  const addBtn = document.getElementById('add-project-btn');
  console.log('🔍 Admin DOM Check:', {
    adminSection: adminSection ? 'Found' : 'NOT FOUND',
    addBtn: addBtn ? 'Found' : 'NOT FOUND',
    appContainer: document.getElementById('app')?.innerHTML?.substring(0, 100)
  });
  
  // Add delay to ensure DOM is ready
  setTimeout(() => {
    loadProjectsForAdmin();
    setupAdminEventListeners();
  }, 100);
}

/**
 * Setup event listeners for admin page
 */
function setupAdminEventListeners() {
  // Add project button
  const addBtn = document.getElementById('add-project-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openProjectModal());
  }

  // Export JSON button
  const exportBtn = document.getElementById('export-json-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportProjectsJSON);
  }

  // Import JSON button
  const importBtn = document.getElementById('import-json-btn');
  if (importBtn) {
    importBtn.addEventListener('click', () => {
      document.getElementById('json-file-input').click();
    });
  }

  // JSON file input
  const jsonFileInput = document.getElementById('json-file-input');
  if (jsonFileInput) {
    jsonFileInput.addEventListener('change', importProjectsJSON);
  }

  // Modal close button
  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  // Cancel button
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeProjectModal);
  }

  // Project form submit
  const projectForm = document.getElementById('project-form');
  if (projectForm) {
    projectForm.addEventListener('submit', handleProjectSave);
  }

  // Image upload
  const imageUploadArea = document.getElementById('image-upload-area');
  const imageUpload = document.getElementById('image-upload');
  
  if (imageUploadArea && imageUpload) {
    imageUploadArea.addEventListener('click', () => imageUpload.click());
    imageUpload.addEventListener('change', handleImageUpload);
    
    // Drag and drop
    imageUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageUploadArea.style.borderColor = 'var(--primary-color)';
    });
    
    imageUploadArea.addEventListener('dragleave', () => {
      imageUploadArea.style.borderColor = 'var(--border-color)';
    });
    
    imageUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      imageUploadArea.style.borderColor = 'var(--border-color)';
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleImageFile(files[0]);
      }
    });
  }

  // Download all images button
  const downloadAllBtn = document.getElementById('download-all-images');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', downloadAllImages);
  }

  // Close modal when clicking outside
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }
}

/**
 * Load projects for admin view
 */
async function loadProjectsForAdmin() {
  const projectsList = document.getElementById('admin-projects-list');
  
  if (!projectsList) {
    console.error('Admin projects list not found');
    return;
  }

  try {
    const response = await fetch('/data/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    adminProjects = data.projects || [];
    
    console.log(`Loaded ${adminProjects.length} projects for admin`);
    renderAdminProjects();
    
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsList.innerHTML = `
      <div class="error-message">
        <p>Failed to load projects. Starting with empty list.</p>
        <small>Error: ${error.message}</small>
      </div>
    `;
    adminProjects = [];
  }
}

/**
 * Render projects in admin list
 */
function renderAdminProjects() {
  const projectsList = document.getElementById('admin-projects-list');
  
  if (adminProjects.length === 0) {
    projectsList.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
        <p>No projects yet. Click "Add Project" to create your first one!</p>
      </div>
    `;
    return;
  }

  // Sort by display order
  const sorted = [...adminProjects].sort((a, b) => a.displayOrder - b.displayOrder);

  projectsList.innerHTML = sorted.map(project => `
    <div class="admin-project-card" data-project-id="${project.id}">
      ${project.imageUrl 
        ? `<img src="${project.imageUrl}" class="project-thumbnail" alt="${escapeHtml(project.title)}" onerror="this.outerHTML='<div class=\\'project-thumbnail placeholder\\'>🚀</div>'">`
        : '<div class="project-thumbnail placeholder">🚀</div>'
      }
      <div class="project-info">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="project-meta">
          <span>📊 Order: ${project.displayOrder}</span>
          <span>🏷️ ${project.technologies.length} technologies</span>
          <span>${project.published ? '✅ Published' : '📝 Draft'}</span>
        </div>
      </div>
      <div class="project-actions-admin">
        <button class="btn btn-sm btn-edit" onclick="editProject(${project.id})">Edit</button>
        <button class="btn btn-sm btn-delete" onclick="deleteProject(${project.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

/**
 * Open project modal for add/edit
 */
function openProjectModal(project = null) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const form = document.getElementById('project-form');
  
  // Reset form
  form.reset();
  document.getElementById('image-preview').classList.remove('show');
  document.getElementById('image-preview').innerHTML = '';
  
  if (project) {
    // Edit mode
    modalTitle.textContent = 'Edit Project';
    editingProjectId = project.id;
    
    document.getElementById('project-id').value = project.id;
    document.getElementById('title').value = project.title;
    document.getElementById('description').value = project.description;
    document.getElementById('technologies').value = project.technologies.join(', ');
    document.getElementById('image-url').value = project.imageUrl || '';
    document.getElementById('live-url').value = project.liveUrl || '';
    document.getElementById('code-url').value = project.codeUrl || '';
    document.getElementById('display-order').value = project.displayOrder;
    document.getElementById('published').checked = project.published;
    
    // Show existing image if available
    if (project.imageUrl) {
      showImagePreview(project.imageUrl, false);
    }
  } else {
    // Add mode
    modalTitle.textContent = 'Add New Project';
    editingProjectId = null;
    
    // Set default display order
    const maxOrder = adminProjects.length > 0 
      ? Math.max(...adminProjects.map(p => p.displayOrder || 0))
      : 0;
    document.getElementById('display-order').value = maxOrder + 1;
  }
  
  modal.style.display = 'flex';
}

/**
 * Close project modal
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
  editingProjectId = null;
}

/**
 * Handle image upload
 */
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    handleImageFile(file);
  }
}

/**
 * Handle image file processing
 */
function handleImageFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageData = e.target.result;
    const filename = file.name;
    
    // Generate a clean filename
    const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const imagePath = `/images/projects/${cleanFilename}`;
    
    // Store image for download later
    pendingImages.set(cleanFilename, imageData);
    
    // Update image URL field
    document.getElementById('image-url').value = imagePath;
    
    // Show preview
    showImagePreview(imageData, true, cleanFilename);
    
    // Update pending images section
    updatePendingImagesSection();
  };
  
  reader.readAsDataURL(file);
}

/**
 * Show image preview
 */
function showImagePreview(imageSrc, showDownloadBtn = false, filename = '') {
  const preview = document.getElementById('image-preview');
  preview.classList.add('show');
  
  preview.innerHTML = `
    <img src="${imageSrc}" alt="Preview">
    ${showDownloadBtn ? `
      <div class="image-preview-actions">
        <button type="button" class="btn btn-sm btn-secondary" onclick="downloadImage('${filename}')">
          Download Image: ${filename}
        </button>
        <button type="button" class="btn btn-sm btn-delete" onclick="removeImage()">
          Remove
        </button>
      </div>
    ` : ''}
  `;
}

/**
 * Remove uploaded image
 */
function removeImage() {
  document.getElementById('image-url').value = '';
  document.getElementById('image-preview').classList.remove('show');
  document.getElementById('image-preview').innerHTML = '';
  document.getElementById('image-upload').value = '';
}

/**
 * Download a single image
 */
function downloadImage(filename) {
  const imageData = pendingImages.get(filename);
  if (!imageData) {
    alert('Image not found');
    return;
  }
  
  const link = document.createElement('a');
  link.href = imageData;
  link.download = filename;
  link.click();
}

/**
 * Update pending images section
 */
function updatePendingImagesSection() {
  const pendingSection = document.getElementById('pending-images');
  const pendingList = document.getElementById('pending-images-list');
  
  if (pendingImages.size === 0) {
    pendingSection.style.display = 'none';
    return;
  }
  
  pendingSection.style.display = 'block';
  
  pendingList.innerHTML = Array.from(pendingImages.entries()).map(([filename, data]) => `
    <div class="pending-image-item">
      <img src="${data}" alt="${filename}">
      <p><small>${filename}</small></p>
      <button class="btn btn-sm btn-secondary" onclick="downloadImage('${filename}')">Download</button>
    </div>
  `).join('');
}

/**
 * Download all pending images
 */
function downloadAllImages() {
  pendingImages.forEach((data, filename) => {
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    link.click();
    
    // Small delay between downloads
    setTimeout(() => {}, 100);
  });
  
  alert(`Downloading ${pendingImages.size} images. Please place them in the /images/projects/ folder.`);
}

/**
 * Handle project save
 */
function handleProjectSave(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const technologies = document.getElementById('technologies').value
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);
  const imageUrl = document.getElementById('image-url').value.trim();
  const liveUrl = document.getElementById('live-url').value.trim();
  const codeUrl = document.getElementById('code-url').value.trim();
  const displayOrder = parseInt(document.getElementById('display-order').value) || 1;
  const published = document.getElementById('published').checked;
  
  // Validation
  if (!title || !description || technologies.length === 0) {
    alert('Please fill in all required fields');
    return;
  }
  
  const project = {
    id: editingProjectId || Date.now(),
    title,
    description,
    technologies,
    imageUrl: imageUrl || null,
    liveUrl: liveUrl || null,
    codeUrl: codeUrl || null,
    displayOrder,
    published
  };
  
  if (editingProjectId) {
    // Update existing project
    const index = adminProjects.findIndex(p => p.id === editingProjectId);
    if (index !== -1) {
      adminProjects[index] = project;
    }
  } else {
    // Add new project
    adminProjects.push(project);
  }
  
  // Re-render and close modal
  renderAdminProjects();
  closeProjectModal();
  
  alert('Project saved! Remember to export JSON when you\'re done editing.');
}

/**
 * Edit a project (called from HTML onclick)
 */
window.editProject = function(id) {
  const project = adminProjects.find(p => p.id === id);
  if (project) {
    openProjectModal(project);
  }
};

/**
 * Delete a project (called from HTML onclick)
 */
window.deleteProject = function(id) {
  if (!confirm('Are you sure you want to delete this project?')) {
    return;
  }
  
  adminProjects = adminProjects.filter(p => p.id !== id);
  renderAdminProjects();
  
  alert('Project deleted! Remember to export JSON to save changes.');
};

/**
 * Export projects as JSON file
 */
function exportProjectsJSON() {
  const jsonData = {
    projects: adminProjects
  };
  
  const dataStr = JSON.stringify(jsonData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'projects.json';
  link.click();
  
  URL.revokeObjectURL(url);
  
  alert('projects.json downloaded! Replace the file in /static/data/ folder.');
}

/**
 * Import projects from JSON file
 */
function importProjectsJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      adminProjects = data.projects || [];
      renderAdminProjects();
      alert(`Successfully imported ${adminProjects.length} projects!`);
    } catch (error) {
      alert('Error parsing JSON file: ' + error.message);
    }
  };
  
  reader.readAsText(file);
  e.target.value = ''; // Reset input
}

/**
 * Enhanced logging system for error tracking
 */

/**
 * Log error with detailed information
 * @param {string} context - Context where error occurred
 * @param {Error} error - The error object
 * @param {Object} additionalData - Additional data to log
 */
function logError(context, error, additionalData = {}) {
  const errorLog = {
    type: 'ERROR',
    context: context,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...additionalData
  };
  
  // Log to console with detailed information
  console.error(`🚨 ${context} Error:`, errorLog);
  
  // Store in localStorage for debugging (limited to last 10 errors)
  try {
    const existingLogs = JSON.parse(localStorage.getItem('portfolio_error_logs') || '[]');
    existingLogs.unshift(errorLog);
    
    // Keep only last 10 errors
    const limitedLogs = existingLogs.slice(0, 10);
    localStorage.setItem('portfolio_error_logs', JSON.stringify(limitedLogs));
    
    console.log('📝 Error logged to localStorage for debugging');
  } catch (storageError) {
    console.warn('⚠️ Could not save error to localStorage:', storageError);
  }
  
  // Send to server if possible (for production monitoring)
  sendErrorToServer(errorLog).catch(err => {
    console.warn('⚠️ Could not send error to server:', err);
  });
}

/**
 * Log successful operations
 * @param {string} context - Context of the success
 * @param {Object} data - Success data to log
 */
function logSuccess(context, data) {
  const successLog = {
    type: 'SUCCESS',
    context: context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...data
  };
  
  console.log(`✅ ${context} Success:`, successLog);
  
  // Store in localStorage for analytics
  try {
    const existingLogs = JSON.parse(localStorage.getItem('portfolio_success_logs') || '[]');
    existingLogs.unshift(successLog);
    
    // Keep only last 20 successes
    const limitedLogs = existingLogs.slice(0, 20);
    localStorage.setItem('portfolio_success_logs', JSON.stringify(limitedLogs));
  } catch (storageError) {
    console.warn('⚠️ Could not save success to localStorage:', storageError);
  }
  
  // Send to server for analytics
  sendSuccessToServer(successLog).catch(err => {
    console.warn('⚠️ Could not send success to server:', err);
  });
}

/**
 * Send error to server for monitoring
 * @param {Object} errorLog - Error log object
 */
async function sendErrorToServer(errorLog) {
  try {
    console.log('📡 Sending error to server:', errorLog);
    
    const response = await fetch('/api/errors', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(errorLog)
    });
    
    if (response.ok) {
      console.log('✅ Error successfully sent to server');
    } else {
      console.warn('⚠️ Server returned non-OK status:', response.status);
    }
    
  } catch (error) {
    console.warn('⚠️ Could not send error to server:', error);
    // Don't throw - this is just logging, shouldn't break the app
  }
}

/**
 * Send success to server for analytics
 * @param {Object} successLog - Success log object
 */
async function sendSuccessToServer(successLog) {
  try {
    console.log('📡 Sending success to server:', successLog);
    
    const response = await fetch('/api/success', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(successLog)
    });
    
    if (response.ok) {
      console.log('✅ Success data sent to server');
    } else {
      console.warn('⚠️ Server returned non-OK status for success:', response.status);
    }
    
  } catch (error) {
    console.warn('⚠️ Could not send success to server:', error);
    // Don't throw - this is just logging, shouldn't break the app
  }
}

/**
 * Get error logs from localStorage for debugging
 */
function getErrorLogs() {
  try {
    const logs = JSON.parse(localStorage.getItem('portfolio_error_logs') || '[]');
    console.log('📋 Recent Error Logs:', logs);
    return logs;
  } catch (error) {
    console.error('❌ Could not retrieve error logs:', error);
    return [];
  }
}

/**
 * Clear error logs from localStorage
 */
function clearErrorLogs() {
  localStorage.removeItem('portfolio_error_logs');
  localStorage.removeItem('portfolio_success_logs');
  console.log('🗑️ Error logs cleared');
}

// Make logging functions available globally for debugging
window.getErrorLogs = getErrorLogs;
window.clearErrorLogs = clearErrorLogs;

// Make toggleDescription function available globally
window.toggleDescription = toggleDescription;

/**
 * Debug panel functions
 */
function toggleDebugPanel() {
  const panel = document.getElementById('debug-panel');
  const toggle = document.getElementById('debug-toggle');
  
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    toggle.textContent = '🐛';
    toggle.title = 'Hide Debug Panel';
  } else {
    panel.style.display = 'none';
    toggle.textContent = '🐛';
    toggle.title = 'Show Debug Panel';
  }
}

function testEmailJS() {
  const output = document.getElementById('debug-output');
  output.innerHTML = '<p>Testing EmailJS...</p>';
  
  try {
    if (typeof emailjs === 'undefined') {
      output.innerHTML += '<p style="color: red;">❌ EmailJS not loaded</p>';
      return;
    }
    
    output.innerHTML += '<p style="color: green;">✅ EmailJS is loaded</p>';
    output.innerHTML += '<p><strong>Service ID:</strong> my-Portfolio</p>';
    output.innerHTML += '<p><strong>Template ID:</strong> template_pzc5ttr</p>';
    output.innerHTML += '<p><strong>Current Key:</strong> KmB9FPxVgOqE3k70c</p>';
    output.innerHTML += '<p style="color: red;">❌ This key format is wrong! It should start with "user_"</p>';
    output.innerHTML += '<p style="color: orange;">⚠️ You need to get your Public Key from:</p>';
    output.innerHTML += '<p><a href="https://dashboard.emailjs.com/admin/account" target="_blank" style="color: blue;">https://dashboard.emailjs.com/admin/account</a></p>';
    output.innerHTML += '<p style="color: blue;">💡 The Public Key should look like: <code>user_xxxxxxxxxxxxxxxx</code></p>';
    output.innerHTML += '<hr>';
    output.innerHTML += '<h4>Template Variables:</h4>';
    output.innerHTML += '<p><strong>name:</strong> {{name}} (sender name)</p>';
    output.innerHTML += '<p><strong>time:</strong> {{time}} (timestamp)</p>';
    output.innerHTML += '<p><strong>message:</strong> {{message}} (message content)</p>';
    output.innerHTML += '<p style="color: green;">✅ Template variables are now being sent correctly</p>';
    
    // Test EmailJS initialization (this will fail until you set the correct Public Key)
    try {
      emailjs.init('KmB9FPxVgOqE3k70c');
      output.innerHTML += '<p style="color: green;">✅ EmailJS initialized successfully</p>';
    } catch (initError) {
      output.innerHTML += `<p style="color: red;">❌ Initialization Error: ${initError.message}</p>`;
      output.innerHTML += '<p style="color: orange;">💡 This is expected - your key format is wrong</p>';
    }
    
  } catch (error) {
    output.innerHTML += `<p style="color: red;">❌ Error: ${error.message}</p>`;
  }
}

// Enhanced getErrorLogs to display in debug panel
function displayErrorLogs() {
  const logs = getErrorLogs();
  const output = document.getElementById('debug-output');
  
  if (logs.length === 0) {
    output.innerHTML = '<p>No error logs found</p>';
    return;
  }
  
  let html = '<h4>Recent Error Logs:</h4>';
  logs.forEach((log, index) => {
    html += `
      <div class="error-log-item">
        <strong>${log.context}</strong> - ${log.timestamp}<br>
        <span style="color: red;">${log.message}</span><br>
        <small>URL: ${log.url}</small>
      </div>
    `;
  });
  
  output.innerHTML = html;
}

// Override getErrorLogs to also display in debug panel
const originalGetErrorLogs = getErrorLogs;
window.getErrorLogs = function() {
  const logs = originalGetErrorLogs();
  displayErrorLogs();
  return logs;
};

function initContactPage() {
  console.log('Contact page initialized');
  
  // Initialize EmailJS
  initEmailJS();
  
  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }
}

/**
 * Initialize EmailJS
 */
function initEmailJS() {
  try {
    // Initialize EmailJS with your PUBLIC KEY (User ID)
    // You need to get this from https://dashboard.emailjs.com/admin/account
    // The Public Key should look like: user_xxxxxxxxxxxxxxxx
    emailjs.init('KmB9FPxVgOqE3k70c'); // Your current key - this might be wrong format
    
    console.log('📧 EmailJS initialized with Public Key');
    
    // Test EmailJS availability
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS library not loaded');
    }
    
    console.log('✅ EmailJS library loaded successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize EmailJS:', error);
    logError('EmailJS Initialization', error);
  }
}

/**
 * Handle contact form submission with EmailJS
 * @param {Event} e - Form submit event
 */
async function handleContactFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Start timing for performance logging
  const startTime = Date.now();
  
  try {
    // Validate form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Log form submission attempt
    console.log('📧 Contact form submission started');
    console.log('📧 Form data:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      messageLength: data.message?.length || 0,
      timestamp: new Date().toISOString()
    });
    
    // Log template variables that will be sent
    const templateVars = {
      name: data.name,
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      time: new Date().toLocaleString(),
      to_name: 'Phoniix'
    };
    console.log('📧 Template variables:', templateVars);
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error('Missing required form fields');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }
    
    // Check EmailJS availability
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS library not loaded');
    }
    
    console.log('📧 Sending email with EmailJS...');
    
    // Send email using EmailJS
    const response = await emailjs.send(
      'my-Portfolio', // Service ID
      'template_pzc5ttr', // Template ID
      {
        name: data.name, // Template variable: {{name}}
        from_name: data.name, // Alternative variable name
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        time: new Date().toLocaleString(), // Template variable: {{time}}
        to_name: 'Phoniix' // Your name
      }
    );
    
    const duration = Date.now() - startTime;
    console.log('✅ Email sent successfully:', response);
    console.log(`⏱️ Email send duration: ${duration}ms`);
    
    // Log successful submission
    logSuccess('Contact Form Submission', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      messageLength: data.message.length,
      duration: duration,
      response: response
    });
    
    // Show success message
    showFormMessage('success', 'Thank you for your message! I will get back to you soon.');
    
    // Reset form
    form.reset();
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ Error sending email:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      duration: duration,
      timestamp: new Date().toISOString()
    });
    
    // Log the error with detailed information
    logError('Contact Form Submission', error, {
      formData: {
        name: form.querySelector('#name')?.value || 'N/A',
        email: form.querySelector('#email')?.value || 'N/A',
        subject: form.querySelector('#subject')?.value || 'N/A',
        messageLength: form.querySelector('#message')?.value?.length || 0
      },
      duration: duration,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
    
    // Determine specific error message based on error type
    let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
    
    if (error.message && error.message.includes('EmailJS library not loaded')) {
      errorMessage = 'Email service is not available. Please try again later or contact me directly.';
    } else if (error.message && error.message.includes('Missing required form fields')) {
      errorMessage = 'Please fill in all required fields.';
    } else if (error.message && error.message.includes('Invalid email format')) {
      errorMessage = 'Please enter a valid email address.';
    } else if (error.message && error.message.includes('Network')) {
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.message && error.message.includes('Public Key is invalid')) {
      errorMessage = 'Email service configuration error. Please contact the website administrator.';
    }
    
    // Show error message
    showFormMessage('error', errorMessage);
    
  } finally {
    // Reset button state
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  }
}

/**
 * Show form message (success or error)
 * @param {string} type - 'success' or 'error'
 * @param {string} message - Message to display
 */
function showFormMessage(type, message) {
  // Remove any existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message-${type}`;
  messageEl.innerHTML = `
    <div class="message-content">
      <span class="message-icon">${type === 'success' ? '✅' : '❌'}</span>
      <span class="message-text">${message}</span>
    </div>
  `;
  
  // Insert after the form
  const form = document.getElementById('contact-form');
  form.parentNode.insertBefore(messageEl, form.nextSibling);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageEl.parentNode) {
      messageEl.remove();
    }
  }, 5000);
}

/**
 * Initialize ambient particles that react to cursor movement
 */
function initAmbientParticles() {
  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Detect mobile/tablet devices
  const isMobile = window.innerWidth <= 768;
  
  // Disable particles on mobile for better performance
  if (isMobile) {
    console.log('📱 Mobile detected - disabling ambient particles for performance');
    return;
  }

  // Create particle container
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-background';
  document.body.prepend(particleContainer);

  // Reduced particle count for better performance
  const particleCount = 60; // Reduced from 100
  const colors = [
    'rgba(233, 30, 99, 0.8)',     // Primary Pink - main brand
    'rgba(248, 187, 217, 0.7)',   // Light Pink - soft
    'rgba(194, 24, 91, 0.75)',    // Dark Pink - rich
    'rgba(255, 105, 180, 0.65)',  // Hot Pink - vibrant
    'rgba(233, 30, 99, 0.5)',     // Primary Pink - subtle
    'rgba(30, 30, 30, 0.6)',      // Dark Gray - almost black
    'rgba(50, 50, 50, 0.55)',     // Charcoal - depth
    'rgba(255, 192, 203, 0.6)'    // Baby Pink - highlight
  ];

  const particles = [];

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'ambient-particle';

    // Random initial position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    // Random size (small for subtlety)
    const size = Math.random() * 6 + 2; // 2-8px

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random depth (for parallax effect)
    const depth = Math.random() * 0.5 + 0.3; // 0.3-0.8

    // Apply styles
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';
    // Remove the transition so it doesn't interfere with transform
    // particle.style.transition = 'transform 0.3s ease-out';

    particleContainer.appendChild(particle);

    // Store particle data for animation
    particles.push({
      element: particle,
      baseX: startX,
      baseY: startY,
      depth: depth,
      currentX: 0,
      currentY: 0,
      orbitRadius: Math.random() * 80 + 30, // Larger orbital radius (30-110px)
      phase: Math.random() * Math.PI * 2 // Random starting phase for variety
    });
  }

  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Update mouse position on move
  window.addEventListener('mousemove', (e) => {
    // Normalize mouse position to -1 to 1 range
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // Smooth animation function with performance optimizations
  let lastFrameTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;
  
  function animateParticles(currentTime) {
    // Throttle to target FPS for better performance
    const deltaTime = currentTime - lastFrameTime;
    if (deltaTime < frameInterval) {
      requestAnimationFrame(animateParticles);
      return;
    }
    lastFrameTime = currentTime - (deltaTime % frameInterval);

    // Smooth mouse tracking (lerp)
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;

    // Calculate rotation angle based on logo's oscillation pattern
    const time = Date.now() * 0.0005; // Same timing as the logo
    const rotationAngle = Math.sin(time) * 1.047; // -60° to 60° oscillation (same as logo)

    // Update particle positions (batch DOM updates for better performance)
    particles.forEach(particle => {
      // More dramatic rotational movement with individual phase offsets
      const particleAngle = rotationAngle + particle.phase;
      const rotationX = Math.sin(particleAngle) * particle.orbitRadius * particle.depth * 1.5; // 1.5x multiplier
      const rotationY = Math.cos(particleAngle) * particle.orbitRadius * particle.depth * 0.8; // Increased Y movement
      
      // Add a subtle wave-like vertical movement
      const waveY = Math.sin(time * 2 + particle.phase) * 15 * particle.depth;

      // Mouse parallax movement (kept same)
      const mouseX_effect = -mouseX * 100 * particle.depth;
      const mouseY_effect = -mouseY * 100 * particle.depth;

      // Combine all movements for dramatic effect
      const targetX = rotationX + mouseX_effect;
      const targetY = rotationY + waveY + mouseY_effect;

      // Apply smooth transition to target position
      particle.currentX += (targetX - particle.currentX) * 0.15;
      particle.currentY += (targetY - particle.currentY) * 0.15;

      // Update particle position (use will-change for GPU acceleration)
      particle.element.style.transform = `translate3d(${particle.currentX}px, ${particle.currentY}px, 0)`;
    });

    requestAnimationFrame(animateParticles);
  }

  // Start animation loop
  animateParticles();
}


