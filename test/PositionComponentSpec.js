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
    describe('Component Unit Test - Position', function () {
        describe('Create Position Component (x, y) to be (100, 100)', function () {
            it('x and y sould be 100', function (done) {
                var position = new PositionComponent(100, 100);
                expect(position.x).to.equals(100);
                expect(position.y).to.equals(100);
                done();
            });
            it('x and y should not be 101', function (done) {
                var position = new PositionComponent(100, 100);
                expect(position.x).to.not.equals(101);
                expect(position.y).to.not.equals(101);
                done();
            });
        });
    });
});
//# sourceMappingURL=PositionComponentSpec.js.map