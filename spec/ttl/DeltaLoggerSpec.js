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
    });
});
