/**
 * GeoForecast Dashboard - Shared JavaScript Utilities
 * Core functionality for all pages
 */

(function() {
  'use strict';

  // ============================================
  // 1. Lucide Icons Initialization
  // ============================================
  
  function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    } else {
      // Retry after a short delay if lucide isn't loaded yet
      setTimeout(initLucideIcons, 100);
    }
  }

  // ============================================
  // 2. Bandwidth Detection & Mode Setting
  // ============================================
  
  const BandwidthManager = {
    mode: 'high',
    
    detect() {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        const saveData = connection.saveData;
        
        if (saveData || effectiveType === '2g' || effectiveType === 'slow-2g') {
          this.mode = 'low';
        } else if (effectiveType === '3g') {
          this.mode = 'medium';
        } else {
          this.mode = 'high';
        }
        
        // Listen for connection changes
        connection.addEventListener('change', () => this.detect());
      }
      
      // Check for saved preference
      const savedMode = this.getStoredMode();
      if (savedMode) {
        this.mode = savedMode;
      }
      
      // Check URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const urlMode = urlParams.get('bandwidth');
      if (urlMode && ['high', 'medium', 'low'].includes(urlMode)) {
        this.mode = urlMode;
      }
      
      this.apply();
      return this.mode;
    },
    
    set(mode) {
      if (['high', 'medium', 'low'].includes(mode)) {
        this.mode = mode;
        this.apply();
        this.storeMode(mode);
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('bandwidthchange', { 
          detail: { mode: mode } 
        }));
      }
    },
    
    apply() {
      document.documentElement.setAttribute('data-bandwidth', this.mode);
      document.documentElement.classList.remove('bandwidth-high', 'bandwidth-medium', 'bandwidth-low');
      document.documentElement.classList.add(`bandwidth-${this.mode}`);
      
      // Store globally for other scripts
      window.__BANDWIDTH_MODE__ = this.mode;
    },
    
    getStoredMode() {
      try {
        return localStorage.getItem('geoForecast_bandwidth');
      } catch (e) {
        return null;
      }
    },
    
    storeMode(mode) {
      try {
        localStorage.setItem('geoForecast_bandwidth', mode);
      } catch (e) {
        console.warn('Could not store bandwidth mode');
      }
    },
    
    clearStoredMode() {
      try {
        localStorage.removeItem('geoForecast_bandwidth');
      } catch (e) {
        console.warn('Could not clear bandwidth mode');
      }
    },
    
    isHigh() { return this.mode === 'high'; },
    isMedium() { return this.mode === 'medium'; },
    isLow() { return this.mode === 'low'; }
  };

  // ============================================
  // 3. Mobile Navigation Toggle
  // ============================================
  
  const MobileNav = {
    sidebar: null,
    overlay: null,
    toggle: null,
    close: null,
    
    init() {
      this.sidebar = document.getElementById('sidebar');
      this.overlay = document.getElementById('sidebar-overlay');
      this.toggle = document.getElementById('mobile-menu-toggle');
      this.close = document.getElementById('sidebar-close');
      
      if (this.toggle) {
        this.toggle.addEventListener('click', () => this.toggleSidebar());
      }
      
      if (this.close) {
        this.close.addEventListener('click', () => this.closeSidebar());
      }
      
      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeSidebar());
      }
      
      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.closeSidebar();
        }
      });
      
      // Close when clicking nav links on mobile
      const navLinks = document.querySelectorAll('.sidebar__link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            this.closeSidebar();
          }
        });
      });
    },
    
    openSidebar() {
      if (this.sidebar) {
        this.sidebar.classList.add('is-open');
        if (this.overlay) this.overlay.classList.add('is-open');
        if (this.toggle) this.toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    },
    
    closeSidebar() {
      if (this.sidebar) {
        this.sidebar.classList.remove('is-open');
        if (this.overlay) this.overlay.classList.remove('is-open');
        if (this.toggle) this.toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    },
    
    toggleSidebar() {
      if (this.isOpen()) {
        this.closeSidebar();
      } else {
        this.openSidebar();
      }
    },
    
    isOpen() {
      return this.sidebar && this.sidebar.classList.contains('is-open');
    }
  };

  // ============================================
  // 4. Smooth Scroll Utility
  // ============================================
  
  function smoothScrollTo(target, offset = 0) {
    let element;
    
    if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = target;
    }
    
    if (element) {
      const headerOffset = offset || document.querySelector('.header')?.offsetHeight || 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: BandwidthManager.isLow() ? 'auto' : 'smooth'
      });
    }
  }

  // ============================================
  // 5. IntersectionObserver Helper
  // ============================================
  
  const ScrollAnimations = {
    observer: null,
    
    init(selector = '.animate-on-scroll', options = {}) {
      if (BandwidthManager.isLow()) {
        // Skip animations for low bandwidth
        document.querySelectorAll(selector).forEach(el => {
          el.classList.add('is-visible');
        });
        return;
      }
      
      const defaultOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Optionally unobserve after animation
            if (options.once !== false) {
              this.observer.unobserve(entry.target);
            }
          } else if (options.once === false) {
            entry.target.classList.remove('is-visible');
          }
        });
      }, { ...defaultOptions, ...options });
      
      document.querySelectorAll(selector).forEach(el => {
        this.observer.observe(el);
      });
    },
    
    refresh() {
      if (this.observer) {
        this.observer.disconnect();
        this.init();
      }
    }
  };

  // ============================================
  // 6. LocalStorage Helpers
  // ============================================
  
  const Storage = {
    prefix: 'geoForecast_',
    
    get(key) {
      try {
        const item = localStorage.getItem(this.prefix + key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.warn('Storage get error:', e);
        return null;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn('Storage set error:', e);
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(this.prefix + key);
        return true;
      } catch (e) {
        console.warn('Storage remove error:', e);
        return false;
      }
    },
    
    clear() {
      try {
        Object.keys(localStorage)
          .filter(key => key.startsWith(this.prefix))
          .forEach(key => localStorage.removeItem(key));
        return true;
      } catch (e) {
        console.warn('Storage clear error:', e);
        return false;
      }
    },
    
    getAll() {
      const data = {};
      try {
        Object.keys(localStorage)
          .filter(key => key.startsWith(this.prefix))
          .forEach(key => {
            const shortKey = key.replace(this.prefix, '');
            data[shortKey] = JSON.parse(localStorage.getItem(key));
          });
      } catch (e) {
        console.warn('Storage getAll error:', e);
      }
      return data;
    }
  };

  // ============================================
  // 7. Throttle/Debounce Utilities
  // ============================================
  
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function debounce(func, wait, immediate = false) {
    let timeout;
    return function(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  }

  // ============================================
  // 8. Alert Notification System
  // ============================================
  
  const NotificationSystem = {
    container: null,
    
    init() {
      // Create container if it doesn't exist
      this.container = document.getElementById('toast-container');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    },
    
    show(options) {
      const {
        type = 'info',
        title = '',
        message = '',
        duration = 5000,
        dismissible = true
      } = options;
      
      const toast = document.createElement('div');
      toast.className = `toast toast--${type}`;
      toast.setAttribute('role', 'alert');
      
      const iconMap = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
      };
      
      toast.innerHTML = `
        <i data-lucide="${iconMap[type] || 'info'}" class="toast__icon" aria-hidden="true"></i>
        <div class="toast__content">
          ${title ? `<div class="toast__title">${title}</div>` : ''}
          ${message ? `<div class="toast__message">${message}</div>` : ''}
        </div>
        ${dismissible ? `
          <button class="toast__close" aria-label="Close notification">
            <i data-lucide="x" aria-hidden="true"></i>
          </button>
        ` : ''}
      `;
      
      // Add close functionality
      if (dismissible) {
        const closeBtn = toast.querySelector('.toast__close');
        closeBtn.addEventListener('click', () => this.dismiss(toast));
      }
      
      // Auto dismiss
      if (duration > 0) {
        setTimeout(() => this.dismiss(toast), duration);
      }
      
      this.container.appendChild(toast);
      
      // Initialize icons in the toast
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ nodes: [toast] });
      }
      
      return toast;
    },
    
    dismiss(toast) {
      toast.classList.add('toast--exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    },
    
    success(message, title = 'Success') {
      return this.show({ type: 'success', title, message });
    },
    
    error(message, title = 'Error') {
      return this.show({ type: 'error', title, message });
    },
    
    warning(message, title = 'Warning') {
      return this.show({ type: 'warning', title, message });
    },
    
    info(message, title = 'Information') {
      return this.show({ type: 'info', title, message });
    }
  };

  // ============================================
  // 9. Utility Functions
  // ============================================
  
  function formatNumber(num, decimals = 0) {
    if (num === null || num === undefined) return '-';
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function formatDate(date, options = {}) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return d.toLocaleDateString('en-US', { ...defaultOptions, ...options });
  }

  function formatRelativeTime(date) {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now - then;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
  }

  function getSeverityColor(score) {
    if (score >= 76) return 'critical';
    if (score >= 51) return 'high';
    if (score >= 26) return 'medium';
    return 'low';
  }

  function getSeverityClass(score) {
    return `severity-${getSeverityColor(score)}`;
  }

  // ============================================
  // 10. Keyboard Shortcuts
  // ============================================
  
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Alt + key shortcuts
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            window.location.href = 'index.html';
            break;
          case '2':
            e.preventDefault();
            window.location.href = 'predictions.html';
            break;
          case '3':
            e.preventDefault();
            window.location.href = 'timeline.html';
            break;
          case '4':
          case 'a':
          case 'A':
            e.preventDefault();
            window.location.href = 'alerts.html';
            break;
          case '5':
          case 's':
          case 'S':
            e.preventDefault();
            window.location.href = 'settings.html';
            break;
        }
      }
      
      // Other shortcuts
      switch (e.key) {
        case '/':
          e.preventDefault();
          const searchInput = document.querySelector('[data-search]');
          if (searchInput) searchInput.focus();
          break;
        case 'Escape':
          // Close modals, dropdowns, etc.
          const openModals = document.querySelectorAll('.modal.is-open');
          openModals.forEach(modal => modal.classList.remove('is-open'));
          break;
      }
    });
  }

  // ============================================
  // 11. Initialize Everything
  // ============================================
  
  function init() {
    // Initialize bandwidth detection
    BandwidthManager.detect();
    
    // Initialize Lucide icons
    initLucideIcons();
    
    // Initialize mobile navigation
    MobileNav.init();
    
    // Initialize scroll animations (if not low bandwidth)
    if (!BandwidthManager.isLow()) {
      ScrollAnimations.init();
    }
    
    // Initialize notification system
    NotificationSystem.init();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('geoForecastReady'));
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================
  // 12. Expose Global API
  // ============================================
  
  window.GeoForecast = {
    // Bandwidth
    BandwidthManager,
    
    // Navigation
    MobileNav,
    
    // Utilities
    smoothScrollTo,
    throttle,
    debounce,
    formatNumber,
    formatDate,
    formatRelativeTime,
    getSeverityColor,
    getSeverityClass,
    
    // Storage
    Storage,
    
    // Notifications
    notify: NotificationSystem,
    
    // Scroll animations
    ScrollAnimations,
    
    // Re-initialize icons
    refreshIcons: initLucideIcons
  };

})();
