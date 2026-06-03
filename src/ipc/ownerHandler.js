import { ipcMain } from 'electron';
import { createOwner, getAllOwners, deleteOwner } from '../controllers/ownerController.js';

ipcMain.handle('create-owner', async (e, ownerData) => {
  return createOwner(ownerData);
});

ipcMain.handle('get-owners', () => {
  return getAllOwners();
});

ipcMain.handle('delete-owner', (e, ownerId) => {
  return deleteOwner(ownerId);
});