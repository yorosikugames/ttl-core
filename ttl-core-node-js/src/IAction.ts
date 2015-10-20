import World = require("./World.ts");
import Actor = require("./Actor.ts");

interface IAction {

    actor: Actor;
    intent: IAction;

    validate(): boolean;
    execute(): boolean;

    nextStep(actor: Actor);
    isCostMet();


}

export = IAction;