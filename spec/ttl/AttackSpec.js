'use strict';
describe('Attack', function() {
    var world;

	var Actor = ttl.Actor;
	var WorldSpawn = ttl.WorldSpawn;
	var Cell = ttl.Cell;

    beforeEach(function() {
        world = new World();
    });

    it('액터가 액터를 공격', function() {
        // 액터 둘을 스폰
        var a1 = new Actor(),
            ix1 = 5,
            iy1 = 10,
            sa1 = new WorldSpawn(a1, ix1, iy1);
        expect(world.appendIntent(sa1)).toBeTruthy();

        var a2 = new Actor(),
            ix2 = 6,
            iy2 = 10,
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

        // a1이 a2를 근접공격한다. (다시 한번)
        a1.appendIntent(action);

        // 스테핑
        world.nextStep();

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - attackPower * 2);
    });

    it('경험치가 높아서 공격력 보정을 받는 액터가 액터를 공격', function() {
        // 액터 둘을 스폰
        var a1 = new Actor(),
            ix1 = 5,
            iy1 = 10,
            sa1 = new WorldSpawn(a1, ix1, iy1);
        expect(world.appendIntent(sa1)).toBeTruthy();
        var a1Exp = 0;
        a1.setExp(a1Exp);

        var a2 = new Actor(),
            ix2 = 6,
            iy2 = 10,
            sa2 = new WorldSpawn(a2, ix2, iy2);
        expect(world.appendIntent(sa2)).toBeTruthy();

        // 스테핑
        world.nextStep();

        // a1이 a2를 근접공격한다. (첫 번째)
        var attackPower = 50;
        var action = new WorldAttackAction(a2, attackPower);
        a1.appendIntent(action);

        var a1Hp = a1.getHp();
        var a2Hp = a2.getHp();

        // 스테핑
        world.nextStep();

        expect(a1.getExp()).toBe(0);
        var expectedDamage1 = attackPower;

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - expectedDamage1);

        // a1이 a2를 근접공격한다. (두 번째 - 이 공격으로 상대 액터는 사망한다.)
        a1.appendIntent(action);

        // 스테핑
        world.nextStep();

        // 경험치는 얻은 상태지만
        expect(a1.getExp()).toBe(100);
        // 공격력은 경험치를 얻기 전에 계산되는 것에 주의.
        var expectedDamage2 = Math.round(attackPower * 1.0);
        // 이 시점에서 1.1배수로 계산되긴 하지만, nextStep() 되는 시점에서는 1배수로 적용된다.
        expect(a1.getActualDamageFromAttackPower(a1.getExp(), attackPower)).toBe(Math.round(attackPower * 1.1));

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - expectedDamage1 - expectedDamage2);

        // a1이 a2를 근접공격한다. (세 번째 - 이 공격은 1.1배수 적용된다.)
        a1.appendIntent(action);

        // 스테핑
        world.nextStep();

        expect(a1.getExp()).toBe(100);
        var expectedDamage3 = Math.round(attackPower * 1.1);

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - expectedDamage1 - expectedDamage2 - expectedDamage3);
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
        var attackPower = 10,
            action = new WorldAttackAction(a2, attackPower);
        a1.appendIntent(action);

        var a1Hp = a1.getHp(),
            a2Hp = a2.getHp();

        // 스테핑
        world.nextStep();

        expect(a1.getHp()).toEqual(a1Hp);
        expect(a2.getHp()).toEqual(a2Hp - attackPower);
    });
});
