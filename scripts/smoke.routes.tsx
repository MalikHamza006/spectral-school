/**
 * Render smoke test.
 *
 * Mounts every route inside the real layout and reports whether it renders.
 * Run with: npm run smoke
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { Navbar, Footer } from '../src/components';
import { HomePage } from '../src/pages/HomePage';
import { AboutPage } from '../src/pages/AboutPage';
import { AcademicsPage } from '../src/pages/AcademicsPage';
import { AdmissionsPage } from '../src/pages/AdmissionsPage';
import { CampusPage } from '../src/pages/CampusPage';
import { AchievementsPage } from '../src/pages/AchievementsPage';
import { EventsPage } from '../src/pages/EventsPage';
import { EventDetailPage } from '../src/pages/EventDetailPage';
import { GalleryPage } from '../src/pages/GalleryPage';
import { ContactPage } from '../src/pages/ContactPage';
import { LoginPage } from '../src/pages/LoginPage';
import { PortalLoginPage } from '../src/pages/PortalLoginPage';
import { NotFoundPage } from '../src/pages/NotFoundPage';
import { events } from '../src/data/events';
import { portals } from '../src/data/portals';

interface Case {
  path: string;
  label: string;
}

export function buildCases(): Case[] {
  return [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/campus', label: 'Campus' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/events', label: 'Events' },
    { path: `/events/${events[0]?.id ?? 'placeholder-1'}`, label: 'Event detail' },
    { path: '/events/does-not-exist', label: 'Event detail (bad id)' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login (chooser)' },
    // Every portal gets its own page, so every portal is smoke-tested. Driven
    // from the data so a new portal cannot be added without a route here.
    ...portals.map((portal) => ({ path: portal.path, label: portal.name })),
    { path: '/login/no-such-portal', label: 'Portal (bad id)' },
    { path: '/this-route-does-not-exist', label: '404' },
  ];
}

export function renderCase(path: string) {
  // The Provider must be present here exactly as it is in `main.tsx`, otherwise
  // any component reading from the store throws during server rendering. This
  // mirrors the real app shell deliberately: a smoke test that mounts a
  // different tree than production will miss real breakage.
  return renderToString(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          <Routes>
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
            <Route path="/login/:portalId" element={<PortalLoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </MemoryRouter>
    </Provider>
  );
}
