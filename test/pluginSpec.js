/*
 * home-ctrl-hapi-plugin: test/pluginSpec.js
 * Plugin tests
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'user strict';

// load modules
var Hapi = require('hapi');
var expect = require('chai').expect;
require('pkginfo')(module, 'version');

describe('homectrl-rest-hapi-plugin', function () {

	var server = null;

	before(function(done) {
		server = new Hapi.Server();
		server.pack.require('../', {}, function(err) {
			expect(err).to.not.exist;
			done();
		});
  	});

    it('can be added as a plugin to hapi', function (done) {
        var server = new Hapi.Server();
        server.pack.allow({ ext: true }).require('../', { /* Set any plugin options here */ }, function (err) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('response to a GET of /api/homectrl/version', function (done) {
		server.inject({
			method: 'GET',
			url: '/api/homectrl/version'
		}, function(res) {
			expect(res.statusCode).to.equal(200);
			expect(res.payload).to.equal(module.exports.version);
			done();
		});
    });

	describe('Device API', function () {

	    it('creates a new device via POST', function (done) {
			server.inject({
				method: 'POST',
				url: '/api/homectrl/devices',
				payload: '{ "id": "DEVICE_1", "enabled": true }'
			}, function(res) {
				expect(res.statusCode).to.equal(201);
				expect(res.payload).to.equal('{"id":"DEVICE_1","enabled":true}');
				// expect(res.payload).to.equal(module.exports.version);
				done();
			});
	    });

	    it('does not create a duplicate device via POST', function (done) {
			server.inject({
				method: 'POST',
				url: '/api/homectrl/devices',
				payload: '{ "id": "DEVICE_1", "enabled": true }'
			}, function(res) {
				expect(res.statusCode).to.equal(409);
				done();
			});
	    });

	    it('retrieves a list of devices via GET', function (done) {
			server.inject({
				method: 'GET',
				url: '/api/homectrl/devices'
			}, function(res) {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.equal('[{"id":"DEVICE_1","enabled":true}]');
				done();
			});
	    });

	    it('updates an individual device via PATCH', function (done) {
			server.inject({
				method: 'PATCH',
				url: '/api/homectrl/devices/DEVICE_1',
				payload: '{ "id": "DEVICE_1", "enabled": false }'
			}, function(res) {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.equal('{"id":"DEVICE_1","enabled":false}');
				done();
			});
	    });

	    it('retrieves an individual device via GET', function (done) {
			server.inject({
				method: 'GET',
				url: '/api/homectrl/devices/DEVICE_1'
			}, function(res) {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.equal('{"id":"DEVICE_1","enabled":false}');
				done();
			});
	    });

	    it('does not retrieve an unknown device via GET', function (done) {
			server.inject({
				method: 'GET',
				url: '/api/homectrl/devices/DEVICE_2'
			}, function(res) {
				expect(res.statusCode).to.equal(404);
				done();
			});
	    });

	    it('deletes an individual device via DELETE', function (done) {
			server.inject({
				method: 'DELETE',
				url: '/api/homectrl/devices/DEVICE_1'
			}, function(res) {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.equal('{"id":"DEVICE_1","enabled":false}');
				done();
			});
	    });

	    it('does not delete an unknown device via DELETE', function (done) {
			server.inject({
				method: 'DELETE',
				url: '/api/homectrl/devices/DEVICE_1'
			}, function(res) {
				expect(res.statusCode).to.equal(404);
				done();
			});
	    });

	});
    
});