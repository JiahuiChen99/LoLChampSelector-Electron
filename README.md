> ⚠️ **Targeted to students of my university - La Salle URL:** Refrain from copying this repository!
# 🎮 League of Legends Champion Selector 

LoL Champ Selector is a chat bot about the world's most [famous](https://na.leagueoflegends.com/) eSport game. The baseline is to help **summoner**(users) find a new champion to play with, based on the preferred difficulty.
It also features like champions' description storytelling, items recommendations and much more, give it a try!

<p align="center">
 <img src="https://github.com/JiahuiChen99/LoLChampSelector-Electron/blob/Client_Logic/assets/chatbot%20UI.png" width="auto">
</p>
 
## Architecture
This client is build using NodeJS & Electron :electron: framework.

It uses [gRPC](https://grpc.io/) protocol to communicate with the server. The underlying data sent to the back-end are Google's
Protocol Buffers.


> Structure for sending users' messages to the server. It is also used for champions' abilities retrieval.
```
// Simple message
message Message {

    string message = 1;

}
```


> Fetch champions' abilities
```
// Request a champion's ability
message championAbilityRequest {

    string champion = 1;
    string ability = 2;

}
```

> Response from the server with the champion.
```
// Chatbot response
message chatbotResponse {

    string message = 1;
    string champion = 2;

}
```


Currently only 2 rpc are implemented

> Sends the user message, awaits chatbot's response
```
rpc send_message(Message) returns (chatbotResponse);
```

> Fetches champion' abilities, the champion name and the ability are required.
```
rpc getChampionAbility(championAbilityRequest) returns (Message);
```
## Supported tokens
- Champion recommendation based on **Difficulty**
- Champion recommendation based on **Roles**
- Items for **Roles**
- Champion Description Storytelling 
- Greetings
- Bye
- Thanking

## Get it running
Run `npm install` to install all dependencies.

> ⚠️ **IMPORTANT: Please run the following**. The communication with the server won't work if it's not performed. 

`electron-rebuild` to download core gRPC code and rebuild the library, due to Electron's nature. For more information
refer to this [site](https://grpc.github.io/grpc/node/).

## TODO ✔️
### Front-end

- [x] Chat Interface
- [x] Champion Information Section
- [x] gRPC calls
- [ ] Improve UI

### Back-end
- [x] gRPC services
- [ ] NLP (Natural Language Processing)
- [ ] Chat bot Memory
- [ ] More organic conversation
