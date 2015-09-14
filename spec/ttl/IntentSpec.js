describe('Intent', function() {
    it('의도 개수 측정이 제대로 되어야 한다.', function() {
        var world = new World();
        expect(world.getIntentCount()).toBe(0);
        var action = new EmptyAction();
        expect(world.appendIntent(action)).toBeTruthy();
        expect(world.getIntentCount()).toBe(1);
        var action2 = new EmptyAction();
        expect(world.appendIntent(action2)).toBeTruthy();
        expect(world.getIntentCount()).toBe(2);
    });

    it('스테핑이 되면 쌓여 있던 의도는 모두 처리 되어야 한다.', function() {
        var world = new World();
        expect(world.getIntentCount()).toBe(0);
        var action = new EmptyAction();
        expect(world.appendIntent(action)).toBeTruthy();
        expect(world.getIntentCount()).toBe(1);
        world.nextStep();
        expect(world.getIntentCount()).toBe(0);
    });

    it('등록한 의도를 또 등록할 수는 없다.', function() {
        var world = new World();
        var action = new EmptyAction();
        expect(world.appendIntent(action)).toBeTruthy();
        expect(function() {
            world.appendIntent(action);
        }).toThrow(new Error('Duplicated intent'));
    });
});
