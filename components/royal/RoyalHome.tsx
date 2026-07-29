"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { BiharGlobe } from "./BiharGlobe";
import { VideoHero } from "./VideoHero";
import { TechMarquee, TechRing } from "./TechCarousel";
import {
  BackToTop,
  Counter,
  Curtain,
  EASE,
  Float,
  Magnetic,
  Parallax,
  Pop,
  Reveal,
  Scene,
  ScrollProgress,
  ScrollProgressLine,
  Spotlight,
  Stagger,
  StaggerItem,
  Tilt,
  Words,
} from "./motion";
import {
  INCLUDED,
  NUMBERS,
  PLACES,
  SERVICES,
  SOLUTIONS,
  STEPS,
  TECH,
  TESTIMONIALS,
  WORK,
} from "./data";

export function RoyalHome({ showcase }: { showcase?: React.ReactNode }) {
  /* Same Formspree endpoint the /contact page posts to, so briefs sent from
     the home page land in the same inbox. */
  const [formState, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || "xlgoknzw");

  return (
    <div className="rh-root">
      {/* Reading progress across the top of the window, and the return trip.
          Both are fixed-position but live inside .rh-root, which carries
          `isolation: isolate` — so their z-index only ranks them against the
          rest of the home page, never against the navbar. That is fine here:
          the navbar's box starts 8px down, so the 3px progress hairline at
          y=0 sits in the strip above it and never has to out-rank it. */}
      <ScrollProgress />
      <BackToTop />

      <VideoHero />

      {/* ══════════════════════════ STACK MARQUEE ══════════════════════════ */}
      <section className="rh-strip" aria-label="Technologies we work with">
        <TechMarquee />
      </section>

      {/* ══════════════════════════ NUMBERS ══════════════════════════ */}
      <section className="rh-section rh-section-paper rh-section-lit" aria-label="Reach by the numbers">
        <Spotlight />
        <div className="rh-shell">
          {/* The whole row drifts a little against the scroll, so the figures
              settle into place rather than arriving with the background. */}
          <Scene y={26}>
            <Stagger className="rh-numbers" gap={0.1}>
              {NUMBERS.map((item) => (
                <StaggerItem className="rh-number" key={item.label}>
                  <div className="rh-number-value">
                    <Counter to={item.to} suffix={item.suffix} />
                  </div>
                  <div className="rh-number-label">{item.label}</div>
                </StaggerItem>
              ))}
            </Stagger>
          </Scene>
        </div>
      </section>

      {/* ══════════════════════════ SERVICES ══════════════════════════ */}
      <Section id="services" tone="tint">
        <Head
          eyebrow="What we build"
          title="Eight practices. One delivery team."
          lead="Most agencies hand you a deck. We hand you a running system — designed, built and maintained by the same people, so nothing is lost between the pitch and the launch."
        />

        <Stagger className="rh-cards" gap={0.07}>
          {SERVICES.map((service) => (
            <StaggerItem key={service.index}>
              <Tilt className="rh-card" max={6}>
                {/* The shot is uncovered by a panel sliding up off it as the
                    card arrives, so the image reads as being revealed rather
                    than fading in with everything else. */}
                <Curtain className="rh-card-shot">
                  <Image
                    src={service.src}
                    alt={service.title}
                    fill
                    className="rh-card-img"
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 320px"
                  />
                  <span className="rh-card-sheen" aria-hidden="true" />
                </Curtain>

                <div className="rh-card-headrow">
                  <motion.span
                    className="rh-card-icon"
                    aria-hidden="true"
                    initial={{ scale: 0.5, rotate: -25, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {service.icon}
                  </motion.span>
                  <h3 className="rh-card-title">{service.title}</h3>
                  <span className="rh-card-index">{service.index}</span>
                </div>

                <p className="rh-card-body">{service.body}</p>

                {/* Tags flick in one after another once the card itself has
                    landed — the last beat of the card's own entrance. */}
                <motion.ul
                  className="rh-card-list"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
                >
                  {service.tags.map((tag) => (
                    <motion.li
                      className="rh-tag"
                      key={tag}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.94 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
                      }}
                    >
                      {tag}
                    </motion.li>
                  ))}
                </motion.ul>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ══════════════════════════ SOLUTIONS ══════════════════════════ */}
      <Section id="solutions" tone="paper">
        <Head
          eyebrow="Systems we ship"
          title="The products behind the businesses."
          lead="Six system types we have built repeatedly — each one adapted to the operation it serves rather than rebuilt from zero."
        />

        <Stagger className="rh-solutions" gap={0.08}>
          {SOLUTIONS.map((item) => (
            <StaggerItem as="article" className="rh-solution" key={item.title}>
              <div className="rh-solution-bar" aria-hidden="true">
                <span className="rh-frame-dot" />
                <span className="rh-frame-dot" />
                <span className="rh-frame-dot" />
                <span className="rh-solution-label">{item.label}</span>
              </div>

              <Curtain className="rh-solution-shot" from="left" duration={0.9}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="rh-solution-img"
                  sizes="(max-width: 700px) 92vw, 360px"
                />
              </Curtain>

              <div className="rh-solution-body">
                <h3 className="rh-solution-title">{item.title}</h3>
                <p className="rh-solution-desc">{item.desc}</p>
                <ul className="rh-solution-tech">
                  {item.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ══════════════════════════ WORK ══════════════════════════ */}
      <Section id="work" tone="tint">
        <Head
          eyebrow="Selected work"
          title="Built, shipped, still running."
          lead="A sample of platforms in daily use by retailers, clinics and distributors across Bihar, Maharashtra and Gujarat."
        />

        <div className="rh-work">
          {WORK.map((item, i) => (
            <Reveal key={item.name} delay={(i % 2) * 0.12} distance={34}>
              {/* Hover behaviour for this tile — the lift, the image push-in
                  and the arrow rotation — is CSS, and stays CSS. Framer sets
                  inline transforms, which beat a stylesheet `:hover` rule
                  outright, so driving both from here would silently disable
                  the ones already in royal.css. */}
              <a className="rh-work-item" href="#work">
                <Curtain className="rh-work-canvas" duration={1.1}>
                  {/* The slow settle from 1.16 is the reveal itself — the image
                      lands as you reach it rather than just appearing. */}
                  <motion.div
                    className="rh-work-canvas-inner"
                    initial={{ scale: 1.16 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, ease: EASE }}
                  >
                    <Image
                      src={item.src}
                      alt={`${item.name} — ${item.kind}`}
                      fill
                      sizes="(max-width: 780px) 92vw, (max-width: 1240px) 45vw, 520px"
                    />
                  </motion.div>
                </Curtain>
                <div className="rh-work-meta">
                  <div>
                    <div className="rh-work-name">{item.name}</div>
                    <div className="rh-work-kind">{item.kind}</div>
                  </div>
                  <span className="rh-work-go" aria-hidden="true">
                    <Arrow />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Live phone/browser demos are slotted in here by app/page.tsx — they
          are the richer form of the WORK grid directly above, so they belong
          next to it rather than stranded below the closing CTA. */}
      {showcase}

      {/* ══════════════════════════ TECH STACK ══════════════════════════ */}
      <Section id="stack" tone="paper">
        <Head
          eyebrow="Our stack"
          title="Chosen for longevity, not novelty."
          lead="Everything here is something we run in production and can hand over to another team without an apology."
        />

        {/* The ring counter-rotates slightly against the scroll, which reads
            as the whole stack turning as you pass it. */}
        <Scene y={18} rotate={2}>
          <Reveal>
            <TechRing />
          </Reveal>
        </Scene>

        <Stagger className="rh-tech" gap={0.03} delay={0.1}>
          {TECH.map((item) => (
            <StaggerItem as="span" className="rh-tech-chip" key={item}>
              <span className="rh-tech-dot" aria-hidden="true" />
              {item}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ══════════════════════════ PROCESS ══════════════════════════ */}
      <Section id="process" tone="tint">
        <Head
          eyebrow="How it goes"
          title="A process you can hold us to."
          lead="Four stages, fixed checkpoints, and a staging link from week two. You never have to ask where the project stands."
        />

        <div className="rh-steps-wrap">
          <ScrollProgressLine className="rh-steps-line" />
          <Stagger className="rh-steps" gap={0.12}>
            {STEPS.map((step) => (
              <StaggerItem key={step.title}>
                {/* The marker pops on the rail as the line sweeps under it. */}
                <motion.div
                  className="rh-step-marker"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.1 }}
                />
                <span className="rh-step-kicker">{step.kicker}</span>
                <h3 className="rh-step-title">{step.title}</h3>
                <p className="rh-step-body">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ══════════════════════════ INCLUDED ══════════════════════════ */}
      <Section id="included" tone="paper">
        <Head
          eyebrow="Included as standard"
          title="What comes with every build."
          lead="Not upsells. These are part of the engagement, written into the quote before you sign anything."
        />

        <Stagger className="rh-included" gap={0.09}>
          {INCLUDED.map((item) => (
            <StaggerItem className="rh-include" key={item.title}>
              <motion.span
                className="rh-include-check"
                aria-hidden="true"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
              >
                <IconCheck />
              </motion.span>
              <h3 className="rh-include-title">{item.title}</h3>
              <p className="rh-include-body">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ══════════════════════════ FOUNDER ══════════════════════════ */}
      <Section tone="tint">
        <div className="rh-quote-grid">
          <Reveal from="left" distance={40}>
            <Curtain className="rh-portrait-curtain" duration={1.15}>
              <figure className="rh-portrait">
                <Parallax distance={22} className="rh-portrait-parallax">
                  <Image
                    src="/team/ashish-kumar.webp"
                    alt="Ashish Kumar, founder of Sabka Saathi Digital Services"
                    width={560}
                    height={700}
                    className="rh-portrait-img"
                    sizes="(max-width: 900px) 80vw, 380px"
                  />
                </Parallax>
              </figure>
            </Curtain>
          </Reveal>

          <Reveal from="right" distance={40} delay={0.12}>
            <span className="rh-eyebrow">The founder</span>
            {/* The quote mark drifts in its own slow orbit behind the text. */}
            <Float amplitude={7} duration={7}>
              <span className="rh-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
            </Float>
            <blockquote className="rh-quote">
              We started this studio because good software kept stopping at the metros. It has no
              reason to.
            </blockquote>
            <div className="rh-quote-by">Ashish Kumar · Founder</div>
          </Reveal>
        </div>
      </Section>

      {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
      <Section id="testimonials" tone="paper">
        <Head
          eyebrow="Client words"
          title="Trusted by teams that ship."
          lead="Founders, product leads and CTOs who stayed on after the first project closed."
        />

        <Stagger className="rh-quotes" gap={0.1}>
          {TESTIMONIALS.map((item) => (
            <StaggerItem key={item.name}>
              <Tilt className="rh-testimonial" max={5}>
                {/* Stars land one at a time, left to right, like a rating
                    being given rather than one that was always there. */}
                <motion.div
                  className="rh-stars"
                  aria-label={`${item.rating} out of 5`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <motion.span
                      key={s}
                      style={{ display: "inline-flex" }}
                      variants={{
                        hidden: { opacity: 0, scale: 0.3, rotate: -40 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                          transition: { type: "spring", stiffness: 420, damping: 15 },
                        },
                      }}
                    >
                      <Star dim={s >= item.rating} />
                    </motion.span>
                  ))}
                </motion.div>
                <p className="rh-testimonial-text">{item.feedback}</p>
                <div className="rh-testimonial-by">
                  <span className="rh-testimonial-avatar">
                    <Image src={item.avatar} alt={item.name} fill sizes="44px" />
                  </span>
                  <span className="rh-testimonial-id">
                    <span className="rh-testimonial-name">{item.name}</span>
                    <span className="rh-testimonial-role">{item.role}</span>
                  </span>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ══════════════════════════ LOCATIONS ══════════════════════════ */}
      <Section id="locations" tone="tint">
        <Head
          eyebrow="Where we work"
          title="Remote-first, across 242 cities."
          lead="Delivery does not depend on a postcode. We run projects over calls, shared boards and staging links — the same way for a client in Patna as one in Pune."
        />

        {/* The globe used to sit in the hero. It belongs here: this is the
            section actually about geography, and the hero is video now. */}
        <div className="rh-locations-grid">
          <Reveal from="left" distance={36}>
            {/* The globe keeps drifting after it arrives, so the section has
                one thing still moving while the city list is read. */}
            <Float amplitude={12} duration={9}>
              <div className="rh-globe-stage">
                <BiharGlobe />
              </div>
            </Float>
          </Reveal>

          {/* The <ul> is the stagger parent itself — a plain list element in
              between would break variant propagation to the items. */}
          <Stagger as="ul" className="rh-places" gap={0.035} delay={0.12}>
            {PLACES.map((place) => (
              <StaggerItem as="li" key={place}>
                <Pop hover={1.05} tap={0.96}>
                  <Link className="rh-place" href="/locations">
                    {place}
                  </Link>
                </Pop>
              </StaggerItem>
            ))}
            <StaggerItem as="li">
              <Pop hover={1.05} tap={0.96}>
                <Link className="rh-place rh-place-more" href="/locations">
                  All 242 cities
                  <Arrow />
                </Link>
              </Pop>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      {/* ══════════════════════════ CONTACT ══════════════════════════ */}
      <Section id="contact" tone="paper">
        <Head
          eyebrow="Let’s begin"
          title="Tell us what you’re building."
          lead="Send a two-line brief. You’ll hear back from a person — usually within the hour, always within two."
        />

        <div className="rh-contact-grid">
          <Stagger className="rh-contact-cards" gap={0.1}>
            <StaggerItem>
              <a className="rh-contact-card" href="mailto:helpsabkasaathi@gmail.com">
                <span className="rh-contact-icon" aria-hidden="true">
                  <IconMail />
                </span>
                <span>
                  <span className="rh-contact-label">Email</span>
                  <span className="rh-contact-value">helpsabkasaathi@gmail.com</span>
                </span>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a className="rh-contact-card" href="tel:+919431673018">
                <span className="rh-contact-icon" aria-hidden="true">
                  <IconCall />
                </span>
                <span>
                  <span className="rh-contact-label">Phone &amp; WhatsApp</span>
                  <span className="rh-contact-value">+91 94316 73018</span>
                </span>
              </a>
            </StaggerItem>

            <StaggerItem>
              <div className="rh-contact-card">
                <span className="rh-contact-icon" aria-hidden="true">
                  <IconPin />
                </span>
                <span>
                  <span className="rh-contact-label">Registered office</span>
                  <span className="rh-contact-value">
                    Building No. 0241, Bypass Road, Maharani Puram,
                    <br />
                    Sheikhpura, Bihar
                  </span>
                </span>
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal from="right" distance={32} delay={0.1}>
            <form className="rh-form" onSubmit={handleSubmit}>
              <h3 className="rh-form-title">Talk to our experts</h3>
              <p className="rh-form-note">
                Tell us about the project and we&rsquo;ll come back with scope, timeline and a fixed
                quote.
              </p>

              {/* Fields deal themselves in from the left, in tab order. */}
              <Stagger className="rh-form-grid" gap={0.07} delay={0.15}>
                <StaggerItem className="rh-field">
                  <label htmlFor="rh-name">Full name</label>
                  <input id="rh-name" name="name" placeholder="e.g. Parth Patel" />
                </StaggerItem>
                <StaggerItem className="rh-field">
                  <label htmlFor="rh-email">Email address</label>
                  <input
                    id="rh-email"
                    name="email"
                    type="email"
                    required
                    placeholder="parth@example.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={formState.errors} />
                </StaggerItem>
                <StaggerItem className="rh-field">
                  <label htmlFor="rh-phone">Phone / WhatsApp</label>
                  <input id="rh-phone" name="phone" inputMode="numeric" placeholder="9876543210" />
                </StaggerItem>
                <StaggerItem className="rh-field">
                  <label htmlFor="rh-company">Company</label>
                  <input id="rh-company" name="company" placeholder="Your business name" />
                </StaggerItem>
                <StaggerItem className="rh-field rh-field-wide">
                  <label htmlFor="rh-brief">Project brief</label>
                  <textarea
                    id="rh-brief"
                    name="brief"
                    required
                    placeholder="Tell us about your project goals or the features you need…"
                  />
                  <ValidationError prefix="Brief" field="brief" errors={formState.errors} />
                </StaggerItem>
              </Stagger>

              <div className="rh-form-actions">
                <Magnetic strength={0.18}>
                  <button
                    type="submit"
                    className="rh-btn rh-btn-primary"
                    disabled={formState.submitting || formState.succeeded}
                  >
                    {formState.submitting
                      ? "Sending…"
                      : formState.succeeded
                        ? "Brief received"
                        : "Send the brief"}
                    {!formState.succeeded && <Arrow />}
                  </button>
                </Magnetic>
                <span className="rh-form-fineprint" role="status" aria-live="polite">
                  {formState.succeeded
                    ? "Thanks — your brief is in. We’ll reply to your email shortly."
                    : "We reply within two working hours."}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>

      {/* ══════════════════════════ CLOSING CTA ══════════════════════════ */}
      <Section tone="paper" tight>
        <Reveal>
          <div className="rh-cta">
            {/* The two rings breathe against each other on offset cycles, so
                the panel never sits completely still under the closing line. */}
            <motion.span
              className="rh-cta-ring"
              aria-hidden="true"
              animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="rh-cta-ring rh-cta-ring-2"
              aria-hidden="true"
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            />
            <span className="rh-eyebrow">Ready when you are</span>
            <Words className="rh-display rh-cta-title" text="Let’s build the thing properly." />
            <p className="rh-lead rh-cta-lead">
              One team, one point of contact, and a system your business can grow into rather than
              out of.
            </p>
            <div className="rh-cta-actions">
              <Magnetic>
                <Pop lift={2}>
                  <a href="mailto:helpsabkasaathi@gmail.com" className="rh-btn rh-btn-primary">
                    Start the conversation
                    <Arrow />
                  </a>
                </Pop>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Pop lift={2}>
                  <a href="tel:+919431673018" className="rh-btn rh-btn-ghost">
                    +91 94316 73018
                  </a>
                </Pop>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

/* ── section scaffolding ────────────────────────────────────────────────────
   Every section shares one padding scale and one header layout so the vertical
   rhythm stays even down the whole page. */

function Section({
  id,
  tone,
  tight,
  children,
}: {
  id?: string;
  tone: "paper" | "tint";
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`rh-section rh-section-${tone}${tight ? " rh-section-tight" : ""}`}>
      <div className="rh-shell">{children}</div>
    </section>
  );
}

function Head({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="rh-head">
      {/* Everything down to the rule is one grid cell — .rh-head is a
          two-column grid above 900px, so the heading side has to stay a
          single child or the lead gets pushed onto its own row. */}
      <div className="rh-head-main">
        <Reveal>
          <span className="rh-eyebrow">{eyebrow}</span>
        </Reveal>

        {/* The title assembles a word at a time, each one swinging up from
            behind the line above it. It is staggered off the heading's own
            entry into view, so it starts as the heading reaches the reader
            rather than on a timer. */}
        <Words className="rh-display rh-head-title" text={title} delay={0.08} />

        {/* A rule that draws itself under the heading. scaleX only — a width
            animation would relayout the header on every frame. */}
        <motion.span
          className="rh-head-rule"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        />
      </div>

      <Reveal delay={0.18}>
        <p className="rh-lead">{lead}</p>
      </Reveal>
    </div>
  );
}

/* ── icons ──────────────────────────────────────────────────────────────── */

function Arrow() {
  return (
    <svg
      className="rh-btn-arrow"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Star({ dim }: { dim?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={dim ? "dim" : undefined}
      aria-hidden="true"
    >
      <path d="m12 2.6 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6-4.8-4.6 6.6-.9L12 2.6Z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7.5 8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15.5 12l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
