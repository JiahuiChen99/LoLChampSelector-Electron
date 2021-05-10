const grpc = require('grpc')
const chat = require('./proto/chatapi_pb')
const service = require('./proto/chatapi_grpc_pb')


const client = new service.ChatbotClient('localhost:9090', grpc.credentials.createInsecure(), null);

const user_logo = './assets/ahri_icon.png';
const bot_logo = './assets/lol.png';
let current_champion;

function sendMessage() {
    let user_input = document.getElementById('user-input').value;

    if (user_input !== '') {
        let message_section = document.getElementById('messages');

        // Create new User message with styles
        let chat_container = document.createElement("div");
        chat_container.classList.add("chat-container", "block", "user");
        let chat_bubble = document.createElement("div");
        chat_bubble.classList.add("chat-bubble");
        let info = document.createElement("div");
        info.classList.add("info");

        let time = document.createElement("span");
        let time_data = new Date();
        time.innerText = time_data.getHours() + ':' + time_data.getMinutes();

        let username = document.createElement("span");
        username.classList.add("username");
        username.innerText = "@Nako";

        info.appendChild(time);
        info.appendChild(username);

        let new_message = document.createElement("div");
        new_message.innerText = user_input;
        new_message.classList.add("bubble-user");

        chat_bubble.appendChild(info);
        chat_bubble.appendChild(new_message);

        let figure = document.createElement("figure");
        figure.classList.add("image", "is-48x48", "level-right", "user-logo");
        let img = document.createElement("img");
        img.src = user_logo;
        img.classList.add("is-rounded");
        figure.appendChild(img);

        chat_container.appendChild(chat_bubble);
        chat_container.appendChild(figure);

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(chat_container);

        // Insert new User message
        message_section.appendChild(wrapper);

        //Scroll to bottom
        message_section.scrollTop = message_section.scrollHeight;


        // Delete text input
        document.getElementById('user-input').value = '';

        /** Send gRPC message **/
        let message = new chat.Message();
        message.setMessage(user_input);
        client.send_message(message, function(err, response) {
            //TODO: Remove verbose
            let message_section = document.getElementById('messages');

            // Create new Bot message with styles
            let chat_container = document.createElement("div");
            chat_container.classList.add("chat-container", "block", "bot");
            let chat_bubble = document.createElement("div");
            chat_bubble.classList.add("chat-bubble");
            let info = document.createElement("div");
            info.classList.add("info");

            let time = document.createElement("span");
            let time_data = new Date();
            time.innerText = time_data.getHours() + ':' + time_data.getMinutes();

            let username = document.createElement("span");
            username.classList.add("username");
            username.innerText = "@LoL Champion Selector";

            info.appendChild(username);
            info.appendChild(time);

            let new_message = document.createElement("div");
            new_message.innerText = response.array[0];
            if(response.array[1]) {
                fetchChampionInformation(response.array[1]);
            }
            new_message.classList.add("bubble-bot");

            chat_bubble.appendChild(info);
            chat_bubble.appendChild(new_message);

            let figure = document.createElement("figure");
            figure.classList.add("image", "is-48x48", "level-right", "bot-logo");
            let img = document.createElement("img");
            img.src = bot_logo;
            img.classList.add("is-rounded");
            figure.appendChild(img);

            chat_container.appendChild(figure);
            chat_container.appendChild(chat_bubble);

            let wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            wrapper.appendChild(chat_container);

            // Insert new User message
            message_section.appendChild(wrapper);

            //Scroll to bottom
            message_section.scrollTop = message_section.scrollHeight;
        });
    }
}

function isEnter() {
    if (event.key === 'Enter') {
        sendMessage();
    }
}


// Abilities listeners

function abilityClicked(ability_id) {
    let abilityRequest = new chat.championAbilityRequest();
    abilityRequest.setChampion(current_champion.array[0]);

    console.log(current_champion);

    switch (ability_id) {
        case 0: // Passive
            abilityRequest.setAbility("Passive");
            break;
        case 1: // Q
            abilityRequest.setAbility("Q");
            break;
        case 2: // W
            abilityRequest.setAbility("W");
            break;
        case 3: // E
            abilityRequest.setAbility("E");
            break;
        case 4: // R
            abilityRequest.setAbility("R");
            break;
    }

    client.getChampionAbility(abilityRequest, function(err, response) {
        // TODO: Update video
        setAbilityVideo(response.array[0]);
    });
}

function fetchChampionInformation(champion) {
    let championInfoRequest = new chat.Message();
    championInfoRequest.setMessage(champion);

    client.getChampionInformation(championInfoRequest, (err, response) => {
        //console.log(response);

        current_champion = response;

        // Change the name
        document.getElementById("champion-name").innerHTML = response.array[0];

        // Change the title
        document.getElementById("champion-title").innerHTML = response.array[3];

        // Change the ability video
        setAbilityVideo(response.wrappers_[2].map_.q.value);

        // Change the abilities
        setAbilities(response.wrappers_[3].map_);
        // Change the splash art

        // Change the roles

    });
}

function setAbilities(abilities_photos) {
    let passive = document.getElementById("passive");
    passive.setAttribute('src', "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/passive/" + abilities_photos.passive.value);

    let q = document.getElementById("q");
    q.setAttribute('src', "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/" + abilities_photos.q.value);

    let w = document.getElementById("w");
    w.setAttribute('src', "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/" + abilities_photos.w.value);

    let e = document.getElementById("e");
    e.setAttribute('src', "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/" + abilities_photos.e.value);

    let r = document.getElementById("r");
    r.setAttribute('src', "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/" + abilities_photos.r.value);

}

function setAbilityVideo(video_link) {
    let video = document.getElementById("ability-video");
    video.setAttribute('src', video_link);
}