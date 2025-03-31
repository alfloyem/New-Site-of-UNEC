document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    document.querySelector('.browse-document-container').style.display = 'none';
    document.querySelector('.preview-document-container').style.display = 'flex';

    const fileIcons = {
        'pdf': 'pd-pdf',
        'ppt': 'pd-powerpoint',
        'pptx': 'pd-powerpoint',
        'doc': 'pd-word',
        'docx': 'pd-word',
        'xls': 'pd-excel',
        'xlsx': 'pd-excel'
    };
    
    const extension = file.name.split('.').pop().toLowerCase();
    const activeIcon = fileIcons[extension] || 'pd-pdf';
    
    document.querySelectorAll('.pd-icon-container > span').forEach(icon => {
        icon.style.display = 'none';
    });
    document.getElementById(activeIcon).style.display = 'block';

    const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
    document.querySelector('.pd-file-name').textContent = fileName;

    const totalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    let uploadedMB = 0;
    let speedMBps = 3.7;
    const progressElement = document.querySelector('progress');
    const sizeProgressElement = document.getElementById('pd-size-progress');

    progressElement.value = 0;
    progressElement.style.display = 'block';
    sizeProgressElement.classList.remove('uploaded');
    
    const uploadSimulation = setInterval(() => {
        speedMBps = Math.max(0.1, speedMBps + (Math.random() * 4 - 2));
        
        uploadedMB = Math.min(uploadedMB + speedMBps, totalSizeMB);
        const progressPercent = (uploadedMB / totalSizeMB * 100).toFixed(0);
        
        if(uploadedMB >= totalSizeMB) {
            sizeProgressElement.textContent = 'File uploaded';
            sizeProgressElement.classList.add('uploaded');
            progressElement.style.visibility = 'hidden';
        } else {
            sizeProgressElement.textContent = 
                `${uploadedMB.toFixed(2)}MB of ${totalSizeMB}MB`;
        }
        
        progressElement.value = progressPercent;

        if (uploadedMB >= totalSizeMB) clearInterval(uploadSimulation);
    }, 1000);

window.resetFileUpload = function() {
    const browseContainer = document.querySelector('.browse-document-container');
    const previewContainer = document.querySelector('.preview-document-container');
    const fileInput = document.getElementById('fileInput');
    const progressElement = document.querySelector('progress');
    const sizeProgressElement = document.getElementById('pd-size-progress');
    const fileNameElement = document.querySelector('.pd-file-name');
    const icons = document.querySelectorAll('.pd-icon-container > span');
    const bdHeaderSpan = document.querySelector('.bd-header span');
    
    if (browseContainer) {
        browseContainer.style.display = 'flex';
        browseContainer.classList.remove('error');
    }
    if (previewContainer) {
        previewContainer.style.display = 'none';
    }
    
    if (bdHeaderSpan) {
        bdHeaderSpan.textContent = 'drag & drop or choose file';
    }
    
    if (fileInput) fileInput.value = '';
    
    if (progressElement) {
        progressElement.value = 0;
        progressElement.style.display = 'none';
        progressElement.style.visibility = 'visible';
    }
    
    if (sizeProgressElement) {
        sizeProgressElement.textContent = '';
        sizeProgressElement.classList.remove('uploaded');
    }
    
    if (fileNameElement) fileNameElement.textContent = '';
    
    icons.forEach(icon => {
        if (icon) icon.style.display = 'none';
    });
    
    if (window.uploadSimulation) {
        clearInterval(window.uploadSimulation);
        window.uploadSimulation = null;
    }
};

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const browseContainer = document.querySelector('.browse-document-container');
    const bdHeaderSpan = document.querySelector('.bd-header span');
    
    if (!file) {
        if (browseContainer) browseContainer.classList.add('error');
        if (bdHeaderSpan) bdHeaderSpan.textContent = 'upload a file';
        return;
    }
    
    if (browseContainer) browseContainer.classList.remove('error');
    if (bdHeaderSpan) bdHeaderSpan.textContent = 'drag & drop or choose file';
});

document.getElementById('cancel-text').addEventListener('click', function() {
    resetFileUpload();
    togglePopup('upload-popup');
});
    
    document.querySelector('.pd-box button').onclick = resetFileUpload;
});