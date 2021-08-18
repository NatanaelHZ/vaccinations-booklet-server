exports.validUser = () => ({
  name: 'Eduardo Sabino',
  email: 'eduardoaikin@gmail.com',
  password: '$2b$06$xzIKWG5.5aT3iEz70R/0KOkvQ2UC0NXEkq3rFgaJUOBStB63Q349m',
  toJSON () {
    return this;
  },
  async comparePassword (password) {
    return password === 'senhafixa'
  }
});