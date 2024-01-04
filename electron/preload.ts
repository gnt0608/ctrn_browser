import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getFolder: () => ipcRenderer.invoke("getFolder"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  walkTree: (foldername: string) => ipcRenderer.invoke("walkTree", foldername),
});
