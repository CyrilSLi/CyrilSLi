
var treasurehunt = {};

treasurehunt.isShaded = function(x, y, edges) {

    console.log("===[treasurehunt.isShaded]===========");
    console.log("is " + x + ", " + y + " shaded in d" + treasurehunt.direction + "?");

    if (edges) {
        console.log("we're talking about edges, not cells");
    }

    if (treasurehunt.direction == 0) {

        console.log("direction == 0");

        if (edges && (x - y == -2)) {

            console.log("shaded due to being two steps from the diagonal");
            return true;
        }

        if ((x - y) == -1) {

            console.log("shaded due to being adjacent to the diagonal");
            return true;
        }

        if ((x - y) == 0) {

            console.log("shaded due to being right on the diagonal");
            return true;
        }

        if ((x - y) == 1) {

            console.log("shaded due to being adjacent to the diagonal");
            return true;
        }

        if (edges && (x - y == 2)) {

            console.log("shaded due to being two steps from the diagonal");
            return true;
        }
    }

    if (treasurehunt.direction == 1) {

        console.log("direction == 1");

        if (x == 8) {

            console.log("shaded due to x being 8");
            return true;
        }

        if (x == 9) {

            console.log("shaded due to x being 9");
            return true;
        }

        if (edges && (x == 10)) {

            console.log("shaded due to x being 10");
            return true;
        }

    }

    if (treasurehunt.direction == 2) {

        console.log("direction == 2");

        if ((x + y) == 16) {

            console.log("shaded due to being adjacent to the diagonal");
            return true;
        }

        if ((x + y) == 17) {

            console.log("shaded due to being right on the diagonal");
            return true;
        }

        if ((x + y) == 18) {

            console.log("shaded due to being adjacent to the diagonal");
            return true;
        }

        if (edges && (x + y == 19)) {

            console.log("shaded due to being two steps from the diagonal");
            return true;
        }

        if (edges && (x + y == 20)) {

            console.log("shaded due to being three steps from the diagonal??");
            return true;
        }


    }

    if (treasurehunt.direction == 3) {

        console.log("direction == 3");

        if (y == 8) {

            console.log("shaded due to y being 8");
            return true;
        }

        if (y == 9) {

            console.log("shaded due to y being 9");
            return true;
        }

        if (edges && y == 10) {

            console.log("shaded due to y being 10");
            return true;
        }
    }

    console.log("it is not.");

    return false;
};

