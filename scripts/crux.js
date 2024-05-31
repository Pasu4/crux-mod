crux.sporeColorA = Color.parse("#7c4b80");
crux.sporeColorB = Color.parse("#6b4474");
crux.sporeColorC = Color.parse("#7457ce");
crux.colorRClear = Color.parse("#ff000000");

crux.crux_drawPixel = function() {
    // Like moveBeat, but every other beat
    moveBeat2 = (1 - state.turn % 2 + state.moveBeat) / 2;
    // Like moveBeat, but every fourth beat
    moveBeat4 = (3 - state.turn % 4 + state.moveBeat) / 4;
    
    // Like moveBeat, but in a heartbeat pattern
    heartbeat = 0;
    if(state.turn >= 80 && state.turn < 136 || state.turn >= 224 && state.turn < 312) {
        heartbeat = Math.max(moveBeat2, (moveBeat2 / 0.67) % 1);
    }

    // Logo fade in/out
    logoAlpha = 0;
    if(state.turn < 64) // 0-64 stay invisible
        logoAlpha = 0;
    else if(state.turn < 66) // 64-66 fade in
        logoAlpha = (state.turn - 64) / 2;
    else if(state.turn < 136) // 66-136 stay visible
        logoAlpha = 1;
    else if(state.turn < 140) // 136-140 fade out
        logoAlpha = 1 - (state.turn - 136) / 4;
    else if(state.turn < 224) // 140-224 stay invisible
        logoAlpha = 0;
    else if(state.turn < 228) // 224-228 fade in
        logoAlpha = (state.turn - 224) / 4;
    else if(state.turn < 312) // 228-312 stay visible
        logoAlpha = 1;
    else if(state.turn < 316) // 312-316 fade out
        logoAlpha = 1 - (state.turn - 312) / 4;
    else // 316+ stay invisible
        logoAlpha = 0;

    // Sattelite fade in/out
    sat1Alpha = 0;
    sat2Alpha = 0;
    if(state.turn < 68) // 0-68 stay invisible
        sat1Alpha = sat2Alpha = 0;
    else if(state.turn < 70) { // 68-70 fade in sat1
        sat1Alpha = (state.turn - 68) / 2;
        sat2Alpha = 0;
    } else if(state.turn < 72) { // 70-72 fade in sat2
        sat1Alpha = 1;
        sat2Alpha = (state.turn - 70) / 2;
    } else if(state.turn < 136) { // 72-136 stay visible
        sat1Alpha = 1;
        sat2Alpha = 1;
    } else if(state.turn < 140) // 136-140 fade out both
        sat1Alpha = sat2Alpha = 1 - (state.turn - 136) / 4;
    else if(state.turn < 232) // 140-232 stay invisible
        sat1Alpha = sat2Alpha = 0;
    else if(state.turn < 234) // 232-234 fade in both
        sat1Alpha = sat2Alpha = (state.turn - 232) / 2;
    else if(state.turn < 280) { // 234-280 stay visible
        sat1Alpha = 1;
        sat2Alpha = 1;
    } else if(state.turn < 288) { // 280-288 fade out both
        sat1Alpha = sat2Alpha = 1 - (state.turn - 280) / 8;
    } else // 288+ stay invisible
        sat1Alpha = sat2Alpha = 0;

    // Draw background
    if(state.turn < 224) {
        // Draw spore background
        c1 = Color.mix(crux.sporeColorA, crux.sporeColorB, Math.sin(state.time) / 2 + 0.5);
        c2 = Color.mix(crux.sporeColorA, crux.sporeColorB, Math.cos(state.time) / 2 + 0.5);
        drawStripes(c1, c2);

        // Draw spore storm
        drawFlame(crux.sporeColorC, crux.sporeColorC, state.time);
    } else {
        // Draw red background (spinning at 30 degrees per second)
        drawStripes(Color.parse("#7f0000"), Color.parse("#3f0000"), rad(state.time * 30));

        // Draw fire
        drawFlame(Color.parse("#ff0000"), Color.parse("#ffff00"), state.time);
    }

    // Draw black overlay
    if(state.turn < 8) // 0-7 stay visible
        drawBackground(Color.black);
    else if(state.turn < 16) // 8-16 fade out
        drawBackground(Color.mix(Color.black, Color.clear, (state.turn - 8) / 8));
    else if(state.turn < 136) { } // 16-136 stay invisible (draw nothing)
    else if(state.turn < 160) // 136-160 fade in
        drawBackground(Color.mix(Color.clear, Color.black, (state.turn - 136) / 24));
    else if(state.turn < 240) // 160-240 stay visible
        drawBackground(Color.black);
    else if(state.turn < 248) // 240-248 fade out
        drawBackground(Color.mix(Color.black, Color.clear, (state.turn - 240) / 8));

    // Draw stars
    if(state.turn >= 168 && state.turn < 184 || state.turn >= 208 && state.turn < 220) {
        col = Color.mix(crux.colorRClear, Color.white, Math.pow(moveBeat4, 2));
        drawStars(col, col, 60, floor(state.turn / 4));
    }

    // Draw space
    if(state.turn < 24) { } // 0-24 stay invisible (draw nothing)
    else if(state.turn >= 24 && state.turn < 32) // 24-32 fade in
        drawSpace(Color.mix(Color.clear, Color.parse("#ff00007f"), (state.turn - 24) / 8));
    else if(state.turn < 160) // 32-160 pulse yellow
        drawSpace(Color.mix(Color.parse("#ff00007f"), Color.parse("#ffff007f"), Math.pow(state.moveBeat, 2)));
    else if(state.turn < 164) // 160-164 fade out
        drawSpace(Color.mix(Color.parse("#ff00007f"), Color.clear, (state.turn - 24) / 8));

    // Set logo colors
    cruxColor = Color.mix(crux.colorWClear, Color.parse("#f25555"), logoAlpha, "mul");
    sat1Color = Color.mix(crux.colorWClear, Color.parse("#7f0000"), sat1Alpha, "mul");
    sat1ColorFlash = Color.mix(crux.colorWClear, Color.parse("#7f3f3f"), sat1Alpha, "mul");
    sat2Color = Color.mix(crux.colorWClear, Color.parse("#bf0000"), sat2Alpha, "mul");
    sat2ColorFlash = Color.mix(crux.colorWClear, Color.parse("#bf5f5f"), sat2Alpha, "mul");

    // Draw logo and satellites
    drawSpinShape(sat1Color, sat1ColorFlash, 0, 0, -rad(30), 12, 6, 5, 1.3, 1);
    drawSpinShape(sat2Color, sat2ColorFlash, 0, 0, rad(30), 12, 4, 8, 1.3, 1);
    crux.drawCruxLogo(2.5 + px(7) * Math.pow(heartbeat, 2), cruxColor);

    // Draw beat square
    drawBeatSquare(Color.parse("#f25555"));
}

