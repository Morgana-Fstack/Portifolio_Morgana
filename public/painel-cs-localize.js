// Translate presentation text while leaving IDs, data attributes and filter values intact.
const lang = document.documentElement.lang;
const column = lang === "es" ? 2 : 1;
const response = await fetch("/painel-cs-copy.tsv");
if (!response.ok) throw new Error("Dashboard translations unavailable");
const copy = new Map((await response.text()).trim().split(/\r?\n/).map(row => {
  const fields = row.split("\t");
  return [fields[0], fields[column]];
}));
const quote = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const keys = [...copy.keys()].sort((a, b) => b.length - a.length);
const pattern = new RegExp("(?<![\\p{L}\\p{N}])(?:" + keys.map(quote).join("|") + ")(?![\\p{L}\\p{N}])", "gu");
const translatedText = new WeakMap();
const translatedAttributes = new WeakMap();
const attributes = ["aria-label", "title", "placeholder"];
const dateLocale = lang === "en" ? "en-US" : "es-ES";
const shortDate = new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "short", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function translate(value) {
  return value
    .replace(pattern, match => copy.get(match))
    .replace(/\bem (\d+) dias\b/g, (_, days) => lang === "en" ? `in ${days} days` : `en ${days} días`)
    .replace(/\bdesde (?=\d{2}\/\d{2})/g, lang === "en" ? "since " : "desde ")
    .replace(/(?<![\d/])(\d{2})\/(\d{2})(?:\/(\d{4}))?(?![\d/])/g, (original, day, month, year) => {
      const date = new Date(Date.UTC(Number(year || 2026), Number(month) - 1, Number(day)));
      return date.getUTCDate() === Number(day) && date.getUTCMonth() + 1 === Number(month)
        ? (year ? fullDate : shortDate).format(date)
        : original;
    });
}

function text(node) {
  if (node.parentElement?.closest("script, style, [data-no-translate]")) return;
  const original = node.nodeValue;
  if (!original || translatedText.get(node) === original) return;
  const localized = translate(original);
  translatedText.set(node, localized);
  if (localized !== original) node.nodeValue = localized;
}

function labels(element) {
  const seen = translatedAttributes.get(element) || new Map();
  translatedAttributes.set(element, seen);
  for (const attr of attributes) {
    const original = element.getAttribute(attr);
    if (!original || seen.get(attr) === original) continue;
    const localized = translate(original);
    seen.set(attr, localized);
    if (localized !== original) element.setAttribute(attr, localized);
  }
}

function subtree(node) {
  if (node.nodeType === Node.TEXT_NODE) return text(node);
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  labels(node);
  node.querySelectorAll("[aria-label],[title],[placeholder]").forEach(labels);
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) text(walker.currentNode);
}

subtree(document.documentElement);
new MutationObserver(records => {
  for (const record of records) {
    if (record.type === "characterData") text(record.target);
    if (record.type === "attributes") labels(record.target);
    for (const node of record.addedNodes) subtree(node);
  }
}).observe(document.documentElement, {
  subtree: true, childList: true, characterData: true,
  attributes: true, attributeFilter: attributes,
});
