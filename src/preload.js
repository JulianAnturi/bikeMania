// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    createOwner: (createOwnerData) => ipcRenderer.invoke('create-owner', createOwnerData),
    getOwners: () => ipcRenderer.invoke('get-owners'),
    deleteOwner: (ownerId) => ipcRenderer.invoke('delete-owner', ownerId)
});
