// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var chatapi_pb = require('./chatapi_pb.js');

function serialize_APIResponse(arg) {
  if (!(arg instanceof chatapi_pb.APIResponse)) {
    throw new Error('Expected argument of type APIResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_APIResponse(buffer_arg) {
  return chatapi_pb.APIResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_EmptyMessge(arg) {
  if (!(arg instanceof chatapi_pb.EmptyMessge)) {
    throw new Error('Expected argument of type EmptyMessge');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_EmptyMessge(buffer_arg) {
  return chatapi_pb.EmptyMessge.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Message(arg) {
  if (!(arg instanceof chatapi_pb.Message)) {
    throw new Error('Expected argument of type Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Message(buffer_arg) {
  return chatapi_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatbotService = exports.ChatbotService = {
  // Sends user's text input to the server
send_message: {
    path: '/Chatbot/send_message',
    requestStream: false,
    responseStream: false,
    requestType: chatapi_pb.Message,
    responseType: chatapi_pb.Message,
    requestSerialize: serialize_Message,
    requestDeserialize: deserialize_Message,
    responseSerialize: serialize_Message,
    responseDeserialize: deserialize_Message,
  },
  // Sends a response back to the client side
get_message: {
    path: '/Chatbot/get_message',
    requestStream: false,
    responseStream: false,
    requestType: chatapi_pb.EmptyMessge,
    responseType: chatapi_pb.APIResponse,
    requestSerialize: serialize_EmptyMessge,
    requestDeserialize: deserialize_EmptyMessge,
    responseSerialize: serialize_APIResponse,
    responseDeserialize: deserialize_APIResponse,
  },
};

exports.ChatbotClient = grpc.makeGenericClientConstructor(ChatbotService);
