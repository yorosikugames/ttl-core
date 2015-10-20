import World = require("./World.ts");
import Actor = require("./Actor.ts");

interface IModifier{

    execute(world: World): void;
    execute(actor: Actor): void;

}

export = IModifier;