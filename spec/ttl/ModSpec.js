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
        a.appendMod(mod);
        var curHp = a.getHp();
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 1);
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 2);
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 3);
        world.nextStep();
        expect(a.getHp()).toEqual(curHp - 3);
    });
});
