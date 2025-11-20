"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Landing.module.css";

const STORAGE_KEY = "jobpilot-cookie-consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    }
    setVisible(false);
  };

  const dismiss = () => {
    setVisible(false);
  };

  return (
    <div className={styles.cookieBanner} role="alert" aria-live="polite">
      <div className={styles.cookieContent}>
        <h4>We use cookies</h4>
        <p>
          We rely on essential cookies to remember preferences and track anonymous analytics. You can accept to
          continue or come back later—JobPilot stays free either way.
        </p>
      </div>
      <div className={styles.cookieActions}>
        <button className={styles.cookieButtonGhost} onClick={dismiss}>
          Maybe later
        </button>
        <button className={styles.cookieButton} onClick={accept}>
          Accept cookies
        </button>
      </div>
    </div>
  );
}
