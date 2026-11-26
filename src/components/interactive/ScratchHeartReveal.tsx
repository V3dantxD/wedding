"use client";

import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LOGICAL_WIDTH = 360;
const LOGICAL_HEIGHT = 332;
const REVEAL_THRESHOLD = 0.42;

const HEART_PATH_D =
  "M 180 76 C 180 42, 134 14, 86 22 C 30 32, 10 88, 22 142 C 36 206, 104 260, 180 314 C 256 260, 324 206, 338 142 C 350 88, 330 32, 274 22 C 226 14, 180 42, 180 76 Z";

function traceHeart(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(180, 76);
  ctx.bezierCurveTo(180, 42, 134, 14, 86, 22);
  ctx.bezierCurveTo(30, 32, 10, 88, 22, 142);
  ctx.bezierCurveTo(36, 206, 104, 260, 180, 314);
  ctx.bezierCurveTo(256, 260, 324, 206, 338, 142);
  ctx.bezierCurveTo(350, 88, 330, 32, 274, 22);
  ctx.bezierCurveTo(226, 14, 180, 42, 180, 76);
  ctx.closePath();
}

function paintGoldFoil(
  ctx: CanvasRenderingContext2D,
  dpr: number,
  monogram: string
) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, LOGICAL_WIDTH * dpr, LOGICAL_HEIGHT * dpr);
  ctx.scale(dpr, dpr);

  traceHeart(ctx);
  ctx.clip();

  // Rich brushed champagne-gold metallic gradient
  const grad = ctx.createLinearGradient(20, 20, 340, 310);
  grad.addColorStop(0, "#EEDEC1");
  grad.addColorStop(0.28, "#C9A567");
  grad.addColorStop(0.54, "#DFC89B");
  grad.addColorStop(0.78, "#B48F52");
  grad.addColorStop(1, "#E5D0A8");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

  // Subtle diagonal brushed-foil shimmer texture
  ctx.strokeStyle = "rgba(255, 248, 234, 0.18)";
  ctx.lineWidth = 1;
  for (let i = -LOGICAL_HEIGHT; i < LOGICAL_WIDTH + LOGICAL_HEIGHT; i += 7) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + LOGICAL_HEIGHT * 0.65, LOGICAL_HEIGHT);
    ctx.stroke();
  }

  // Soft warm highlight inside upper lobes
  const sheen = ctx.createRadialGradient(132, 94, 12, 180, 150, 195);
  sheen.addColorStop(0, "rgba(255, 250, 240, 0.45)");
  sheen.addColorStop(0.55, "rgba(255, 245, 228, 0.08)");
  sheen.addColorStop(1, "rgba(63, 35, 20, 0.14)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

  // Delicate inner embossed heart contour
  ctx.save();
  ctx.translate(180, 168);
  ctx.scale(0.91, 0.91);
  ctx.translate(-180, -168);
  traceHeart(ctx);
  ctx.strokeStyle = "rgba(51, 37, 31, 0.25)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.restore();

  // Foil surface typography cue
  ctx.fillStyle = "rgba(51, 37, 31, 0.72)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = '500 11px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(monogram.toUpperCase(), 180, 114);

  ctx.font = '500 25px "Cormorant Garamond", Georgia, serif';
  ctx.fillText("Scratch Here", 180, 156);

  ctx.font = 'italic 15px "Lora", Georgia, serif';
  ctx.fillStyle = "rgba(51, 37, 31, 0.68)";
  ctx.fillText("to reveal our wedding date", 180, 190);

  ctx.restore();
}

/**
 * Interactive luxury scratch-to-reveal heart canvas for uncovering the wedding date.
 */
