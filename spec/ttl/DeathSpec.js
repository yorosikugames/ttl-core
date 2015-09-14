describe('Death', function () {
    var world;

    beforeEach(function() {
        world = new World();
    });

    it('생로병사의 비밀', function () {
        var a = new Actor();
        var ix = 5, iy = 10;
        var sa = new WorldSpawn(a, ix, iy);
        expect(world.appendIntent(sa)).toBeTruthy();
        expect(a.isDead()).toBeFalsy();
        world.nextStep();
        var damagePerStep = 100;
        var duration = 3;
        var mod = new PoisonMod(damagePerStep, duration);
        a.appendMod(mod);
        var curHp = a.getHp();
        world.nextStep();
        expect(a.getHp()).toBe(0);
        expect(a.isDead()).toBeTruthy();
        var action = new WorldMoveAction(1, 0);
        expect(function() {
            a.appendIntent(action);
        }).toThrow(new Error('Dead actor'));
    });
});
