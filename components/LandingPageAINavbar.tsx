"use client";

import Link from "next/link";
import { FaChrome, FaRocket, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import CookieConsentBanner from "./CookieConsentBanner";
import styles from "@/styles/Landing.module.css";
import { track } from "@/lib/track";

export default function LandingAiNavbar() {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [showWaitlist, setShowWaitlist] = useState(false);

    useEffect(() => {
        const onScroll = () => setHasScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavbarAddToChrome = () => {
        track("ai_navbar_add_to_chrome_click");
        window.open(
            "https://chrome.google.com/webstore/detail/jobpilot/YOUR_EXTENSION_ID",
            "_blank",
            "noopener,noreferrer"
        );
    };

    const handleNavbarWaitlist = () => {
        track("ai_navbar_waitlist_open");
        setShowWaitlist(true);
    };

    return (
        <nav className={`${styles.navbar} ${hasScrolled ? styles.navbarScrolled : ""}`}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    <FaRocket className={styles.logoIcon} />
                    <span>JobPilot <small style={{ opacity: 0.7 }}>AI</small></span>
                </Link>

                <div className={styles.navButtons}>
                    <button
                        className={styles.signupBtn}
                        style={{ cursor: "pointer" }}
                        onClick={handleNavbarAddToChrome}
                    >
                        <FaChrome style={{ marginRight: "0.4rem" }} />
                        Add to Chrome
                    </button>

                    <button
                        className={styles.primaryBtn}
                        onClick={handleNavbarWaitlist}
                        style={{ cursor: "pointer" }}
                    >
                        Join Waitlist <FaArrowRight />
                    </button>
                </div>
            </div>

            <CookieConsentBanner />

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
        </nav>
    );
}