treasurehunt.newGame = function() {

    treasurehunt.treasurecount = 0;
//    clearInterval(treasurehunt.treasuretimer);

    $("#x-label-box").empty();
    $("#y-label-box").empty();
    $("#guess-list").empty();

    $("#x-coord input").val("x");
    $("#y-coord input").val("y");
    $("#z-coord input").val("z");

    $("#test-coords").removeClass("disabled");

    treasurehunt.guesses = [];
    treasurehunt.count = 0;

    var gridsize = 12;
    var cellsize = 30;
    var axisstartX = 516;
    var axisstartY = 308;
    var extraClass = "";

    $("#grid").empty();

    //console.log("rows = " + rows);

    $("#banner-text").empty().append("Search for the hidden treasure!<br>You can enter coordinates to test locations.");

    if (treasurehunt.settings.level == "3") {

        gridsize = 18;
        cellsize = 20;
//        axisstartX = 514;
        extraClass = " smol";

        $("#banner-text").append("<br>You are allowed only one guess outside the pink region.");
    }

    $("#diagram").addClass("hidden");
    $("#diagram-caption").addClass("hidden");

    $("#footer-text").removeClass("hidden");

    if (treasurehunt.settings.level == "4") {

        gridsize = 9;
        cellsize = 40;
//        axisstartX = 514;
        extraClass = " big";

//        $("#banner-text").empty().append("Search for the treasure by entering x, y and z coordinates.");

        $("#grid").addClass("hidden");
        $("#x-axis").addClass("hidden");
        $("#y-axis").addClass("hidden");
        $("#x-label-box").addClass("hidden");
        $("#y-label-box").addClass("hidden");

        $("#diagram").removeClass("hidden");
        $("#diagram-caption").removeClass("hidden");

        $("#footer-text").addClass("hidden");
    }

    var a, b, n;

    for (a = 0; a < gridsize; a++) {

        for (b = 0; b < gridsize; b++) {

            n = ((a * 11) + b);
            //console.log("n = " + n);

            var cellHtml = $("<div class='cell " + extraClass + "' x=" + b + " y=" + a + " n=" + n + "></div>");

            $(cellHtml).css("left", b * cellsize);
            $(cellHtml).css("top", (a * cellsize));

            $("#grid").append(cellHtml);
        }
    }


    var c;

    if (treasurehunt.settings.level == "1" || treasurehunt.settings.level == "4") {
        console.log("level 1 or 4, ordinary axis with origin in the proper place");

        for (c = 0; c <= gridsize; c++) {
            $("#x-label-box").append("<div class='axis-label " + extraClass + "'>" + c + "</div>");

            if ((gridsize - c) == 0) {

                $("#y-label-box").append("<div class='axis-label " + extraClass + "'></div>");

            } else {

                $("#y-label-box").append("<div class='axis-label " + extraClass + "'>" + (gridsize - c) + "</div>");
            }
        }

        treasurehunt.axisoffsetx = 0;
        treasurehunt.axisoffsety = 0;

    } else if (treasurehunt.settings.level == "2" || treasurehunt.settings.level == "3") {
        console.log("level 2 or 3, move the axis");

        treasurehunt.axisoffsetx = 1 + Math.floor(Math.random() * 9); 

        console.log("axis offset x");
        console.log(treasurehunt.axisoffsetx);

        treasurehunt.axisoffsety = 1 + Math.floor(Math.random() * 9); 

        console.log("axis offset y");
        console.log(treasurehunt.axisoffsety);

        $("#x-axis").css("top", (axisstartX - (cellsize * treasurehunt.axisoffsetx)) + "px");
        $("#y-axis").css("left", (axisstartY + (cellsize * treasurehunt.axisoffsety)) + "px");

        $("#x-label-box").css("top", (axisstartX - (cellsize * treasurehunt.axisoffsetx)) + "px");

        if (treasurehunt.settings.level == "3") {
            $("#y-label-box").css("left", -22 + (axisstartY + (cellsize * treasurehunt.axisoffsety)) + "px");

        } else {
            $("#y-label-box").css("left", -30 + (axisstartY + (cellsize * treasurehunt.axisoffsety)) + "px");
        }

        for (c = 0; c <= gridsize; c++) {
            $("#x-label-box").append("<div class='axis-label " + extraClass + "'>" + (c - treasurehunt.axisoffsety) + "</div>");

            if ((gridsize - c - treasurehunt.axisoffsetx) == 0) {

                $("#y-label-box").append("<div class='axis-label " + extraClass + "'></div>");

            } else {

                $("#y-label-box").append("<div class='axis-label " + extraClass + "'>" + (gridsize - c - treasurehunt.axisoffsetx) + "</div>");
            }
        }

        if (treasurehunt.settings.level == "3") {

            treasurehunt.direction = Math.floor(Math.random() * 4);
            console.log("direction: " + treasurehunt.direction);

            $(".cell").each(function() {

                console.log("shading cells");

                var x = parseInt($(this).attr("x"));
                var y = parseInt($(this).attr("y"));

                if (treasurehunt.isShaded(x, y)) {

                    $(this).addClass("shaded");
                }
            });
        }
    }

    if (treasurehunt.settings.level == "4") {
        console.log("4, add input slot for z coords");

        $("#x-coord").addClass("squashed");
        $("#guess-comma").addClass("squashed");
        $("#y-coord").addClass("squashed");

        $("#guess-z-comma").removeClass("hidden");
        $("#z-coord").removeClass("hidden");
    }


    if (treasurehunt.settings.level == "1") {
        treasurehunt.x = Math.floor(Math.random() * 12);
        treasurehunt.y = Math.floor(Math.random() * 12);
        treasurehunt.z = 0;

        $("#level-name").empty().append("Level 1");        
    }

    if (treasurehunt.settings.level == "2") {
        treasurehunt.x = Math.floor(Math.random() * 12);
        treasurehunt.y = Math.floor(Math.random() * 12);
        treasurehunt.z = 0;

        $("#level-name").empty().append("Level 2");        
    }

    if (treasurehunt.settings.level == "3") {

        treasurehunt.x = Math.floor(Math.random() * 18);
        treasurehunt.y = Math.floor(Math.random() * 18);
        treasurehunt.z = 0;

        // var convertedx = (treasurehunt.x - treasurehunt.axisoffsety);
        // var convertedy = (treasurehunt.y - treasurehunt.axisoffsetx);

        console.log("trying to choose coordinates for level 3 outside the shaded region");
        console.log("basic coords: " + treasurehunt.x + ", " + treasurehunt.y);
        // console.log("axis offsets: " + treasurehunt.axisoffsetx + ", " + treasurehunt.axisoffsety);
        // console.log("converted coords: " + convertedx + ", " + convertedy);
        // console.log("gridsize - y coord = " + (gridsize - convertedy));

        console.log("gonna test y with 18 minus, i.e. : " + (18 - treasurehunt.y));

        while (treasurehunt.isShaded(treasurehunt.x, (18 - treasurehunt.y), true)) {

            console.log("that was shaded, trying another spot");

            treasurehunt.x = Math.floor(Math.random() * 18);
            treasurehunt.y = Math.floor(Math.random() * 18);

            // convertedx = (treasurehunt.x - treasurehunt.axisoffsety);
            // convertedy = (treasurehunt.y - treasurehunt.axisoffsetx);

            console.log("trying to choose NEW coordinates for level 3 outside the shaded region");
            console.log("basic coords: " + treasurehunt.x + ", " + treasurehunt.y);
            console.log("gonna NEW test y with gridsize minus, i.e. : " + (17 - treasurehunt.y));
            // console.log("NEW converted coords: " + convertedx + ", " + convertedy);
            // console.log("gridsize - y coord = " + (gridsize - convertedy));
        }

        console.log("sorted");
        console.log("===> " + treasurehunt.x + ", " + treasurehunt.y);

        $("#level-name").empty().append("Level 3");        
    }

    if (treasurehunt.settings.level == "4") {
        treasurehunt.x = Math.floor(Math.random() * 9);
        treasurehunt.y = Math.floor(Math.random() * 9);
        treasurehunt.z = Math.floor(Math.random() * 9);

        $("#level-name").empty().append("Level 4");        
    }


    for (a = 0; a <= gridsize; a++) {

        for (b = 0; b <= gridsize; b++) {

            n = ((a * 11) + b);
            //console.log("n = " + n);

            var pointHtml;
            

            //console.log("adding a shaded point at " + b + ", " + a);

            // if (treasurehunt.settings.level == "3" && b == treasurehunt.x && a == (18 - treasurehunt.y)) {

            //     pointHtml = $("<div class='point hot " + extraClass + "' x=" + b + " y=" + a + " n=" + n + "></div>");
            // }
            // else {

                pointHtml = $("<div class='point " + extraClass + "' x=" + b + " y=" + a + " n=" + n + "></div>");
            //}

            // if (treasurehunt.isShaded(b, a, true)) {

            //     console.log("this point will be shaded");
            //     pointHtml = $("<div class='point hot " + extraClass + "' x=" + b + " y=" + a + " n=" + n + "></div>");
            // } else {

            //     console.log("this point will not be shaded");
            //     pointHtml = $("<div class='point cold " + extraClass + "' x=" + b + " y=" + a + " n=" + n + "></div>");
            // }

            $(pointHtml).css("left", -2 + (b * cellsize));
            $(pointHtml).css("top", -2 + (a * cellsize));

            $("#grid").append(pointHtml);

        }
    }

    $(".point").click(function() {
        if ($(this).is(".highlighted")) {
            $(this).removeClass("highlighted");
        } else {
            $(this).addClass("highlighted");
        }
    });

    $("#x-coord-v").select();

    $(document).keydown(function(e) {

        // console.log("k = " + e.keyCode);

        if (e.keyCode == 13) {

            if ($("#x-coord-v").is(":focus")) {

                $("#y-coord-v").select();

            } else {

                treasurehunt.advance();
            }
        }
    });
};

