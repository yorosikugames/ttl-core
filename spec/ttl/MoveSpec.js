describe('Move', function() {
    var world;

    beforeEach(function() {
        world = new World();
    });

    function testBasicMovement(aix, aiy, dix, diy) {
        var a = new Actor();
        //var dix = 1, diy = 0;
        var action = new WorldMoveAction(dix, diy);
        var stepCost = 100;
        expect(stepCost > 0).toBeTruthy();
        action.appendCost(new StepCost(stepCost));
        a.appendIntent(action);

        //var aix = 0, aiy = 0;
        expect(world.spawn(a1, aix, aiy)).toBeTruthy();
        expect(world.getCell(aix, aiy).isOccupied()).toBeTruthy();
        expect(world.getCell(aix, aiy).getOwner()).toEqual(a);
        // 시간 비용이 만족되기 직전까지 월드 스테핑
        for (var i = 0; i < stepCost - 1; ++i) {
            expect(world.getStep()).toEqual(i);
            world.nextStep();
            expect(world.getCell(aix, aiy).isOccupied()).toBeTruthy();
            expect(world.getCell(aix, aiy).getOwner()).toEqual(a);
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
        expect(world.getCell(aix, aiy).isOccupied()).toBeFalsy();
        expect(world.getCell(aix, aiy).getOwner()).toBeNull();
        expect(world.getCell(aix + dix, aiy + diy).isOccupied()).toBeTruthy();
        expect(world.getCell(aix + dix, aiy + diy).getOwner()).toEqual(a);
    }

    it('액터 하나 상하좌우 이동', function() {
        var aix = 5,
            aiy = 8;
        testBasicMovement(aix, aiy, 1, 0); // 우로 이동
        testBasicMovement(aix, aiy, -1, 0); // 좌로 이동
        testBasicMovement(aix, aiy, 0, 1); // 위로 이동
        testBasicMovement(aix, aiy, 0, -1); // 아래로 이동
    });

    it('액터 하나 우로 이동 (이동 불가 확인)', function() {
        var a = new Actor();
        var dix = 1,
            diy = 0;
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

    function SpawnActorMoveDelta(aix, aiy, dix, diy) {
        var a = new Actor();
        var moveAction = new WorldMoveAction(dix, diy);
        expect(a.appendIntent(moveAction)).toBeTruthy();
        var spawnAction = new WorldSpawn(a, aix, aiy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        return {
            actor: a,
            spawn: spawnAction,
            move: moveAction,
        };
    }

    /*
        [A][B][ ] -> [ ][A][B]
    */
    it('액터 둘이 인접한 상태로 함께 오른쪽 방향으로 이동하기', function() {
        var set1 = SpawnActorMoveDelta(0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(1, 0, 1, 0);
        world.nextStep();
        expect(world.getCell(0, 0).isEmpty()).toBeTruthy();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set2.actor);
    });

    it('같은 셀에 두 액터가 동시에 들어가려고 할 때 먼저 들어가길 요청한 액터 하나만 들어감', function() {
        var set1 = SpawnActorMoveDelta(0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(2, 0, -1, 0);
        world.nextStep();
        expect(world.getCell(0, 0).isEmpty()).toBeTruthy();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set2.actor);
    });

    it('텔-레-포-트', function() {
        var a = new Actor();
        var aix = 0, aiy = 0;
        var bix = 10, biy = 20;
        var teleportAction = new WorldTeleportAction(bix, biy);
        expect(a.appendIntent(teleportAction)).toBeTruthy();
        var spawnAction = new WorldSpawn(a, aix, aiy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        world.nextStep();
        expect(world.getCell(aix, aiy).isEmpty()).toBeTruthy();
        expect(world.getCell(bix, biy).getOwner()).toEqual(a);
    });
});
