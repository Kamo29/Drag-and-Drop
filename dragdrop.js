document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('file-list');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    
    // Handle files from input
    fileInput.addEventListener('change', handleFiles, false);

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropZone.classList.add('dragover');
    }

    function unhighlight(e) {
        dropZone.classList.remove('dragover');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({target: {files: files}});
    }

    function handleFiles(e) {
        const files = [...e.target.files];
        fileList.innerHTML = ''; // Clear existing list
        
        files.forEach(file => {
            // Create list item for each file
            const fileItem = document.createElement('div');
            fileItem.innerHTML = `
                <p>File: ${file.name}</p>
                <p>Size: ${formatFileSize(file.size)}</p>
                <p>Type: ${file.type || 'unknown'}</p>
            `;
            fileList.appendChild(fileItem);
            
            // Here you can add additional handling like uploading to server
            // uploadFile(file);
        });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Example upload function (not implemented)
    function uploadFile(file) {
        // Implement your file upload logic here
        // Example:
        // const formData = new FormData();
        // formData.append('file', file);
        // fetch('/upload', {
        //     method: 'POST',
        //     body: formData
        // });
    }
});
