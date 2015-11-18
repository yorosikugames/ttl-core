import core = require('./core');
import DeltaLogger = require('./delta/DeltaLogger');
import DeltaFactory = require('./delta/DeltaFactory');
import PositionComponent = require('./component/Position');
import GameEngine = require('./engine/GameEngine');

export var screenSize = new core.Size(9, 160);
export var randomNumberGenerator = new core.RNG(0);