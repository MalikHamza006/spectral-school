import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteLogo } from '../../data/images';

export interface WelcomeSplashProps {
  /**
   * Show the splash only on the first visit of a browser session.
   *
   * The brief asks for it "when the web loads", so this defaults to `false`
   * and the splash plays on every full page load. Set to `true` if a splash on
   * every refresh becomes tiring during development.
   */
  oncePerSession?: boolean;
}

const SESSION_KEY = 'spectral.splash.seen';

/** Total on-screen time before the exit animation starts. */
const HOLD_MS = 1500;

/**
 * Full-screen welcome splash.
 *
 * Plays once on load: a deep blue gradient, the school's own logo, and an
 * animated "Welcome to Spectral School" reveal over a gold progress sweep.
 *
 * Accessibility notes:
 * - The overlay itself is `aria-hidden` because it is purely decorative; a
 *   visually hidden live region announces the load state instead, so screen
 *   reader users are not read a decorative animation.
 * - `prefers-reduced-motion` collapses the whole sequence to a short fade and
 *   removes every transform.
 * - Body scroll is locked while it is visible so the page behind cannot move.
 */
export function WelcomeSplash({ oncePerSession = false }: WelcomeSplashProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (oncePerSession && window.sessionStorage.getItem(SESSION_KEY) === '1') {
      return false;
    }
    return true;
  });

  // Mark as seen, then dismiss after the hold time.
  useEffect(() => {
    if (!visible) return;

    if (oncePerSession) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Private browsing can block sessionStorage; the splash still works.
      }
    }

    const timer = window.setTimeout(() => setVisible(false), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [visible, oncePerSession]);

  // Prevent scrolling behind the splash while it is up.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <>
      {/* Announced to assistive tech; visually hidden. */}
      <p role="status" aria-live="polite" className="sr-only">
        {visible ? 'Loading Spectral Model School & College' : ''}
      </p>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="welcome-splash"
            aria-hidden="true"
            className="on-dark fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.06, filter: 'blur(6px)' }
            }
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Blue gradient wash that matches the brand's secondary colour */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 120% at 50% 8%, #174EA6 0%, #0B1F3A 58%, #050F1F 100%)',
              }}
            />

            {/* Slowly rotating gold ring */}
            <motion.div
              className="absolute h-64 w-64 rounded-full border border-gold/25 sm:h-80 sm:w-80"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold" />
            </motion.div>

            {/* Content */}
            <div className="relative flex flex-col items-center px-6 text-center">
              {/* Logo */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-28 items-center sm:h-40"
              >
                <img
                  src={siteLogo.inverseSrc}
                  srcSet={siteLogo.inverseSrcSet}
                  width={siteLogo.width}
                  height={siteLogo.height}
                  alt=""
                  decoding="sync"
                  fetchPriority="high"
                  className="h-full w-auto object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
                />
              </motion.div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
              >
                Welcome to
              </motion.p>

              <motion.h2
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Spectral School
              </motion.h2>

              {/* Gold rule that sweeps out from the centre */}
              <motion.span
                className="mt-5 block h-1 w-28 rounded-full bg-gold sm:w-36"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 text-sm text-white/45"
              >
                Model School &amp; College, Shahdara, Lahore
              </motion.p>
            </div>

            {/* Progress sweep along the bottom edge */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduceMotion ? 0.3 : HOLD_MS / 1000,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
