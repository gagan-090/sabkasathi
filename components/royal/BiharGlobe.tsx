"use client";

import React, { useEffect, useRef } from "react";

export type CityPin = {
  name: string;
  stateCountry: string;
  lat: number;
  lng: number;
  type: "hq" | "bihar" | "india" | "global";
};

export const CITIES_DATA: CityPin[] = [
  { name: "Patna (HQ)", stateCountry: "Bihar, India", lat: 25.5941, lng: 85.1376, type: "hq" },
  { name: "New Delhi", stateCountry: "India", lat: 28.6139, lng: 77.209, type: "india" },
  { name: "Mumbai", stateCountry: "India", lat: 19.076, lng: 72.8777, type: "india" },
  { name: "Bengaluru", stateCountry: "India", lat: 12.9716, lng: 77.5946, type: "india" },
  { name: "Dubai", stateCountry: "UAE 🇦🇪", lat: 25.2048, lng: 55.2708, type: "global" },
  { name: "London", stateCountry: "UK 🇬🇧", lat: 51.5074, lng: -0.1278, type: "global" },
  { name: "New York", stateCountry: "USA 🇺🇸", lat: 40.7128, lng: -74.006, type: "global" },
  { name: "Singapore", stateCountry: "Singapore 🇸🇬", lat: 1.3521, lng: 103.8198, type: "global" },
  { name: "Tokyo", stateCountry: "Japan 🇯🇵", lat: 35.6762, lng: 139.6503, type: "global" },
  { name: "Sydney", stateCountry: "Australia 🇦🇺", lat: -33.8688, lng: 151.2093, type: "global" },
  { name: "San Francisco", stateCountry: "USA 🇺🇸", lat: 37.7749, lng: -122.4194, type: "global" },
];

interface BiharGlobeProps {
  className?: string;
}

