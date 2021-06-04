// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var chatapi_pb = require('./chatapi_pb.js');

function serialize_Message(arg) {
  if (!(arg instanceof chatapi_pb.Message)) {
    throw new Error('Expected argument of type Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Message(buffer_arg) {
  return chatapi_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_championAbilityRequest(arg) {
  if (!(arg instanceof chatapi_pb.championAbilityRequest)) {
    throw new Error('Expected argument of type championAbilityRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_championAbilityRequest(buffer_arg) {
  return chatapi_pb.championAbilityRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_championInformationRequest(arg) {
  if (!(arg instanceof chatapi_pb.championInformationRequest)) {
    throw new Error('Expected argument of type championInformationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_championInformationRequest(buffer_arg) {
  return chatapi_pb.championInformationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbotResponse(arg) {
  if (!(arg instanceof chatapi_pb.chatbotResponse)) {
    throw new Error('Expected argument of type chatbotResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbotResponse(buffer_arg) {
  return chatapi_pb.chatbotResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatbotService = exports.ChatbotService = {
  // Sends user's text input to the server
send_message: {
    path: '/Chatbot/send_message',
    requestStream: false,
    responseStream: false,
    requestType: chatapi_pb.Message,
    responseType: chatapi_pb.chatbotResponse,
    requestSerialize: serialize_Message,
    requestDeserialize: deserialize_Message,
    responseSerialize: serialize_chatbotResponse,
    responseDeserialize: deserialize_chatbotResponse,
  },
  // Request a champion's ability, it returns
getChampionAbility: {
    path: '/Chatbot/getChampionAbility',
    requestStream: false,
    responseStream: false,
    requestType: chatapi_pb.championAbilityRequest,
    responseType: chatapi_pb.Message,
    requestSerialize: serialize_championAbilityRequest,
    requestDeserialize: deserialize_championAbilityRequest,
    responseSerialize: serialize_Message,
    responseDeserialize: deserialize_Message,
  },
  // Request champion's information
getChampionInformation: {
    path: '/Chatbot/getChampionInformation',
    requestStream: false,
    responseStream: false,
    requestType: chatapi_pb.Message,
    responseType: chatapi_pb.championInformationRequest,
    requestSerialize: serialize_Message,
    requestDeserialize: deserialize_Message,
    responseSerialize: serialize_championInformationRequest,
    responseDeserialize: deserialize_championInformationRequest,
  },
};

exports.ChatbotClient = grpc.makeGenericClientConstructor(ChatbotService);
