// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Material.find().count() === 0) {
    var data = [
      { name: "Guias de Eucalipto", quantity: { value: 80, unit: '' } },
      { name: "Caibros", quantity: { value: 40, unit: '' } },
      { name: "Pregos", quantity: { value: 12, unit: 'kg' } },
      { name: "Tijolos", quantity: { value: 2500, unit: '' } },
      { name: "Cimento", quantity: { value: 30, unit: 'sacos' } },
      { name: "Ferro 8mm", quantity: { value: 15, unit: 'barras' } },
      { name: "Ferro 5mm", quantity: { value: 12, unit: 'barras' } },
      { name: "Areia", quantity: { value: 7, unit: 'm³' } },
      { name: "Brita", quantity: { value: 4, unit: 'm³' } },
      { name: "Telhas" },
      { name: "Arame queimado" },
      { name: "Alvenarite" },
      { name: "Material elétrico" }
    ];

    for (var i = 0; i < data.length; i++) {
      Material.insert(data[i]);
    }
  }
});
