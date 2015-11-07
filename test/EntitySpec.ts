/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import core = require('../lib/ttl/core');
var Entity = core.Entity;
import HealthComponent = require('../lib/ttl/component/Health');
import PositionComponent = require('../lib/ttl/component/Position');
import MoveSystem = require('../lib/ttl/system/Move');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Entity Unit Test', () => {
    describe('Entity Creation', () => {
        it('Create Entity without Exception', (done) => {

            var entity = new Entity('test');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('test_entity');
            done();
        });
    });

    describe('Register Components to an Entity', () => {
        it('Register Health Component', (done) => {

            var entity = new Entity('npc');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('npc_entity');

            var healthComponent = new HealthComponent(100);
            expect(entity.addComponent(healthComponent)).to.equals(true);
            expect(entity.components.size).equals(1);

            done();
        });

        it('Register Position Component', (done) => {

            var entity = new Entity('npc');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('npc_entity');

            var positionComponent = new PositionComponent(new core.Position(100, 100), core.Direction.NORTH);
            expect(entity.addComponent(positionComponent)).to.equals(true);
            expect(entity.components.size).equals(1);

            done();
        });

        it('Register Health & Position Component', (done) => {

            var entity = new Entity('npc');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('npc_entity');

            var healthComponent = new HealthComponent(100);
            expect(entity.addComponent(healthComponent)).to.equals(true);
            expect(entity.components.size).equals(1);

            var positionComponent = new PositionComponent(new core.Position(100, 100), core.Direction.NORTH);
            expect(entity.addComponent(positionComponent)).to.equals(true);
            expect(entity.components.size).equals(2);

            done();
        });

    });
});