export function ScratchHeartReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialOpaqueRef = useRef<number>(0);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const dprRef = useRef(1);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const clipId = useId();

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    canvas.width = LOGICAL_WIDTH * dpr;
    canvas.height = LOGICAL_HEIGHT * dpr;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    paintGoldFoil(ctx, dpr, weddingConfig.monogram);

    // Measure opaque foil pixel count inside the clipped heart shape
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let opaque = 0;
    for (let i = 3; i < data.length; i += 32) {
      if (data[i] > 128) opaque++;
    }
    initialOpaqueRef.current = Math.max(1, opaque);
    strokeCountRef.current = 0;
    setScratchProgress(0);
    setIsRevealed(false);
  }, []);

  useEffect(() => {
    initCanvas();

    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled && strokeCountRef.current === 0) {
          initCanvas();
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [initCanvas]);

  const evaluateScratchedRatio = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let remaining = 0;
    for (let i = 3; i < data.length; i += 32) {
      if (data[i] > 128) remaining++;
    }

    const clearedRatio = Math.max(
      0,
      Math.min(1, 1 - remaining / initialOpaqueRef.current)
    );
    setScratchProgress(Math.round(clearedRatio * 100));

    if (clearedRatio >= REVEAL_THRESHOLD) {
      setIsRevealed(true);
      isDrawingRef.current = false;
    }
  }, [isRevealed]);

  const getLogicalCoords = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    return {
      x: ((event.clientX - rect.left) / rect.width) * LOGICAL_WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * LOGICAL_HEIGHT,
    };
  };

  const scratchAt = (
    from: { x: number; y: number } | null,
    to: { x: number; y: number }
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = dprRef.current;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    traceHeart(ctx);
    ctx.clip();

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 44;

    ctx.beginPath();
    if (from) {
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
    } else {
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x + 0.1, to.y + 0.1);
    }
    ctx.stroke();
    ctx.restore();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    const coords = getLogicalCoords(event);
    if (!coords) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = coords;
    scratchAt(null, coords);
    strokeCountRef.current += 1;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    const coords = getLogicalCoords(event);
    if (!coords) return;

    scratchAt(lastPointRef.current, coords);
    lastPointRef.current = coords;
    strokeCountRef.current += 1;

    if (strokeCountRef.current % 6 === 0) {
      evaluateScratchedRatio();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    evaluateScratchedRatio();
  };

  return (
    <div className="my-10 sm:my-12 flex flex-col items-center text-center">
      {/* Clear instructional heading so guests know the date is hidden inside */}
      <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.34em] text-[#E8D6B5]">
        <Sparkles className="h-3.5 w-3.5 text-[#E8D6B5]" aria-hidden="true" />
        <span>{weddingConfig.scratchReveal.eyebrow}</span>
      </span>

      <h3 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F8F3E9]">
        {weddingConfig.scratchReveal.heading}
      </h3>
      <p className="mt-2 max-w-md font-serif-body text-xs sm:text-sm leading-relaxed text-[#E8D6B5]/85">
        {weddingConfig.scratchReveal.instruction}
      </p>

      {/* Big Heart Container */}
      <motion.div
        animate={
          isRevealed && !prefersReducedMotion
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-7 sm:mt-8 w-[290px] h-[268px] sm:w-[360px] sm:h-[332px] select-none"
      >
        {/* Outer soft glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-full bg-[#E8D6B5]/18 blur-2xl"
        />

        {/* SVG Heart Base & Revealed Date Interior */}
        <svg
          viewBox={`0 0 ${LOGICAL_WIDTH} ${LOGICAL_HEIGHT}`}
          className="absolute inset-0 h-full w-full drop-shadow-[0_18px_40px_rgba(24,8,12,0.5)]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${clipId}-bg`} cx="50%" cy="42%" r="60%">
              <stop offset="0%" stopColor="#FFFDF8" />
              <stop offset="65%" stopColor="#F8F3E9" />
              <stop offset="100%" stopColor="#EFE1CD" />
            </radialGradient>
          </defs>

          <g transform="translate(180 168) scale(0.99) translate(-180 -168)">
            <path
              d={HEART_PATH_D}
              fill={`url(#${clipId}-bg)`}
              stroke="#B99A62"
              strokeWidth="2.2"
            />
          </g>

          <g transform="translate(180 168) scale(0.925) translate(-180 -168)">
            <path
              d={HEART_PATH_D}
              fill="none"
              stroke="#B99A62"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </g>
        </svg>

        {/* Revealed Wedding Date Content inside the Heart */}
        <div
          aria-live="polite"
          className="absolute inset-0 flex flex-col items-center justify-center px-10 pb-6 pt-4 text-center pointer-events-none"
        >
          <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-[#967741]">
            Save the Date
          </span>
          <p className="mt-1.5 font-display text-[1.75rem] sm:text-[2.2rem] font-medium leading-tight text-[#5B1F2A]">
            {weddingConfig.weddingDateDisplay}
          </p>
          <p className="mt-1.5 font-serif-body text-xs sm:text-sm italic text-[#655046]">
            {weddingConfig.scratchReveal.revealedTimeLabel}
          </p>
          <span className="mt-2.5 text-[9px] sm:text-[10px] font-medium tracking-[0.28em] uppercase text-[#B99A62]">
            {weddingConfig.scratchReveal.revealedNumericDate}
          </span>
        </div>

        {/* Interactive Brushed Gold Scratch Foil Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Scratchable gold heart hiding the wedding date"
          style={{
            touchAction: "none",
          }}
          className={`absolute inset-0 z-10 h-full w-full cursor-crosshair transition-opacity duration-700 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </motion.div>

      {/* Accessible Helper / Reveal Confirmation & Reset */}
      <div className="mt-4 flex flex-col items-center gap-2 min-h-[2.75rem]">
        {!isRevealed ? (
          <>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#E8D6B5]/70">
              {scratchProgress > 0
                ? `${Math.min(100, Math.round((scratchProgress / (REVEAL_THRESHOLD * 100)) * 100))}% revealed`
                : "Rub across the heart to unveil"}
            </p>
            <button
              type="button"
              onClick={() => setIsRevealed(true)}
              className="text-[11px] underline underline-offset-4 text-[#E8D6B5]/80 transition-colors hover:text-[#F8F3E9] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8D6B5]"
            >
              Tap here to reveal directly
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-serif-body text-xs sm:text-sm italic text-[#E8D6B5]">
              {weddingConfig.scratchReveal.revealedCelebrationNote}
            </p>
            <button
              type="button"
              onClick={initCanvas}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#E8D6B5]/70 transition-colors hover:text-[#F8F3E9] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8D6B5]"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Scratch again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
