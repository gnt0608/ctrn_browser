import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getFolder: () => ipcRenderer.invoke("getFolder"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  findProject: (foldername: string) => ipcRenderer.invoke("findProject", foldername),
  loadYaml: (filename: string) => ipcRenderer.invoke("loadYaml", filename)
});
