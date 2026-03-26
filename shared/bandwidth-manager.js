/**
 * GeoForecast Dashboard - Bandwidth Optimization Manager
 * Detects connection speed and manages feature toggling based on bandwidth mode
 */

(function() {
  'use strict';

  // ============================================
  // 1. Bandwidth Manager Configuration
  // ============================================
  
  const BANDWIDTH_CONFIG = {
    // Storage key
    storageKey: 'geoForecast_bandwidth',
    settingsKey: 'geoForecast_settings',
    
    // Detection settings
    testImageUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    testTimeout: 5000,
    
    // Mode thresholds (in Mbps)
    thresholds: {
      high: 5,    // > 5 Mbps = high
      medium: 1   // > 1 Mbps = medium, <= 1 Mbps = low
    },
    
    // Feature settings per mode
    features: {
      high: {
        use3D: true,
        useTextures: true,
        textureQuality: '4k',
        enableParticles: true,
        enableGlow: true,
        animationFps: 60,
        enableSmoothScroll: true,
        enableHoverEffects: true,
        enableStaggerAnimations: true,
        enableRealTimeUpdates: true,
        updateInterval: 1000,
        useWebSockets: true,
        enableShadows: true,
        antialiasing: true,
        pixelRatio: 'device'
      },
      medium: {
        use3D: true,
        useTextures: true,
        textureQuality: '2k',
        enableParticles: false,
        enableGlow: true,
        animationFps: 30,
        enableSmoothScroll: true,
        enableHoverEffects: true,
        enableStaggerAnimations: true,
        enableRealTimeUpdates: true,
        updateInterval: 5000,
        useWebSockets: false,
        enableShadows: false,
        antialiasing: false,
        pixelRatio: 1
      },
      low: {
        use3D: false,
        useTextures: false,
        textureQuality: '1k',
        enableParticles: false,
        enableGlow: false,
        animationFps: 0,
        enableSmoothScroll: false,
        enableHoverEffects: false,
        enableStaggerAnimations: false,
        enableRealTimeUpdates: false,
        updateInterval: 30000,
        useWebSockets: false,
        enableShadows: false,
        antialiasing: false,
        pixelRatio: 1
      }
    }
  };

  // ============================================
  // 2. Bandwidth Manager Class
  // ============================================
  
  class BandwidthOptimizer {
    constructor() {
      this.mode = 'high';
      this.connection = null;
      this.features = { ...BANDWIDTH_CONFIG.features.high };
      this.listeners = [];
      this.speedTestResults = null;
      this.isManualOverride = false;
      
      this.init();
    }
    
    init() {
      // Get Network Information API if available
      this.connection = navigator.connection || 
                        navigator.mozConnection || 
                        navigator.webkitConnection;
      
      // Check for saved preference first
      const savedMode = this.getStoredMode();
      if (savedMode) {
        this.setMode(savedMode, true);
        this.isManualOverride = true;
      } else {
        // Auto-detect
        this.detect();
      }
      
      // Listen for connection changes
      if (this.connection) {
        this.connection.addEventListener('change', () => {
          if (!this.isManualOverride) {
            this.detect();
          }
        });
      }
      
      // Listen for online/offline events
      window.addEventListener('online', () => {
        this.dispatchEvent('online');
      });
      
      window.addEventListener('offline', () => {
        this.dispatchEvent('offline');
      });
    }
    
    // ============================================
    // 3. Detection Methods
    // ============================================
    
    detect() {
      // Method 1: Network Information API
      if (this.connection) {
        const mode = this.detectFromConnection();
        if (mode) {
          this.setMode(mode);
          return mode;
        }
      }
      
      // Method 2: Speed test
      this.runSpeedTest().then(speed => {
        const mode = this.getModeFromSpeed(speed);
        this.setMode(mode);
      }).catch(() => {
        // Fallback to high mode
        this.setMode('high');
      });
      
      return this.mode;
    }
    
    detectFromConnection() {
      if (!this.connection) return null;
      
      const effectiveType = this.connection.effectiveType;
      const saveData = this.connection.saveData;
      const downlink = this.connection.downlink;
      
      // Data saver mode always uses low
      if (saveData) {
        return 'low';
      }
      
      // Use effectiveType
      switch (effectiveType) {
        case '4g':
          return 'high';
        case '3g':
          return 'medium';
        case '2g':
        case 'slow-2g':
          return 'low';
      }
      
      // Fallback to downlink speed
      if (downlink !== undefined) {
        return this.getModeFromSpeed(downlink);
      }
      
      return null;
    }
    
    async runSpeedTest() {
      return new Promise((resolve, reject) => {
        const startTime = performance.now();
        const image = new Image();
        
        image.onload = () => {
          const endTime = performance.now();
          const duration = (endTime - startTime) / 1000; // seconds
          const bitsLoaded = 8 * 1024; // 1KB test image
          const speedBps = bitsLoaded / duration;
          const speedMbps = speedBps / 1024 / 1024;
          
          this.speedTestResults = {
            speed: speedMbps,
            duration: duration,
            timestamp: Date.now()
          };
          
          resolve(speedMbps);
        };
        
        image.onerror = () => {
          reject(new Error('Speed test failed'));
        };
        
        image.src = BANDWIDTH_CONFIG.testImageUrl + '?t=' + Date.now();
        
        // Timeout
        setTimeout(() => {
          reject(new Error('Speed test timeout'));
        }, BANDWIDTH_CONFIG.testTimeout);
      });
    }
    
    getModeFromSpeed(speedMbps) {
      if (speedMbps >= BANDWIDTH_CONFIG.thresholds.high) {
        return 'high';
      } else if (speedMbps >= BANDWIDTH_CONFIG.thresholds.medium) {
        return 'medium';
      }
      return 'low';
    }
    
    // ============================================
    // 4. Mode Management
    // ============================================
    
    setMode(mode, isManual = false) {
      if (!['high', 'medium', 'low'].includes(mode)) {
        console.warn(`Invalid bandwidth mode: ${mode}`);
        return false;
      }
      
      const previousMode = this.mode;
      this.mode = mode;
      this.isManualOverride = isManual;
      this.features = { ...BANDWIDTH_CONFIG.features[mode] };
      
      // Apply to DOM
      this.applyMode();
      
      // Store if manual
      if (isManual) {
        this.storeMode(mode);
      }
      
      // Dispatch event
      if (previousMode !== mode) {
        this.dispatchEvent('modechange', {
          mode: mode,
          previousMode: previousMode,
          features: this.features,
          isManual: isManual
        });
      }
      
      return true;
    }
    
    applyMode() {
      // Update HTML attributes
      document.documentElement.setAttribute('data-bandwidth', this.mode);
      
      // Update CSS classes
      document.documentElement.classList.remove('bandwidth-high', 'bandwidth-medium', 'bandwidth-low');
      document.documentElement.classList.add(`bandwidth-${this.mode}`);
      
      // Store globally
      window.__BANDWIDTH_MODE__ = this.mode;
      
      // Update any UI indicators
      this.updateUIIndicators();
    }
    
    updateUIIndicators() {
      // Update sidebar bandwidth indicator
      const indicator = document.getElementById('bandwidth-value');
      if (indicator) {
        indicator.textContent = this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
        indicator.className = `sidebar__bandwidth-value bandwidth-${this.mode}`;
      }
      
      // Update settings page if visible
      const radioInputs = document.querySelectorAll('input[name="bandwidth-mode"]');
      radioInputs.forEach(input => {
        input.checked = input.value === this.mode;
      });
      
      // Update radio card styles
      const radioCards = document.querySelectorAll('.radio[data-bandwidth]');
      radioCards.forEach(card => {
        if (card.dataset.bandwidth === this.mode) {
          card.classList.add('radio--selected');
        } else {
          card.classList.remove('radio--selected');
        }
      });
    }
    
    // ============================================
    // 5. Storage Methods
    // ============================================
    
    getStoredMode() {
      try {
        return localStorage.getItem(BANDWIDTH_CONFIG.storageKey);
      } catch (e) {
        console.warn('Could not read bandwidth mode from storage');
        return null;
      }
    }
    
    storeMode(mode) {
      try {
        localStorage.setItem(BANDWIDTH_CONFIG.storageKey, mode);
        return true;
      } catch (e) {
        console.warn('Could not store bandwidth mode');
        return false;
      }
    }
    
    clearStoredMode() {
      try {
        localStorage.removeItem(BANDWIDTH_CONFIG.storageKey);
        this.isManualOverride = false;
        this.detect();
        return true;
      } catch (e) {
        console.warn('Could not clear bandwidth mode');
        return false;
      }
    }
    
    // ============================================
    // 6. Feature Checking
    // ============================================
    
    shouldUse3D() {
      return this.features.use3D;
    }
    
    shouldUseTextures() {
      return this.features.useTextures;
    }
    
    shouldEnableParticles() {
      return this.features.enableParticles;
    }
    
    shouldEnableGlow() {
      return this.features.enableGlow;
    }
    
    shouldEnableAnimations() {
      return this.features.animationFps > 0;
    }
    
    getAnimationFps() {
      return this.features.animationFps;
    }
    
    shouldEnableSmoothScroll() {
      return this.features.enableSmoothScroll;
    }
    
    shouldEnableHoverEffects() {
      return this.features.enableHoverEffects;
    }
    
    shouldEnableStaggerAnimations() {
      return this.features.enableStaggerAnimations;
    }
    
    shouldEnableRealTimeUpdates() {
      return this.features.enableRealTimeUpdates;
    }
    
    getUpdateInterval() {
      return this.features.updateInterval;
    }
    
    shouldUseWebSockets() {
      return this.features.useWebSockets;
    }
    
    shouldEnableShadows() {
      return this.features.enableShadows;
    }
    
    shouldEnableAntialiasing() {
      return this.features.antialiasing;
    }
    
    getPixelRatio() {
      if (this.features.pixelRatio === 'device') {
        return window.devicePixelRatio || 1;
      }
      return this.features.pixelRatio;
    }
    
    getTextureQuality() {
      return this.features.textureQuality;
    }
    
    // ============================================
    // 7. Event System
    // ============================================
    
    addEventListener(event, callback) {
      this.listeners.push({ event, callback });
    }
    
    removeEventListener(event, callback) {
      this.listeners = this.listeners.filter(
        listener => !(listener.event === event && listener.callback === callback)
      );
    }
    
    dispatchEvent(event, data = {}) {
      // Dispatch to internal listeners
      this.listeners
        .filter(listener => listener.event === event)
        .forEach(listener => listener.callback(data));
      
      // Dispatch as custom DOM event
      window.dispatchEvent(new CustomEvent(`bandwidth:${event}`, { detail: data }));
    }
    
    // ============================================
    // 8. Utility Methods
    // ============================================
    
    getMode() {
      return this.mode;
    }
    
    getFeatures() {
      return { ...this.features };
    }
    
    getConnectionInfo() {
      return {
        mode: this.mode,
        effectiveType: this.connection?.effectiveType,
        downlink: this.connection?.downlink,
        rtt: this.connection?.rtt,
        saveData: this.connection?.saveData,
        speedTest: this.speedTestResults,
        isManualOverride: this.isManualOverride
      };
    }
    
    isHigh() {
      return this.mode === 'high';
    }
    
    isMedium() {
      return this.mode === 'medium';
    }
    
    isLow() {
      return this.mode === 'low';
    }
    
    isOnline() {
      return navigator.onLine;
    }
    
    // ============================================
    // 9. Settings Integration
    // ============================================
    
    saveSettings(settings) {
      try {
        const currentSettings = this.loadSettings();
        const newSettings = { ...currentSettings, ...settings };
        localStorage.setItem(BANDWIDTH_CONFIG.settingsKey, JSON.stringify(newSettings));
        return true;
      } catch (e) {
        console.warn('Could not save settings');
        return false;
      }
    }
    
    loadSettings() {
      try {
        const settings = localStorage.getItem(BANDWIDTH_CONFIG.settingsKey);
        return settings ? JSON.parse(settings) : {};
      } catch (e) {
        console.warn('Could not load settings');
        return {};
      }
    }
    
    // ============================================
    // 10. Debug/Testing
    // ============================================
    
    simulateMode(mode) {
      this.setMode(mode, true);
      console.log(`[BandwidthManager] Simulated mode: ${mode}`);
    }
    
    reset() {
      this.clearStoredMode();
      this.detect();
    }
  }

  // ============================================
  // 11. Initialize and Expose
  // ============================================
  
  // Create global instance
  const bandwidthOptimizer = new BandwidthOptimizer();
  
  // Expose globally
  window.BandwidthOptimizer = BandwidthOptimizer;
  window.bandwidthOptimizer = bandwidthOptimizer;
  
  // Also add to GeoForecast namespace
  window.GeoForecast = window.GeoForecast || {};
  window.GeoForecast.Bandwidth = bandwidthOptimizer;
  
  // Dispatch ready event
  window.dispatchEvent(new CustomEvent('bandwidth:ready', {
    detail: { optimizer: bandwidthOptimizer }
  }));

  // ============================================
  // 12. Settings Page Integration
  // ============================================
  
  // Auto-initialize bandwidth controls on settings page
  document.addEventListener('DOMContentLoaded', () => {
    const bandwidthRadios = document.querySelectorAll('input[name="bandwidth-mode"]');
    
    bandwidthRadios.forEach(radio => {
      // Set initial state
      radio.checked = radio.value === bandwidthOptimizer.getMode();
      
      // Handle change
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          bandwidthOptimizer.setMode(e.target.value, true);
          
          // Show notification
          if (window.GeoForecast?.notify) {
            window.GeoForecast.notify.info(
              `Bandwidth mode set to ${e.target.value}. Changes will take effect on page refresh.`,
              'Settings Updated'
            );
          }
        }
      });
    });
    
    // Auto-detect button
    const autoDetectBtn = document.getElementById('bandwidth-auto-detect');
    if (autoDetectBtn) {
      autoDetectBtn.addEventListener('click', () => {
        bandwidthOptimizer.clearStoredMode();
        bandwidthOptimizer.detect();
        
        // Update UI
        bandwidthRadios.forEach(radio => {
          radio.checked = radio.value === bandwidthOptimizer.getMode();
        });
        
        if (window.GeoForecast?.notify) {
          window.GeoForecast.notify.info(
            `Auto-detected bandwidth mode: ${bandwidthOptimizer.getMode()}`,
            'Auto Detection'
          );
        }
      });
    }
    
    // Update connection info display
    const connectionInfo = document.getElementById('connection-info');
    if (connectionInfo) {
      const info = bandwidthOptimizer.getConnectionInfo();
      connectionInfo.innerHTML = `
        <div class="connection-info__item">
          <span class="connection-info__label">Mode:</span>
          <span class="connection-info__value">${info.mode}</span>
        </div>
        <div class="connection-info__item">
          <span class="connection-info__label">Effective Type:</span>
          <span class="connection-info__value">${info.effectiveType || 'N/A'}</span>
        </div>
        <div class="connection-info__item">
          <span class="connection-info__label">Downlink:</span>
          <span class="connection-info__value">${info.downlink ? info.downlink + ' Mbps' : 'N/A'}</span>
        </div>
        <div class="connection-info__item">
          <span class="connection-info__label">RTT:</span>
          <span class="connection-info__value">${info.rtt ? info.rtt + ' ms' : 'N/A'}</span>
        </div>
        <div class="connection-info__item">
          <span class="connection-info__label">Save Data:</span>
          <span class="connection-info__value">${info.saveData ? 'On' : 'Off'}</span>
        </div>
      `;
    }
  });

})();
