import type { CSSProperties } from "react";
import { FaRocket } from "react-icons/fa";

export const metadata = {
  title: 'AI Job Tracker & Resume Generator | JobPilot',
  description:
    "JobPilot helps job seekers track applications, generate AI-tailored resumes, and manage portfolios — all in one smart workspace.",
  keywords: [
    "AI job tracker",
    "job application tracker",
    "resume generator",
    "AI job search tool",
    "career dashboard",
    "LinkedIn job tracker",
    "ATS resume",
    "JobPilot"
  ],
  metadataBase: new URL("https://jobpilot.services"),
  openGraph: {
    title: "JobPilot — AI Job Tracker & Resume Generator",
    description:
      "Track job applications, create tailored resumes, and manage your career from one dashboard.",
    url: "https://jobpilot.services",
    siteName: "JobPilot",
    images: [
      {
        url: "/rocket-2-svgrepo-com.svg",
        width: 1200,
        height: 630,
        alt: "JobPilot dashboard preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobPilot — AI Job Tracker & Resume Generator",
    description:
      "Simplify your job hunt with AI: track applications, tailor resumes, and analyze hiring trends.",
    images: ["/preview.png"],
    creator: "@JobPilotApp",
  },
  icons: {
    icon: "/rocket-2-svgrepo-com.svg",
    shortcut: "/favicon.ico",
    apple: "/rocket-2-svgrepo-com.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeVars = {
    "--brand-primary": "#2563eb",
    "--brand-primary-dark": "#1d4ed8",
    "--brand-accent": "#7c3aed",
    "--brand-teal": "#0ea5e9",
    "--brand-surface": "#f8fafc",
    "--brand-slate": "#0f172a",
    "--brand-muted": "#64748b",
  } as CSSProperties;

  return (
    <html lang="en">
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3d459b57-3cbe-4d1e-84bf-e3c32906dcc9"></script>
        <link rel="canonical" href="https://jobpilot.services" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "JobPilot",
              applicationCategory: "Job Search",
              operatingSystem: "Web",
              url: "https://jobpilot.services",
              description:
                "AI job tracker and resume generator that helps you manage applications and tailor resumes effortlessly.",
              creator: { "@type": "Organization", name: "JobPilot" },
            }),
          }}
        />
      </head>
      <body
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 45%, #fdf2ff 100%)",
          color: "var(--brand-slate)",
          ...themeVars,
        }}
      >
        <div style={{ maxWidth: "900px", margin: "2rem auto" }}>{children}</div>
      </body>
    </html>
  );
}