describe('Actor', function () {
    var actor;

    beforeEach(function() {
        actor = new Actor();
    });

    it('Actor 생성 특성', function () {
        expect(actor.getHp()).toBe(100);
        expect(actor.getTeam()).toBe(undefined);
    });
});
