/**
 * Spectral Model School & College — Verified Knowledge Engine
 * Provides instant, verified responses matching the website facts
 * with strict anti-hallucination guardrails and bilingual English/Roman Urdu support.
 */

interface KnowledgeEntry {
  patterns: RegExp[];
  en: string;
  ur: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: [
      /how (can|do) i apply/i,
      /apply for admission/i,
      /application process/i,
      /apply/i,
      /dakhla kaise/i,
    ],
    en: 'You can apply by filling out the online admission inquiry on our Admissions page, or visit our campus office on Qazi Park Road, Shahdara.',
    ur: 'Aap hamare Admissions page par online form bhar kar apply kar saktay hain, ya direct Qazi Park Road, Shahdara campus tashreef la saktay hain.',
  },
  {
    patterns: [
      /explore academics/i,
      /academics/i,
      /program(me)?s/i,
      /curriculum/i,
      /classes offered/i,
      /parhai/i,
    ],
    en: 'Spectral offers quality education across Pre-School, Primary, Middle, Matriculation (Science & Arts), and Intermediate (FSc Pre-Medical, FSc Pre-Engineering, ICS, and FA-IT).',
    ur: 'Spectral School Pre-School se le kar Matric (Science aur Arts) aur Intermediate (FSc Pre-Medical, Pre-Engineering, ICS, aur FA-IT) tak standard taleem faraham karta hai.',
  },
  {
    patterns: [
      /tell me about spectral/i,
      /about spectral/i,
      /about the school/i,
      /what is spectral/i,
      /school ke baray/i,
    ],
    en: 'Spectral Model School & College is a dedicated educational institution in Shahdara, Lahore, focused on academic excellence, character development, and student success.',
    ur: 'Spectral Model School & College Shahdara, Lahore ka aik mayari taleemi idara hai jo talba ki behtareen taleem aur kirdar saazi par tawajjah deta hai.',
  },
  {
    patterns: [/view campus/i, /campus/i, /facilities/i, /building/i, /labs/i, /location/i],
    en: 'Our campus is located at Qazi Park Road, Shahdara, Lahore. It features modern classrooms, science and computer learning spaces, and co-curricular facilities.',
    ur: 'Hamara campus Qazi Park Road, Shahdara, Lahore mein waqay hai jahan modern classrooms, labs aur ham-nasabi sar-garmiyon ki sahulatain mojood hain.',
  },
  {
    patterns: [/contact/i, /phone/i, /number/i, /whatsapp/i, /call/i, /rabta/i, /address/i],
    en: 'You can reach Spectral Model School & College at 042-37932284 or send a WhatsApp message to 0322-7595534. Our campus is on Qazi Park Road, Shahdara, Lahore.',
    ur: 'Aap Spectral School se 042-37932284 par call ya 0322-7595534 par WhatsApp ke zariye rabta kar saktay hain.',
  },
  {
    patterns: [/lms/i, /portal/i, /login/i, /features/i, /system/i],
    en: 'The Spectral School LMS provides dedicated portals for Students, Parents, Teachers, and Admins to manage classes, attendance, assignments, and grades.',
    ur: 'Spectral School LMS par Students, Parents, Teachers aur Admins ke liye alag portals mojood hain jahan classes, hazri aur nataij dekhe ja saktay hain.',
  },
  {
    patterns: [/online class/i, /video lecture/i, /lecture/i, /timings/i],
    en: 'Online classes and recorded lectures are organized inside the Student Portal under the Live Classes and Academic Resources schedule.',
    ur: 'Online classes aur recorded video lectures aapko Student Portal ke andar Academic Resources schedule mein mil jayenge.',
  },
  {
    patterns: [/material/i, /notes/i, /book/i, /syllabus/i, /study/i],
    en: 'Subject notes, curriculum guides, and downloadable resources are regularly uploaded by faculty to each student’s course dashboard.',
    ur: 'Har subject ke notes aur syllabus guidelines faculty ki janib se Student Portal par download ke liye upload ki jati hain.',
  },
  {
    patterns: [/attendance/i, /hazri/i, /present/i, /absent/i],
    en: 'Daily attendance records and monthly percentage summaries are updated live and visible on both Student and Parent portals.',
    ur: 'Daily attendance aur monthly hazri ka mukammal record Student aur Parent portals par live dekha ja sakta hai.',
  },
  {
    patterns: [/assignment/i, /homework/i, /task/i, /submit/i],
    en: 'Homework and assignments can be viewed and submitted directly through the LMS Assignment Dashboard with teacher feedback.',
    ur: 'Aap apne homework aur assignments LMS Assignment Dashboard ke zariye check aur submit kar saktay hain.',
  },
  {
    patterns: [/result/i, /report card/i, /marks/i, /grade/i, /exam/i, /number/i],
    en: 'Term examination results, subject breakdowns, and digital progress reports are published under the Results section of your portal.',
    ur: 'Term imtehanat ke nataij aur digital report cards portal ke Results section mein publish kiye jatay hain.',
  },
  {
    patterns: [/fee/i, /fees/i, /dues/i, /voucher/i, /payment/i, /challan/i],
    en: 'Fee vouchers and payment statuses are managed via the Fee Portal. For official fee structures, please contact the school accounts office directly.',
    ur: 'Fee vouchers aur payment status Fee Portal par dastiyab hain. Mukammal fee structure janne ke liye school accounts office se rabta karein.',
  },
];

function isRomanUrdu(query: string): boolean {
  const urduMarkers = [
    /\b(kya|kaise|hai|hain|ki|ka|ke|ko|mein|se|aur|bhi|par|kahan|karo|batao|chahiye|dakhla|hazri|rabta)\b/i,
    /\b(aap|hum|meri|mera|mere|unka|unke|kab|kitni|kitna|hoga|hogi|shukriya|theek)\b/i,
  ];
  return urduMarkers.some((marker) => marker.test(query));
}

/**
 * Returns verified, anti-hallucination responses based on website ground truth.
 */
export function getFallbackAssistantResponse(query: string): string {
  const cleanQuery = query.trim().toLowerCase();
  const romanUrdu = isRomanUrdu(cleanQuery);

  for (const item of KNOWLEDGE_BASE) {
    if (item.patterns.some((pattern) => pattern.test(cleanQuery))) {
      return romanUrdu ? item.ur : item.en;
    }
  }

  // Strict anti-hallucination fallback
  if (romanUrdu) {
    return 'Mere paas yeh maloomat dastiyab nahi hain. Barah-e-karam taza tareen tafseelat ke liye direct Spectral School (042-37932284 ya WhatsApp 0322-7595534) se rabta karein.';
  }

  return "I don't have that information yet. Please contact Spectral Model School & College directly at 042-37932284 or WhatsApp 0322-7595534 for the latest details.";
}
