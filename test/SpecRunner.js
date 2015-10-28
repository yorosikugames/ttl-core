require.config({
    baseUrl: './',
    paths: {
        'mocha'         : '../lib/mocha/mocha',
        'chai'          : '../lib/chai/chai',
    },
    shim: {
        'mocha': {
            init: function () {
                this.mocha.setup('bdd');
                return this.mocha;
            }
        },
    },
});

define(function (require) {
    var chai = require('chai');
    var mocha = require('mocha');
    
    // Chai
    var should = chai.should();
    
    require([
        'MoveSystemSpec.js',
        'GlobalIdSpec.js',
        'EntitySpec.js',
        'HealthComponentSpec.js',
        'PositionComponentSpec.js',
    ], function (require) {
        mocha.run();
    });

});