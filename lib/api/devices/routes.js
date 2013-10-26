/*
 * home-ctrl-hapi-plugin: lib/api/devices/routes.js
 * Routes for the home-ctrl-hapi-plugin device api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var handlers = require('./handlers');

// route definitions
var baseuri = function(uri) {
	return '/api/homectrl' + uri;
};
module.exports = [

  { method: 'GET', path: baseuri('/devices'), config: { handler: handlers.retrieveDevicesHandler } },
  { method: 'GET', path: baseuri('/devices/{id}'), config: { handler: handlers.getDeviceHandler } },
  { method: 'DELETE', path: baseuri('/devices/{id}'), config: { handler: handlers.deleteDeviceHandler } },
  { method: 'POST', path: baseuri('/devices'), config: { handler: handlers.addDeviceHandler } },
  { method: 'PATCH', path: baseuri('/devices/{id}'), config: { handler: handlers.patchDeviceHandler } }
  
];
