import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getFolder: () => ipcRenderer.invoke("getFolder"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  addProject: (foldername:string, projectname: string) => ipcRenderer.invoke("addProject", foldername,projectname),
  findProject: (foldername: string) => ipcRenderer.invoke("findProject", foldername),
  loadYaml: (filename: string) => ipcRenderer.invoke("loadYaml", filename),
  saveYaml: (filename: string, json: string) => ipcRenderer.invoke("saveYaml", filename, json),
  loadEnvJSON:(foldername: string) => ipcRenderer.invoke("loadEnvJSON", foldername),
  saveEnvJSON: (foldername: string, json: string) => ipcRenderer.invoke("saveEnvJSON", foldername, json),
});
