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
        'HealthComponentSpec.js',
    ], function (require) {
        mocha.run();
    });

});