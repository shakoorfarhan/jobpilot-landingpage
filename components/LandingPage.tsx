"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { track } from "@/lib/track";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaChrome,
  FaPlay,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaCcStripe,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import CookieConsentBanner from "./CookieConsentBanner";
import styles from "../styles/Landing.module.css";
// import { trackPageView } from "@/lib/analytics-client";

const ROTATING_PHRASES = [
  "forgotten follow-ups",
  "application chaos",
  "generic copy-pasted outreach",
  "lost recruiter wins",
];

const PAIN_POINTS = [
  {
    title: "Every job board has its own workflow",
    description: "You chase tabs, screenshots, and inboxes just to remember who needs a reply.",
  },
  {
    title: "Tailored outreach steals your evenings",
    description: "Cover letters and follow-ups sound the same because there’s no time to personalize.",
  },
  {
    title: "Nothing tells you what’s working",
    description: "No signal on which skills and regions respond—so you keep emailing in the dark.",
  },
];

const STEPS = [
  {
    title: "Capture opportunities instantly",
    description: "Save any role with the Chrome extension or add it manually-JobPilot keeps the source, salary, and timeline visible in one place.",
    icon: FaCheckCircle,
  },
  {
    title: "Personalize in minutes",
    description: "Generate resume, cover letter, and follow-up drafts from the profile you maintain once.",
    icon: FaUsers,
  },
  {
    title: "Stay on track with context",
    description: "Pipeline views and response analytics highlight which skills and regions are getting traction right now.",
    icon: FaClock,
  },
];

const METRICS = [
  { value: "1 workspace", label: "Apps, resumes, notes—all in one place" },
  { value: "2-3x faster", label: "Outreach & follow-ups with AI drafts" },
  { value: "100% free", label: "During beta, no credit card required" },
];

const TESTIMONIALS = [
  {
    quote:
      "I stopped guessing which regions respond—JobPilot surfaces the skills recruiters mention so follow ups stay intentional.",
    author: "Priya S.",
    role: "Senior Frontend Engineer",
  },
  {
    quote:
      "Every application used to live in another doc. Now I have a single workspace and AI drafts I can ship in minutes.",
    author: "Miguel D.",
    role: "Product Manager",
  },
];

const navLinks = [
  { label: "Why JobPilot", href: "#pain" },
  { label: "How it works", href: "#steps" },
  { label: "Proof", href: "#proof" },
  { label: "FAQ", href: "#faq" },
];

const FAQS = [
  {
    question: "What makes JobPilot different from a traditional tracker?",
    answer:
      "JobPilot tracks opportunities, drafts outreach, and measures response trends in one tab. Instead of juggling spreadsheets, you log in and see the next actions that matter.",
  },
  {
    question: "Will JobPilot stay free?",
    answer:
      "The core workspace is free while we’re in beta. Paid automation and collaboration seats are planned for later this year, and we’ll share pricing before anything changes.",
  },
  {
    question: "Can I import my existing pipeline?",
    answer:
      "Yes. Upload a CSV, paste from a spreadsheet, or let the Chrome extension capture the role you’re viewing. We map statuses automatically so you can keep momentum.",
  },
  {
    question: "Does JobPilot send emails on my behalf?",
    answer:
      "No. We generate tailored drafts using your voice and job context, but you decide what gets sent and when. Think of JobPilot as a co-pilot—not an autopilot.",
  },
];

const COMPARISON = [
  {
    feature: "Live skill & region analytics",
    jobpilot: "Included – driven by your logged activity",
    traditional: "Manual exports",
  },
  {
    feature: "Tailored resume & outreach drafts",
    jobpilot: "AI-powered, editable",
    traditional: "Copy/paste templates",
  },
  {
    feature: "Chrome capture + reminders",
    jobpilot: "Automatic",
    traditional: "Browser tabs & sticky notes",
  },
  {
    feature: "Pricing during beta",
    jobpilot: "$0 while we’re in beta",
    traditional: "$19–$49 / month per seat",
  },
];

