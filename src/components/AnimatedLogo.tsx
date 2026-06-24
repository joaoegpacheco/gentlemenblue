"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { createLogoFlameCanvas } from "@/lib/logoFlameCanvas";

type AnimatedLogoProps = {
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  flameVariant?: "hero" | "footer";
};

type LogoFlameCanvasProps = {
  logoWidth: number;
  logoHeight: number;
  variant: "hero" | "footer";
};

const FLAME_LAYOUT = {
  hero: {
    canvasWidthScale: 1.5,
    canvasHeightScale: 1.05,
    offsetTopScale: 0.2,
  },
  footer: {
    canvasWidthScale: 1.5,
    canvasHeightScale: 1.2,
    offsetTopScale: 0.38,
  },
} as const;

function LogoFlameCanvas({ logoWidth, logoHeight, variant }: LogoFlameCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layout = FLAME_LAYOUT[variant];

  const canvasW = Math.round(logoWidth * layout.canvasWidthScale);
  const canvasH = Math.round(logoHeight * layout.canvasHeightScale);
  const offsetLeft = Math.round((logoWidth - canvasW) / 2);
  const offsetTop = Math.round(-logoHeight * layout.offsetTopScale);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || canvasW < 8 || canvasH < 8) return;

    return createLogoFlameCanvas(container, {
      width: canvasW,
      height: canvasH,
    });
  }, [canvasH, canvasW]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="logo-flame-canvas pointer-events-none absolute z-0 overflow-visible"
      style={{
        width: canvasW,
        height: canvasH,
        left: offsetLeft,
        top: offsetTop,
      }}
    />
  );
}

export function AnimatedLogo({
  alt,
  width,
  height,
  className = "",
  priority,
  flameVariant = "hero",
}: AnimatedLogoProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [logoSize, setLogoSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const updateSize = () => {
      setLogoSize({
        w: element.clientWidth,
        h: element.clientHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span className={`relative inline-block overflow-visible ${className}`}>
      <span
        ref={wrapperRef}
        className="logo-animate-bounce relative inline-block w-full overflow-visible"
      >
        {logoSize.w > 0 && logoSize.h > 0 ? (
          <LogoFlameCanvas
            logoWidth={logoSize.w}
            logoHeight={logoSize.h}
            variant={flameVariant}
          />
        ) : null}

        <Image
          src="/images/logo.webp"
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="relative z-10 h-auto w-full"
        />
      </span>
    </span>
  );
}
