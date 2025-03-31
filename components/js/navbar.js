document.addEventListener("DOMContentLoaded", function(){
  if(localStorage.getItem('notificationBeforeRemoved') === 'true'){
    document.querySelectorAll('.notification-toggle').forEach(el => el.classList.add('remove-after'));
  }
  document.querySelectorAll('.notification-toggle').forEach(function(element){
    element.addEventListener('click', function(){
      this.classList.add('remove-after');
      localStorage.setItem('notificationBeforeRemoved','true');
    });
  });
  var notifHeader = document.getElementById('navbar-notification-header');
  if(notifHeader){
    notifHeader.addEventListener('click', function(){
      localStorage.removeItem('notificationBeforeRemoved');
      location.reload();
    });
  }
});

function removeNavbarActiveClass(...elements) {
  elements.forEach(element => {
    if (element) {
      element.classList.remove('navbar-active');
    }
  });
}

function addNavbarActiveClass(element) {
  if (element) {
    element.classList.add('navbar-active');
  }
}

document.querySelectorAll('.return-profile').forEach(function(returnProfile) {
  returnProfile.addEventListener('click', function(event) {
    event.stopPropagation();
    const grandParent = this.parentElement && this.parentElement.parentElement;
    if (grandParent) {
      grandParent.classList.remove('navbar-active');
    }
    const profileMenu = document.getElementById('profile-menu');
    if (profileMenu) {
      profileMenu.classList.add('navbar-active');
    }
    const navbarLanguage = document.getElementById('navbar-language');
    const navbarTheme = document.getElementById('navbar-theme');
    removeNavbarActiveClass(navbarLanguage, navbarTheme);
  });
});

document.getElementById('language-menu')?.addEventListener('click', function(event) {
  event.stopPropagation();
  const profileMenu = document.getElementById('profile-menu');
  const navbarLanguage = document.getElementById('navbar-language');
  removeNavbarActiveClass(profileMenu, document.getElementById('navbar-theme'));
  addNavbarActiveClass(navbarLanguage);
});

document.getElementById('theme-menu')?.addEventListener('click', function(event) {
  event.stopPropagation();
  const profileMenu = document.getElementById('profile-menu');
  const navbarTheme = document.getElementById('navbar-theme');
  removeNavbarActiveClass(profileMenu, document.getElementById('navbar-language'));
  addNavbarActiveClass(navbarTheme);
});

document.querySelectorAll('[id^="navbar-menu-toggle"]').forEach(function(toggleButton) {
  toggleButton.addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelectorAll('[id^="navbar-menu-toggle"]').forEach(function(btn) {
      if (btn !== toggleButton) {
        const sib = btn.nextElementSibling;
        if (sib) {
          sib.classList.remove('navbar-active');
        }
      }
    });
    const sibling = this.nextElementSibling;
    sibling.classList.toggle('navbar-active');
    const navbarLanguage = document.getElementById('navbar-language');
    const navbarTheme = document.getElementById('navbar-theme');
    removeNavbarActiveClass(navbarLanguage, navbarTheme);
  });
});

document.addEventListener('click', function(event) {
  document.querySelectorAll('[id^="navbar-menu-toggle"]').forEach(function(toggleButton) {
    const sibling = toggleButton.nextElementSibling;
    if (!toggleButton.contains(event.target) && !sibling.contains(event.target)) {
      sibling.classList.remove('navbar-active');
    }
  });
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu && !profileMenu.contains(event.target)) {
    profileMenu.classList.remove('navbar-active');
  }
  const navbarLanguage = document.getElementById('navbar-language');
  const navbarTheme = document.getElementById('navbar-theme');
  if (navbarLanguage && !navbarLanguage.contains(event.target)) {
    navbarLanguage.classList.remove('navbar-active');
  }
  if (navbarTheme && !navbarTheme.contains(event.target)) {
    navbarTheme.classList.remove('navbar-active');
  }
});
