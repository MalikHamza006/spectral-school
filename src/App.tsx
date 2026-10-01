import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Footer, WelcomeSplash } from './components';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';

/* Route-level code splitting: the homepage ships in the main bundle, while
   every interior page is fetched on demand. */
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const AcademicsPage = lazy(() =>
  import('./pages/AcademicsPage').then((m) => ({ default: m.AcademicsPage }))
);
const AdmissionsPage = lazy(() =>
  import('./pages/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage }))
);
const CampusPage = lazy(() =>
  import('./pages/CampusPage').then((m) => ({ default: m.CampusPage }))
);
const AchievementsPage = lazy(() =>
  import('./pages/AchievementsPage').then((m) => ({ default: m.AchievementsPage }))
);
const EventsPage = lazy(() =>
  import('./pages/EventsPage').then((m) => ({ default: m.EventsPage }))
);
const EventDetailPage = lazy(() =>
  import('./pages/EventDetailPage').then((m) => ({ default: m.EventDetailPage }))
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const PortalLoginPage = lazy(() =>
  import('./pages/PortalLoginPage').then((m) => ({ default: m.PortalLoginPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

/** Neutral loading state shown while a route chunk is fetched. */
function RouteFallback() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
        <span
          className="h-9 w-9 animate-spin rounded-full border-2 border-navy/15 border-t-navy motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="text-sm text-ink-muted">Loading…</span>
      </div>
    </div>
  );
}

/**
 * Restores the document title to the site default when leaving a page that
 * set its own, so a stale title never lingers.
 */
function useDocumentLang() {
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);
}

export default function App() {
  useDocumentLang();
  const location = useLocation();

  return (
    <>
      {/* Animated welcome splash on load */}
      <WelcomeSplash />

      {/* Keyboard users can jump straight past the navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="min-h-[60svh] focus:outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/campus" element={<CampusPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* One page per portal. Declared after `/login` so the exact path is
                matched first; this segment is what makes each portal a
                separate URL rather than a tab. */}
            <Route path="/login/:portalId" element={<PortalLoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
