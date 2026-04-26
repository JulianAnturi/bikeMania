const Owner = require("./models/Owner");

function createOwner(data){

    try {
        const id = Owner.create(data);
        return { success: true, id };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// CREATE
ipcMain.handle("owner:create", async (event, data) => {
});

// READ ALL
// ipcMain.handle("owner:getAll", async () => {
//     try {
//         const owners = Owner.getAll();
//         return { success: true, owners };
//     } catch (error) {
//         return { success: false, message: error.message };
//     }
// });

// UPDATE
// ipcMain.handle("owner:update", async (event, { id, data }) => {
//     try {
//         Owner.update(id, data);
//         return { success: true };
//     } catch (error) {
//         return { success: false, message: error.message };
//     }
// });

// DELETE
// ipcMain.handle("owner:delete", async (event, id) => {
//     try {
//         Owner.delete(id);
//         return { success: true };
//     } catch (error) {
//         return { success: false, message: error.message };
//     }
// });