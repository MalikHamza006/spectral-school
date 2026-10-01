import { Reveal, IconTile } from '../ui';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { leadership } from '../../data/content';
import { Quote } from 'lucide-react';

/**
 * Principal / Director message block.
 *
 * The message text and portrait are explicit placeholders because the school has
 * not supplied them. Replace `leadership.message` and `leadership.portrait` in
 * src/data/content.ts — the layout adapts automatically, including the case
 * where a name is eventually provided.
 */
export function LeadershipMessage({ className = '' }: { className?: string }) {
  const isPlaceholderMessage = leadership.message.some((line) => line.includes('['));
  const displayName = leadership.signatureName;

  return (
    <div className={`grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14 ${className}`}>
      {/* Portrait */}
      <Reveal className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lift">
            {leadership.portrait ? (
              <img
                src={leadership.portrait}
                alt={`Portrait of ${displayName ?? leadership.signatureRole}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <ImagePlaceholder
                label="Placeholder for the official portrait of the Principal / Director"
                className="aspect-[4/5] w-full"
              />
            )}
          </div>
          {/* Gold accent block */}
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-2xl bg-gold/20"
          />
        </div>
      </Reveal>

      {/* Message */}
      <Reveal delay={0.1}>
        <div className="max-w-prose">
          <p className="eyebrow">Leadership</p>
          <h2 className="text-display-lg text-navy">{leadership.title}</h2>

          <IconTile tone="gold" size="sm" className="mt-6">
            <Quote className="h-4 w-4" aria-hidden="true" />
          </IconTile>

          <div className="mt-5 space-y-4">
            {leadership.message.map((paragraph, index) => (
              <p
                key={index}
                className={
                  isPlaceholderMessage
                    ? 'rounded-lg border border-dashed border-gold/50 bg-gold/8 p-4 text-[0.95rem] italic leading-relaxed text-gold-dark'
                    : 'text-base leading-relaxed text-ink-muted'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {isPlaceholderMessage && (
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              This section is a placeholder. The official message from the Principal / Director will
              replace it once supplied.
            </p>
          )}

          {/* Signature — role only, since no name has been provided */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="font-display text-lg font-semibold text-navy">
              {displayName ?? leadership.signatureRole}
            </p>
            {displayName && (
              <p className="mt-0.5 text-sm text-ink-muted">{leadership.signatureRole}</p>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
