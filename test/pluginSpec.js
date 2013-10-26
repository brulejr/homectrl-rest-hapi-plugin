/*
 * home-ctrl-hapi-plugin: test/pluginSpec.js
 * Hapi Plugin definition
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

    it('can be added as a plugin to hapi', function (done) {
        var server = new Hapi.Server();
        server.pack.allow({ ext: true }).require('../', { /* Set any plugin options here */ }, function (err) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('response to a GET to /api/homectrl/version', function (done) {
		var server = new Hapi.Server();
		server.pack.require('../', {}, function(err) {

			expect(err).to.not.exist;

			server.inject({
				method : 'GET',
				url : '/api/homectrl/version'
			}, function(res) {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.equal(module.exports.version);
				done();
			});
		});    	
    });
    
});