(() => {
  'use strict';
  const toggle = document.getElementById('language-toggle');
  const english = document.querySelectorAll('[data-en]');
  const chinese = document.querySelectorAll('[data-zh]');
  function setLanguage(language) {
    const isChinese = language === 'zh';
    document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
    english.forEach(element => { element.hidden = isChinese; });
    chinese.forEach(element => { element.hidden = !isChinese; });
    toggle.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换至中文');
    document.querySelector('.main-nav').setAttribute('aria-label', isChinese ? '主导航' : 'Main navigation');
    document.querySelector('.profile').setAttribute('aria-label', isChinese ? '个人信息' : 'Profile');
    try { localStorage.setItem('fan-qiao-language', language); } catch (_) { /* Preferences are optional. */ }
  }
  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('fan-qiao-language') || 'en'; } catch (_) { /* Readable without storage. */ }
  setLanguage(savedLanguage);
  toggle.hidden = false;
  toggle.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'zh' : 'en'));

  const links = [...document.querySelectorAll('.main-nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;
  function updateNavigation() {
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 155) active = section;
    }
    links.forEach(link => {
      if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
})();
