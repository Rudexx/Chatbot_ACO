fetch('path/to/your/file.txt')
    .then(response => response.text())
    .then(data => {
        console.log(data); // The file content
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });
