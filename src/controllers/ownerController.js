import * as ownerService from '../services/ownerService.js';

// export class OwnerController {

  export function createOwnerController(ownerData) {
    try {
      const id =  ownerService.registerOwner(ownerData);
      return {
        success: true,
        id
      };

    } catch (error) {

      return {
        success: false,
        message: error.message
      };
    }
  }


// }

