import * as userRepository from '../repositories/ownerRepository.js';

export function registerOwner(ownerData) {

  // validaciones
  if (!ownerData.name) {
    throw new Error('Name is required');
  }

  return userRepository.createOwner(ownerData);
}