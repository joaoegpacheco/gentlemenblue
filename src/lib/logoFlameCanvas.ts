type LogoFlameOptions = {
  width: number;
  height: number;
  innerColor?: string;
  outerColor?: string;
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

export function createLogoFlameCanvas(
  container: HTMLElement,
  {
    width,
    height,
    innerColor = "#8fd4ff",
    outerColor = "#0e7aeb",
  }: LogoFlameOptions,
): () => void {
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
  const originY = height * 0.82;
  const particles: FlameParticle[] = [];
  const maxParticles = 20;
  let animationId = 0;
  let lastSpawn = 0;

  function spawnParticle() {
    if (particles.length >= maxParticles) {
      particles.shift();
    }

    const maxLife = 0.55 + Math.random() * 0.35;
    particles.push({
      x: originX + (Math.random() - 0.5) * width * 0.18,
      y: originY + Math.random() * 6,
      vx: (Math.random() - 0.5) * 0.9,
      vy: -1.4 - Math.random() * 1.6,
      life: maxLife,
      maxLife,
      size: width * (0.1 + Math.random() * 0.14),
    });
  }

  function drawFlameBlob(
    x: number,
    y: number,
    radius: number,
    alpha: number,
  ) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(0.45, outerColor);
    gradient.addColorStop(1, "rgba(14, 122, 235, 0)");

    context.globalAlpha = alpha;
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function tick(timestamp: number) {
    if (timestamp - lastSpawn > 65) {
      spawnParticle();
      lastSpawn = timestamp;
    }

    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    context.filter = "blur(6px)";

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
        Math.min(1, lifeRatio * 1.15),
      );
    }

    drawFlameBlob(originX, originY + 4, width * 0.16, 0.85);

    context.filter = "none";
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 1;
    animationId = requestAnimationFrame(tick);
  }

  animationId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(animationId);
    container.replaceChildren();
  };
}
