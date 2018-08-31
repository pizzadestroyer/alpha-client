const path = require('path')
const {app, BrowserWindow} = require('electron')

require('electron-reload')(path.join(__dirname), {
    electron: path.join(__dirname, '../../', 'node_modules', '.bin', 'electron')
})

const createWindow = () => {
    win = new BrowserWindow({width: 800, height: 600})
    win.loadFile(path.join(__dirname, '../views/client.html'))
    win.webContents.openDevTools()
}

app.on('ready', createWindow)