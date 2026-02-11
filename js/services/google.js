export function submitToGoogle(e, c, t, s, type) {
    // --- YOUR FORM ID ---
    const formID = "1FAIpQLScEWdwVaCJC-K7C_Ek7eQFWg8IaGiNvx-6txv8cTP6-x8drIQ"; 
    const submitURL = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

    // --- PRE-FILLED IDs (EXTRACTED FROM YOUR LINK) ---
    const ENTRY_E = "entry.484401858"; 
    const ENTRY_C = "entry.1614447615";
    const ENTRY_T = "entry.2008857398";
    const ENTRY_S = "entry.2035459769";

    const data = new FormData();
    data.append(ENTRY_E, e);
    data.append(ENTRY_C, c);
    data.append(ENTRY_T, t);
    data.append(ENTRY_S, `${type} (S=${s})`); 

    fetch(submitURL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
    }).catch(err => console.log('Headless submit error', err));
}
