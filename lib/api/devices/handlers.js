/*
 * home-ctrl-hapi-plugin: lib/api/devices/handlers.js
 * Routes handlers for the plugin's device api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var service = require('./service');

// general functions
var handleError = function(req, err) {
  switch (err.type) {
    case "CONFLICT":
      req.reply(err.message).code(409);
      break;
    case "INVALID":
      req.reply(err.message).code(400);
      break;
    case "NOT_FOUND":
      req.reply(err.message).code(404);
      break;
    case "NOT_IMPLEMENTED":
      req.reply(err.message).code(501);
      break;
    default:
      req.reply(err.message).code(500);
  }
};

// route handlers
exports.addDeviceHandler = function (req) {
  service.addDevice(req.payload, function(device) {
    req.reply(device).code(201).header('Location: /api/device/v1/' + device.id);  
  }, function(err) {
    handleError(req, err);
  });  
};

exports.deleteDeviceHandler = function (req) {
  service.deleteDevice(req.params.id, function(device) {
    req.reply(device);
  }, function(err) {
    handleError(req, err);
  });
};

exports.getDeviceHandler = function (req) {
  service.getDevice(req.params.id, function(device) {
    req.reply(device);
  }, function(err) {
    handleError(req, err);
  });
};

exports.patchDeviceHandler = function (req) {
  service.patchDevice(req.params.id, req.payload, function(device) {
    req.reply(device);
  }, function(err) {
    handleError(req, err);
  });
};

exports.retrieveDevicesHandler = function (req) {
  service.getDevices({}, function(devices) {
    req.reply(devices);
  }, function(err) {
    handleError(req, err);
  });
};
