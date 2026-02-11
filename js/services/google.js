// js/services/google.js

// --- CONFIG (one source of truth) ---
const formID = "1FAIpQLScEWdwVaCJC-K7C_Ek7eQFWg8IaGiNvx-6txv8cTP6-x8drIQ";
const submitURL = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

// Results fields
const ENTRY_E = "entry.484401858";
const ENTRY_C = "entry.1614447615";
const ENTRY_T = "entry.2008857398";
const ENTRY_S = "entry.2035459769";
const ENTRY_ARCHETYPE = "entry.702670164"; // NEW archetype field

// Feedback fields
const ENTRY_RATING = "entry.139106860";
const ENTRY_TEXT = "entry.476361627";

export function submitToGoogle(e, c, t, s, type) {
  const data = new FormData();
  data.append(ENTRY_E, e);
  data.append(ENTRY_C, c);
  data.append(ENTRY_T, t);

  // FIX: S is numeric only
  data.append(ENTRY_S, s);

  // FIX: archetype goes to its own field
  data.append(ENTRY_ARCHETYPE, type);

  fetch(submitURL, {
    method: "POST",
    mode: "no-cors",
    body: data,
  }).catch((err) => console.log("Headless submit error", err));
}

export async function submitFeedbackToGoogle(rating, feedbackText, archetype) {
  if (!ENTRY_RATING || !ENTRY_TEXT) {
    console.warn("Feedback entry IDs not set.");
    return false;
  }

  const data = new FormData();
  data.append(ENTRY_RATING, rating);
  data.append(ENTRY_TEXT, feedbackText || "");

  // Keep archetype on feedback row too (helps grouping manually)
  if (ENTRY_ARCHETYPE) data.append(ENTRY_ARCHETYPE, archetype);

  try {
    await fetch(submitURL, {
      method: "POST",
      mode: "no-cors",
      body: data,
    });
    return true;
  } catch (err) {
    console.log("Headless feedback submit error", err);
    return false;
  }
}
