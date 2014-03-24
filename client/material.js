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

Template.material.quantity_plural = function() {
  return this.quantity && this.quantity.value > 1;
}

Template.material.quantity_left = function() {
  return this.quantity.value - this.currentCount;
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
    Deps.flush(); // update DOM before focus
    activateInput(tmpl.find("#add-donation-name"));
  }
});

Template.instruction.events({
  'click a': function(evt, tmpl) {
    evt.preventDefault();
    Session.set('donators', !Session.equals('donators', true));
    if (Session.equals('donators', true)) {
      donationHandle = Meteor.subscribe('donation', function () {});
    } else {
      donationHandle = null;
    }
  }
});