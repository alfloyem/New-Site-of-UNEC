document.addEventListener('DOMContentLoaded', function() {
  let defaultFilterValues = new Map();
  let activeDownloadMenu = null;
  
  // 1. Dropdown ve Overflow Yönetimi
  function handleDropdownToggle() {
    document.addEventListener('click', function(e) {
      const dropdown = e.target.closest('.custom-dropdown');
      const allDropdowns = document.querySelectorAll('.custom-dropdown');

      allDropdowns.forEach(d => {
        const parent = d.parentElement;
        if(parent && d !== dropdown) {
          parent.style.overflow = '';
          d.classList.remove('dropdown-active');
        }
      });

      if(dropdown) {
        e.stopPropagation();
        const parent = dropdown.parentElement;
        const isActive = dropdown.classList.contains('dropdown-active');
        
        if(parent) {
          parent.style.overflow = isActive ? '' : 'visible';
        }
        dropdown.classList.toggle('dropdown-active', !isActive);
      } else {
        allDropdowns.forEach(d => {
          d.parentElement.style.overflow = '';
          d.classList.remove('dropdown-active');
        });
      }
    });
  }

  // 2. Download Dropdown Yönetimi
  function handleDownloadDropdown() {
    document.addEventListener('click', function(e) {
      const downloadContainer = e.target.closest('.subject-download');
      const clickedMenu = downloadContainer?.querySelector('.download-dropdown-menu');

      if(downloadContainer) {
        e.stopPropagation();
        const isSameMenu = activeDownloadMenu === clickedMenu;
        
        document.querySelectorAll('.download-dropdown-menu').forEach(menu => {
          menu.style.display = 'none';
        });

        if(!isSameMenu) {
          clickedMenu.style.display = 'flex';
          activeDownloadMenu = clickedMenu;
        } else {
          activeDownloadMenu = null;
        }
      } else {
        document.querySelectorAll('.download-dropdown-menu').forEach(menu => {
          menu.style.display = 'none';
        });
        activeDownloadMenu = null;
      }
    });
  }

  // 3. Tablo Filtreleme ve No-Data Kontrolü
  function filterTables() {
    const activeFilters = [];
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        const column = parseInt(dropdown.dataset.tableColumn);
        const selected = dropdown.querySelector('.selected');
        const value = selected.dataset.value === 'all' ? 'all' : selected.textContent.trim();
        
        if (!isNaN(column)) activeFilters.push({ column, value });
    });

    let allTablesHidden = true;
    
    document.querySelectorAll('table').forEach(table => {
        let hasVisibleRows = false;

        table.querySelectorAll('tbody tr').forEach(row => {
            let visible = true;
            activeFilters.forEach(({ column, value }) => {
                if (value === 'all' || !visible) return;
                const cell = row.cells[column];
                const cellValue = cell?.textContent.trim() || '';
                if (cellValue !== value) visible = false;
            });
            
            row.style.display = visible ? '' : 'none';
            if (visible) hasVisibleRows = true;
        });

        table.style.display = hasVisibleRows ? 'table' : 'none';
        if (hasVisibleRows) allTablesHidden = false;
    });

    const noDataContainer = document.querySelector('.no-data-container');
    if (noDataContainer) {
        noDataContainer.style.display = allTablesHidden ? 'flex' : 'none';
    }
}

  // 4. Sıralama İşlevi
  function handleSorting() {
    document.querySelectorAll('thead th').forEach(th => {
      let isAsc = true;
      
      th.addEventListener('click', function() {
        const table = this.closest('table');
        const colIndex = this.cellIndex;
        
        table.querySelectorAll('th').forEach(h => {
          h.textContent = h.textContent.replace(/ ↑| ↓/g, '');
        });
        
        this.textContent += isAsc ? ' ↑' : ' ↓';
        
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.rows);
        
        rows.sort((a, b) => {
          const aVal = a.cells[colIndex].textContent.trim();
          const bVal = b.cells[colIndex].textContent.trim();
          return isAsc ? 
            aVal.localeCompare(bVal, 'tr', { sensitivity: 'base' }) :
            bVal.localeCompare(aVal, 'tr', { sensitivity: 'base' });
        });
        
        tbody.append(...rows);
        
        isAsc = !isAsc;
      });
    });
  }

  // 5. Popup Yönetimi
  window.togglePopup = function(popupId) {
    const popup = document.getElementById(popupId);
    const button = document.querySelector(`[onclick*="${popupId}"]`);

    if (button && button.classList.contains('popup-active')) {
      button.classList.remove('popup-active');
      if (popup) {
        popup.classList.remove('section-active');
      }
    } else {
      document.querySelectorAll('[onclick*="togglePopup"]').forEach(btn => {
        btn.classList.remove('popup-active');
      });

      document.querySelectorAll('.section-popup, .filter').forEach(p => {
        p.classList.remove('section-active');
      });
      
      if (button) {
        button.classList.add('popup-active');
      }
      if (popup) {
        popup.classList.add('section-active');
      }
    }
  }
  
  window.CheckApplication = function (buttonElement) {
    togglePopup('upload-popup');
    setTimeout(function () {
      alert(buttonElement.getAttribute("name"));
    }, 300);
  };

  

  // 6. Reset İşlemi
  function handleResetFilter() {
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
      const defaultVal = defaultFilterValues.get(dropdown);
      const selected = dropdown.querySelector('.selected');
      selected.textContent = defaultVal.text;
      selected.dataset.value = defaultVal.value;
    });
    filterTables();
  }

  // 7. Başlatıcı
  function initialize() {
    handleResponsive();
  
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
      const selected = dropdown.querySelector('.selected');
      defaultFilterValues.set(dropdown, {
        text: selected.textContent,
        value: selected.dataset.value
      });
    });
  
    handleDropdownToggle();
    handleDropdownSelection();
    handleDownloadDropdown();
    handleSorting();
    filterTables();
  
    document.querySelector('.reset-filter').addEventListener('click', handleResetFilter);
  }

  // 8. Dropdown Seçim İşlevi
  function handleDropdownSelection() {
    document.addEventListener('click', function(e) {
      const menuItem = e.target.closest('.dropdown-menu div');
      if(menuItem) {
        const dropdown = menuItem.closest('.custom-dropdown');
        const selected = dropdown.querySelector('.selected');
        selected.textContent = menuItem.textContent;
        selected.dataset.value = menuItem.dataset.value || '';
        filterTables();
      }
    });
  }

  // 9. Responsive Tablo Başlıkları
  function setResponsiveLabels() {
    const table = document.querySelector('table');
    
    if (table && table.classList.contains('dont-before-header')) {
      return;
    }

    const headers = Array.from(document.querySelectorAll('thead th')).map(th => th.textContent.trim());
    
    document.querySelectorAll('tbody td').forEach(td => {
      const cellIndex = td.cellIndex;
      td.setAttribute('data-label', headers[cellIndex] || '');
    });
  }

  // 10. Ekran Boyutu Değişimini İzleme
  function handleResponsive() {
    setResponsiveLabels();
    window.addEventListener('resize', setResponsiveLabels);
  }

  initialize();


