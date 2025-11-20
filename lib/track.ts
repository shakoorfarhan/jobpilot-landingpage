export function track(event: string, data: Record<string, any> = {}) {
  try {
    window.umami?.track(event, data);
  } catch (_) {
    // prevents crashes in Next.js SSR
  }
}