/*
 * home-ctrl-hapi-plugin:: test/api/devices/DeviceSpec.js
 * Tests for the plugin's device api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var expect = require('chai').expect;
var DeviceAPI = require('../lib/api/devices/Device');
var Device = DeviceAPI.Device;
  
// test device data
var device_good = {
  id: "DEVICE_1",
  description: "This is device #1",
  enabled: true
};

var device_bad = {
  id: "DEVICE_@#@",
  description: "This is device #1"
};

describe('Device', function () {

  it('should be defined', function() {
    expect(Device).to.not.be.undefined;
  });

  describe('constructor', function () {

    it('should build a new instance for good data', function() {
      var device = new Device(device_good);
      expect(device).to.not.be.undefined;
      expect(device).to.have.property('id', 'DEVICE_1');
      expect(device).to.have.property('enabled', true);
      expect(device).to.have.property('description', 'This is device #1');
    });

    it('should throw an error for bad data', function() {
      expect(function() { return new Device(device_bad); }).to.throw(DeviceAPI.DeviceError);
    });

  });

});
