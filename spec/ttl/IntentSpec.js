describe('Intent', function () {
    it('등록한 의도를 또 등록할 수는 없다.', function () {
        var world = new World();
        var action = new SpawnAction(new Actor(), 0, 0);
        expect(world.appendIntent(action)).toBeTruthy();
        expect(world.appendIntent(action)).toThrow(new Error('Already appended intent'));
    });
});
