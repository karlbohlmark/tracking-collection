var ObservableCollection = require('observable-collection');
var Emitter = require('emitter');

function TrackingCollection (items) {
	ObservableCollection.call(this, items);
  this.additions = [];
  this.removals = [];
  this.on('add', this.trackAdd.bind(this));
  this.on('remove', this.trackRemove.bind(this));
}

TrackingCollection.prototype = Object.create(ObservableCollection.prototype);
TrackingCollection.prototype.constructor = TrackingCollection;

var merge = function (a, b) {
	Object.keys(b).forEach(function (key) {
		a[key] = b[key];
	});
};

merge(TrackingCollection.prototype, Emitter.prototype);

TrackingCollection.prototype.trackAdd = function (addition) {
  this.additions.push(addition);
};

TrackingCollection.prototype.trackRemove = function (removal) {
 this.removals.push(removal);
};

module.exports = TrackingCollection;
