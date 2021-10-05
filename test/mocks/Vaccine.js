exports.validVaccine = (title = '1') => ({
  name: `Vacina ${title}`,
  user_id: 1
});

exports.generateValidVaccines = num => {
  const vaccines = [];
  for (let i = 0; i <= num; i++) {
    vaccines.push(this.validVaccine(i));
  }

  return vaccines;
}
