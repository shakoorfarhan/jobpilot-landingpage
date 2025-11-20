
export const metadata = {
    title: "JobPilot AI Chrome Extension — Privacy-First Job Tracker",
    description:
        "The JobPilot Chrome Extension automatically tracks your LinkedIn job applications securely and privately — no scraping, no data collection, just local AI tracking.",
    keywords: [
        "LinkedIn job tracker",
        "Chrome extension job tracker",
        "AI job tracking",
        "privacy job tracker",
        "secure job application tracker",
        "local-first AI extension",
        "JobPilot Chrome extension",
    ],
    openGraph: {
        title: "JobPilot AI Chrome Extension — Privacy-First Job Tracker",
        description:
            "Track your job applications automatically and securely. 100% privacy-first, AI-powered, and local-only.",
        url: "https://jobpilot.services/ai",
        siteName: "JobPilot",
        images: [
            {
                url: "/ai/og-image.png",
                width: 1200,
                height: 630,
                alt: "JobPilot AI Chrome Extension preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    alternates: { canonical: "https://jobpilot.services/ai" },
    twitter: {
        card: "summary_large_image",
        title: "JobPilot AI Chrome Extension — Privacy-First Job Tracker",
        description:
            "Automatically track your LinkedIn job applications securely with JobPilot AI Chrome Extension.",
        images: ["/ai/og-image.png"],
        creator: "@JobPilotApp",
    },
};

export default function AILayout({ children }: { children: React.ReactNode }) {
    return (
        <section
            style={{
                padding: "2rem 0",
                background:
                    "linear-gradient(180deg, #f8fafc 0%, #eef2ff 45%, #fdf2ff 100%)",
            }}
        >
            {children}
        </section>
    );
}