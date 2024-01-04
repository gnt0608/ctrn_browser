import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
const Store = require("electron-store");
import * as yaml from "js-yaml";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.ROOT, "dist-electron");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, "public")
  : path.join(process.env.ROOT, ".output/public");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow;
const preload = path.join(process.env.DIST, "preload.js");

function bootstrap() {
  ipcMain.handle("getFolder", handleGetFolder);
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("findProject", handleFindProject);
  ipcMain.handle("loadYaml", loadYaml);
  win = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }
}

const folderData = new Store({ name: "folder" });
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Open File",
    properties: ["openDirectory"],
  });
  if (!canceled) {
    folderData.set("folder", filePaths[0]);
    return filePaths[0];
  }
}

function handleGetFolder() {
  return folderData.get("folder", "");
}

import fs from "fs";
function handleFindProject(event, foldername: string) {
  return findProject(foldername);
}

function findProject(dir: string) {
  let arr = [];
  let files = fs.readdirSync(dir);
  for (let file of files) {
    var filepath = path.join(dir, file);
    let stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      arr = arr.concat(findProject(filepath));
    } else if (
      stats.isFile() &&
      (file == "config.yaml" || file == "config.yml")
    ) {
      arr.push({ name: path.basename(dir), path: filepath });
    }
  }
  return arr;
}

function loadYaml(event, filename: string) {
  const yamlText = fs.readFileSync(filename, "utf8");
  return yaml.load(yamlText);
}

app.whenReady().then(bootstrap);
