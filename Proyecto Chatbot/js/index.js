import { pipeline } from '@huggingface/transformers-js';

async function addMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('d-flex', 'flex-row', 'mb-4');
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    if (sender === 'user') {
        bubble.classList.add('user-message');
        messageElement.classList.remove('justify-content-end');
        messageElement.classList.add('justify-content-start');
    } else {
        bubble.classList.add('bot-message');
    }
    bubble.textContent = message;
    messageElement.appendChild(bubble);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function chatBot(inputText) {
    const modelOptions = { model: 'gpt2' }; // Ensure correct options
    const chatPipeline = await pipeline('text-generation', modelOptions);
    const responses = await chatPipeline(inputText);
    return responses[0].generated_text.trim(); // Ensure this matches expected API
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        addMessage(userInput, 'user');
        document.getElementById('user-input').value = '';
        try {
            const botResponse = await chatBot(userInput);
            addMessage(botResponse, 'bot');
        } catch (error) {
            console.error("Error:", error);
            addMessage("Sorry, something went wrong.", 'bot');
        }
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Welcome message from the bot
addMessage('Hello! How can I assist you today?', 'bot');