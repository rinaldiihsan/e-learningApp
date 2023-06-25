const jwt = require('jsonwebtoken');

// Fungsi untuk menghasilkan token JWT
const generateToken = (payload) => {
  // Simpan secret key JWT Anda di sini (harus bersifat rahasia dan aman)
  const secretKey = 'secret-key';
  const options = {
    expiresIn: '1h', // Waktu kadaluarsa token
  };

  // Generate token menggunakan payload dan secret key
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// Fungsi untuk memverifikasi token JWT
const verifyToken = (token) => {
  // Simpan secret key JWT Anda di sini (harus sama dengan yang digunakan untuk generate token)
  const secretKey = 'secret-key';

  try {
    // Verifikasi token menggunakan secret key
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Token tidak valid atau telah kedaluwarsa
    return null;
  }
}

module.exports = { generateToken, verifyToken };
