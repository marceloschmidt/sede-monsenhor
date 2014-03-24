// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Material.find().count() === 0) {
    var data = [
      { name: "Guias de Eucalipto", quantity: { value: 80, unit: '' }, currentCount: 0 },
      { name: "Caibros", quantity: { value: 40, unit: '' }, currentCount: 0 },
      { name: "Pregos", quantity: { value: 12, unit: 'kg' }, currentCount: 0 },
      { name: "Tijolos", quantity: { value: 2500, unit: '' }, currentCount: 0 },
      { name: "Cimento", quantity: { value: 30, unit: 'sacos' }, currentCount: 0 },
      { name: "Ferro 8mm", quantity: { value: 15, unit: 'barras' }, currentCount: 0 },
      { name: "Ferro 5mm", quantity: { value: 12, unit: 'barras' }, currentCount: 0 },
      { name: "Areia", quantity: { value: 7, unit: 'm³' }, currentCount: 0 },
      { name: "Brita", quantity: { value: 4, unit: 'm³' }, currentCount: 0 },
      { name: "Telhas", currentCount: 0 },
      { name: "Arame queimado", currentCount: 0 },
      { name: "Alvenarite", currentCount: 0 },
      { name: "Material elétrico", currentCount: 0 }
    ];

    for (var i = 0; i < data.length; i++) {
      Material.insert(data[i]);
    }
  }
});
