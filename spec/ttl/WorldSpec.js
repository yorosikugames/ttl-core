describe('World', function() {
    var world;
	var Actor = ttl.Actor;
	var WorldSpawn = ttl.WorldSpawn;
	var Cell = ttl.Cell;
	var PoisonMod = ttl.PoisonMod;
	var DeltaLogger = ttl.DeltaLogger;
	var EmptyAction = ttl.EmptyAction;
	var Spawner = ttl.Spawner;
	var World = ttl.World;
	
    beforeEach(function() {
        world = new World();
    });

    it('스테핑을 해 보자', function() {
        expect(world.getStep()).toEqual(0);
        expect(world.nextStep()).toBeTruthy();
        expect(world.getStep()).toEqual(1);
    });

    it('월드 셀 개수는 가로 9개, 세로 160개로 한다. 그리고 모두 비어있다.', function() {
        expect(world.getCellCountX()).toEqual(9);
        expect(world.getCellCountY()).toEqual(160);
        for (var iy = 0; iy < 160; ++iy) {
            for (var ix = 0; ix < 9; ++ix) {
                expect(world.getCell(ix, iy).isEmpty()).toBeTruthy();
            }
        }
    });

    it('범위 밖 셀 조회 시 null 반환', function() {
        expect(world.getCell(-1, 0)).toBeNull();
        expect(world.getCell(999, 0)).toBeNull();
        expect(world.getCell(5, -10)).toBeNull();
        expect(world.getCell(5, 160)).toBeNull();
    });
});
