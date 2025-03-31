document.addEventListener('DOMContentLoaded', function() {
  const userLang = navigator.language.split('-')[0];
  const storedLang = localStorage.getItem('language');
  const lang = storedLang || userLang;
  
  const jsonFiles = ['table', 'navbar', 'sidebar', 'profile'].reduce((acc, key) => {
    acc[key] = `../components/localization/${key}.json`;
    return acc;
  }, {});

  loadTranslations(lang);

  ['az', 'en', 'ru', 'tr', 'auto'].forEach(langCode => {
    document.getElementById(`lang-${langCode}`).addEventListener('click', () => {
      changeLanguage(langCode);
    });
  });

  function loadTranslations(lang) {
    Promise.all(Object.values(jsonFiles).map(fetchJson))
      .then(data => {
        const mergedTranslations = data.reduce((acc, translations) => {
          return { ...acc, ...translations[lang] || translations['en'] };
        }, {});
        updateLanguage(mergedTranslations, lang);
      })
      .catch(console.error);
  }

  function fetchJson(file) {
    return fetch(file).then(response => response.json());
  }

  function changeLanguage(newLang) {
    if (newLang === 'auto') {
      localStorage.removeItem('language');
      location.reload();
    } else {
      localStorage.setItem('language', newLang);
      loadTranslations(newLang);
    }
  }

  function updateLanguage(translations, lang) {
    document.querySelectorAll('[id]').forEach(el => {
      if (translations[el.id]) {
        el.textContent = translations[el.id];
      }
    });
    updateLanguageButtonState(lang);
  }

  function updateLanguageButtonState(lang) {
    document.querySelectorAll('.navbar-unchecked, .navbar-checked').forEach(btn => {
      btn.classList.replace('navbar-checked', 'navbar-unchecked');
    });
    
    const activeBtn = document.querySelector(`#lang-${lang} .navbar-unchecked, #lang-auto .navbar-unchecked`);
    if (activeBtn) {
      activeBtn.classList.replace('navbar-unchecked', 'navbar-checked');
    }
  }
});
