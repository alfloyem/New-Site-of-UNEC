document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('application-ctg');
  const selected = dropdown.querySelector('.selected');
  const menu = dropdown.querySelector('.dropdown-menu');
  const customDropdowns = document.querySelectorAll('#upload-popup .custom-dropdown');

  customDropdowns.forEach(el => el.style.flexBasis = '49%');

  menu.addEventListener('click', e => {
    e.stopPropagation();
    const option = e.target.closest('div');
    if (!option) return;

    const selectedValue = option.textContent.trim();
    selected.textContent = selectedValue;

    document.querySelectorAll('.application-ctg-1, .application-ctg-2').forEach(el => {
      el.style.cssText = "display: none !important;";
    });

    if (option.classList.contains('ctg-1-activator')) {
      document.querySelectorAll('.application-ctg-1').forEach(el => {
        el.style.cssText = "display: flex !important;";
      });
    } else if (option.classList.contains('ctg-2-activator')) {
      document.querySelectorAll('.application-ctg-2').forEach(el => {
        el.style.cssText = "display: flex !important;";
      });
    }

    customDropdowns.forEach(el => el.style.flexBasis = '');

    dropdown.classList.remove('dropdown-active');
  });
});
