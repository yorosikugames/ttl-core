describe('Exp', function() {
    var world;

    beforeEach(function() {
        world = new World();
    });

    it('액터를 죽였을 때 경험치 100 획득', function() {
        // 액터 둘을 스폰
        var a1 = new Actor(),
            ix1 = 5,
            iy1 = 10,
            sa1 = new WorldSpawn(a1, ix1, iy1);
        expect(a1.getExp()).toBe(0);
        expect(world.appendIntent(sa1)).toBeTruthy();

        var a2 = new Actor(),
            ix2 = 6,
            iy2 = 10,
            sa2 = new WorldSpawn(a2, ix2, iy2);
        expect(a2.getExp()).toBe(0);
        expect(world.appendIntent(sa2)).toBeTruthy();

        // 스테핑
        world.nextStep();

        // a1이 a2를 근접공격하여 바로 죽인다.
        var attackPower = 100;
        var action = new WorldAttackAction(a2, attackPower);
        a1.appendIntent(action);

        var a1Hp = a1.getHp();
        var a2Hp = a2.getHp();
        var a1Exp = a1.getExp();
        var a2Exp = a2.getExp();

        // 스테핑
        world.nextStep();

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - attackPower);
        expect(a2.isDead()).toBeTruthy();

        // 죽였으니 경험치 100 획득
        expect(a1.getExp()).toBe(a1Exp + 100);

        // 공격 한번 더~
        a1.appendIntent(action);

        // 스테핑
        world.nextStep();

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - attackPower * 2);
        expect(a2.isDead()).toBeTruthy();

        // 경험치는 더 획득하지 않아야 한다.
        expect(a1.getExp()).toBe(a1Exp + 100);
    });
});
