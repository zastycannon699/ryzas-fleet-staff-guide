const rules = [
  ['Account Selling/Trading/Piloting', 'Jail', 'N/A'],
  ['Advertising/DM Advertising', 'Jail', 'N/A'],
  ['NSFW PFP/Username', 'Verbal warning', 'Jail'],
  ['Bypassing Punishment', 'Jail', 'Contact management if serious'],
  ['Bypass Filter', '1 Hour Mute', 'Jail'],
  ['Bypass voice chat', '2 Hour Mute', 'N/A'],
  ['Chanel Misuse', 'Verbal Warning', 'Warn'],
  ['Chat Wall', '1 Hour Mute', 'N/A'],
  ['Cross Trading', '2 Day Mute', 'Jail'],
  ['Commands outside of #🤖・commands', 'Verbal Warning', '1 Hour Mute + warn'],
  ['E-Dating', 'Warn + 1 Hour Mute', 'Jail'],
  ['Insensitive Jokes', 'Mute 1h + warn', '5 Hour Mute'],
  ['NSFW', 'Jail', 'N/A'],
  ['NSFW Topics', '1 Hour Mute', 'N/A'],
  ['Pedophilia', 'Jail/No Appeal', 'N/A'],
  ['Phishing', 'Jail', 'N/A'],
  ['Racism/derogatory remarks', 'Mute 2h + warn', '1 Day Mute + warn'],
  ['Server Raiding', '1 Day Mute', 'Contact management if impactful/serious'],
  ['Breaking ROBLOX TOS', 'Warn (No mute at first)', '5 Hour Mute'],
  ['Spam', '10m Mute + Warn', '2 Hour Mute'],
  ['Staff Disrespect', 'N/A (unless serious.)', '2 Hour Mute'],
  ['Staff Impersonation', 'Verbal Warning', 'Jail'],
  ['Suicidal Encouragement/Death Threat', '2 Days Mute', 'Jail'],
  ['Toxicity', '30m Mute', 'N/A'],
  ['Underage', 'Jail Until 13 (HM+)', 'N/A'],
  ['Image Scams/crypto scams', 'Jail (Can be appealed if clear account compromised which is what usually happens.)', 'N/A'],
  ['Troll Tickets', '1 Days Mute', '3 Days Mute'],
  ['Command Flooding', '1 Hour Mute', 'N/A']
];

const rulesList = document.querySelector('#rulesList');
const noResults = document.querySelector('#noResults');
const ruleCount = document.querySelector('#ruleCount');
const template = document.querySelector('#ruleTemplate');
const searchInput = document.querySelector('#ruleSearch');

function renderRules() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = rules.filter((rule) => rule.join(' ').toLowerCase().includes(query));
  rulesList.replaceChildren();
  visible.forEach((rule) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector('.rule-index').textContent = String(rules.indexOf(rule) + 1).padStart(2, '0');
    fragment.querySelector('.rule-title').textContent = rule[0];
    fragment.querySelector('.rule-punishment').textContent = rule[1];
    fragment.querySelector('.rule-escalation').textContent = rule[2];
    rulesList.append(fragment);
  });
  ruleCount.textContent = `${visible.length} of ${rules.length} published rules`;
  noResults.hidden = visible.length !== 0;
}

searchInput.addEventListener('input', renderRules);
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

const themeButton = document.querySelector('#themeButton');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('ryzas-fleet-theme', theme);
  const dark = theme === 'dark';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeButton.title = themeButton.getAttribute('aria-label');
}
themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
setTheme(localStorage.getItem('ryzas-fleet-theme') || 'light');
document.querySelector('#year').textContent = new Date().getFullYear();
renderRules();
