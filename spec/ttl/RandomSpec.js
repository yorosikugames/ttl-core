describe('Random', function () {
    it('시드별 랜덤 체크', function () {
        var random1Expected = [0,3,2,1,1,2,1,0,3,2];

        var random1 = Math.seed(1985);
        for (var i = 0; i < random1Expected.count; ++i) {
            expect(getIntRandomRange(random1, 0, 4)).toEqual(random1Expected[i]);
        }

        var random2 = Math.seed(1985);
        for (var i = 0; i < random1Expected.count; ++i) {
            expect(getIntRandomRange(random2, 0, 4)).toEqual(random1Expected[i]);
        }
    });

    it('시드별 랜덤 범위 내에서 나오는지 체크', function () {
        var random1 = Math.seed(534);
        for (var i = 0; i < 10000; ++i) {
            var v = getIntRandomRange(random1, 0, 4);
            expect(v == 0 || v == 1 || v == 2 || v == 3).toBeTruthy();
        }
    });
});
