import World = require("./World.ts");

interface IModifier{
    execute(world: World): void;
}

export = IModifier;