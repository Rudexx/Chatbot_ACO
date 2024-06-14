
var optionsVisible = false;
                                
function toggleOptions() {
    optionsVisible = !optionsVisible;
    var options = document.getElementById('options');
    options.style.display = optionsVisible ? 'block' : 'none';
}

function selectOption(title, content) {
    var response = document.getElementById('response');

    // Display the selected option's title and content
    response.innerHTML += `
        <div class="message-bubble user-message">${title}</div>
        <div class="message-bubble bot-message">${content}</div>
    `;

    toggleOptions();
}

window.onload = function() {
    var optionsContainer = document.getElementById('options');
    
    // Assuming the converted file is named 'chatResponses.txt' and located in the same directory as your HTML file
    fetch('chatResponses.txt')
        .then(response => response.text())
        .then(data => {
            // Split the data into an array of sections based on the marker ($$$)
            var sections = data.split('Marcador: $$$').filter(Boolean);
            
            // Generate buttons based on the titles
            sections.forEach(section => {
                // Extract title and content from each section
                var title = section.match(/Titulo: (.+)/)[1].trim();
                var content = "";
                const regex = /Contenido:\s*([\s\S]*)/;
                const match = section.match(regex);
                
                if (match) {
                    content = match[1].trim();
                    content = content.replace(/\.\s*(?=\n)/g, '.<br>');
                    content = content.replace(/: en cuenta los siguientes pasos:/g, ': en cuenta los siguientes pasos: <br>');
                    const textoFormateado = section.replace(/\.\s*(?=\n)/g, '.<br>');
                    console.log(textoFormateado);
                }

                var button = document.createElement('button');
                button.className = 'btn btn-secondary btn-block mt-1';
                button.textContent = title;
                button.onclick = function() {
                    selectOption(title, content);
                };
                optionsContainer.appendChild(button);
            });

            toggleOptions();
        })
        .catch(error => {
            console.error('Error loading file:', error);
            // Handle error
        });
};