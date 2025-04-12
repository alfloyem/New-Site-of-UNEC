document.addEventListener("DOMContentLoaded", () => {
  const themeFromLocalStorage = localStorage.getItem("theme");

  if (themeFromLocalStorage) {
    setTheme(themeFromLocalStorage);
  }

  const themeAutoButton = document.getElementById("theme-auto") || document.getElementById("auto");
  const themeDarkButton = document.getElementById("theme-dark") || document.getElementById("dark");
  const themeLightButton = document.getElementById("theme-light") || document.getElementById("light");

  themeAutoButton.addEventListener("click", () => {
    setTheme("auto");
    updateNavbarChecked(themeAutoButton);
  });

  themeDarkButton.addEventListener("click", () => {
    setTheme("dark");
    updateNavbarChecked(themeDarkButton);
  });

  themeLightButton.addEventListener("click", () => {
    setTheme("light");
    updateNavbarChecked(themeLightButton);
  });

  if (themeFromLocalStorage === "dark") {
    updateNavbarChecked(themeDarkButton);
  } else if (themeFromLocalStorage === "light") {
    updateNavbarChecked(themeLightButton);
  } else {
    updateNavbarChecked(themeAutoButton);
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (theme === "auto") {
      localStorage.removeItem("theme");
      document.body.classList.remove("light", "dark");
    }
  }

  function updateNavbarChecked(button) {
    setTimeout(() => {
      const allButtons = [themeAutoButton, themeDarkButton, themeLightButton];
      allButtons.forEach((btn) => {
        const icon = btn.querySelector('.iconify');
        if (btn === button) {
          icon.classList.remove('navbar-unchecked');
          icon.classList.add('navbar-checked');
        } else {
          icon.classList.remove('navbar-checked');
          icon.classList.add('navbar-unchecked');
        }
      });
    }, 100); // 100ms gecikme eklendi
  }
});