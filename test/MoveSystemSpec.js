/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/component/Position'], function (require, exports, chai, PositionComponent) {
    /**
     * Globals
     */
    var expect = chai.expect;
    /**
     * Unit tests
     */
    describe('Move System Unit Test:', function () {
        describe('2 + 5', function () {
            it('should be 6', function (done) {
                var position = new PositionComponent(10, 5);
                console.log(position);
                expect(2 + 5).to.equals(6);
                done();
            });
            it('should not be 7', function (done) {
                expect(2 + 4).to.not.equals(7);
                done();
            });
        });
    });
});
//# sourceMappingURL=MoveSystemSpec.js.map