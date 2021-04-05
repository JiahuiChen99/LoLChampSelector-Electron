const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win = null;

app.once('ready', () => {
   win = new BrowserWindow({
       width: 800,
       height: 600,
       // Don't show the window until it's ready, this prevents any white flickering
       show: false
   });

   win.setMenu(null);

    // Open the DevTools.
    win.webContents.openDevTools({
        mode: "detach"
    });

   win.loadURL(url.format({
       pathname: path.join(__dirname, 'index.html'),
       protocol: 'file',
       slashes: true
   }));

    win.once('ready-to-show', () => {
        win.show()
    })

    try {
        require('electron-reloader')(module)
    } catch (error) {
        console.log(error)
    }
});

/*
function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
    })

    win.removeMenu();
    // Open the DevTools.
    win.webContents.openDevTools({
        mode: "detach"
    })
    // and load the index.html of the app.
    win.loadFile('index.html')

    try {
        require('electron-reloader')(module)
    } catch (_) {}
}

app.on('ready', createWindow)
*/