crux.crux_draw = function() {
    drawTilesSquare(Color.white, Color.red);
}

crux.crux_update = function() {
    if(state.newTurn) {
        // 6-30 Make a laser cross every 4 beats
        if(state.turn >= 6 && state.turn < 30 && state.turn % 4 == 2) {
            makeLaser(new Vec2(state.playerPos.x, mapSize+1), new Vec2(0, -1));
            makeLaser(new Vec2(state.playerPos.x, -mapSize-1), new Vec2(0, 1));
            makeLaser(new Vec2(mapSize+1, state.playerPos.y), new Vec2(-1, 0));
            makeLaser(new Vec2(-mapSize-1, state.playerPos.y), new Vec2(1, 0));
        }

        // 0-32 Make a wall of conveyors from different directions every 2 beats
        if(state.turn < 32 && state.turn % 2 == 0) {
            dir = new Vec2(0, 0);
            switch(state.turn / 2 % 4) {
                case 0: dir = new Vec2(0, 1); break;
                case 1: dir = new Vec2(1, 0); break;
                case 2: dir = new Vec2(0, -1); break;
                case 3: dir = new Vec2(-1, 0); break;
            }

            crux.makeConveyorWall(dir.y == 0, dir, Vec2.scale(dir, -mapSize), 2, state.turn % 8 >= 4 ? 1 : 0);
        }
    }
}