
var optionsVisible = false;
                                
function toggleOptions() {
    optionsVisible = !optionsVisible;
    var options = document.getElementById('options');
    options.style.display = optionsVisible ? 'block' : 'none';
}

function selectOption(option) {
    var response = document.getElementById('response');

    // Assuming the converted file is named 'chatResponses.txt' and located in the same directory as your HTML file
    fetch('chatResponses.txt')
        .then(response => response.text())
        .then(data => {
            // Split the data into an array of sections based on the marker ($$$)
            var sections = data.split('Marcador: $$$').filter(Boolean);

            // Find the section corresponding to the selected option
            var section = sections.find(section => section.includes('Titulo: ' + option));
            if (section) {
                // Extract title and content from the section
                var titleMatch = section.match(/Titulo: (.+)/);
                var contentMatch = section.match(/Contenido:\n([\s\S]+)/);
                if (titleMatch && contentMatch) {
                    var title = titleMatch[1].trim();
                    var content = contentMatch[1].trim();

                    response.innerHTML += `
                        <div class="message-bubble user-message">${title}</div>
                        <div class="message-bubble bot-message">${content}</div>
                    `;
                }
            } else {
                response.innerHTML += `
                    <div class="message-bubble user-message">${option}</div>
                    <div class="message-bubble bot-message">Respuesta predeterminada</div>
                `;
            }

            toggleOptions();
        })
        .catch(error => {
            console.error('Error loading file:', error);
            // Handle error
        });
}


window.onload = function() {
    var optionsContainer = document.getElementById('options');
    
    // Assuming the converted file is named 'responses.txt' and located in the same directory as your HTML file
    fetch('chatResponses.txt')
        .then(response => response.text())
        .then(data => {
            // Split the data into an array of sections based on the marker ($$$)
            var sections = data.split('Marcador: $$$').filter(Boolean);
            alert(sections);
            // Generate buttons based on the titles
            sections.forEach(section => {
                // Extract title and content from each section
                var title = section.match(/Titulo: (.+)/)[1].trim();
                alert(title);
                var content = section.match(/Contenido:\n([\s\S]+)/)[1].trim();
                alert(content);

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