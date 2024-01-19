import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";
const Store = require("electron-store");
//@ts-ignore
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
  ipcMain.handle("addProject", addProject);
  ipcMain.handle("findProject", handleFindProject);
  ipcMain.handle("loadYaml", loadYaml);
  ipcMain.handle("saveYaml", saveYaml);
  ipcMain.handle("loadEnvJSON", loadEnvJSON);
  ipcMain.handle("saveEnvJSON", saveEnvJSON);
  win = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  win.setMenuBarVisibility(false);
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
    // win.loadUrl("/")
    win.webContents.openDevTools();
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

function addProject(event: any, foldername: string, projectname: string) {
  fs.mkdirSync(path.join(foldername, projectname));
  fs.writeFileSync(path.join(foldername, projectname, "config.yml"), "");
}

function handleFindProject(event: any, foldername: string) {
  return findProject(foldername);
}

function findProject(dir: string) {
  let arr: object[] = [];
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

function loadYaml(event: any, filename: string) {
  const yamlText = fs.readFileSync(filename, "utf8");
  let json = yaml.load(yamlText);
  let arr = [];
  if (json) {
    let keys = Object.keys(json);
    for (let key of keys) {
      let obj = json[key];
      obj["name"] = key;
      arr.push(obj);
    }
  }
  return arr;
}

function saveYaml(event: any, filename: string, json: string) {
  let jsonObj = JSON.parse(json);
  let obj: any = {};
  for (let proc of jsonObj) {
    obj[proc.name] = proc;
    delete obj[proc.name].name;
  }
  fs.writeFileSync(filename, yaml.dump(obj));
}

function loadEnvJSON(event: any, foldername: string) {
  if (fs.existsSync(path.join(foldername, "env.json")))
    return JSON.parse(
      fs.readFileSync(path.join(foldername, "env.json"), "utf8")
    );
  return {};
}

function saveEnvJSON(event: any, foldername: string, json: string) {
  fs.writeFileSync(path.join(foldername, "env.json"), json);
}

app.whenReady().then(bootstrap);
