describe('Attack', function() {
    var world;

    beforeEach(function() {
        world = new World();
    });

    it('액터 둘이 서로 공격', function() {
        // 액터 둘을 스폰
        var a1 = new Actor();
        var ix1 = 5,
            iy1 = 10;
        var sa1 = new WorldSpawn(a1, ix1, iy1);
        expect(world.appendIntent(sa1)).toBeTruthy();

        var a2 = new Actor();
        var ix2 = 6,
            iy2 = 10;
        var sa2 = new WorldSpawn(a2, ix2, iy2);
        expect(world.appendIntent(sa2)).toBeTruthy();

        // 스테핑
        world.nextStep();

        // a1이 a2를 근접공격한다.
        var attackPower = 10;
        var action = new WorldAttackAction(a2, attackPower);
        a1.appendIntent(action);

        var a1Hp = a1.getHp();
        var a2Hp = a2.getHp();

        // 스테핑
        world.nextStep();

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - attackPower);
    });

    it('논타게팅 범위 공격', function() {
        // 액터 둘을 스폰
        var a1 = new Actor(),
            ix1 = 5,
            iy1 = 10,
            sa1 = new WorldSpawn(a1, ix1, iy1);
        expect(world.appendIntent(sa1)).toBeTruthy();

        var a2 = new Actor(),
            ix2 = 3,
            iy2 = 4,
            sa2 = new WorldSpawn(a2, ix2, iy2);
        expect(world.appendIntent(sa2)).toBeTruthy();

        // 스테핑
        world.nextStep();

        // a1이 a2를 근접공격한다.
        var attackPower = 10;
        var action = new WorldAttackAction(a2, attackPower);
        a1.appendIntent(action);

        var a1Hp = a1.getHp();
        var a2Hp = a2.getHp();

        // 스테핑
        world.nextStep();

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - attackPower);
    });
});
