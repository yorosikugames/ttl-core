import World = require("./World.ts");

interface IAction {

    execute(world: World): void;
}

export = IAction;