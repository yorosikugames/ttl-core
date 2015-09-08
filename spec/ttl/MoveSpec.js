describe('Move', function () {
    var world;

    beforeEach(function () {
        world = new World();
    });

    it('액터 하나 좌로 이동', function () {
        var a = new Actor();
        var dix = 1, diy = 0;
        var action = new WorldMoveAction(dix, diy);
        var stepCost = 100;
        expect(stepCost > 0).toBeTruthy();
        action.appendCost(new StepCost(stepCost));
        a.appendIntent(action);

        expect(world.spawn(a1, 0, 0)).toBeTruthy();
        expect(world.getCell(0, 0).isOccupied()).toBeTruthy();
        expect(world.getCell(0, 0).getOwner()).toEqual(a);
        // 시간 비용이 만족되기 직전까지 월드 스테핑
        for (var i = 0; i < stepCost - 1; ++i) {
            expect(world.getStep()).toEqual(i);
            world.nextStep();
            expect(world.getCell(0, 0).isOccupied()).toBeTruthy();
            expect(world.getCell(0, 0).getOwner()).toEqual(a);
            // 액션을 위할 비용이 만족되었는가?
            expect(action.isCostMet()).toBeFalsy();
            // 액션이 수행됐는가?
            expect(action.isDone()).toBeFalsy();
            // 액션이 달성될 수 있는가?
            expect(action.canBeAchieved()).toBeTruthy();
        }
        expect(world.getStep()).toEqual(stepCost - 1);
        world.nextStep();
        expect(world.getStep()).toEqual(stepCost);
        expect(action.isCostMet()).toBeTruthy();
        expect(action.isDone()).toBeTruthy();
        expect(action.canBeAchieved()).toBeTruthy();

        // 실제 액터가 이동했는지 확인
        expect(world.getCell(0, 0).isOccupied()).toBeFalsy();
        expect(world.getCell(0, 0).getOwner()).toBeNull();
        expect(world.getCell(0+dix, 0+diy).isOccupied()).toBeTruthy();
        expect(world.getCell(0+dix, 0+diy).getOwner()).toEqual(a);
    });

    it('액터 하나 우로 이동 (이동 불가 확인)', function () {
        var a = new Actor();
        var dix = 1, diy = 0;
        var action = new WorldMoveAction(dix, diy);
        expect(a.getIntentCount()).toEqual(0);
        a.appendIntent(action);
        expect(a.getIntentCount()).toEqual(1);
        expect(world.spawn(a1, 0, 0)).toBeTruthy();
        // 월드 스테핑을 최소 한번 하기 전에는 달성 가능 여부를 확인할 수 없다.
        expect(action.canBeAchieved()).not.toBeDefined();
        world.nextStep();
        // 경계 밖으로 이동하는 것은 불가능하다.
        expect(action.canBeAchieved()).toBeFalsy();
        expect(a.getIntentCount()).toEqual(0);
    });

});
