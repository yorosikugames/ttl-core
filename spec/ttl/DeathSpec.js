'use strict';
describe('Death', function() {
    var world;

    beforeEach(function() {
        world = new World();
    });

    it('생로병사의 비밀 - 독에 걸린 액터는 죽.는.다.', function() {
        var a = new Actor();
        var ix = 5,
            iy = 10;
        var cell = world.getCell(ix, iy);
        var sa = new WorldSpawn(a, ix, iy);
        expect(world.appendIntent(sa)).toBeTruthy();
        expect(a.isDead()).toBeFalsy();
        world.nextStep();
        expect(cell.isEmpty()).toBeFalsy();
        var damagePerStep = 100;
        var duration = 3;
        var mod = new PoisonMod(damagePerStep, duration);
        a.appendMod(mod);
        var curHp = a.getHp();
        world.nextStep();
        expect(a.getHp()).toBe(0);
        expect(a.isDead()).toBeTruthy();
        // 죽었으면 그 셀은 바로 비게 된다.
        expect(cell.isEmpty()).toBeTruthy();
        var action = new WorldMoveAction(1, 0);
        expect(function() {
            a.appendIntent(action);
        }).toThrow(new Error('Dead actor'));

        let a2 = new Actor();
        var sa2 = new WorldSpawn(a2, ix, iy);
        expect(world.appendIntent(sa2)).toBeTruthy();
        expect(a2.isDead()).toBeFalsy();
        world.nextStep();
        expect(cell.isEmpty()).toBeFalsy();
    });
});
