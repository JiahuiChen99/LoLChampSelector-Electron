const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win = null;

app.once('ready', () => {
   win = new BrowserWindow({
       icon: path.join(__dirname, '/assets/lolicon.png'),
       // Don't show the window until it's ready, this prevents any white flickering
       show: false
   });

    win.setMenu(null);
    win.maximize();

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
