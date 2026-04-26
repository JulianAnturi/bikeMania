const User = require('../../models/User');
const bcrypt = require('bcryptjs');

async function login({ username, password }) {
  const user = User.findByUsername(username);

  if (!user) {
    return { success: false, message: 'Usuario no existe' };
  }

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return { success: false, message: 'Contraseña incorrecta' };
  }

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username
    }
  };
}

module.exports = { login };