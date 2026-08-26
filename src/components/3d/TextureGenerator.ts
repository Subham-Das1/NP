import * as THREE from 'three';
import type { FlavorInfo } from '../../types';

const textureCache: Record<string, THREE.CanvasTexture> = {};
const bumpCache: Record<string, THREE.CanvasTexture> = {};

export function createPackagingTexture(flavor: FlavorInfo): THREE.CanvasTexture {
  const cacheKey = `wrapper-${flavor.id}`;
  if (textureCache[cacheKey]) {
    return textureCache[cacheKey];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Background Base Gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, flavor.foilBgColor);
  gradient.addColorStop(0.5, '#0B0D12');
  gradient.addColorStop(1, flavor.foilBgColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. High-Tech Carbon / Matrix Pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  const gridSize = 40;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 3. Futuristic Accent Glow Strips
  const glowGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  glowGrad.addColorStop(0, 'transparent');
  glowGrad.addColorStop(0.2, flavor.accentColor);
  glowGrad.addColorStop(0.8, flavor.accentColor);
  glowGrad.addColorStop(1, 'transparent');

  ctx.fillStyle = glowGrad;
  ctx.fillRect(200, 140, canvas.width - 400, 8);
  ctx.fillRect(200, canvas.height - 150, canvas.width - 400, 8);

  // Diagonal warning / performance hash lines on borders
  ctx.strokeStyle = flavor.accentColor;
  ctx.lineWidth = 3;
  for (let i = 240; i < 400; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 160);
    ctx.lineTo(i + 15, 190);
    ctx.stroke();
  }
  for (let i = canvas.width - 400; i < canvas.width - 240; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 160);
    ctx.lineTo(i + 15, 190);
    ctx.stroke();
  }

  // 4. Brand Header (CJ PROTEIN SNACKS)
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('CJ   PROTEIN   SNACKS', canvas.width / 2, 220);

  ctx.fillStyle = flavor.accentColor;
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.letterSpacing = '4px';
  ctx.fillText('// HIGH-BIOAVAILABILITY ISOLATE MATRIX //', canvas.width / 2, 265);

  // 5. Main Hero Badge: 20G PROTEIN Box
  const badgeWidth = 560;
  const badgeHeight = 220;
  const badgeX = canvas.width / 2 - badgeWidth / 2;
  const badgeY = 320;

  // Badge glow border
  ctx.fillStyle = 'rgba(10, 14, 22, 0.85)';
  ctx.strokeStyle = flavor.accentColor;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 20);
  ctx.fill();
  ctx.stroke();

  // Corner ticks
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.strokeRect(badgeX + 12, badgeY + 12, 24, 24);
  ctx.strokeRect(badgeX + badgeWidth - 36, badgeY + 12, 24, 24);
  ctx.strokeRect(badgeX + 12, badgeY + badgeHeight - 36, 24, 24);
  ctx.strokeRect(badgeX + badgeWidth - 36, badgeY + badgeHeight - 36, 24, 24);

  // "20G" Large text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 130px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('20G', canvas.width / 2 - 80, badgeY + 150);

  // "PROTEIN" beside it
  ctx.textAlign = 'left';
  ctx.fillStyle = flavor.accentColor;
  ctx.font = '900 50px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('PROTEIN', canvas.width / 2 + 50, badgeY + 115);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '700 24px "JetBrains Mono", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('ISOLATE 100%', canvas.width / 2 + 52, badgeY + 155);

  // 6. Flavor Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 80px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText(flavor.name.toUpperCase(), canvas.width / 2, 620);

  // Subtitle
  ctx.fillStyle = flavor.textColor || '#CBD5E1';
  ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(flavor.subtitle.toUpperCase(), canvas.width / 2, 675);

  // 7. Key Stat Badges Row
  const stats = [
    { label: 'SUGAR', val: '0G' },
    { label: 'NET CARBS', val: '3G' },
    { label: 'BCAAS', val: '4.6G' },
    { label: 'PREBIOTIC', val: '12G' },
  ];

  const pillWidth = 240;
  const pillGap = 30;
  const totalStatsWidth = stats.length * pillWidth + (stats.length - 1) * pillGap;
  let startX = (canvas.width - totalStatsWidth) / 2;

  stats.forEach((stat) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(startX, 720, pillWidth, 75, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = flavor.accentColor;
    ctx.font = '900 32px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(stat.val, startX + pillWidth / 2, 758);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText(stat.label, startX + pillWidth / 2, 782);

    startX += pillWidth + pillGap;
  });

  // 8. Footer Metadata & Barcode
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('CJPROTEINSNACKS  •  NET WT: 60G (2.12 OZ)  •  GLUTEN FREE', 200, canvas.height - 110);
  ctx.fillText('BATCH: LOT-2026-CJ-PROTO  •  MSRP $3.89  •  LAB TESTED', 200, canvas.height - 80);

  // Barcode
  const barcodeX = canvas.width - 450;
  const barcodeY = canvas.height - 125;
  const barcodeWidth = 250;
  const barcodeHeight = 55;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(barcodeX, barcodeY, barcodeWidth, barcodeHeight);

  ctx.fillStyle = '#000000';
  let barCurrentX = barcodeX + 15;
  const barPattern = [3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 3, 2, 1, 3, 2, 4, 1, 2];
  barPattern.forEach((w) => {
    ctx.fillRect(barCurrentX, barcodeY + 6, w * 2.5, barcodeHeight - 16);
    barCurrentX += w * 2.5 + 4;
  });

  ctx.fillStyle = '#000000';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('8 94520 00192 4', barcodeX + barcodeWidth / 2, barcodeY + barcodeHeight - 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;

  textureCache[cacheKey] = texture;
  return texture;
}

export function createPackagingBumpMap(): THREE.CanvasTexture {
  const cacheKey = 'wrapper-bump';
  if (bumpCache[cacheKey]) {
    return bumpCache[cacheKey];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 40; i++) {
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const length = 40 + Math.random() * 120;
    const angle = (Math.random() - 0.5) * Math.PI;

    const x2 = x1 + Math.cos(angle) * length;
    const y2 = y1 + Math.sin(angle) * length;

    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, '#555555');
    grad.addColorStop(0.5, '#A0A0A0');
    grad.addColorStop(1, '#808080');

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  for (let x = 0; x < 60; x += 4) {
    ctx.fillRect(x, 0, 2, canvas.height);
    ctx.fillRect(canvas.width - x, 0, 2, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  bumpCache[cacheKey] = texture;
  return texture;
}
