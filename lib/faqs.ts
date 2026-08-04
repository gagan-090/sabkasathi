/**
 * Every FAQ the site publishes, in one place.
 *
 * These used to live twice — a six-item set inside app/faq/page.tsx and a
 * fifteen-item set inside components/FAQSection.tsx — which meant the chat
 * assistant could only learn them by having them retyped a third time. They
 * are hoisted here so the FAQ page, the FAQ section and lib/chatKnowledge.ts
 * all read the same answers, and editing one edits all three.
 *
 * Plain data, no React: safe to import from a server route.
 */

export interface Faq {
  question: string;
  answer: string;
}

/** The headline six — commercial questions, shown on /faq. */
export const primaryFaqs: Faq[] = [
  {
    question: "What services does Sabka Saathi Digital Services offer?",
    answer:
      "We build websites, mobile apps, and custom software automation, along with digital marketing and CRM setup for startups, retailers, and local businesses.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope and requirements. Simple websites usually take 1-2 weeks, while custom apps or automation systems can take 4-8 weeks. We'll give you a clear estimate before starting.",
  },
  {
    question: "Do you work with businesses outside Bihar?",
    answer:
      "Yes. While we have strong roots across Bihar, we serve clients pan-India and work remotely with smooth communication throughout the project.",
  },
  {
    question: "What is the payment structure?",
    answer:
      "We typically work with a milestone-based payment plan — an advance to begin, and remaining payments tied to project milestones or delivery.",
  },
  {
    question: "Do you provide support after the project is delivered?",
    answer:
      "Yes, we offer post-launch support and maintenance packages so your website or app keeps running smoothly.",
  },
  {
    question: "How do I get started?",
    answer:
      "Reach out via call, WhatsApp, or the contact form. We'll discuss your requirements, share a proposal, and get started once you're ready.",
  },
];

/** The longer reassurance set — the questions a first-time buyer actually asks. */
export const generalFaqs: Faq[] = [
  {
    question: "How long does it take to complete a website or app?",
    answer:
      "The timeline depends on your requirements and project complexity. Most standard websites are completed within a few days, while advanced projects may take longer. We always aim for fast delivery without compromising quality.",
  },
  {
    question: "I don't have technical knowledge. Can I still work with you?",
    answer:
      "Absolutely. Our process is simple and beginner-friendly. We guide you step-by-step and handle all technical aspects so you can focus on your business.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes. Every website we create is fully responsive and optimized for mobile, tablet, and desktop devices.",
  },
  {
    question: "Can I update or manage my website later?",
    answer:
      "Yes. We build user-friendly systems so you can easily update content. We also provide guidance if you need help managing your website.",
  },
  {
    question: "Do you provide support after project completion?",
    answer:
      "Yes. We provide support and assistance even after delivery to ensure everything runs smoothly.",
  },
  {
    question: "Will my business get customers through your services?",
    answer:
      "Our goal is to help you build a strong online presence and reach the right audience. Results depend on multiple factors like your business type, market, and consistency.",
  },
  {
    question: "Do you provide digital marketing services?",
    answer:
      "Yes. We offer digital marketing solutions to help your business grow and attract more customers online.",
  },
  {
    question: "What information do I need to get started?",
    answer:
      "You only need basic details like: Business name, Services/products, and Contact details. We guide you with everything else.",
  },
  {
    question: "Can you create custom solutions for my business?",
    answer:
      "Yes. Every business is different, so we provide customized solutions based on your goals and requirements.",
  },
  {
    question: "Is my data safe with you?",
    answer:
      "Yes. We maintain strict privacy and security standards. Your information is kept confidential and used only for service purposes.",
  },
  {
    question: "Do you work with clients outside my city?",
    answer:
      "Yes. We work with clients across India through online communication and smooth delivery processes.",
  },
  {
    question: "What makes your service different?",
    answer:
      "We focus on simple and practical solutions, clear communication, and real results—not false promises.",
  },
  {
    question: "Can I request changes during the project?",
    answer:
      "Yes. Minor changes can be discussed during the development process. We ensure your final product matches your expectations.",
  },
  {
    question: "Do you help with business growth strategy?",
    answer:
      "Yes. We don't just build — we guide you with strategies to grow your business online.",
  },
  {
    question: "How do I get started?",
    answer: "It's simple: Contact us → Discuss your requirement → Get started.",
  },
];

/**
 * Both sets, deduplicated on the question text. The two lists overlap on
 * "How do I get started?" and on the timeline question; the primary set wins
 * because its answer is the more specific of the two.
 */
export const allFaqs: Faq[] = (() => {
  const seen = new Set<string>();
  const out: Faq[] = [];
  for (const f of [...primaryFaqs, ...generalFaqs]) {
    const key = f.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
})();
