import en from '../i18n/en.js';
import vi from '../i18n/vi.js';

const DICTS = { en, vi };

export function getLang() {
  const params = new URLSearchParams(location.search);
  const fromUrl = (params.get('lang') || '').toLowerCase();
  const fromStorage = (localStorage.getItem('lang') || '').toLowerCase();
  return DICTS[fromUrl] ? fromUrl : (DICTS[fromStorage] ? fromStorage : 'en');
}

export function setLang(lang) {
  const l = (lang || '').toLowerCase();
  const next = DICTS[l] ? l : 'en';
  localStorage.setItem('lang', next);

  const url = new URL(location.href);
  url.searchParams.set('lang', next);
  history.replaceState(null, '', `${url.pathname}${url.search}`);
  return next;
}

export function t() {
  return DICTS[getLang()];
}