export function BiharGlobe({ className = "" }: BiharGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rotationRef = useRef({ rotX: 0.35, rotY: -1.45 });
  const velocityRef = useRef({ vx: 0, vy: 0.0035 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const project3D = (lat: number, lng: number, radius: number, rotX: number, rotY: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    };

    // Render Overlay Loop on top of Globe GIF
    const render = () => {
      time += 0.022;

      if (!isDraggingRef.current) {
        rotationRef.current.rotY += velocityRef.current.vy;
      }

      const side = Math.min(canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = side * 0.42;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { rotX, rotY } = rotationRef.current;
      const patna = CITIES_DATA[0];
      const patna3D = project3D(patna.lat, patna.lng, radius, rotX, rotY);

      // Draw Flight Arcs & Light Beams from Patna HQ outwards
      CITIES_DATA.forEach((city) => {
        if (city.type === "hq") return;
        const target3D = project3D(city.lat, city.lng, radius, rotX, rotY);

        if (patna3D.z > -radius * 0.25 || target3D.z > -radius * 0.25) {
          const pX = centerX + patna3D.x;
          const pY = centerY + patna3D.y;
          const tX = centerX + target3D.x;
          const tY = centerY + target3D.y;

          const dist = Math.hypot(tX - pX, tY - pY);
          const midX = (pX + tX) / 2;
          const midY = (pY + tY) / 2 - dist * 0.38;

          const alpha = Math.min(
            1,
            Math.max(0.2, (patna3D.z / radius + target3D.z / radius) * 0.5 + 0.3)
          );

          // Curve line
          ctx.beginPath();
          ctx.moveTo(pX, pY);
          ctx.quadraticCurveTo(midX, midY, tX, tY);
          ctx.strokeStyle =
            city.type === "global"
              ? `rgba(192, 132, 252, ${alpha * 0.85})`
              : `rgba(129, 140, 248, ${alpha * 0.75})`;
          ctx.lineWidth = city.type === "global" ? 2.0 : 1.5;
          ctx.setLineDash([5, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated Light Pulse
          const speed = city.type === "global" ? 0.35 : 0.5;
          const pulseProgress = (time * speed + Math.abs(city.lat)) % 1;
          const t = pulseProgress;

          const flightX = (1 - t) * (1 - t) * pX + 2 * (1 - t) * t * midX + t * t * tX;
          const flightY = (1 - t) * (1 - t) * pY + 2 * (1 - t) * t * midY + t * t * tY;

          const dx = 2 * (1 - t) * (midX - pX) + 2 * t * (tX - midX);
          const dy = 2 * (1 - t) * (midY - pY) + 2 * t * (tY - midY);
          const angle = Math.atan2(dy, dx);

          ctx.save();
          ctx.translate(flightX, flightY);
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fillStyle = city.type === "global" ? "#c084fc" : "#818cf8";
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.restore();
        }
      });

      // Render City Markers
      CITIES_DATA.forEach((city) => {
        const pt = project3D(city.lat, city.lng, radius, rotX, rotY);
        if (pt.z > 0) {
          const scX = centerX + pt.x;
          const scY = centerY + pt.y;

          const isHq = city.type === "hq";
          const pulseRadius = (isHq ? 11 : 7) + Math.sin(time * 3 + city.lat) * 3;

          ctx.beginPath();
          ctx.arc(scX, scY, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = isHq ? "rgba(255, 149, 0, 0.4)" : "rgba(168, 85, 247, 0.35)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(scX, scY, isHq ? 6 : 4, 0, Math.PI * 2);
          ctx.fillStyle = isHq ? "#f38200" : "#a855f7";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();

          if (isHq || pt.z > radius * 0.45) {
            ctx.save();
            ctx.font = isHq
              ? "bold 11px system-ui, -apple-system, sans-serif"
              : "600 10px system-ui, -apple-system, sans-serif";

            const tagText = isHq ? "⭐ HQ" : city.name.toUpperCase();
            const textWidth = ctx.measureText(tagText).width;
            const tagW = textWidth + 14;
            const tagH = 20;
            const tagX = scX - tagW / 2;
            const tagY = scY - 26;

            ctx.beginPath();
            ctx.roundRect(tagX, tagY, tagW, tagH, 10);
            ctx.fillStyle = isHq ? "rgba(244, 241, 255, 0.98)" : "rgba(255, 255, 255, 0.95)";
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = isHq ? "#d97706" : "rgba(224, 102, 0, 0.3)";
            ctx.stroke();

            ctx.fillStyle = isHq ? "#b45309" : "#171030";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(tagText, scX, tagY + tagH / 2);
            ctx.restore();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const side = Math.min(rect.width, 480);
      canvas.width = side * dpr;
      canvas.height = side * dpr;
      canvas.style.width = `${side}px`;
      canvas.style.height = `${side}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotationRef.current.rotY += dx * 0.005;
    rotationRef.current.rotX = Math.max(-0.9, Math.min(0.9, rotationRef.current.rotX + dy * 0.005));

    velocityRef.current = { vx: dy * 0.001, vy: dx * 0.001 };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center ${className}`}
    >
      {/* 3D GLOBE STAGE — CLEAN, BORDERLESS PERFECT CIRCLE WITH REVOLVING GIF */}
      <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#0a061d] shadow-[0_30px_70px_-15px_rgba(224,102,0,0.32)] ring-1 ring-orange-500/20">
        {/* Revolving GIF Globe */}
        <img
          src="/globe-anim.gif"
          alt="Revolving 3D Earth Globe"
          className="h-full w-full object-cover scale-105 select-none pointer-events-none"
        />

        {/* Interactive Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none rounded-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </div>

      {/* Nano Bana / Glass Accent Image complementing the Globe */}
      <div className="absolute -bottom-4 -right-2 md:-right-6 w-28 md:w-36 aspect-square pointer-events-none drop-shadow-2xl animate-pulse">
        <img src="/hero-accent.png" alt="Classic 3D Glass Accent" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
