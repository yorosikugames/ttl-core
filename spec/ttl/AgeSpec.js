describe('Age', function () {
    var world;
	var Actor = ttl.Actor;
	var WorldSpawn = ttl.WorldSpawn;
	var Cell = ttl.Cell;
	var World = ttl.World;

    beforeEach(function () {
        world = new World();
    });

    it('액터 나이 조회', function () {
        var a = new Actor();
        var ix = 0, iy = 0;
        expect(a.getAge()).toEqual(0);
        var spawnAction = new WorldSpawn(a, ix, iy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        world.nextStep();
        expect(a.getAge()).toEqual(1);
        world.nextStep();
        var a2 = new Actor();
        var ix2 = 1, iy2 = 0;
        var spawnAction2 = new WorldSpawn(a2, ix2, iy2);
        expect(world.appendIntent(spawnAction2)).toBeTruthy();
        expect(a2.getAge()).toEqual(0);
        expect(a.getAge()).toEqual(2);
        world.nextStep();
        expect(a.getAge()).toEqual(3);
        expect(a2.getAge()).toEqual(1);
    });
});
