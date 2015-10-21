'use strict';
describe('MoveTree', function() {
    var world;
	var Actor = ttl.Actor;
	var WorldSpawn = ttl.WorldSpawn;
	var Cell = ttl.Cell;
	var PoisonMod = ttl.PoisonMod;
	var DeltaLogger = ttl.DeltaLogger;
	var EmptyAction = ttl.EmptyAction;
	var WorldMoveAction = ttl.WorldMoveAction;
	var World = ttl.World;
	
    beforeEach(function() {
        world = new World();
    });

    function SpawnActorMoveDelta(world, aix, aiy, dix, diy) {
        var actor = new Actor();
        var moveAction;
        if (dix != 0 || diy != 0) {
            moveAction = new WorldMoveAction(dix, diy);
            expect(actor.appendIntent(moveAction)).toBeTruthy();
        }
        var spawnAction = new WorldSpawn(actor, aix, aiy);
        expect(world.appendIntent(spawnAction)).toBeTruthy();
        return {
            actor: actor,
            spawnAction: spawnAction,
            moveAction: moveAction,
        };
    }

    it('종속성 있는 셀 이동 액션 - 종속성 없는 액터 하나', function() {
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        world.nextStep();
        expect(world.getCell(0, 0).isEmpty()).toBeTruthy();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 없는 액터 둘', function() {
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 2, 0, 1, 0);
        world.nextStep();
        expect(world.getCell(0, 0).isEmpty()).toBeTruthy();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(2, 0).isEmpty()).toBeTruthy();
        expect(world.getCell(3, 0).getOwner()).toEqual(set2.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 "있는" 액터 둘 (움직임 없음)', function() {
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 0, 0);
        world.nextStep();
        expect(world.getCell(0, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 0).getOwner()).toEqual(set2.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 "있는" 액터 둘 (같은 방향으로 이동)', function() {
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 1, 0);
        world.nextStep();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set2.actor);
    });

    it('종속성 있는 셀 이동 액션 - 순환종속 있는 액터 둘 (스위칭 불허)', function() {
        /*
            [1→][2←]  ==>  [1 ][2 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, -1, 0);
        world.nextStep();
        expect(world.getCell(0, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 0).getOwner()).toEqual(set2.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 "있는" 액터 둘 (먼저 이동한 것이 선점)', function() {
        /*
            [1→][  ][2←]  ==>  [  ][1 ][2 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 2, 0, -1, 0);
        world.nextStep();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set2.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 "있는" 액터 셋', function() {
        /*
            [  ][2↓][  ]   ==>  [  ][2 ][  ]
            [1→][3→][  ]        [  ][1 ][3 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 1, 0, -1);
        var set3 = SpawnActorMoveDelta(world, 1, 0, 1, 0);
        world.nextStep();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 1).getOwner()).toEqual(set2.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set3.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 "있는" 액터 셋 (스위칭 불허)', function() {
        /*
            [  ][3↓]   ==>  [  ][3 ]
            [1→][2↑]        [1 ][2 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 0, 1);
        var set3 = SpawnActorMoveDelta(world, 1, 1, 0, -1);
        world.nextStep();
        expect(world.getCell(0, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 0).getOwner()).toEqual(set2.actor);
        expect(world.getCell(1, 1).getOwner()).toEqual(set3.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종속성 "있는" 액터 넷 (아무도 못움직임)', function() {
        /*
            [  ][2↓][  ]   ==>  [  ][2 ][  ]
            [1→][3→][4 ]        [1 ][3 ][4 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 1, 0, -1);
        var set3 = SpawnActorMoveDelta(world, 1, 0, 1, 0);
        var set4 = SpawnActorMoveDelta(world, 2, 0, 0, 0);
        world.nextStep();
        expect(world.getCell(0, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 1).getOwner()).toEqual(set2.actor);
        expect(world.getCell(1, 0).getOwner()).toEqual(set3.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set4.actor);
    });

    it('종속성 있는 셀 이동 액션 - 순환종속 있는 액터 넷 (사이클링 허용)', function() {
        /*
            [3↓][4←]       [4 ][2 ]
            [1→][2↑]  ==>  [3 ][1 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 0, 1);
        var set3 = SpawnActorMoveDelta(world, 0, 1, 0, -1);
        var set4 = SpawnActorMoveDelta(world, 1, 1, -1, 0);
        spyOn(world, 'commitSimpleMoveTreeWithRoot').and.callThrough();
        spyOn(world, 'commitCycleMoveTree').and.callThrough();
        spyOn(world.beforeCellMap, 'delete').and.callThrough();
        expect(world.beforeCellMap.size).toBe(0);
        world.nextStep();
        expect(world.commitSimpleMoveTreeWithRoot.calls.count()).toBe(0);
        expect(world.commitCycleMoveTree.calls.count()).toBe(1);
        expect(world.beforeCellMap.delete.calls.count()).toBe(4);
        expect(world.beforeCellMap.size).toBe(0);
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 1).getOwner()).toEqual(set2.actor);
        expect(world.getCell(0, 0).getOwner()).toEqual(set3.actor);
        expect(world.getCell(0, 1).getOwner()).toEqual(set4.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종합선물세트 1탄', function() {
        /*
            [8→][9→][  ]       [5 ][8 ][9 ]
            [5↑][6←][7↓]       [6 ][  ][  ]
            [  ][4↓][  ]   ==> [  ][4 ][7 ]
            [1→][2→][3 ]       [1 ][2 ][3 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 1, 0);
        var set3 = SpawnActorMoveDelta(world, 2, 0, 0, 0);
        var set4 = SpawnActorMoveDelta(world, 1, 1, 0, -1);
        var set5 = SpawnActorMoveDelta(world, 0, 2, 0, 1);
        var set6 = SpawnActorMoveDelta(world, 1, 2, -1, 0);
        var set7 = SpawnActorMoveDelta(world, 2, 2, 0, -1);
        var set8 = SpawnActorMoveDelta(world, 0, 3, 1, 0);
        var set9 = SpawnActorMoveDelta(world, 1, 3, 1, 0);
        world.nextStep();
        expect(world.getCell(0, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(1, 0).getOwner()).toEqual(set2.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set3.actor);
        expect(world.getCell(1, 1).getOwner()).toEqual(set4.actor);
        expect(world.getCell(0, 3).getOwner()).toEqual(set5.actor);
        expect(world.getCell(0, 2).getOwner()).toEqual(set6.actor);
        expect(world.getCell(2, 1).getOwner()).toEqual(set7.actor);
        expect(world.getCell(1, 3).getOwner()).toEqual(set8.actor);
        expect(world.getCell(2, 3).getOwner()).toEqual(set9.actor);
    });

    it('종속성 있는 셀 이동 액션 - 종합선물세트 2탄', function() {
        /*
            [8→][9→][  ]       [5 ][8 ][9 ]
            [5↑][6←][7↓]       [6 ][  ][7 ]
            [  ][4↓][  ]   ==> [  ][4 ][3 ]
            [1→][2→][3↑]       [  ][1 ][2 ]
        */
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        var set2 = SpawnActorMoveDelta(world, 1, 0, 1, 0);
        var set3 = SpawnActorMoveDelta(world, 2, 0, 0, 1);
        var set4 = SpawnActorMoveDelta(world, 1, 1, 0, -1);
        var set5 = SpawnActorMoveDelta(world, 0, 2, 0, 1);
        var set6 = SpawnActorMoveDelta(world, 1, 2, -1, 0);
        var set7 = SpawnActorMoveDelta(world, 2, 2, 0, -1);
        var set8 = SpawnActorMoveDelta(world, 0, 3, 1, 0);
        var set9 = SpawnActorMoveDelta(world, 1, 3, 1, 0);
        world.nextStep();
        expect(world.getCell(1, 0).getOwner()).toEqual(set1.actor);
        expect(world.getCell(2, 0).getOwner()).toEqual(set2.actor);
        expect(world.getCell(2, 1).getOwner()).toEqual(set3.actor);
        expect(world.getCell(1, 1).getOwner()).toEqual(set4.actor);
        expect(world.getCell(0, 3).getOwner()).toEqual(set5.actor);
        expect(world.getCell(0, 2).getOwner()).toEqual(set6.actor);
        expect(world.getCell(2, 2).getOwner()).toEqual(set7.actor);
        expect(world.getCell(1, 3).getOwner()).toEqual(set8.actor);
        expect(world.getCell(2, 3).getOwner()).toEqual(set9.actor);
    });
});
