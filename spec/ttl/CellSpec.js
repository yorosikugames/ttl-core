describe('Cell', function () {
    var cell;
	var Cell = ttl.Cell;
	var World = ttl.World;

    beforeEach(function() {
        cell = new Cell();
    });

    it('Cell 생성 특성', function () {
        expect(cell.isEmpty()).toBeTruthy();
    });
});
