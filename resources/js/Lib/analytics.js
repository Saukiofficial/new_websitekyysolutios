/**
 * Lightweight Client-Side Analytics Tracker for KyySolutions
 */
export function trackEvent(eventType, details = {}) {
    try {
        const payload = JSON.stringify({
            event_type: eventType,
            page_url: window.location.pathname,
            product_id: details.productId || null,
            product_title: details.productTitle || null,
            metadata: details.metadata || null,
        });

        if (navigator.sendBeacon) {
            const blob = new Blob([payload], { type: 'application/json' });
            navigator.sendBeacon('/api/track-event', blob);
        } else {
            fetch('/api/track-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: payload,
                keepalive: true,
            }).catch(() => {});
        }
    } catch (err) {
        // Silently fail to never disrupt user experience
    }
}
