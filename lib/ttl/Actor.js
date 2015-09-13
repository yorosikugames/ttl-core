function Actor() {}

Actor.prototype.getHp = function() {
    return 100;
}

Actor.prototype.getTeam = function() {
    return undefined;
}

Actor.prototype.getWorld = function() {
    return undefined;
}

module.exports = Actor;
