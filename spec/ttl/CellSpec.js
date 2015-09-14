describe('Cell', function () {
    var cell;

    beforeEach(function() {
        cell = new Cell();
    });

    it('Cell 생성 특성', function () {
        expect(cell.isEmpty()).toBeTruthy();
    });
});
