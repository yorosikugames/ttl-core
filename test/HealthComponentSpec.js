/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/component/Health'], function (require, exports, chai, HealthComponent) {
    /**
     * Globals
     */
    var expect = chai.expect;
    /**
     * Unit tests
     */
    describe('Health Component Unit Test:', function () {
        describe('2 + 5', function () {
            it('should be 6', function (done) {
                var health = new HealthComponent(100);
                console.log(health);
                expect(2 + 5).to.equals(7);
                done();
            });
            it('should not be 7', function (done) {
                expect(2 + 4).to.not.equals(7);
                done();
            });
        });
    });
});
//# sourceMappingURL=HealthComponentSpec.js.map