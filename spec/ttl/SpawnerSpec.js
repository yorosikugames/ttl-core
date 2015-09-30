describe('Spawner', function() {
    var world;

    beforeEach(function() {
        world = new World();
    });

    it('액터를 생.산.하.는. 스포너를 생성한다.', function() {
        var actor = new Actor();
        var spawner = new Spawner();
        spawner.setPrefab(actor);
        // 스포너 스폰
        var ix = 5,
            iy = 10;
        var sa = new WorldSpawn(spawner, ix, iy);
        var spawnCell1 = world.getCell(ix + 1, iy + 0);
        var spawnCell1Right = world.getCell(ix + 2, iy + 0);
        var spawnCell2 = world.getCell(ix + 0, iy + 1);
        var spawnCell3 = world.getCell(ix - 1, iy + 0);
        var spawnCell4 = world.getCell(ix + 0, iy - 1);

        spyOn(world, 'appendIntent').and.callThrough();
        spyOn(spawner, 'nextStep').and.callThrough();

        expect(world.appendIntent(sa)).toBeTruthy();
        expect(world.appendIntent.calls.count()).toBe(1);
        expect(world.getCell(ix, iy).isEmpty()).toBeTruthy();
        /* STEP 0 -> 1 */
        world.nextStep();
        expect(spawner.getIx()).toBe(ix);
        expect(spawner.getIy()).toBe(iy);
        // spawner가 스폰을 시켜서 1 증가
        // (단, 스폰 의도를 큐잉했을 뿐 실제 스폰이 되진 않았다.)
        expect(world.appendIntent.calls.count()).toBe(2);
        expect(spawner.nextStep.calls.count()).toBe(1);
        expect(world.getCell(ix, iy).isEmpty()).toBeFalsy();
        expect(spawner.canSpawn()).toBeTruthy();
        expect(spawnCell1.isEmpty()).toBeTruthy();
        expect(world.getOccupiedCellCount()).toEqual(1);

        /* STEP 1 -> 2 */
        world.nextStep();
        // spawner가 스폰을 시켜서 1 증가
        expect(world.appendIntent.calls.count()).toBe(3);
        expect(spawner.nextStep.calls.count()).toBe(2);
        // spawner가 스폰시킨 액터 첫 번째 스폰 완료
        expect(spawnCell1.isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(2);

        /* STEP 2 -> 3 */
        world.nextStep();
        // spawner가 스폰시킨 액터 두 번째 스폰 완료
        expect(spawnCell2.isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(3);

        /* STEP 3 -> 4 */
        world.nextStep();
        // spawner가 스폰시킨 액터 세 번째 스폰 완료
        expect(spawnCell3.isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(4);

        /* STEP 4 -> 5 */
        world.nextStep();
        // spawner가 스폰시킨 액터 네 번째 스폰 완료
        expect(spawnCell4.isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(5);

        /* STEP 5 -> 6 */
        world.nextStep();
        // 네 방향이 모두 스폰되어 있으므로 더 스폰할 수가 없네...
        expect(spawner.canSpawn()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(5);

        // spawner 오른쪽에 스폰된 액터를 오른쪽으로 한칸 이동시킨다.
        // 이렇게 해서 spawner 오른쪽에 또 액터를 스폰할 수 있는
        // 상황을 만든다. 단, 상황이 만들어진 후 한 스텝이 지나야
        // 의도를 넣게 된다.
        var rightActor = spawnCell1.getOwner();
        var action = new WorldMoveAction(1, 0);
        rightActor.appendIntent(action);
        expect(spawner.canSpawn()).toBeFalsy();
        /* STEP 6 -> 7 */
        world.nextStep();
        expect(spawnCell1.isEmpty()).toBeTruthy();
        expect(spawnCell1Right.isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(5);
        expect(spawner.canSpawn()).toBeTruthy();

        /* STEP 7 -> 8 */
        world.nextStep();
        // 이제 spawner가 스폰 의도를 월드에 등록한 상태
        expect(spawnCell1.isEmpty()).toBeTruthy();
        expect(world.getOccupiedCellCount()).toEqual(5);

        /* STEP 8 -> 9 */
        world.nextStep();
        // spawner가 스폰시킨 액터 다섯 번째 스폰 완료
        expect(spawnCell1.isEmpty()).toBeFalsy();
        expect(world.getOccupiedCellCount()).toEqual(6);
    });
});
