import { Info } from 'lucide-react';
import {
  Container,
  PageHero,
  Section,
  Reveal,
  SectionHeading,
  GalleryGrid,
  CTASection,
  PhotoSlotGrid,
} from '../components';
import { galleryImages, galleryCategories, schoolInfo } from '../data';
import { useSeo, buildOrganizationSchema, buildBreadcrumbSchema, buildGraph } from '../hooks/useSeo';

const PAGE_SCHEMA = buildGraph(
  buildOrganizationSchema(),
  buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ])
);

export function GalleryPage() {
  useSeo({
    title: `Photo Gallery | ${schoolInfo.name}`,
    description: `Browse photographs of the campus, students, events and activities at ${schoolInfo.name}, Shahdara, Lahore.`,
    path: '/gallery',
    structuredData: PAGE_SCHEMA,
  });

  return (
    <>
      <PageHero
        heroKey="gallery"
        eyebrow="Gallery"
        title="Life at Spectral, in Pictures"
        description="A visual tour of the campus, the classroom and the activities that fill the school year."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' },
        ]}
      />

      <Section tone="canvas" aria-labelledby="gallery-heading">
        <Container>
          <h2 id="gallery-heading" className="sr-only">
            Photo gallery
          </h2>

          <Reveal className="mx-auto mb-10 max-w-2xl">
            <p className="flex items-start gap-3 rounded-xl border border-dashed border-gold/50 bg-gold/8 p-5 text-sm leading-relaxed text-gold-dark">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Official photographs have not been supplied yet, so the tiles below are branded
                placeholders rather than stock images. Using unrelated stock photography would
                misrepresent the school, so each tile describes the photo that will appear there.
              </span>
            </p>
          </Reveal>

          <GalleryGrid
            images={galleryImages}
            categories={galleryCategories}
            emptyMessage="No images have been published in this category yet."
          />
        </Container>
      </Section>

      {/* Categories the school has not photographed yet. Honest empty slots
          rather than stock imagery of a different school. */}
      <Section tone="canvas" aria-labelledby="pending-heading">
        <Container>
          <Reveal>
            <SectionHeading
              id="pending-heading"
              eyebrow="Awaiting Official Photos"
              title="Sections Still Waiting on Photographs"
              description="These slots are reserved for pictures the school has not published yet. Nothing is filled in from elsewhere, so every image on this site is genuinely Spectral's own."
              align="center"
            />
          </Reveal>

          <PhotoSlotGrid
            slots={[
              {
                id: 'classroom',
                label: 'Photograph of a classroom',
                caption: 'Pending',
              },
              {
                id: 'laboratory',
                label: 'Photograph of a laboratory',
                caption: 'Pending',
              },
              {
                id: 'library',
                label: 'Photograph of the library',
                caption: 'Pending',
              },
              {
                id: 'sports',
                label: 'Photograph of sports facilities',
                caption: 'Pending',
              },
              {
                id: 'activities',
                label: 'Photograph of a student activity',
                caption: 'Pending',
              },
              {
                id: 'students',
                label: 'Photograph of students in class',
                caption: 'Pending',
              },
            ]}
            className="mt-14"
          />
        </Container>
      </Section>

      <CTASection
        eyebrow="See It in Person"
        title="Pictures Only Tell Part of the Story"
        description="The best way to understand the school is to visit. Contact the office to arrange a campus tour."
        primary={{ label: 'Arrange a Visit', to: '/contact' }}
        secondary={{ label: 'Apply for Admission', to: '/admissions' }}
      />
    </>
  );
}
