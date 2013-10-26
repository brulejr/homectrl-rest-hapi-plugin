/*
 * home-ctrl-hapi-plugin: lib/api/devices/service.js
 * Service backing the plugin's device api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

var DeviceManager = require('./DeviceManager');
var deviceManager = new DeviceManager();


// apis
exports.addDevice = function(device, success, failure) {
	deviceManager.addDevice(device, success, failure);
};

exports.deleteDevice = function(id, success, failure) {
	deviceManager.deleteDevice(id, function(result) {
    success(result);
	}, failure);
};

exports.getDevice = function(id, success, failure) {
	deviceManager.getDevice(id, success, failure);
};

exports.getDevices = function(query, success, failure) {
	deviceManager.retrieveDevices(success, failure);
};

exports.patchDevice = function(id, device, success, failure) {
	deviceManager.updateDevice(id, device, success, failure);
};
