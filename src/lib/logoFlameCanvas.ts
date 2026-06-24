type LogoFlameOptions = {
  width: number;
  height: number;
  innerColor?: string;
  outerColor?: string;
  intensity?: "hero" | "footer";
};

type FlameParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

const FLAME_PROFILES = {
  hero: {
    maxParticles: 20,
    spawnInterval: 65,
    blurPx: (size: number) => Math.min(8, Math.max(4, size * 0.04)),
    particleSizeRange: [0.1, 0.14] as const,
    spreadX: 0.18,
    baseGlowScale: 0.16,
    baseGlowAlpha: 0.85,
    innerColor: "#8fd4ff",
    outerColor: "#0e7aeb",
  },
  footer: {
    maxParticles: 22,
    spawnInterval: 52,
    blurPx: (size: number) => Math.min(4.5, Math.max(2.5, size * 0.028)),
    particleSizeRange: [0.12, 0.19] as const,
    spreadX: 0.2,
    baseGlowScale: 0.19,
    baseGlowAlpha: 0.92,
    innerColor: "#b8e4ff",
    outerColor: "#2b8fff",
  },
} as const;

export function createLogoFlameCanvas(
  container: HTMLElement,
  {
    width,
    height,
    innerColor,
    outerColor,
    intensity = "hero",
  }: LogoFlameOptions,
): () => void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    return () => {};
  }

  const profile = FLAME_PROFILES[intensity];
  const flameInner = innerColor ?? profile.innerColor;
  const flameOuter = outerColor ?? profile.outerColor;
  const [particleSizeMin, particleSizeMax] = profile.particleSizeRange;
  const blurAmount = profile.blurPx(width);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => container.replaceChildren();
  }

  const context = ctx;

  const originX = width * 0.5;
  const originY = height * (intensity === "footer" ? 0.72 : 0.77);
  const particles: FlameParticle[] = [];
  const maxParticles = profile.maxParticles;
  let animationId = 0;
  let lastSpawn = 0;
  let isVisible = false;

  function spawnParticle() {
    if (particles.length >= maxParticles) {
      particles.shift();
    }

    const maxLife = 0.55 + Math.random() * 0.35;
    particles.push({
      x: originX + (Math.random() - 0.5) * width * profile.spreadX,
      y: originY + Math.random() * 6,
      vx: (Math.random() - 0.5) * 0.9,
      vy: -1.4 - Math.random() * 1.6,
      life: maxLife,
      maxLife,
      size: width * (particleSizeMin + Math.random() * (particleSizeMax - particleSizeMin)),
    });
  }

  function drawFlameBlob(
    x: number,
    y: number,
    radius: number,
    alpha: number,
  ) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, flameInner);
    gradient.addColorStop(0.45, flameOuter);
    gradient.addColorStop(1, "rgba(14, 122, 235, 0)");

    context.globalAlpha = alpha;
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function tick(timestamp: number) {
    animationId = 0;

    if (!isVisible) {
      return;
    }

    if (timestamp - lastSpawn > profile.spawnInterval) {
      spawnParticle();
      lastSpawn = timestamp;
    }

    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    context.filter = `blur(${blurAmount}px)`;

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx += (Math.random() - 0.5) * 0.08;
      particle.vy *= 0.985;
      particle.vx *= 0.985;
      particle.life -= 0.016;

      if (particle.life <= 0) {
        particles.splice(index, 1);
        continue;
      }

      const lifeRatio = particle.life / particle.maxLife;
      const radius = particle.size * (0.55 + lifeRatio * 0.75);
      drawFlameBlob(
        particle.x,
        particle.y,
        radius,
        Math.min(1, lifeRatio * (intensity === "footer" ? 1.35 : 1.15)),
      );
    }

    drawFlameBlob(
      originX,
      originY + 4,
      width * profile.baseGlowScale,
      profile.baseGlowAlpha,
    );

    context.filter = "none";
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 1;
    animationId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (animationId === 0) {
      animationId = requestAnimationFrame(tick);
    }
  }

  function stopLoop() {
    if (animationId !== 0) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    }
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
        context.clearRect(0, 0, width, height);
        particles.length = 0;
      }
    },
    { rootMargin: "64px" },
  );

  observer.observe(container);

  return () => {
    stopLoop();
    observer.disconnect();
    container.replaceChildren();
  };
}