treasurehunt.advance = function() {

    console.log("test coords");

    var xs = parseInt($("#x-coord-v").val());
    var ys = parseInt($("#y-coord-v").val());
    var zs = parseInt($("#z-coord-v").val());

    console.log("submitted coords:");
    console.log(xs);
    console.log(ys);
    console.log(zs);

    var x = xs;
    var y = ys;
    var z = zs;

    x += treasurehunt.axisoffsety;
    y += treasurehunt.axisoffsetx;

    console.log("y axis offset is " + treasurehunt.axisoffsety);
    console.log("x axis offset is " + treasurehunt.axisoffsetx);

    console.log("modified x is " + x);
    console.log("modified y is " + y);

    // console.log(isNaN(x));
    // console.log(isNaN(y));
    // console.log(isNaN(z));

    var extraClass = "";
    var cellsize = 30;

    if (treasurehunt.settings.level == "3") {

        extraClass = " smol";
        cellsize = 20;
    }

    if (treasurehunt.settings.level == "4") {

        extraClass = " big";
        cellsize = 40;
    }

    if (x < 0) return;
    if (y < 0) return;

    if (isNaN(x) || isNaN(y)) {
        console.log("this is not a number!");
        return;
    }

    if (treasurehunt.settings.level == "1" || treasurehunt.settings.level == "2") {
        if (x > 12) return;
        if (y > 12) return;
    }

    var pinkGuess = false;

    if (treasurehunt.settings.level == "3") {
        if (x > 18) return;
        if (y > 18) return;

        console.log("==================================================");

        console.log("given x and y");
        console.log(x);
        console.log(y);

        console.log("alternative - xs and ys");
        console.log(xs);
        console.log(ys);

        var iy = 18 - y;
        console.log("inverse iy");
        console.log(iy);

        console.log("axis adjustments");
        console.log(treasurehunt.axisoffsetx);
        console.log(treasurehunt.axisoffsety);

        console.log("direction: " + treasurehunt.direction);

        if (treasurehunt.direction == 0) {

            console.log("x - iy = " + (x - iy));

            if ((x - iy) == -2) {

                console.log("yes it's shaded (x - iy) == -2");
                pinkGuess = true;
            }

            if ((x - iy) == -1) {

                console.log("yes it's shaded (x - iy) == -1");
                pinkGuess = true;
            }

            if ((x - iy) == 0) {

                console.log("yes it's shaded (x - iy) == 0");
                pinkGuess = true;
            }

            if ((x - iy) == 1) {

                console.log("yes it's shaded (x - iy) == 1");
                pinkGuess = true;
            }

            if ((x - iy) == 2) {

                console.log("yes it's shaded (x - iy) == 2");
                pinkGuess = true;
            }
        }

        if (treasurehunt.direction == 1) {

            if (x == 8) {

                console.log("yes it's shaded x == 8");
                pinkGuess = true;
            }

            if (x == 9) {

                console.log("yes it's shaded x == 9");
                pinkGuess = true;
            }

            if (x == 10) {

                console.log("yes it's shaded x == 10");
                pinkGuess = true;
            }
        }

        if (treasurehunt.direction == 2) {

            console.log("x + iy = " + (x + iy));

            if ((x + iy) == 16) {

                console.log("yes it's shaded (x + iy) == 16");
                pinkGuess = true;
            }

            if ((x + iy) == 17) {

                console.log("yes it's shaded (x + iy) == 17");
                pinkGuess = true;
            }

            if ((x + iy) == 18) {

                console.log("yes it's shaded (x + iy) == 18");
                pinkGuess = true;
            }

            if ((x + iy) == 19) {

                console.log("yes it's shaded (x + iy) == 19");
                pinkGuess = true;
            }

            if ((x + iy) == 20) {

                console.log("yes it's shaded (x + iy) == 20");
                pinkGuess = true;
            }
        }

        if (treasurehunt.direction == 3) {

            if (iy == 8) {

                console.log("yes it's shaded iy == 8");
                pinkGuess = true;
            }

            if (iy == 9) {

                console.log("yes it's shaded iy == 9");
                pinkGuess = true;
            }

            if (iy == 10) {

                console.log("yes it's shaded iy == 10");
                pinkGuess = true;
            }
        }
    }

    if (treasurehunt.settings.level == "4") {

        console.log("level 4 - are the numbers ok?");

        if (x > 9) return;
        if (y > 9) return;

        if (z < 0) return;
        if (z > 9) return;

        if (isNaN(z)) return;

        console.log("level 4 - they seem fine");

    } else {
        z = 0;
    }

    if (treasurehunt.guesses[z] && treasurehunt.guesses[z][y] && treasurehunt.guesses[z][y][x]) {

        console.log("this guess has already been made");

    } else {

        var dist = 0;

        console.log(Math.abs(treasurehunt.x - x));
        console.log(Math.abs(treasurehunt.y - y));
        console.log(Math.abs(treasurehunt.z - z));
        console.log("dist " + dist);

        if (dist == 1) {

            if (treasurehunt.settings.level == "4") {

                $("#guess-list").append("<div class='guess'><div class='guess-coords'>" + xs + ", " + ys + ", " + zs + "</div><div class='guess-distance'>" + dist + " step</div></div>");
            } else {

                $("#guess-list").append("<div class='guess'><div class='guess-coords'>" + xs + ", " + ys + "</div><div class='guess-distance'>" + dist + " step</div></div>");
            }

        } else {

            if (treasurehunt.settings.level == "4") {

                $("#guess-list").append("<div class='guess'><div class='guess-coords'>" + xs + ", " + ys + ", " + zs + "</div><div class='guess-distance'>" + dist + " steps</div></div>");
            } else {

                $("#guess-list").append("<div class='guess'><div class='guess-coords'>" + xs + ", " + ys + "</div><div class='guess-distance'>" + dist + " steps</div></div>");
            }

        }

//            $("#distance-list").append("<div class='distance'>" + dist + "</div>");

        var blob;
        var blobx = (-10 + (x * cellsize));
        var bloby = (348 - (y * cellsize));

        if (dist == 0) {

            blob = $("<div class='blob bingo'></div>");
            blobx -= 1;
            bloby -= 1;
        } else {

            blob = $("<div class='blob cold'>" + dist + "</div>");
        }

        $("#grid").append(blob);

        $(blob).css("left", blobx + "px");
        $(blob).css("top", bloby + "px");

        treasurehunt.count++;

        if (treasurehunt.guesses[z]) {

            if (treasurehunt.guesses[z][y]) {

                treasurehunt.guesses[z][y][x] = 1;

            } else {

                treasurehunt.guesses[z][y] = [];
                treasurehunt.guesses[z][y][x] = 1;
            }
        } else {

            treasurehunt.guesses[z] = [];
            treasurehunt.guesses[z][y] = [];
            treasurehunt.guesses[z][y][x] = 1;
        }

        if (dist == 0) {

            console.log(treasurehunt.count);

            if (treasurehunt.settings.level == "3" || treasurehunt.settings.level == "4") {

                if (treasurehunt.count > 4) {

                    if (treasurehunt.count == 1) {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guess. Can you find the treasure in fewer than " + treasurehunt.count + " guesses?");
                    } else {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guesses. Can you find the treasure in fewer than " + treasurehunt.count + " guesses?");
                    }

                } else {

                    if (treasurehunt.count == 1) {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guess. Can you always find the treasure in fewer than 5 guesses?");
                    } else {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guesses. Can you always find the treasure in fewer than 5 guesses?");                        
                    }
                }
            } else {

                if (treasurehunt.count > 3) {

                    if (treasurehunt.count == 1) {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guess. Can you find the treasure in fewer than " + treasurehunt.count + " guesses?");
                    } else {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guesses. Can you find the treasure in fewer than " + treasurehunt.count + " guesses?");
                    }
                } else {

                    if (treasurehunt.count == 1) {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guess. Can you always find the treasure in fewer than 4 guesses?");
                    } else {

                        $("#banner-text").empty().append("You have found the treasure!<br>It took you " + treasurehunt.count + " guesses. Can you always find the treasure in fewer than 4 guesses?");
                    }
                }
            }

            $("#test-coords").addClass("disabled");

            treasurehunt.treasurecount = 0;

            
            if (treasurehunt.settings.style == "textured") {

//                treasurehunt.treasureTime();
//                treasurehunt.treasuretimer = setInterval(treasurehunt.treasureTime, 200);
            }

        } else {

            if (treasurehunt.settings.level == "3" && !pinkGuess) {

                console.log("there was a guess outside the pink area");

                $("#banner-text").empty().append("Your guess was outside the pink region, and not correct.<br>You missed your chance to get the treasure!");

            } else {

                console.log("acceptable pink guess");
            }

            $("#x-coord-v").select();
        }
    }
};

