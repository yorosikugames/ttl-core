/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/**
 * Module dependencies.
 */
var chai = require('chai');
var StepCost = require('../lib/ttl/cost/Step');
/**
 * Globals
 */
var expect = chai.expect;
/**
 * Unit tests
 */
describe('Cost Unit Test - StepCost', function () {
    describe('Create StepCost with step cost 10', function () {
        it('StepCost sould be 10', function (done) {
            var step = new StepCost(10);
            expect(step.getStepCost()).to.equals(10);
            done();
        });
        it('StepCost should not be 11', function (done) {
            var step = new StepCost(10);
            expect(step.getStepCost()).to.not.equals(11);
            done();
        });
        it('Processed StepCost should be 0', function (done) {
            var step = new StepCost(10);
            expect(step.getProcessedStepCost()).to.equals(0);
            done();
        });
        it('Processed StepCost should be 1 for 1 step', function (done) {
            var step = new StepCost(10);
            step.onStep(1);
            expect(step.getProcessedStepCost()).to.equals(1);
            done();
        });
        it('Processed StepCost should be 5 for 5 steps', function (done) {
            var step = new StepCost(10);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            expect(step.getProcessedStepCost()).to.equals(5);
            done();
        });
        it('StepCost should not met for 9 steps', function (done) {
            var step = new StepCost(10);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            expect(step.isCostMet()).to.equals(false);
            done();
        });
        it('StepCost should meet for 10 steps', function (done) {
            var step = new StepCost(10);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            expect(step.isCostMet()).to.equals(true);
            done();
        });
        it('StepCost should met for 11 steps', function (done) {
            var step = new StepCost(10);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            step.onStep(1);
            expect(step.isCostMet()).to.equals(true);
            done();
        });
    });
});
//# sourceMappingURL=StepCostSpec.js.map