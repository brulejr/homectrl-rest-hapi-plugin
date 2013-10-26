/*
 * home-ctrl-hapi-plugin: lib/hapi-plugin.js
 * Hapi Plugin definition
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

 'use strict';

// module dependencies
var Hoek = require('hoek');

// declare internals
var internals = {
    defaults: {
        version: '/api/homectrl/version'
    }	
};

internals.version = Hoek.loadPackage().version;


module.exports.register = function(plugin, options, next) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);

    if (settings.version) {
        plugin.route({
            method: 'GET',
            path: settings.version,
            handler: function () {
                this.reply(internals.version);
            }
        });
    }

    next();
};