import * as ownerService from '../services/ownerService.js';

// export class OwnerController {

  export function createOwner(ownerData) {
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

  export function getAllOwners(ownerData) {
    try {
     const owners =  ownerService.getAllOwners(ownerData);
      return {
        success: true,
        owners
      };

    } catch (error) {

      return {
        success: false,
        message: error.message
      };
    }
  }

  export function deleteOwner(ownerId){
    try{
      const id =  ownerService.deleteOwner(ownerId);
      return {
        success: true,
        id
      };
    }catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

// }

