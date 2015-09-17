'use strict';
describe('Move', function() {
    var world;

    beforeEach(function() {
        world = new World();
    });

    function testBasicMovement(aix, aiy, dix, diy) {
        var actor = new Actor();
        var action = new WorldMoveAction(dix, diy);
        var stepCost = 3;
        expect(stepCost > 0).toBeTruthy();
        var sc = new StepCost(stepCost);
        action.appendCost(sc);
        expect(action.getCostCount()).toBe(1);
        actor.appendIntent(action);
        expect(actor.getIntentCount()).toBe(1);

        var cell = world.getCell(aix, aiy); // 이동 전 셀
        var afterCell = world.getCell(aix + dix, aiy + diy); // 이동 후 셀

        var spawnAction = new WorldSpawn(actor, aix, aiy);
        expect(spawnAction.ix).toBe(aix);
        expect(spawnAction.iy).toBe(aiy);

        spyOn(actor, 'nextStep').and.callThrough();
        spyOn(action, 'nextStep').and.callThrough();
        spyOn(sc, 'nextStep').and.callThrough();
        spyOn(spawnAction, 'execute').and.callThrough();
        spyOn(cell, 'place').and.callThrough();

        expect(world.appendIntent(spawnAction)).toBeTruthy();
        expect(cell.isEmpty()).toBeTruthy();
        expect(world.getStep()).toEqual(0);
        expect(spawnAction.execute.calls.count()).toBe(0);
        expect(action.canBeAchieved()).not.toBeDefined(); // 액션이 달성될 수 있는가?

        /***/
        world.nextStep(); /***/

        expect(world.getStep()).toEqual(1);
        expect(spawnAction.execute.calls.count()).toBe(1);
        expect(cell.place.calls.count()).toBe(1);
        expect(cell.isOccupied()).toBeTruthy();
        expect(cell.getOwner()).toBe(actor);

        expect(actor.nextStep.calls.count()).toBe(1);
        expect(action.nextStep.calls.count()).toBe(1);
        expect(sc.nextStep.calls.count()).toBe(1);

        expect(action.isCostMet()).toBeFalsy(); // 액션 비용이 만족되었는가?
        expect(action.isDone()).toBeFalsy(); // 액션이 수행됐는가?
        expect(action.canBeAchieved()).not.toBeDefined(); // 액션이 달성될 수 있는가?

        /***/
        world.nextStep(); /***/

        expect(world.getStep()).toEqual(2);
        expect(spawnAction.execute.calls.count()).toBe(1); // 끝난 액션은 더 실행되면 안된다.
        expect(actor.nextStep.calls.count()).toBe(2);
        expect(action.nextStep.calls.count()).toBe(2);
        expect(sc.nextStep.calls.count()).toBe(2);
        expect(action.isCostMet()).toBeFalsy(); // 액션 비용이 만족되었는가?
        expect(action.isDone()).toBeFalsy(); // 액션이 수행됐는가?
        expect(action.canBeAchieved()).not.toBeDefined(); // 액션이 달성될 수 있는가?
        expect(actor.getIx()).toBe(aix);
        expect(actor.getIy()).toBe(aiy);

        spyOn(actor, 'move').and.callThrough();
        spyOn(cell, 'move').and.callThrough();

        /***/
        world.nextStep(); /***/

        expect(actor.move.calls.count()).toBe(1);
        expect(cell.move.calls.count()).toBe(1);

        expect(world.getStep()).toEqual(3);
        expect(spawnAction.execute.calls.count()).toBe(1); // 끝난 액션은 더 실행되면 안된다.
        expect(actor.nextStep.calls.count()).toBe(3);
        expect(action.nextStep.calls.count()).toBe(3);
        expect(sc.nextStep.calls.count()).toBe(3);
        expect(action.isCostMet()).toBeTruthy(); // 액션 비용이 만족됨
        expect(action.isDone()).toBeTruthy(); // 액션이 수행됨
        expect(action.canBeAchieved()).toBeTruthy(); // 액션이 달성될 수 있는가?
        expect(actor.getIx()).toBe(aix + dix);
        expect(actor.getIy()).toBe(aiy + diy);

        // 실제 액터가 이동했는지 확인
        expect(cell.isOccupied()).toBeFalsy();
        expect(cell.getOwner()).toBeNull();
        expect(afterCell.isOccupied()).toBeTruthy();
        expect(afterCell.getOwner()).toEqual(actor);
    }

    it('액터 하나 이동 (상)', function() {
        var aix = 5,
            aiy = 8;
        testBasicMovement(aix, aiy, 0, 1); // 위로 이동
    });
    it('액터 하나 이동 (하)', function() {
        var aix = 5,
            aiy = 8;
        testBasicMovement(aix, aiy, 0, -1); // 아래로 이동
    });
    it('액터 하나 이동 (좌)', function() {
        var aix = 5,
            aiy = 8;
        testBasicMovement(aix, aiy, -1, 0); // 좌로 이동
    });
    it('액터 하나 이동 (우)', function() {
        var aix = 5,
            aiy = 8;
        testBasicMovement(aix, aiy, 1, 0); // 우로 이동
    });

    it('원점에서 액터 하나 좌로 이동 불가능함을 확인 (경계 조건)', function() {
        var actor = new Actor();
        // (0,0)에서 왼쪽으로 이동하는 것은 불가능하다.
        var aix = 0,
            aiy = 0,
            dix = -1,
            diy = 0;
        var action = new WorldMoveAction(dix, diy);
        expect(actor.getIntentCount()).toEqual(0);
        actor.appendIntent(action);
        expect(actor.getIntentCount()).toEqual(1);
        var spawnAction = new WorldSpawn(actor, aix, aiy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        // 월드 스테핑을 최소 한번 하기 전에는 달성 가능 여부를 확인할 수 없다.
        expect(action.canBeAchieved()).not.toBeDefined();
        world.nextStep();
        // 경계 밖으로 이동하는 것은 불가능하다.
        expect(action.canBeAchieved()).toBeFalsy();
        expect(actor.getIntentCount()).toEqual(0);
    });

    function SpawnActorMoveDelta(world, aix, aiy, dix, diy) {
        var actor = new Actor();
        var moveAction = new WorldMoveAction(dix, diy);
        expect(actor.appendIntent(moveAction)).toBeTruthy();
        var spawnAction = new WorldSpawn(actor, aix, aiy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        return {
            actor: actor,
            spawnAction: spawnAction,
            moveAction: moveAction,
        };
    }

    /*
        [A][B][ ] -> [ ][A][B]
    */
    it('액터 둘이 인접한 상태로 함께 오른쪽 방향으로 이동하기', function() {
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 1, 0);
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
        var aix = 0,
            aiy = 0,
            dix = 3,
            diy = 7;
        var teleportAction = new WorldMoveAction(dix, diy);
        expect(a.appendIntent(teleportAction)).toBeTruthy();
        var spawnAction = new WorldSpawn(a, aix, aiy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        world.nextStep();
        expect(world.getCell(aix, aiy).isEmpty()).toBeTruthy();
        expect(world.getCell(aix + dix, aiy + diy).getOwner()).toEqual(a);
    });
});
