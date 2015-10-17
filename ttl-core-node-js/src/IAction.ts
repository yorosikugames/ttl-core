import World = require("./World.ts");
import Actor = require("./Actor.ts");

interface IAction {
    execute(world: World): void;
    execute(actor: Actor): void;
    nextStep(actor: Actor): void;
    isCostMet(): boolean;

    intent: IAction;
    actor: Actor;
}

export = IAction;