import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Info, ShieldAlert } from 'lucide-react';
import {
  Container,
  PageHero,
  Section,
  Reveal,
  NotFoundContent,
} from '../components';
import { PortalLoginForm } from '../components/features/PortalLoginForm';
import { getPortalById, portalAuthNote, schoolInfo, primaryPhoneHref } from '../data';
import { useSeo, buildBreadcrumbSchema, buildGraph } from '../hooks/useSeo';

/**
 * One sign-in page per portal — `/login/student`, `/login/parent`,
 * `/login/teacher`, `/login/admin`.
 *
 * A single component serves all four because the *content* differs per portal
 * (fields, labels, guidance) but the *layout* does not, and the differences all
 * come from `data/portals`. Splitting this into four near-identical page files
 * would mean four places to fix the same layout bug.
 *
 * The URL segment is the portal `id`, and `id` is also the single source for the
 * portal's own `path`, so a link and its page can never disagree.
 *
 * An unknown segment renders the shared not-found block with a link back to the
 * chooser rather than a broken form — a half-rendered sign-in page is worse than
 * an honest "no such portal".
 */
export function PortalLoginPage() {
  const { portalId } = useParams<{ portalId: string }>();
  const portal = portalId ? getPortalById(portalId) : undefined;

  useSeo({
    title: portal
      ? `${portal.name} Login | ${schoolInfo.name}`
      : `Portal Not Found | ${schoolInfo.name}`,
    description: portal
      ? `${portal.role.description} This portal is a design preview and is not connected to any system yet.`
      : 'That sign-in page does not exist.',
    path: portal?.path ?? '/login',
    noIndex: true,
    structuredData: buildGraph(
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: portal?.name ?? 'Not found', path: portal?.path ?? '/login' },
      ])
    ),
  });

  if (!portal) {
    return (
      <>
        <PageHero
          heroKey="contact"
          variant="centered"
          eyebrow="Portal Access"
          title="No such portal"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Login', href: '/login' },
          ]}
        />
        <Section tone="canvas">
          <Container>
            <NotFoundContent
              title="That portal does not exist"
              description="We could not match that sign-in link to any portal. Choose the one that applies to you."
              primaryLabel="Choose a portal"
              primaryTo="/login"
              secondaryLabel="Contact the School"
              secondaryTo="/contact"
              showQuickLinks={false}
            />
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        heroKey="contact"
        variant="centered"
        eyebrow={portal.category}
        title={portal.name}
        description={portal.role.description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Login', href: '/login' },
          { label: portal.name },
        ]}
      />

      <Section tone="canvas" aria-labelledby="signin-heading">
        <Container>
          {/* Back to the chooser. On a page you can only reach deliberately,
              this is the way out. */}
          <Reveal>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue underline-offset-4 transition-colors hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              All portals
            </Link>
          </Reveal>

          {/*
            Narrow, centred column. The form is the only thing on the page, so
            it gets a comfortable measure instead of being one cell in a grid —
            and a short line length is easier to read and harder to mistype
            into than a wide box.
          */}
          <Reveal delay={0.08} className="mx-auto mt-8 max-w-2xl">
            <h2 id="signin-heading" className="sr-only">
              Sign in to the {portal.name}
            </h2>
            <PortalLoginForm portal={portal} />
          </Reveal>
        </Container>
      </Section>

      {/*
        Honesty notice, repeated on every portal page. A parent who arrived
        directly at `/login/parent` from a bookmark or a message must see this
        too — they will never pass through the chooser.
      */}
      <Section tone="white" size="sm">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-gradient-to-b from-canvas to-white p-6 shadow-lift sm:flex-row sm:p-7">
              <span
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark"
                aria-hidden="true"
              >
                <ShieldAlert className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-base font-semibold text-navy">
                  This portal is not live yet
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  This is a design preview. The form above is not connected to
                  any system, so nothing you type is checked, saved or sent
                  anywhere. Please do not enter a real password. For anything
                  that needs an actual record, please call the office on{' '}
                  <a
                    href={primaryPhoneHref}
                    className="font-semibold text-blue underline-offset-2 hover:underline"
                  >
                    {schoolInfo.phone.primary}
                  </a>
                  .
                </p>
                <p className="mt-3 inline-flex items-start gap-1.5 text-xs font-medium leading-relaxed text-gold-dark">
                  <Info className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                  {portalAuthNote}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
