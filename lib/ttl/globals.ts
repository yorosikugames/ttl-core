import interfaces = require('./core');
import DeltaLogger = require('./delta/DeltaLogger');
import DeltaFactory = require('./delta/DeltaFactory');
import PositionComponent = require('./component/Position');
import GameEngine = require('./engine/GameEngine');

export var base = new interfaces.Base('test');
