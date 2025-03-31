// Sayfa yüklendiğinde, önceki seçimlere göre display işlemi yapılır
window.addEventListener('DOMContentLoaded', (event) => {
    const selectedWeek = localStorage.getItem('selectedWeek') || 'mainweek';  // Varsayılan olarak 'mainweek'
    document.getElementById(selectedWeek).checked = true;  // Seçili olan radio butonunu işaretle
    toggleDisplay(selectedWeek);  // İlgili display işlemini uygula
});

// Radio butonlarından birine tıklanırsa, seçim kaydedilir ve display güncellenir
document.querySelectorAll('input[name="week"]').forEach(radio => {
    radio.addEventListener('change', function() {
        localStorage.setItem('selectedWeek', this.id);  // Seçimi localStorage'da sakla
        toggleDisplay(this.id);  // Display işlemi uygula
    });
});

function toggleDisplay(selectedWeek) {
    // Tüm öğelere display: none uygula
    document.querySelectorAll('.subweek').forEach(element => {
        element.style.opacity = selectedWeek === 'subweek' ? '1' : '0';
    });
    
    document.querySelectorAll('.topweek').forEach(element => {
        element.style.opacity = selectedWeek === 'topweek' ? '1' : '0';
    });
    
    // Her iki durumda da, mainweek'te display: none uygulanacak
    if (selectedWeek === 'mainweek') {
        document.querySelectorAll('.subweek, .topweek').forEach(element => {
            element.style.opacity = '0';
        });
    }
}
