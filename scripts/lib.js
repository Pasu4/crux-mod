crux.drawCruxLogo = function(scl, col) {
    // Main square
    drawFillQuad(Vec2.scale(new Vec2(0, 2.8), scl), Vec2.scale(new Vec2(1.9, 0.9), scl), Vec2.scale(new Vec2(0.35, -0.65), scl), Vec2.scale(new Vec2(-1.55, 1.25), scl), col);
    drawFillQuad(Vec2.scale(new Vec2(0.7, 2.8), scl), Vec2.scale(new Vec2(1.5, 2), scl), Vec2.scale(new Vec2(1.5, 1.3), scl), Vec2.scale(new Vec2(0.7, 2.1), scl), col);
    drawFillQuad(Vec2.scale(new Vec2(-1.55, 1.25), scl), Vec2.scale(new Vec2(-1.1, 0.8), scl), Vec2.scale(new Vec2(-1.1, 0.1), scl), Vec2.scale(new Vec2(-1.9, 0.9), scl), col);
    drawFillQuad(Vec2.scale(new Vec2(-0.3, 0), scl), Vec2.scale(new Vec2(0.35, -0.65), scl), Vec2.scale(new Vec2(0, -1), scl), Vec2.scale(new Vec2(-0.3, -0.7), scl), col);

    // Square holder
    drawFillQuad(Vec2.scale(new Vec2(-2.4, 0.4), scl), Vec2.scale(new Vec2(0, -2), scl), Vec2.scale(new Vec2(0, -2.8), scl), Vec2.scale(new Vec2(-2.4, -0.4), scl), col);
    drawFillQuad(Vec2.scale(new Vec2(2.4, 0.4), scl), Vec2.scale(new Vec2(2.4, -0.4), scl), Vec2.scale(new Vec2(0, -2.8), scl), Vec2.scale(new Vec2(0, -2), scl), col);
    drawFillQuad(Vec2.scale(new Vec2(-1.8, -1), scl), Vec2.scale(new Vec2(-1, -1.8), scl), Vec2.scale(new Vec2(-1, -2.7), scl), Vec2.scale(new Vec2(-1.8, -1.9), scl), col);
}

crux.makeConveyorWall = function(vertical, dir, pos, spacing, offset) {
    spawnDir = vertical ? new Vec2(0, 1) : new Vec2(1, 0);
    for(i = -mapSize + offset; i <= mapSize; i += spacing) {
        makeConveyor(Vec2.add(pos, Vec2.scale(spawnDir, i)), dir, 1);
    }
}