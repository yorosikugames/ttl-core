/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/core', '../lib/ttl/component/Health', '../lib/ttl/component/Position'], function (require, exports, chai, core, HealthComponent, PositionComponent) {
    var Entity = core.Entity;
    /**
     * Globals
     */
    var expect = chai.expect;
    /**
     * Unit tests
     */
    describe('Entity Unit Test', function () {
        describe('Entity Creation', function () {
            it('Create Entity without Exception', function (done) {
                var entity = new Entity('test');
                expect(entity).to.not.equals(null);
                expect(entity.name).to.equals('test_entity');
                done();
            });
        });
        describe('Register Components to an Entity', function () {
            it('Register Health Component', function (done) {
                var entity = new Entity('npc');
                expect(entity).to.not.equals(null);
                expect(entity.name).to.equals('npc_entity');
                var healthComponent = new HealthComponent(100);
                expect(entity.addComponent(healthComponent)).to.equals(true);
                expect(entity.components.size).equals(1);
                done();
            });
            it('Register Position Component', function (done) {
                var entity = new Entity('npc');
                expect(entity).to.not.equals(null);
                expect(entity.name).to.equals('npc_entity');
                var positionComponent = new PositionComponent(100, 100);
                expect(entity.addComponent(positionComponent)).to.equals(true);
                expect(entity.components.size).equals(1);
                done();
            });
            it('Register Health & Position Component', function (done) {
                var entity = new Entity('npc');
                expect(entity).to.not.equals(null);
                expect(entity.name).to.equals('npc_entity');
                var healthComponent = new HealthComponent(100);
                expect(entity.addComponent(healthComponent)).to.equals(true);
                expect(entity.components.size).equals(1);
                var positionComponent = new PositionComponent(100, 100);
                expect(entity.addComponent(positionComponent)).to.equals(true);
                expect(entity.components.size).equals(2);
                done();
            });
        });
    });
});
//# sourceMappingURL=EntitySpec.js.map