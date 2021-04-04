const grpc = require('grpc')
const chat = require('./proto/chatapi_pb')
const service = require('./proto/chatapi_grpc_pb')


const client = new service.ChatbotClient('localhost:9090', grpc.credentials.createInsecure(), null);
function sendMessage() {
    let user_input = document.getElementById('user-input').value;

    if (user_input !== '') {
        let message_section = document.getElementById('messages');

        // Create new User message with styles
        let new_message = document.createElement("div");
        new_message.innerText = user_input;
        new_message.classList.add("bubble-user", "block");

        // Insert new User message
        message_section.appendChild(new_message);

        //Scroll to bottom
        message_section.scrollTop = message_section.scrollHeight;


        // Delete text input
        document.getElementById('user-input').value = '';

        /** Send gRPC message **/
        let message = new chat.Message();
        message.setMessage(user_input);
        client.send_message(message, function(err, response) {

            let message_section = document.getElementById('messages');

            // Create new Bot message with styles
            let new_message = document.createElement("div");
            new_message.innerText = response.array[0];
            new_message.classList.add("bubble-bot", "block");

            // Insert new User message
            message_section.appendChild(new_message);
        });
    }
}

function isEnter() {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
