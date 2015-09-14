describe('Mod', function () {
    var world;

    beforeEach(function() {
        world = new World();
    });

    it('독 이상상태', function () {
        var a = new Actor();
        var ix = 5, iy = 10;
        var sa = new WorldSpawn(a, ix, iy);
        expect(world.appendIntent(sa)).toBeTruthy();
        world.nextStep();
        var damagePerStep = 1;
        var duration = 3;
        var mod = new PoisonMod(damagePerStep, duration);
        expect(a.getModCount()).toBe(0);
        a.appendMod(mod);
        expect(a.getModCount()).toBe(1);
        var curHp = a.getHp();
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 1 * damagePerStep);
        expect(a.getModCount()).toBe(1);
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 2 * damagePerStep);
        expect(a.getModCount()).toBe(1);
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 3 * damagePerStep);
        expect(a.getModCount()).toBe(0);
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 3 * damagePerStep);
        expect(a.getModCount()).toBe(0);
    });
});
