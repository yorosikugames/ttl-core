describe('DeltaLogger', function() {
    'use strict';

    it('델타로거 미지정 시 enqueue는 아무 일도 하지 않는다.', function() {
        let world = new World();
        expect(world.enqueue('do nothing')).not.toBeDefined();
    })

    it('월드 초기화 직후 델타로거 붙이면 step 0만 나온다.', function() {
        let world = new World();
        let dl = new DeltaLogger();
        world.setDeltaLogger(dl);
        expect(dl.pop().toString()).toBe('step 0');
        expect(dl.pop()).toBeNull();
    });

    it('world.nextStep() 하면 step 델타가 생긴다.', function() {
        let world = new World();
        let dl = new DeltaLogger();
        world.setDeltaLogger(dl);
        expect(dl.pop().toString()).toBe('step 0');
        expect(dl.pop()).toBeNull();
        world.nextStep();
        expect(dl.pop().toString()).toBe('step 1');
        expect(dl.pop()).toBeNull();
        world.nextStep();
        expect(dl.pop().toString()).toBe('step 2');
        expect(dl.pop()).toBeNull();
    });

    it('스테핑 전까지는 아무런 델타도 없고, 스테핑 후 델타가 생긴다.', function() {
        let world = new World();
        let dl = new DeltaLogger();
        world.setDeltaLogger(dl);
        expect(dl.pop().toString()).toBe('step 0');
        expect(dl.pop()).toBeNull();

        // 액터 스폰
        var a1 = new Actor(),
            ix1 = 5,
            iy1 = 10,
            sa1 = new WorldSpawn(a1, ix1, iy1);

        expect(a1.getExp()).toBe(0);
        expect(world.appendIntent(sa1)).toBeTruthy();

        expect(dl.pop()).toBeNull();

        // 스테핑
        world.nextStep();

        expect(a1.getSpawnId()).toBe(1);
        expect(dl.pop().toString()).toBe('spawn 1 5 10');
        expect(dl.pop().toString()).toBe('step 1');
        expect(dl.pop()).toBeNull();

        var a2 = new Actor(),
            ix2 = 2,
            iy2 = 20,
            sa2 = new WorldSpawn(a2, ix2, iy2);
        expect(world.appendIntent(sa2)).toBeTruthy();

        world.nextStep();

        expect(a2.getSpawnId()).toBe(2);
        expect(dl.pop().toString()).toBe('spawn 2 2 20');
        expect(dl.pop().toString()).toBe('step 2');
        expect(dl.pop()).toBeNull();
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

    it('이동 delta', function() {
        let world = new World();
        let dl = new DeltaLogger();
        world.setDeltaLogger(dl);
        var set1 = SpawnActorMoveDelta(world, 0, 0, 1, 0);
        world.nextStep();
        expect(dl.pop().toString()).toBe('step 0');
        expect(dl.pop().toString()).toBe('spawn 1 0 0');
        expect(dl.pop().toString()).toBe('moveto 1 1 0');
        expect(dl.pop().toString()).toBe('step 1');
        expect(dl.pop()).toBeNull();
        world.nextStep();
        expect(dl.pop().toString()).toBe('step 2');
        expect(dl.pop()).toBeNull();
        set1.actor.appendIntent(new WorldMoveAction(1, 0));
        world.nextStep();
        expect(dl.pop().toString()).toBe('moveto 1 2 0');
        expect(dl.pop().toString()).toBe('step 3');
        expect(dl.pop()).toBeNull();
        set1.actor.appendIntent(new WorldMoveAction(0, 1));
        world.nextStep();
        expect(dl.pop().toString()).toBe('moveto 1 2 1');
        expect(dl.pop().toString()).toBe('step 4');
        expect(dl.pop()).toBeNull();
        var set2 = SpawnActorMoveDelta(world, 0, 0, 0, 1);
        var set3 = SpawnActorMoveDelta(world, 0, 10, 0, 0);
        var set4 = SpawnActorMoveDelta(world, 0, 20, 0, 0);
        world.nextStep();
        /*
            [4][ ][ ]
                ..
            [3][ ][ ]
                ..
            [2][ ][1]
            [ ][ ][ ]
        */
        expect(dl.pop().toString()).toBe('spawn 2 0 0');
        expect(dl.pop().toString()).toBe('spawn 3 0 10');
        expect(dl.pop().toString()).toBe('spawn 4 0 20');
        expect(dl.pop().toString()).toBe('moveto 2 0 1');
        expect(dl.pop().toString()).toBe('step 5');
        expect(dl.pop()).toBeNull();
        set1.actor.appendIntent(new WorldMoveAction(0, 1));
        set2.actor.appendIntent(new WorldMoveAction(1, 0));
        set3.actor.appendIntent(new WorldMoveAction(1, 0));
        set4.actor.appendIntent(new WorldMoveAction(1, 0));
        world.nextStep();
        /*
            [ ][4][ ]
                ..
            [ ][3][ ]
                ..
            [ ][ ][1]
            [ ][2][ ]
            [ ][ ][ ]
        */
        expect(dl.pop().toString()).toBe('moveto 2 1 1'); // 2번 액터가 먼저 움직이고
        expect(dl.pop().toString()).toBe('moveto 1 2 2'); // 1번 액터가 다음에 움직인것
        // 이것은 world.commitMove에서 목표셀 순서대로 액터를 이동시키기 때문이다.
        // (셀 순서는 하단에서 상단으로, 좌에서 우로 정해진다. 즉 왼쪽 하단이 원점 셀)
        // moveto 끼리는 순서가 바뀌어도 결과에 영향을 주지 않는다. (맞나?)
        expect(dl.pop().toString()).toBe('moveto 3 1 10');
        expect(dl.pop().toString()).toBe('moveto 4 1 20');
        expect(dl.pop().toString()).toBe('step 6');
        expect(dl.pop()).toBeNull();
    });
});
