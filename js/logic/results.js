import { track } from '../services/analytics.js';
import { FACEBOOK_PAGE_URL } from '../config/links.js';
import { getLastResult } from './quiz.js';
import { submitFeedbackToGoogle } from '../services/google.js';

function setFeedbackValueLabel(val) {
    const label = document.getElementById('feedback-value');
    if (label) label.textContent = String(val);
}

// Keep slider label synced (safe even before result screen is shown)
const ratingEl = document.getElementById('feedback-rating');
if (ratingEl) {
    setFeedbackValueLabel(ratingEl.value);
    ratingEl.addEventListener('input', (e) => setFeedbackValueLabel(e.target.value));
}

export async function shareResult() {
    const res = getLastResult();
    const archetype = res?.type || 'NOUSYS';
    const url = window.location.href;

    const text = `My NOUSYS Archetype: ${archetype}\n${url}`;

    track('share_click', { archetype });

    try {
        if (navigator.share) {
            await navigator.share({
                title: 'NOUSYS Result',
                text,
                url
            });
            track('share_success', { archetype, method: 'webshare' });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard. Paste it anywhere to share.');
            track('share_success', { archetype, method: 'clipboard' });
        } else {
            window.prompt('Copy and share this:', text);
            track('share_success', { archetype, method: 'prompt' });
        }
    } catch (err) {
        // Share can be cancelled; treat as non-fatal
        console.log('Share cancelled/error:', err);
        track('share_fail', { archetype });
    }
}

export function followFacebook() {
    track('follow_facebook_click');
    window.open(FACEBOOK_PAGE_URL, '_blank', 'noopener,noreferrer');
}

export async function submitFeedback() {
    const res = getLastResult();
    const archetype = res?.type || 'UNKNOWN';

    const rating = Number(document.getElementById('feedback-rating')?.value || 0);
    const feedback = (document.getElementById('feedback-text')?.value || '').trim();

    const status = document.getElementById('feedback-status');
    if (status) {
        status.style.display = 'block';
        status.textContent = 'Sending...';
    }

    track('feedback_submit_click', { archetype, rating });

    try {
        const ok = await submitFeedbackToGoogle(rating, feedback, archetype);

        if (ok) {
            if (status) status.textContent = 'Thanks! Feedback sent.';
            track('feedback_submit_success', { archetype, rating });
        } else {
            if (status) status.textContent = 'Feedback form not configured yet (missing entry IDs).';
            track('feedback_submit_fail', { archetype });
        }
    } catch (err) {
        console.log('Feedback submit error:', err);
        if (status) status.textContent = 'Error sending feedback. Please try again.';
        track('feedback_submit_fail', { archetype });
    }
}
