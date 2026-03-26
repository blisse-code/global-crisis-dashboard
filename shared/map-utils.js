/**
 * GeoForecast Dashboard - Map/Globe Utilities
 * Three.js globe and D3.js 2D map functionality
 */

(function() {
  'use strict';

  // ============================================
  // 1. Globe Configuration
  // ============================================
  
  const GLOBE_CONFIG = {
    // Default settings
    radius: 200,
    segments: 64,
    rotationSpeed: 0.001,
    autoRotate: true,
    
    // Colors
    oceanColor: 0x1E3A5F,
    landColor: 0x2D5016,
    atmosphereColor: 0x7C3AED,
    markerColor: 0xDC2626,
    
    // Marker settings
    markerSize: 4,
    markerHeight: 10,
    
    // Camera settings
    minDistance: 250,
    maxDistance: 800,
    
    // Texture URLs (can be overridden)
    textures: {
      earth: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      bump: 'https://unpkg.com/three-globe/example/img/earth-topology.png',
      night: 'https://unpkg.com/three-globe/example/img/earth-night.jpg'
    }
  };

  // ============================================
  // 2. Globe Manager Class
  // ============================================
  
  class GlobeManager {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) {
        console.error(`Container #${containerId} not found`);
        return;
      }
      
      this.options = { ...GLOBE_CONFIG, ...options };
      this.bandwidthMode = window.__BANDWIDTH_MODE__ || 'high';
      
      // Three.js components
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.globe = null;
      this.atmosphere = null;
      this.markers = [];
      this.markerGroup = null;
      
      // Controls
      this.controls = null;
      this.isDragging = false;
      this.previousMousePosition = { x: 0, y: 0 };
      
      // Animation
      this.animationId = null;
      this.isAutoRotating = this.options.autoRotate;
      
      // Event callbacks
      this.onMarkerClick = null;
      this.onLocationClick = null;
      
      // Initialize
      this.init();
    }
    
    init() {
      // Skip 3D initialization for low bandwidth
      if (this.bandwidthMode === 'low') {
        this.init2DMap();
        return;
      }
      
      this.initThreeJS();
      this.createGlobe();
      this.createAtmosphere();
      this.createMarkerGroup();
      this.setupControls();
      this.setupEvents();
      this.animate();
      
      // Handle resize
      window.addEventListener('resize', this.onResize.bind(this));
    }
    
    initThreeJS() {
      // Scene
      this.scene = new THREE.Scene();
      
      // Camera
      const aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      this.camera.position.z = 500;
      
      // Renderer
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: this.bandwidthMode === 'high',
        alpha: true 
      });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.renderer.setPixelRatio(
        this.bandwidthMode === 'high' ? window.devicePixelRatio : 1
      );
      this.container.appendChild(this.renderer.domElement);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 1);
      this.scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(100, 100, 50);
      this.scene.add(directionalLight);
      
      // Backlight for atmosphere effect
      const backLight = new THREE.DirectionalLight(0x7C3AED, 0.5);
      backLight.position.set(-100, -100, -50);
      this.scene.add(backLight);
    }
    
    createGlobe() {
      const geometry = new THREE.SphereGeometry(
        this.options.radius,
        this.options.segments,
        this.options.segments
      );
      
      let material;
      
      if (this.bandwidthMode === 'high' && this.options.textures.earth) {
        // High quality with textures
        const textureLoader = new THREE.TextureLoader();
        material = new THREE.MeshPhongMaterial({
          map: textureLoader.load(this.options.textures.earth),
          bumpMap: textureLoader.load(this.options.textures.bump),
          bumpScale: 0.05,
          specular: new THREE.Color(0x333333),
          shininess: 5
        });
      } else {
        // Medium quality - solid colors
        material = new THREE.MeshPhongMaterial({
          color: this.options.oceanColor,
          emissive: 0x000000,
          specular: new THREE.Color(0x333333),
          shininess: 5
        });
      }
      
      this.globe = new THREE.Mesh(geometry, material);
      this.scene.add(this.globe);
      
      // Add simple land masses for medium bandwidth (optional)
      if (this.bandwidthMode === 'medium') {
        this.addSimpleLandMasses();
      }
    }
    
    addSimpleLandMasses() {
      // Simplified continent representations
      const continentGeometry = new THREE.SphereGeometry(
        this.options.radius + 0.5,
        32,
        32
      );
      const continentMaterial = new THREE.MeshPhongMaterial({
        color: this.options.landColor,
        transparent: true,
        opacity: 0.8
      });
      
      // This is a simplified approach - in production, use actual geoJSON data
      const continents = new THREE.Mesh(continentGeometry, continentMaterial);
      this.globe.add(continents);
    }
    
    createAtmosphere() {
      if (this.bandwidthMode === 'low') return;
      
      const atmosphereGeometry = new THREE.SphereGeometry(
        this.options.radius * 1.1,
        32,
        32
      );
      
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: this.options.atmosphereColor,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      });
      
      this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      this.scene.add(this.atmosphere);
      
      // Add glow effect for high bandwidth
      if (this.bandwidthMode === 'high') {
        this.createGlowEffect();
      }
    }
    
    createGlowEffect() {
      const glowGeometry = new THREE.SphereGeometry(
        this.options.radius * 1.2,
        32,
        32
      );
      
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          c: { type: 'f', value: 0.5 },
          p: { type: 'f', value: 4.0 },
          glowColor: { type: 'c', value: new THREE.Color(this.options.atmosphereColor) },
          viewVector: { type: 'v3', value: this.camera.position }
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(0.6 - dot(vNormal, vNormel), 4.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      
      this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
      this.scene.add(this.glow);
    }
    
    createMarkerGroup() {
      this.markerGroup = new THREE.Group();
      this.globe.add(this.markerGroup);
    }
    
    // ============================================
    // 3. Marker Management
    // ============================================
    
    addMarker(lat, lng, options = {}) {
      const {
        color = this.options.markerColor,
        size = this.options.markerSize,
        height = this.options.markerHeight,
        data = {},
        pulsing = false
      } = options;
      
      // Convert lat/lng to 3D position
      const position = this.latLngToVector3(lat, lng, this.options.radius);
      
      // Create marker geometry
      const geometry = new THREE.ConeGeometry(size, height, 8);
      geometry.translate(0, height / 2, 0);
      geometry.rotateX(Math.PI / 2);
      
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3
      });
      
      const marker = new THREE.Mesh(geometry, material);
      marker.position.copy(position);
      marker.lookAt(new THREE.Vector3(0, 0, 0));
      marker.userData = { lat, lng, ...data };
      
      // Add pulse animation for high bandwidth
      if (pulsing && this.bandwidthMode === 'high') {
        this.addPulseAnimation(marker);
      }
      
      this.markerGroup.add(marker);
      this.markers.push(marker);
      
      return marker;
    }
    
    addPulseAnimation(marker) {
      const originalScale = marker.scale.clone();
      
      const pulse = () => {
        const time = Date.now() * 0.002;
        const scale = 1 + Math.sin(time) * 0.2;
        marker.scale.setScalar(scale);
        requestAnimationFrame(pulse);
      };
      
      pulse();
    }
    
    removeMarker(marker) {
      if (this.markerGroup && marker) {
        this.markerGroup.remove(marker);
        const index = this.markers.indexOf(marker);
        if (index > -1) {
          this.markers.splice(index, 1);
        }
        marker.geometry.dispose();
        marker.material.dispose();
      }
    }
    
    clearMarkers() {
      this.markers.forEach(marker => {
        this.markerGroup.remove(marker);
        marker.geometry.dispose();
        marker.material.dispose();
      });
      this.markers = [];
    }
    
    updateMarker(marker, options = {}) {
      if (options.color !== undefined) {
        marker.material.color.setHex(options.color);
        marker.material.emissive.setHex(options.color);
      }
      if (options.data !== undefined) {
        marker.userData = { ...marker.userData, ...options.data };
      }
    }
    
    // ============================================
    // 4. Zoom Controls
    // ============================================
    
    zoomIn(amount = 50) {
      const newZ = Math.max(
        this.options.minDistance,
        this.camera.position.z - amount
      );
      this.animateCamera({ z: newZ });
    }
    
    zoomOut(amount = 50) {
      const newZ = Math.min(
        this.options.maxDistance,
        this.camera.position.z + amount
      );
      this.animateCamera({ z: newZ });
    }
    
    zoomTo(lat, lng, distance = 300) {
      const position = this.latLngToVector3(lat, lng, distance);
      this.animateCamera({
        x: position.x,
        y: position.y,
        z: position.z
      });
    }
    
    resetView() {
      this.animateCamera({ x: 0, y: 0, z: 500 });
      if (this.globe) {
        this.globe.rotation.set(0, 0, 0);
      }
    }
    
    animateCamera(targetPosition, duration = 1000) {
      const startPosition = this.camera.position.clone();
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.easeOutCubic(progress);
        
        if (targetPosition.x !== undefined) {
          this.camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * eased;
        }
        if (targetPosition.y !== undefined) {
          this.camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * eased;
        }
        if (targetPosition.z !== undefined) {
          this.camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * eased;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
    
    easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    
    // ============================================
    // 5. Rotation Controls
    // ============================================
    
    startRotation() {
      this.isAutoRotating = true;
    }
    
    stopRotation() {
      this.isAutoRotating = false;
    }
    
    toggleRotation() {
      this.isAutoRotating = !this.isAutoRotating;
      return this.isAutoRotating;
    }
    
    rotateTo(lat, lng, duration = 1000) {
      // Convert target lat/lng to rotation angles
      const targetRotationY = (lng * Math.PI) / 180;
      const targetRotationX = (lat * Math.PI) / 180;
      
      const startRotationX = this.globe.rotation.x;
      const startRotationY = this.globe.rotation.y;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.easeOutCubic(progress);
        
        this.globe.rotation.x = startRotationX + (targetRotationX - startRotationX) * eased;
        this.globe.rotation.y = startRotationY + (targetRotationY - startRotationY) * eased;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
    
    // ============================================
    // 6. Controls & Events
    // ============================================
    
    setupControls() {
      // Mouse/Touch controls for rotation
      const canvas = this.renderer.domElement;
      
      canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
      canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
      canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
      canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
      
      // Touch events
      canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
      canvas.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
      canvas.addEventListener('touchend', this.onMouseUp.bind(this));
      
      // Scroll to zoom
      canvas.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
      
      // Click for markers
      canvas.addEventListener('click', this.onClick.bind(this));
    }
    
    setupEvents() {
      // Listen for bandwidth changes
      window.addEventListener('bandwidthchange', (e) => {
        this.bandwidthMode = e.detail.mode;
        // Re-initialize if mode changes significantly
        if (this.bandwidthMode === 'low') {
          this.destroy();
          this.init2DMap();
        }
      });
    }
    
    onMouseDown(e) {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
      this.stopRotation();
    }
    
    onMouseMove(e) {
      if (!this.isDragging) return;
      
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;
      
      this.globe.rotation.y += deltaX * 0.005;
      this.globe.rotation.x += deltaY * 0.005;
      
      // Clamp vertical rotation
      this.globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.globe.rotation.x));
      
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }
    
    onMouseUp() {
      this.isDragging = false;
    }
    
    onTouchStart(e) {
      if (e.touches.length === 1) {
        this.onMouseDown(e.touches[0]);
      }
    }
    
    onTouchMove(e) {
      if (e.touches.length === 1) {
        e.preventDefault();
        this.onMouseMove(e.touches[0]);
      }
    }
    
    onWheel(e) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 30 : -30;
      const newZ = Math.max(
        this.options.minDistance,
        Math.min(this.options.maxDistance, this.camera.position.z + delta)
      );
      this.camera.position.z = newZ;
    }
    
    onClick(e) {
      if (this.isDragging) return;
      
      // Raycast to detect marker clicks
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      const rect = this.renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.markers);
      
      if (intersects.length > 0) {
        const marker = intersects[0].object;
        if (this.onMarkerClick) {
          this.onMarkerClick(marker.userData);
        }
      } else {
        // Check for globe click (location)
        const globeIntersects = raycaster.intersectObject(this.globe);
        if (globeIntersects.length > 0) {
          const point = globeIntersects[0].point;
          const latLng = this.vector3ToLatLng(point);
          if (this.onLocationClick) {
            this.onLocationClick(latLng);
          }
        }
      }
    }
    
    onResize() {
      if (!this.camera || !this.renderer) return;
      
      const aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    
    // ============================================
    // 7. Animation Loop
    // ============================================
    
    animate() {
      this.animationId = requestAnimationFrame(this.animate.bind(this));
      
      // Auto-rotate if enabled and not dragging
      if (this.isAutoRotating && !this.isDragging && this.globe) {
        this.globe.rotation.y += this.options.rotationSpeed;
      }
      
      // Update atmosphere glow
      if (this.glow && this.glow.material.uniforms) {
        this.glow.material.uniforms.viewVector.value = this.camera.position;
      }
      
      // Render
      this.renderer.render(this.scene, this.camera);
    }
    
    // ============================================
    // 8. Utility Functions
    // ============================================
    
    latLngToVector3(lat, lng, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      
      return new THREE.Vector3(x, y, z);
    }
    
    vector3ToLatLng(vector) {
      const lat = 90 - (Math.acos(vector.y / this.options.radius) * 180) / Math.PI;
      const lng = ((270 + (Math.atan2(vector.x, vector.z) * 180) / Math.PI) % 360) - 180;
      return { lat, lng };
    }
    
    // ============================================
    // 9. 2D Map Fallback (Low Bandwidth)
    ============================================ */
    
    init2DMap() {
      // Create D3.js 2D map
      this.container.innerHTML = '<div class="map-2d" id="map-2d-container"></div>';
      
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      
      const svg = d3.select('#map-2d-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);
      
      // Create projection
      const projection = d3.geoNaturalEarth1()
        .scale(width / 5.5)
        .translate([width / 2, height / 2]);
      
      const path = d3.geoPath().projection(projection);
      
      // Load world data
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(world => {
          // Draw countries
          svg.append('g')
            .selectAll('path')
            .data(topojson.feature(world, world.objects.countries).features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#' + this.options.landColor.toString(16).padStart(6, '0'))
            .attr('stroke', '#' + this.options.oceanColor.toString(16).padStart(6, '0'))
            .attr('stroke-width', 0.5);
          
          // Store for later use
          this.map2D = { svg, projection, path };
        })
        .catch(err => {
          console.error('Failed to load map data:', err);
          this.container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;">
              <p>Map data unavailable</p>
            </div>
          `;
        });
    }
    
    addMarker2D(lat, lng, options = {}) {
      if (!this.map2D) return;
      
      const { color = '#DC2626', size = 6, data = {} } = options;
      const [x, y] = this.map2D.projection([lng, lat]);
      
      const marker = this.map2D.svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', size)
        .attr('fill', color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');
      
      if (this.onMarkerClick) {
        marker.on('click', () => this.onMarkerClick({ lat, lng, ...data }));
      }
      
      return marker;
    }
    
    // ============================================
    // 10. Cleanup
    // ============================================
    
    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      
      window.removeEventListener('resize', this.onResize.bind(this));
      
      if (this.renderer) {
        this.renderer.dispose();
        if (this.renderer.domElement.parentNode) {
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
      }
      
      this.clearMarkers();
      
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.globe = null;
      this.atmosphere = null;
      this.glow = null;
      this.markerGroup = null;
    }
  }

  // ============================================
  // 11. Expose Global API
  // ============================================
  
  window.GlobeManager = GlobeManager;
  window.GeoForecast = window.GeoForecast || {};
  window.GeoForecast.Globe = {
    create: (containerId, options) => new GlobeManager(containerId, options),
    config: GLOBE_CONFIG
  };

})();
