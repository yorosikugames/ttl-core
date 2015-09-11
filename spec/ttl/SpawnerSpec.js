describe('Spawner', function () {
    var world;

    beforeEach(function () {
        world = new World();
    });

    it('액터를 생.산.하.는. 스포너를 생성한다.', function () {
        var a = new Actor();
        var spawner = new Spawner();
        //var stepCost = 1;
        //expect(stepCost > 0).toBeTruthy();
        //spawner.appendSpawnCost(new StepCost(stepCost));
        spawner.setPrefab(a);
        // 스포너 스폰
        var ix = 5, iy = 10;
        var sa = new WorldSpawn(spawner, ix, iy);
        expect(world.appendIntent(sa)).toBeTruthy();
        world.nextStep();
        expect(spawner.canSpawn()).toBeTruthy();
        // 이 시점에서 스포너가 자리를 잡았다!
        // 자리를 잡음과 동시에 WorldSpawn 액션을 월드에 등록한다.
        // 이번 스텝에서 등록됐으므로 이번 스텝에 스폰이 완료되진 않고,
        // 다음 스텝에서 추가된다.
        expect(world.getOccupiedCellCount()).toEqual(1);
        world.nextStep();
        expect(world.getCell(ix + 1, iy + 0).isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(2);
        world.nextStep();
        expect(world.getCell(ix + 0, iy + 1).isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(3);
        world.nextStep();
        expect(world.getCell(ix - 1, iy + 0).isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(4);
        world.nextStep();
        expect(world.getCell(ix + 0, iy - 1).isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(5);
        world.nextStep();
        // 네 방향이 모두 스폰되어 있으므로 더 스폰할 수가 없네...
        expect(spawner.canSpawn()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(5);

        // 스포너 오른쪽에 스폰된 액터를 오른쪽으로 한칸 이동시킨다.
        var rightActor = world.getCell(ix + 1, iy + 0).getOwner();
        var action = new WorldMoveAction(1, 0);
        rightActor.appendIntent(action);

        world.nextStep();
        expect(world.getCell(ix + 1, iy + 0).isEmpty()).toBeFalsy();
        expect(world.getCell(ix + 2, iy + 0).isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(6);
    });
});
