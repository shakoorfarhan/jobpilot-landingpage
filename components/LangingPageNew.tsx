"use client";

import Link from "next/link";
import { FaChrome, FaLock, FaRobot, FaArrowRight, FaShieldAlt, FaBolt } from "react-icons/fa";
import styles from "@/styles/Landing.module.css";
import LandingPageNavbar from "./LandingPageAINavbar";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";

// import { trackPageView } from "@/lib/analytics-client";

export default function ChromeExtensionLanding() {
    const [showWaitlist, setShowWaitlist] = useState(false);
    useEffect(() => {
        track("page_ai_landing_view");
    }, []);
    // useEffect(() => {
    //     trackPageView(window.location.pathname || "/ai", {
    //         pageType: "ai-landing",
    //     });
    // }, []);

    const handleAddToChromeFromMain = () => {
        track("ai_add_to_chrome_click");
        window.open(
            "https://chrome.google.com/webstore/detail/jobpilot/YOUR_EXTENSION_ID",
            "_blank",
            "noopener,noreferrer"
        );
    };

    // const handleTryWebAppClick = () => {
    //     trackPageView("/ai", { pageType: "try_web_app_click" });
    // };
    return (
        <main className={styles.main}>
            <LandingPageNavbar />
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroBadge}>Now in Private Beta</span>
                        <h1>
                            <FaChrome /> JobPilot AI Chrome Extension
                        </h1>
                        <p>
                            Track your LinkedIn job applications automatically — with complete privacy.
                            JobPilot AI runs locally, never stores credentials, and keeps your data in your control.
                        </p>

                        <ul className={styles.heroPainList}>
                            <li>
                                <FaLock /> 100% client-side tracking — your data never leaves your browser.
                            </li>
                            <li>
                                <FaBolt /> Auto-capture viewed or applied jobs instantly.
                            </li>
                            <li>
                                <FaShieldAlt /> Built with a “Security-First” architecture approved for Chrome Web Store.
                            </li>
                        </ul>

                        <div className={styles.heroButtons}>
                            <Link
                                href="https://chrome.google.com/webstore/detail/jobpilot/YOUR_EXTENSION_ID"
                                target="_blank"
                                className={styles.primaryBtn}
                                onClick={handleAddToChromeFromMain}
                            >
                                Add to Chrome
                            </Link>
                            <button className={styles.primaryBtn} onClick={() => {
                                track("ai_waitlist_open_hero");
                                setShowWaitlist(true);
                            }} style={{ cursor: "pointer" }}>
                                Join Waitlist <FaArrowRight />
                            </button>
                        </div>
                    </div>
                    {/* <div className={styles.heroVisual}>
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ width: "100%", borderRadius: "20px" }}
                        >
                            <source src="/ai/extension-demo.mp4" type="video/mp4" />
                        </video>
                    </div> */}
                </div>
            </section>

            <section className={styles.section}>
                <header className={styles.sectionHeader}>
                    <h2>Privacy. Transparency. Control.</h2>
                    <p>
                        Unlike traditional automation tools, JobPilot AI never sends requests on your behalf or
                        stores tokens. You stay in control — always.
                    </p>
                </header>
                <div className={styles.metricGrid}>
                    <div className={styles.metricCard}>
                        <FaLock />
                        <h3>Local-First Design</h3>
                        <p>All job tracking happens in your browser — zero cloud storage by default.</p>
                    </div>
                    <div className={styles.metricCard}>
                        <FaRobot />
                        <h3>AI Smart Logging</h3>
                        <p>Each job you view or apply to is auto-logged for progress tracking and analytics.</p>
                    </div>
                    <div className={styles.metricCard}>
                        <FaShieldAlt />
                        <h3>Security-First Policy</h3>
                        <p>No scraping, no background requests — fully compliant with Chrome Web Store policies.</p>
                    </div>
                </div>
            </section>
            <section className={styles.section} id="comparison">
                <header className={styles.sectionHeader}>
                    <h2>How JobPilot AI Stands Apart</h2>
                    <p>
                        Other extensions track what you click — we help you understand what matters.
                        Here’s how we compare:
                    </p>
                </header>
                <div className={styles.comparisonTable}>
                    <div className={styles.comparisonHeader}>
                        <span className={styles.comparisonFeature}>Feature</span>
                        <span className={styles.comparisonUs}>JobPilot AI Tracker</span>
                        <span className={styles.comparisonOthers}>Traditional Trackers</span>
                    </div>

                    <div className={styles.comparisonRow}>
                        <span className={styles.comparisonFeature}>Tracking Method</span>
                        <span className={styles.comparisonUs}>Client-side (100% local)</span>
                        <span className={styles.comparisonOthers}>Cloud logging / scraping</span>
                    </div>

                    <div className={styles.comparisonRow}>
                        <span className={styles.comparisonFeature}>Data Privacy</span>
                        <span className={styles.comparisonUs}>No data leaves your browser</span>
                        <span className={styles.comparisonOthers}>Sends data to remote servers</span>
                    </div>

                    <div className={styles.comparisonRow}>
                        <span className={styles.comparisonFeature}>AI Assistance</span>
                        <span className={styles.comparisonUs}>Smart job categorization & follow-up reminders</span>
                        <span className={styles.comparisonOthers}>None — manual only</span>
                    </div>

                    <div className={styles.comparisonRow}>
                        <span className={styles.comparisonFeature}>Setup</span>
                        <span className={styles.comparisonUs}>1-click Chrome add-on</span>
                        <span className={styles.comparisonOthers}>Multiple integrations</span>
                    </div>

                    <div className={styles.comparisonRow}>
                        <span className={styles.comparisonFeature}>Cost</span>
                        <span className={styles.comparisonUs}>Free during Beta</span>
                        <span className={styles.comparisonOthers}>$9–$29 / month</span>
                    </div>
                </div>
            </section>
            <section className={styles.ctaSection}>
                <div className={styles.ctaCard}>
                    <div>
                        <h2>Get Early Access</h2>
                        <p>
                            Be one of the first to try the JobPilot AI Chrome Extension — available in private beta.
                            Join our waitlist for secure, zero-tracking job automation.
                        </p>
                    </div>
                    <div className={styles.ctaActions}>
                        <Link
                            href="https://chrome.google.com/webstore/detail/jobpilot/YOUR_EXTENSION_ID"
                            target="_blank"
                            className={styles.primaryBtn}
                            onClick={handleAddToChromeFromMain}
                        >
                            Add to Chrome
                        </Link>
                        <button className={styles.primaryBtn} onClick={() => {
                            track("ai_waitlist_open_cta");
                            setShowWaitlist(true);
                        }} style={{ cursor: "pointer" }}>
                            Join Waitlist <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>
            <footer style={{ textAlign: "center", marginTop: "2rem", opacity: 0.7 }}>
                <p>
                    Learn more about the {" "}
                    <a onClick={() => {
                        track("ai_waitlist_open_footer");
                        setShowWaitlist(true);
                    }} style={{ cursor: "pointer" }}>
                        Join Waitlist
                    </a>{" "}
                    or explore our{" "}
                    <Link
                        href="https://chrome.google.com/webstore/detail/jobpilot/YOUR_EXTENSION_ID"
                        target="_blank"

                    // onClick={handleAddToChromeClick}
                    >
                        AI Chrome Extension
                    </Link>.
                </p>

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
        </main>
    );
}