const HERO_DEMO_ITEMS = [
  {
    eyebrow: "Smart reminder",
    title: "Follow up with Aster Labs",
    detail: "You approve, JobPilot keeps the nudge on your radar.",
    tone: "primary",
  },
  {
    eyebrow: "Tailored resume ready",
    title: "ATS keywords already mapped",
    detail: "Company prompts prefilled for you.",
    tone: "secondary",
  },
  {
    eyebrow: "Hot regions",
    title: "Canada • Germany • Remote",
    detail: "Trending from the last 24 hours.",
    tone: "muted",
  },
];

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  useEffect(() => {
    track("page_landing_view");
  }, []);
  const handleAddToChromeFromMain = () => {
    track("cta_add_chrome_extension");
    // 1. Track the click with context
    // trackPageView("add_to_chrome_click", { pageType: "ml-add_to_chrome_click" });
    // 2. Then open the Chrome Web Store page
    window.open(
      "https://chrome.google.com/webstore/detail/jobpilot/YOUR_EXTENSION_ID",
      "_blank",
      "noopener,noreferrer"
    );
  };
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   trackPageView(window.location.pathname || "/", { pageType: "landing" });
  // }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const handleStartCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/payments/checkout", { method: "POST" });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Paid plans are not enabled yet.");
      }
      const payload = await res.json();
      if (payload?.url) {
        window.location.href = payload.url as string;
        return;
      }
      throw new Error("Stripe checkout link is not ready yet.");
    } catch (err: any) {
      setCheckoutError(err?.message ?? "Paid plans launch soon—stay tuned!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const handleAnchorClick = () => setIsMenuOpen(false);
  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className={styles.landingPage}>
      <CookieConsentBanner />
      <nav className={`${styles.navbar} ${hasScrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo} onClick={handleAnchorClick}>
            <FaRocket className={styles.logoIcon} />
            <span>JobPilot</span>
          </Link>
          <div
            className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ""}`}
            id="primary-navigation"
          >
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className={styles.navLink} onClick={handleAnchorClick}>
                {label}
              </a>
            ))}
            <div className={styles.navButtons}>
              <button
                className={styles.signupBtn}
                onClick={() => {
                  track("navbar_waitlist_open");
                  setShowWaitlist(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Join Waitlist
              </button>
            </div>
          </div>
          <button
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
            className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.mobileMenuBtnActive : ""}`}
            onClick={handleMenuToggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.hero} id="top">
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>Built for the messy job hunt</span>
              <h1>
                Leave <span className={styles.gradientText}>{ROTATING_PHRASES[phraseIndex]} </span>
                in the past.
              </h1>
              <p>
                Stop juggling spreadsheets and copy-pasting outreach. JobPilot AI tracks all your applications, generates personalized resumes and follow-ups, and shows you which skills and regions attract callbacks—all in one focused workspace.
              </p>
              <ul className={styles.heroPainList}>
                <li>
                  <FaShieldAlt /> AI auto-generates personalized cover letters and follow-ups in seconds.
                </li>
                <li>
                  <FaPlay /> One-click application capture from LinkedIn, Indeed, and job boards.
                </li>
                <li>
                  <FaClock /> Real-time insights on which skills and regions get callbacks.
                </li>
              </ul>
              <div className={styles.stripeBadge}>
                <FaCcStripe />
                <span>Stripe-secured checkout ready for Pro launch</span>
              </div>
              <div className={styles.heroButtons}>
                <Link
                  href="/register"
                  className={styles.primaryBtn}
                  onClick={() => track("hero_start_for_free")}
                >
                  Start for free <FaArrowRight />
                </Link>

                <button
                  className={styles.secondaryBtn}
                  onClick={() => {
                    track("cta_reserve_pro_plan");
                    handleStartCheckout();
                  }}
                >
                  {checkoutLoading ? "Preparing Stripe…" : "Reserve Pro plan"}
                </button>
              </div>
              <p className={styles.checkoutNote}>
                Beta is free today. Stripe checkout simply holds your spot for upcoming Pro workflows.
              </p>
              {checkoutError && <p className={styles.checkoutError}>{checkoutError}</p>}
              <div className={styles.heroStats}>
                {METRICS.map((metric) => (
                  <div key={metric.label} className={styles.stat}>
                    <span className={styles.statNumber}>{metric.value}</span>
                    <span className={styles.statLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroMediaFrame}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/JobPilot_ Job Search Simplified.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="pain">
          <header className={styles.sectionHeader}>
            <h2>Job searching shouldn’t feel like a second job — let AI help you stay organized</h2>
            <p>
              JobPilot replaces scattered docs and guesswork with a focused system that shows you exactly what
              to do next.
            </p>
          </header>
          <div className={styles.painGrid}>
            {PAIN_POINTS.map((point) => (
              <div key={point.title} className={styles.painCard}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.section} id="why-jobpilot">
          <header className={styles.sectionHeader}>
            <h2>Why Job Seekers Choose JobPilot</h2>
            <p>
              JobPilot helps job seekers simplify their job hunt with an AI-powered dashboard.
              Track job applications from LinkedIn, Indeed, or company sites; generate
              tailored resumes and cover letters; and monitor which skills and regions
              attract the most responses. It’s everything your job search needs in one place.
            </p>
          </header>
        </section>
        <section className={styles.section} id="steps">
          <header className={styles.sectionHeader}>
            <h2>Three steps to calmer applications</h2>
            <p>Collect opportunities, tailor outreach, and let JobPilot handle the follow-through.</p>
          </header>
          <div className={styles.stepGrid}>
            {STEPS.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className={styles.stepCard}>
                <span className={styles.stepIndex}>{index + 1}</span>
                <Icon className={styles.stepIcon} />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="proof">
          <header className={styles.sectionHeader}>
            <h2>Signals that keep you moving</h2>
            <p>
              JobPilot collects the data you need—no spreadsheets required—and turns it into a daily plan of
              action.
            </p>
          </header>
          <div className={styles.metricGrid}>
            <div className={styles.metricCard}>
              <h3>Live skill & region analytics</h3>
              <p>
                See which skills and locations deliver callbacks in the last 24 hours. Shift your outreach
                toward the markets that are hot right now.
              </p>
            </div>
            <div className={styles.metricCard}>
              <h3>Application timeline</h3>
              <p>
                Visual progress bars and reminders show what needs a nudge, what is out for review, and which
                interviews you should prep for today.
              </p>
            </div>
            <div className={styles.metricCard}>
              <h3>Automated document vault</h3>
              <p>
                Every resume, cover letter, and follow-up email is versioned and searchable so you never reuse
                the wrong file.
              </p>
            </div>
          </div>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map(({ quote, author, role }) => (
              <blockquote key={author} className={styles.testimonialCard}>
                <p>“{quote}”</p>
                <footer>
                  <strong>{author}</strong>
                  <span>{role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className={styles.section} id="comparison">
          <header className={styles.sectionHeader}>
            <h2>How JobPilot stacks up</h2>
            <p>A quick look at why candidates leave spreadsheets and generic trackers behind.</p>
          </header>
          <div className={styles.comparisonTable}>
            <div className={styles.comparisonHeader}>
              <span className={styles.comparisonFeature}>What you get</span>
              <span className={styles.comparisonUs}>JobPilot</span>
              <span className={styles.comparisonOthers}>Traditional tools</span>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.feature} className={styles.comparisonRow}>
                <span className={styles.comparisonFeature}>{row.feature}</span>
                <span className={styles.comparisonUs}>
                  <FaCheckCircle className={styles.checkIcon} />
                  {row.jobpilot}
                </span>
                <span className={styles.comparisonOthers}>{row.traditional}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="faq">
          <header className={styles.sectionHeader}>
            <h2>Questions we hear the most</h2>
            <p>Your dashboard is free forever during beta. Here’s what else people ask.</p>
          </header>
          <div className={styles.faqList}>
            {FAQS.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}
                >
                  <button type="button" onClick={() => toggleFaq(index)}>
                    {faq.question}
                    <span className={styles.faqToggle}>{open ? "-" : "+"}</span>
                  </button>
                  {open && <p>{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </section>
        <section className={styles.section} id="blog">
          <header className={styles.sectionHeader}>
            <h2>Learn Smarter Job Search Strategies</h2>
            <p>
              Explore guides on AI job tracking, resume optimization, and remote job applications.
              New articles every month to help job seekers stay ahead.
            </p>
          </header>
        </section>
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div>
              <h2>Give your applications a command centre</h2>
              <p>
                Join beta candidates who traded spreadsheets for a focused workspace. JobPilot stays
                free in beta—Pro features roll out soon.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  track("hero_waitlist_open");
                  setShowWaitlist(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Join Waitlist <FaArrowRight />
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={handleStartCheckout}
                disabled={checkoutLoading}
              >
                Join Pro waitlist
              </button>
              <button
                className={styles.secondaryBtn}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  track("cta_add_chrome_extension");
                  handleAddToChromeFromMain();
                }}
                type="button"
              >
                <FaChrome />
                Add Chrome Extension
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <FaRocket />
              <span>JobPilot</span>
            </div>
            <p>
              A calmer way to run your job search. Track opportunities, tailor outreach, and stay proactive.
            </p>
            <div className={styles.footerSocial}>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
            <div className={styles.footerStripe}>
              <FaCcStripe />
              <span>Stripe-secured billing for upcoming Pro plans</span>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <div>
              <h4>Product</h4>
              <a href="#pain">Pain we solve</a>
              <a href="#steps">How it works</a>
              <a href="#comparison">Comparison</a>
            </div>
            <div>
              <h4>Company</h4>
              <a
                onClick={() => {
                  track("footer_waitlist_open");
                  setShowWaitlist(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Join Waitlist
              </a>
              <Link href="/login">Log in</Link>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h4>Resources</h4>
              <a href="mailto:hello@jobpilot.com">Contact support</a>
              <a href="#top">Back to top</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} JobPilot. All rights reserved.</span>
          <div className={styles.footerLegal}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
      {showWaitlist && (
        <div className={styles.modalBackdrop} onClick={() => setShowWaitlist(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowWaitlist(false)}>×</button>
            <iframe
              src="https://forms.gle/fgF5qncGCcHXTPbJ7"
              width="100%"
              height="420"
              frameBorder="0"
              title="JobPilot Waitlist"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
