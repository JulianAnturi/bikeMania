
const { ipcMain } = require("electron");
const OwnerService = require("./services/OwnerService");

ipcMain.handle("owner:create", (e, data) => OwnerService.create(data));

ipcMain.handle("owner:getAll", () => OwnerService.getAll());

ipcMain.handle("owner:update", (e, { id, data }) =>
    OwnerService.update(id, data)
);

ipcMain.handle("owner:delete", (e, id) =>
    OwnerService.delete(id)
);