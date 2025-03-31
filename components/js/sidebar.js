document.addEventListener('DOMContentLoaded', () => {
    const normalizeUrl = (urlString, base) => {
      try {
        const url = new URL(urlString, base);
        let path = url.pathname
          .replace(/\/index\.html$/i, '')
          .replace(/\/+$/, '');
        
        return path.toLowerCase();
      } catch {
        return null;
      }
    };
  
    const currentAbsoluteUrl = window.location.href;
    const currentNormalized = normalizeUrl(currentAbsoluteUrl, window.location.origin);
  
    document.querySelectorAll('.sub-menu a').forEach(link => {
      const linkHref = link.getAttribute('href');
      
      const linkAbsoluteUrl = new URL(linkHref, window.location.origin).href;
      const linkNormalized = normalizeUrl(linkAbsoluteUrl, window.location.origin);
  
      if(linkNormalized === currentNormalized) {
        link.classList.add('active');
        
        const parentMenu = link.closest('.sub-menu');
        const dropdownButton = parentMenu?.previousElementSibling;
        
        if(dropdownButton?.classList.contains('category-dropdown-button')) {
          dropdownButton.classList.add('active');
        }
      }
    });
  });

function addActiveClassToLinks() {
    var currentPath = window.location.origin + window.location.pathname;

    function addActiveClassToLink(link) {
        link.classList.add("active");

        var parentButton = link.closest("ul")?.previousElementSibling;
        if (parentButton && parentButton.classList.contains("category-dropdown-button")) {
            parentButton.classList.add("active");
        }
    }

    document.querySelectorAll(".sub-menu div a").forEach(function(link) {
        var linkPath = link.getAttribute('href');
        var fullLinkPath = link.href;
        if (linkPath && linkPath !== "#" && currentPath === fullLinkPath) {
            addActiveClassToLink(link);
        }
    });
}
  
function toggleSidebar() {
    document.body.classList.toggle("close-sidebar");
    closeAllSubMenus();
}

function toggleSubMenu(button) {
    document.body.classList.remove("close-sidebar");

    const subMenu = button.nextElementSibling;
    if (!subMenu) return;

    const lastChild = button.lastElementChild;
    if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        if (lastChild) {
            lastChild.classList.add('d180');
        }
    } else {
        closeAllSubMenus();
        subMenu.classList.add('show');
        if (lastChild) {
            lastChild.classList.remove('d180');
        }
    }
}
  
function closeAllSubMenus() {
    document.querySelectorAll('#sidebar .sub-menu.show').forEach(menu => {
        menu.classList.remove('show');
        let button = menu.previousElementSibling;
        if (button) {
            button.classList.remove('rotate');
        }
    });
    document.querySelectorAll('.toggle-sub-menu.rotate').forEach(button => {
        button.classList.remove('rotate');
    });
    document.querySelectorAll('#sidebar .iconify.iconify--iconamoon').forEach(element => {
      element.classList.add('d180');
  });  
}