const containerDropdowns = document.querySelectorAll('.dropdown-container .custom-dropdown');
containerDropdowns.forEach(dropdown => {
  const selected = dropdown.querySelector('.selected');
  if (selected && !dropdown.dataset.default) {
    dropdown.dataset.default = selected.textContent.trim();
  }
  dropdown.addEventListener('click', function() {
    setTimeout(() => {
      const uploadPopup = document.getElementById('upload-popup');
      if (uploadPopup && uploadPopup.firstElementChild) {
        if (dropdown.classList.contains('dropdown-active')) {
          uploadPopup.firstElementChild.style.overflow = 'visible';
        } else {
          uploadPopup.firstElementChild.style.overflow = '';
        }
      }
    }, 0);
  });
});

document.addEventListener('click', function(e) {
  const menuItem = e.target.closest('.dropdown-menu div');
  if (menuItem) {
    const dropdown = menuItem.closest('.custom-dropdown');
    if (dropdown && dropdown.closest('.dropdown-container')) {
      dropdown.classList.remove('error');
    }
  }
});

document.getElementById('ok-text').addEventListener('click', function() {
  let valid = true;
  // Only check custom-dropdowns inside .dropdown-container
  const containerDropdowns = document.querySelectorAll('.dropdown-container .custom-dropdown');
  
  containerDropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.selected');
    if (selected && selected.textContent.trim() === dropdown.dataset.default) {
      valid = false;
      dropdown.classList.add('error');
    }
  });

  if (!valid) return; // Don't proceed if invalid

  // Add new row to table if validation passes
  const tbody = document.querySelector('table tbody');
  if (tbody) {
    const tr = document.createElement('tr');

    // Create table cells
    const cells = [
      { text: '2024-2025' }, // Year
      { text: 'II Semestr' }, // Semester
      { text: tbody.querySelectorAll('tr').length + 1 }, // Row number
      { text: getDropdownValue(containerDropdowns[0], true) }, // Subject (trim first 3 chars)
      { text: getDropdownValue(containerDropdowns[1], true) }, // Topic (trim first 3 chars)
      { text: '' }, // Empty
      { text: '' }, // Empty
      { text: '' }  // Empty
    ];

    // Append cells to row
    cells.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell.text;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }
  
  // Safely call resetFileUpload if it exists
  try {
    if (typeof resetFileUpload === 'function') {
      resetFileUpload();
    }
  } catch (e) {
    console.log('resetFileUpload not available');
  }
  
  // Reset dropdowns to default
  containerDropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.selected');
    if (selected && dropdown.dataset.default) {
      selected.textContent = dropdown.dataset.default;
    }
  });
  
  // Close popup if togglePopup exists
  try {
    if (typeof togglePopup === 'function') {
      togglePopup('upload-popup');
    }
  } catch (e) {
    console.log('togglePopup not available');
  }
});

// Helper function to get dropdown value
function getDropdownValue(dropdown) {
  if (!dropdown) return '';
  const selected = dropdown.querySelector('.selected');
  if (!selected) return '';
  
  return selected.textContent.trim();
}

});
