const {app, BrowserWindow} = require('electron')
const service = require('./proto/chatapi_grpc_pb')
const chat = require('./proto/chatapi_pb')
const grpc = require('grpc')

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.removeMenu();
    // Open the DevTools.
    win.webContents.openDevTools({
        mode: "detach"
    })
    // and load the index.html of the app.
    win.loadFile('index.html')

    let client = new service.ChatbotClient('localhost:9090', grpc.credentials.createInsecure(), null)
    let message = new chat.Message()
    message.setMessage('Hello from electron')
    console.log('sending note to server')
    client.send_message(message, function(err, response) {
        console.log('received reply', response);
    });
}

app.on('ready', createWindow)
