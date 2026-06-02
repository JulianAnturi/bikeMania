import { ipcMain } from 'electron';
import { createOwnerController } from '../controllers/ownerController.js';

ipcMain.handle('create-owner', async (e, ownerData) => {
  return createOwnerController(ownerData);
});