// treasurehunt.treasureTime = function() {

//     var treasureDiv;

//     var allocation = Math.floor(Math.random() * 38);

//     if (allocation == 0) {

//         console.log("pearls1");
//         treasureDiv = $("<div class='treasure pearls1'></div>");
//     } else if (allocation <= 2) {

//         console.log("sapphire1");
//         treasureDiv = $("<div class='treasure sapphire1'></div>");
//     } else if (allocation <= 4) {

//         console.log("ruby1");
//         treasureDiv = $("<div class='treasure ruby1'></div>");
//     } else if (allocation <= 6) {

//         console.log("diamond1");
//         treasureDiv = $("<div class='treasure diamond1'></div>");
//     } else if (allocation <= 12) {

//         console.log("goldcoin1");
//         treasureDiv = $("<div class='treasure goldcoin1'></div>");
//     } else if (allocation <= 18) {

//         console.log("goldcoin2");
//         treasureDiv = $("<div class='treasure goldcoin2'></div>");
//     } else if (allocation <= 24) {

//         console.log("goldcoin3");
//         treasureDiv = $("<div class='treasure goldcoin3'></div>");
//     } else if (allocation <= 30) {

//         console.log("goldcoin4");
//         treasureDiv = $("<div class='treasure goldcoin4'></div>");
//     } else {

