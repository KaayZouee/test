import { startQuiz, nextQuestion, prevQuestion, renderResultFromUrl, resetDiagnostic } from './logic/quiz.js';
import { shareResult, followFacebook, submitFeedback } from './logic/results.js';

// Expose functions for inline onclick="" in HTML
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.resetDiagnostic = resetDiagnostic;

window.shareResult = shareResult;
window.followFacebook = followFacebook;
window.submitFeedback = submitFeedback;

// Run once on load: if URL has ?a=...(&e=... etc), show result
renderResultFromUrl();
