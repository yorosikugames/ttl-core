describe('Spawn', function () {
    var world;

    beforeEach(function () {
        world = new World();
    });

    it('텅텅 빈 월드에 액터가 있으라... 액터 스폰 초기 프롭 확인', function () {
        var a = new Actor();
        var ix = 0, iy = 0;
        var spawnAction = new WorldSpawn(a, ix, iy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        expect(spawnAction.isDone()).toBeFalsy();
        expect(a.getWorld()).not.toBeDefined();
        // 월드에 변화가 일어나는 것은 액션 등록 이후 첫 스테핑이 일어난 후이다.
        // 즉, 지금은 아무 변화 없다.
        expect(world.getCell(ix, iy).isEmpty()).toBeTruthy();
        expect(world.getOccupiedCellCount()).toEqual(0);
        expect(world.getStep()).toEqual(0);
        expect(a.getHp()).toEqual(100);
        // 스테핑!!!
        world.nextStep();
        expect(world.getStep()).toEqual(1);
        expect(world.getOccupiedCellCount()).toEqual(1);
        expect(world.getCell(ix, iy).isEmpty()).toBeFalsy();
        expect(world.getCell(ix, iy).getOwner()).toEqual(a);
        expect(a.getWorld()).toEqual(world);
        expect(spawnAction.isDone()).toBeTruthy();
    });

    it('한 셀에 두 액터가 스폰될 수는 없다. 두 번째로 스폰된 액터는 스폰 실패.', function () {
        var a1 = new Actor();
        var a2 = new Actor();
        var ix = 0, iy = 0;
        var spawnAction1 = new WorldSpawn(a1, ix, iy);
        var spawnAction2 = new WorldSpawn(a2, ix, iy);
        // 액션 등록 시점에서는 검증하지 않는다.
        expect(world.appendIntent(spawnAction1)).toBeTruthy();
        expect(world.appendIntent(spawnAction2)).toBeTruthy();
        // 월드에 변화가 일어나는 것은 액션 등록 이후 첫 스테핑이 일어난 후이다.
        expect(world.getCell(ix, iy).isEmpty()).toBeTruthy();
        expect(spawnAction1.isDone()).toBeFalsy();
        expect(spawnAction2.isDone()).toBeFalsy();
        var beforeStep = world.getStetp();
        var beforeOccupiedCellCount = world.getOccupiedCellCount();
        // 스테핑!!!
        world.nextStep();
        expect(spawnAction1.isDone()).toBeTruthy();
        expect(spawnAction2.isDone()).toBeFalsy();
        // 등록 현황 체크
        expect(world.getStep()).toEqual(beforeStep + 1);
        expect(world.getOccupiedCellCount()).toEqual(beforeOccupiedCellCount + 1);
        expect(world.getCell(ix, iy).isEmpty()).toBeFalsy();
        expect(world.getCell(ix, iy).getOwner()).toEqual(a1);
        expect(a1.getWorld()).toEqual(world);
        expect(a2.getWorld()).toBeNull();
    });
});
