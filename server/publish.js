// Material -- {name: String}
Material = new Meteor.Collection("material");
Donation = new Meteor.Collection("donation");

// Publish complete set of materials to all clients.
Meteor.publish('material', function () {
  return Material.find();
});

// Publish complete set of donations to all clients.
Meteor.publish('donation', function () {
  return Donation.find();
});

