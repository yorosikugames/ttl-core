/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/component/Position', '../lib/ttl/core'], function (require, exports, chai, PositionComponent, core) {
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
                var position = new PositionComponent(new core.Position(100, 100), core.Direction.NORTH);
                expect(position.pos.x).to.equals(100);
                expect(position.pos.y).to.equals(100);
                done();
            });
            it('x and y should not be 101', function (done) {
                var position = new PositionComponent(new core.Position(100, 100), core.Direction.NORTH);
                expect(position.pos.x).to.not.equals(101);
                expect(position.pos.y).to.not.equals(101);
                done();
            });
        });
    });
});
//# sourceMappingURL=PositionComponentSpec.js.map