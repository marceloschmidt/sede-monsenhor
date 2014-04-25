// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Material = new Meteor.Collection("material");
Donation = new Meteor.Collection("donation");

// When adding donation, ID of material
Session.setDefault('add_donation', null);

// Subscribe to 'material' collection on startup.
var materialHandle = Meteor.subscribe('material', function () {});
var donationHandle = null;

////////// Helpers for in-place editing //////////
var activateInput = function (input) {
  input.focus();
  input.select();
};

Template.materials.loading = function () {
  return !materialHandle.ready();
};

Template.donators.loading = function () {
  return !materialHandle.ready();
};

Template.materials.materials = function () {
  return Material.find({});
};

Template.donators.donators = function () {
  return Donation.find({});
};

Template.material.quantity = function() {
  return this.quantity !== undefined;
}

Template.donator.quantity = function() {
  return this.quantity.value;
}

Template.donator.material = function() {
  return this.material_name;
}

Template.material.quantity_plural = function() {
  return this.quantity && this.quantity.value > 1;
}

Template.material.quantity_left = function() {
  var left = this.quantity.value - this.currentCount;
  return left < 0 ? 0 : left;
}

Template.material.quantity_unit = function() {
  return this.quantity.unit;
}

Template.material.quantity_value = function() {
  var value = this.quantity.value;
  var unit  = this.quantity.unit;
  if (unit) value = value + " " + unit;
  return value;
}

Template.instruction.show_donators = function () {
  return Session.equals('donators', true);
}

Template.main.show_donators = function () {
  return Session.equals('donators', true);
}

Template.material.donating = function () {
  return Session.equals('add_donation', this._id);
}

Template.material.events({
  'click .add_donation': function (evt, tmpl) {
    Session.set('add_donation', this._id);
    Session.set('material_name', this.name);
    Deps.flush(); // update DOM before focus
    activateInput(tmpl.find("#add-donation-name"));
  },

  'click #add-donation-cancel': function(evt, tmpl) {
    evt.preventDefault();
    cancelDonation();
  },

  'click #add-donation-save': function(evt, tmpl) {
    evt.preventDefault();
    if (validateDonation()) {
      insertDonation();
      cancelDonation();
    }
  }
});

Template.instruction.events({
  'click a.donators': function(evt, tmpl) {
    evt.preventDefault();
    Session.set('donators', !Session.equals('donators', true));
    if (Session.equals('donators', true)) {
      donationHandle = Meteor.subscribe('donation', function () {});
    } else {
      donationHandle = null;
    }
  }
});

Template.material.rendered = function() {
  $('input').setMask({autoTab: false});
}

var validateDonation = function() {
  return $('#add-donation-name').val() !== "" && $('#add-donation-phone').val().length === 14 && $('#add-donation-quantity').val() !== "" && $('#add-donation-quantity').val() !== "0";
}

var insertDonation = function() {
  var name = $('#add-donation-name').val();
  var phone = $('#add-donation-phone').val();
  var quantity = $('#add-donation-quantity').val();

  Donation.insert({
    material_id: Session.get('add_donation'),
    material_name: Session.get('material_name'),
    name: name,
    phone: phone.replace(/[^\d]/g, ''),
    quantity: { value: parseInt(quantity) }
  });

  Material.update({_id: Session.get('add_donation')}, {$inc: {currentCount: parseInt(quantity)}});
}

var cancelDonation = function() {
  Session.set('add_donation', null);
  Session.set('material_id', null);
  Session.set('material_name', null);
}