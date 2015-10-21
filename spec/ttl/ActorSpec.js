describe('Actor', function() {
    var actor;

    beforeEach(function() {
        actor = new ttl.Actor();
    });

    it('Actor 생성 특성', function() {
        expect(actor.getHp()).toBe(100);
        expect(actor.getTeam()).not.toBeDefined();
        expect(actor.getIx()).not.toBeDefined();
        expect(actor.getIy()).not.toBeDefined();
        expect(function() {
            actor.setIx(1);
        }).toThrow(new Error('Not attached to world'));
        expect(function() {
            actor.setIy(2);
        }).toThrow(new Error('Not attached to world'));
    });
});