//         console.log("goldcoin5");
//         treasureDiv = $("<div class='treasure goldcoin5'></div>");
//     }

//     $("#container").append(treasureDiv);

//     $(treasureDiv).css("left", (680 * Math.random()) + "px");
//     $(treasureDiv).css("top", "-200px");

//     var fallspeed = Math.floor(Math.random() * 400); 
//     var rot = Math.floor(Math.random() * 60) - 30;

//     $(treasureDiv).css("transform", "rotate(" + rot + "deg)");

//     $(treasureDiv).animate({
//         "top": (600 + fallspeed) + "px"
//     }, 6000);

//     treasurehunt.treasurecount++;

//     if (treasurehunt.treasurecount > 500) {

//         clearInterval(treasurehunt.treasuretimer);
//     }
// };

treasurehunt.init = function(settings) {

    treasurehunt.settings = settings;

    if (treasurehunt.settings.style == "textured") {
        $("#container").addClass("textured");

        $("#backmap").removeClass("hidden");
    } else {

        $("#backmap").addClass("hidden");
    }

    console.log("[init] calling newGame");
    console.log(treasurehunt.settings);

    treasurehunt.games = 0;
    treasurehunt.score = 0;

    treasurehunt.newGame();

    // Just click handlers down here

    treasurehunt.refreshHandlers();
};

treasurehunt.refreshHandlers = function() {

    $(".grid-divisor .x").off("change");
    $(".grid-remainder .y").off("change");
    $(".grid-list-thing .filter-type").off("change");
    $(".grid-list-new").off("click");

    $("#treasurehunt-reset").click(function() {

        $(".cell").removeClass("eliminated");
        $(".grid-list-thing").remove();
        $("#grid-list-new").removeClass("hidden");
    });

    $("#test-coords").click(treasurehunt.advance);

    $("#new-game").click(treasurehunt.newGame);

};