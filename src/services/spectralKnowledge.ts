/**
 * Spectral School LMS Fallback Knowledge Engine
 * Provides instant, verified responses matching the system prompt if Puter AI is
 * slow, unauthenticated, or temporarily unreachable.
 */

interface KnowledgeEntry {
  patterns: RegExp[];
  en: string;
  ur: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: [/lms/i, /what is (this|spectral)/i, /kya hai/i, /portal/i, /features/i, /system/i],
    en: 'Spectral School LMS provides access to online classes, recorded lectures, study materials, attendance tracking, assignments, and exam report cards.',
    ur: 'Spectral School LMS ke zariye aap online classes, video lectures, study materials, attendance, assignments aur exam results asani se dekh saktay hain.',
  },
  {
    patterns: [/online class/i, /video lecture/i, /lecture/i, /class/i, /timing/i],
    en: 'Online classes and recorded video lectures are available inside your student portal under the Live Classes and Academic Resources section.',
    ur: 'Online classes aur recorded video lectures aapko Student Portal ke andar Academic Resources section mein mil jayenge.',
  },
  {
    patterns: [/material/i, /notes/i, /book/i, /syllabus/i, /study/i, /parhai/i],
    en: 'Study materials, subject notes, and syllabus outlines can be downloaded directly from the LMS dashboard for your enrolled grade.',
    ur: 'Study materials, notes aur syllabus aap apne LMS dashboard se aasani se download kar saktay hain.',
  },
  {
    patterns: [/attendance/i, /hazri/i, /present/i, /absent/i],
    en: 'Daily attendance records and monthly summaries are tracked in real-time on both the Student and Parent Portals.',
    ur: 'Daily attendance aur monthly hazri ka record Student aur Parents dono portals par live dekha ja sakta hai.',
  },
  {
    patterns: [/assignment/i, /homework/i, /task/i, /submit/i, /jama/i],
    en: 'You can view pending homework and submit your completed assignments through the LMS Assignment Submission tab before the deadline.',
    ur: 'Aap apne homework aur assignments LMS ke Assignment Submission tab ke zariye waqt par jama karwa saktay hain.',
  },
  {
    patterns: [/result/i, /report card/i, /marks/i, /grade/i, /exam/i, /imtehan/i, /number/i],
    en: 'Term examination results, subject scores, and digital report cards are posted under the Exam Results section of your portal.',
    ur: 'Term exams ke results aur progress report cards aapke Portal ke Results section mein release kiye jatay hain.',
  },
  {
    patterns: [/fee/i, /fees/i, /dues/i, /voucher/i, /payment/i, /challan/i],
    en: 'Fee vouchers and payment statuses are accessible in the Fee Portal. For custom fee queries, please contact the school accounts office directly.',
    ur: 'Fee vouchers aur payment status Fee Portal par dastiyab hain. Kisi bhi makhsoos sawal ke liye school accounts office se rabta karein.',
  },
  {
    patterns: [/admission/i, /dakhla/i, /apply/i, /eligibility/i, /form/i, /criteria/i],
    en: 'Admissions are open for Pre-School through Matric and Intermediate (FSc Pre-Medical, Pre-Engineering, ICS, FA-IT). You can apply through our online admissions form.',
    ur: 'Dakhlay Pre-School se Matric aur Intermediate (FSc, ICS, FA-IT) ke liye open hain. Aap online admission form bhar saktay hain.',
  },
  {
    patterns: [/contact/i, /phone/i, /number/i, /address/i, /location/i, /where/i, /kahan/i, /rabta/i],
    en: 'Spectral Model School & College is located on Qazi Park Road, Shahdara, Lahore. You can call 042-37932284 or WhatsApp 0322-7595534.',
    ur: 'Spectral School Qazi Park Road, Shahdara, Lahore par waqay hai. Aap 042-37932284 par call ya 0322-7595534 par WhatsApp kar saktay hain.',
  },
];

function isRomanUrdu(query: string): boolean {
  const urduMarkers = [
    /\b(kya|kaise|hai|hain|ki|ka|ke|ko|mein|se|aur|bhi|par|kahan|karo|batao|chahiye|dakhla|hazri|rabta)\b/i,
    /\b(aap|hum|meri|mera|mere|unka|unke|kab|kitni|kitna|hoga|hogi)\b/i,
  ];
  return urduMarkers.some((marker) => marker.test(query));
}

export function getFallbackAssistantResponse(query: string): string {
  const cleanQuery = query.trim().toLowerCase();
  const romanUrdu = isRomanUrdu(cleanQuery);

  for (const item of KNOWLEDGE_BASE) {
    if (item.patterns.some((pattern) => pattern.test(cleanQuery))) {
      return romanUrdu ? item.ur : item.en;
    }
  }

  if (romanUrdu) {
    return 'Main Spectral AI Assistant hoon. Main online classes, study materials, attendance, assignments aur results mein aapki madad kar sakta hoon. Aap apna sawal wazeh karein.';
  }

  return 'I am Spectral AI Assistant. I can guide you regarding online classes, study materials, attendance, assignments, and exam results. How may I assist you with the LMS?';
}
