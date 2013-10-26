/*
 * home-ctrl-hapi-plugin: test/DeviceManagerSpec.js
 * Tests for the plugin's device api manager
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */
(function() {
  'use strict';

  // module dependencies
  var chai = require('chai');
  var expect = chai.expect;
  var DeviceManager = require('../lib/api/devices/DeviceManager');

  // test device data
  var device = {
    id: 123,
    name: 'Device1'
  }

  describe('DeviceManager', function () {

    it('should be defined', function() {
      expect(DeviceManager).to.not.be.undefined;
    });

    it('should define an addDevice method', function() {
      expect(DeviceManager).to.respondTo('addDevice');
    });

    it('should define a deleteDevice method', function() {
      expect(DeviceManager).to.respondTo('deleteDevice');
    });

    it('should define a getDevice method', function() {
      expect(DeviceManager).to.respondTo('getDevice');
    });

    it('should define a hasDevice method', function() {
      expect(DeviceManager).to.respondTo('hasDevice');
    });

    it('should define a retrieveDevices method', function() {
      expect(DeviceManager).to.respondTo('retrieveDevices');
    });

    it('should define an updateDevice method', function() {
      expect(DeviceManager).to.respondTo('updateDevice');
    });

  });

}());  