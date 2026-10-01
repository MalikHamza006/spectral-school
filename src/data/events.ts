export type EventCategory = 'Academic' | 'Sports' | 'Cultural' | 'Community' | 'Announcement';

export interface SchoolEvent {
  id: string;
  title: string;
  category: EventCategory;
  /** ISO `YYYY-MM-DD` date, or `null` when the date has not been announced. */
  date: string | null;
  description: string;
  /** Optional longer body for the event detail route. */
  body?: string[];
  /**
   * Image path relative to /public. `null` means the card renders a designed
   * placeholder instead of a photograph, so we never imply an image of an
   * event that has not happened.
   */
  image: string | null;
  /**
   * `placeholder` entries are structural examples only. They are surfaced in
   * the UI behind a dev-only banner so they can never be mistaken for
   * published news. Replace with real events as they are confirmed.
   */
  status: 'published' | 'placeholder';
  featured?: boolean;
}

const placeholderBody = [
  'Full details for this event have not been published yet. Replace this entry in src/data/events.ts with the confirmed date, description and photograph once available.',
];

/**
 * Events & news.
 *
 * These are STRUCTURAL PLACEHOLDERS with no real dates or claims. They exist so
 * the listing, filtering and detail routes are fully wired. Delete the
 * placeholder entries as real events are added.
 */
export const events: SchoolEvent[] = [
  {
    id: 'placeholder-1',
    title: 'Event Title Placeholder',
    category: 'Academic',
    date: null,
    description:
      'Placeholder event card used to demonstrate the news layout. Replace with a confirmed school event.',
    body: placeholderBody,
    image: null,
    status: 'placeholder',
    featured: true,
  },
  {
    id: 'placeholder-2',
    title: 'Event Title Placeholder',
    category: 'Sports',
    date: null,
    description:
      'Placeholder event card used to demonstrate the news layout. Replace with a confirmed school event.',
    body: placeholderBody,
    image: null,
    status: 'placeholder',
  },
  {
    id: 'placeholder-3',
    title: 'Event Title Placeholder',
    category: 'Cultural',
    date: null,
    description:
      'Placeholder event card used to demonstrate the news layout. Replace with a confirmed school event.',
    body: placeholderBody,
    image: null,
    status: 'placeholder',
  },
  {
    id: 'placeholder-4',
    title: 'Event Title Placeholder',
    category: 'Community',
    date: null,
    description:
      'Placeholder event card used to demonstrate the news layout. Replace with a confirmed school event.',
    body: placeholderBody,
    image: null,
    status: 'placeholder',
  },
  {
    id: 'placeholder-5',
    title: 'Event Title Placeholder',
    category: 'Announcement',
    date: null,
    description:
      'Placeholder event card used to demonstrate the news layout. Replace with a confirmed school event.',
    body: placeholderBody,
    image: null,
    status: 'placeholder',
  },
  {
    id: 'placeholder-6',
    title: 'Event Title Placeholder',
    category: 'Academic',
    date: null,
    description:
      'Placeholder event card used to demonstrate the news layout. Replace with a confirmed school event.',
    body: placeholderBody,
    image: null,
    status: 'placeholder',
  },
];

export const eventCategories: Array<'All' | EventCategory> = [
  'All',
  'Academic',
  'Sports',
  'Cultural',
  'Community',
  'Announcement',
];

/** Sorts published (dated) events first, newest first, then undated placeholders. */
export function sortEvents(list: SchoolEvent[]): SchoolEvent[] {
  return [...list].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}

export function getEventById(id: string): SchoolEvent | undefined {
  return events.find((event) => event.id === id);
}
