/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import interfaces = require('../lib/ttl/interfaces');
var Entity = interfaces.Entity;
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
            expect(entity.name).to.equals('entity_test');
            done();
        });
    });

    describe('Register Components to an Entity', () => {
        it('Register Health Component', (done) => {

            var entity = new Entity('npc');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('entity_npc');

            var healthComponent = new HealthComponent(100);
            expect(entity.addComponent(healthComponent)).to.equals(true);
            expect(entity.components.size).equals(1);

            done();
        });

        it('Register Position Component', (done) => {

            var entity = new Entity('npc');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('entity_npc');

            var positionComponent = new PositionComponent(100, 100);
            expect(entity.addComponent(positionComponent)).to.equals(true);
            expect(entity.components.size).equals(1);

            done();
        });

        it('Register Health & Position Component', (done) => {

            var entity = new Entity('npc');
            expect(entity).to.not.equals(null);
            expect(entity.name).to.equals('entity_npc');

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

