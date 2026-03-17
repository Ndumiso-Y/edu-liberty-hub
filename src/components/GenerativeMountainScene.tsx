import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * GenerativeMountainScene
 * * Renders a premium, undulating "Nebula Silk" landscape.
 * * Features multi-layered waves and floating gold particles.
 * * Customized with Edu Liberty branding (Navy and Gold).
 */
export function GenerativeMountainScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // SCENE SETUP
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 3);
    camera.rotation.x = -0.3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // GEOMETRY
    const geometry = new THREE.PlaneGeometry(16, 10, 150, 150); 

    // Branding Colors
    const NAVY = "#051125"; // Deeper navy
    const GOLD = "#F5C518";

    // SHADER MATERIAL
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      wireframe: false,
      uniforms: {
        time: { value: 0 },
        pointLightPosition: { value: new THREE.Vector3(0, 0, 5) },
        u_navy: { value: new THREE.Color(NAVY) },
        u_gold: { value: new THREE.Color(GOLD) },
        u_mouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        uniform float time;
        uniform vec2 u_mouse;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;
        
        // --- NOISE ---
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        void main() {
            vNormal = normal;
            vPosition = position;
            
            float mouseInfluence = distance(position.xy, u_mouse * 5.0);
            float mouseFactor = smoothstep(2.0, 0.0, mouseInfluence);
            
            float noiseFreq = 0.3;
            float noiseAmp = 0.6 + mouseFactor * 0.4;
            
            // Layered Silk Waves
            float d = snoise(vec3(position.x * noiseFreq + time * 0.08, position.y * noiseFreq, time * 0.03)) * noiseAmp;
            d += snoise(vec3(position.x * noiseFreq * 2.2 - time * 0.05, position.y * noiseFreq * 1.8, time * 0.08)) * (noiseAmp * 0.4);
            d += snoise(vec3(position.x * 1.5, position.y * 1.5, time * 0.15)) * 0.1; // Micro detail
            
            vDisplacement = d;

            vec3 newPosition = position + normal * d;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 u_navy;
        uniform vec3 u_gold;
        uniform vec3 pointLightPosition;
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
            vec3 lightDir = normalize(pointLightPosition - vPosition);
            
            // Rich color palette interpolation
            float mixFactor = vDisplacement * 0.5 + 0.5;
            vec3 baseColor = mix(u_navy, u_navy * 1.4, mixFactor);
            
            // Specular / Liquid sheen
            vec3 halfDir = normalize(lightDir + viewDir);
            float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
            
            // Rim / Gold Fresnel
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
            
            // Subtle "Aurora" shift
            vec3 aurora = vec3(0.0, 0.1, 0.2) * sin(time * 0.5 + vPosition.x);
            
            vec3 finalColor = baseColor + aurora + (u_gold * fresnel * 0.5) + (u_gold * spec * 0.3);
            
            gl_FragColor = vec4(finalColor, 0.85);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2.2;
    scene.add(mesh);

    // GOLD PARTICLES (Dust)
    const particleCount = 150;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3] = (Math.random() - 0.5) * 15;
        pPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pPositions[i * 3 + 2] = Math.random() * 4;
        pSpeeds[i] = Math.random() * 0.01 + 0.005;
    }
    
    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(GOLD),
        size: 0.04,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(0, 0, 5);
    (lightRef as any).current = pointLight;
    scene.add(pointLight);

    let frameId: number;
    const animate = (t: number) => {
      const timeSec = t * 0.001;
      material.uniforms.time.value = timeSec;
      
      // Animate particles
      const positions = pGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += Math.sin(timeSec + i) * 0.002;
          positions[i * 3 + 2] += pSpeeds[i] * 0.5;
          if (positions[i * 3 + 2] > 4) positions[i * 3 + 2] = 0;
      }
      pGeometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        const pos = new THREE.Vector3(x * 6, 2, 2 - y * 3);
        
        if (lightRef.current) {
          lightRef.current.position.lerp(pos, 0.1);
        }
        if (material.uniforms.pointLightPosition) {
             material.uniforms.pointLightPosition.value.lerp(pos, 0.1);
        }
        if (material.uniforms.u_mouse) {
            material.uniforms.u_mouse.value.set(x, y);
        }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentMount) currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      pGeometry.dispose();
      pMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-none" />;
}

export default GenerativeMountainScene;
