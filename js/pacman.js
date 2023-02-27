function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }
    return matrix;
}

class NodeElement {
    constructor(row, col, difficulty, isWall, aStarInstance) {
        this.row = row
        this.col = col
        this.wall = isWall
        this.difficulty = difficulty
        this.through = ''
        this.heuristic = Infinity
        this.eucledianDistance = Infinity
        this.difficultySums = ''
        this.aStar = aStarInstance
        this.neighbours = []
    }

    heuristicCalculation(node) {
        this.eucledianDistance = this.aStar.eucledianDistance(this);
        let difficultySums;
        difficultySums = this.difficulty + Number(node.difficultySums);
        if (this.difficultySums === '') {
            this.difficultySums = difficultySums;
            this.through = node;
        } else if (this.difficultySums > difficultySums) {
            this.difficultySums = difficultySums;
            this.through = node;
        } else {
        }
        return this.heuristic = this.eucledianDistance + this.difficultySums;
    }

    neighboursCalculation(openQueue) {
        let neighbours = [];
        let enqueuedNode;
        let newNode;
        if (this.row < this.aStar.matrixHeight - 1) {
            enqueuedNode = openQueue.find(node => node.row === this.row + 1 && node.col === this.col);
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row + 1 && node.col === this.col));
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this);
                    neighbours.push(newNode);
                }
            } else {
                enqueuedNode.heuristicCalculation(this);
            }
        }
        if (this.col < this.aStar.matrixWidth - 1) {
            enqueuedNode = openQueue.find(node => node.row === this.row && node.col === this.col + 1);
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row && node.col === this.col + 1));
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this);
                    neighbours.push(newNode);
                }
            } else {
                enqueuedNode.heuristicCalculation(this);
            }
        }
        if (this.row > 0) {
            enqueuedNode = openQueue.find(node => node.row === this.row - 1 && node.col === this.col);
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row - 1 && node.col === this.col));
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this);
                    neighbours.push(newNode);
                }
            } else {
                enqueuedNode.heuristicCalculation(this);
            }
        }
        if (this.col > 0) {
            enqueuedNode = openQueue.find(node => node.row === this.row && node.col === this.col - 1);
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row && node.col === this.col - 1));
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this);
                    neighbours.push(newNode);
                }
            } else {
                enqueuedNode.heuristicCalculation(this);
            }
        }
        return neighbours;
    }
}

class AStar {
    constructor(start, end, grid) {
        this.grid = grid;
        this.matrixHeight = this.grid.length;
        this.matrixWidth = this.grid[0].length;
        this.nodes = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (i == start[0] && j == start[1]) {
                    this.start = new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this);
                    this.nodes.push(this.start);
                } else if (i == end[0] && j == end[1]) {
                    this.end = new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this);
                    this.nodes.push(this.end);
                } else {
                    this.nodes.push(new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this));
                }
            }
        }
        this.openQueue = [this.start];
        this.alreadyChecked = [];
        this.optimalPath = [];
    }

    startAlgorithm() {
        this.openQueue[0].heuristicCalculation(this.openQueue[0]);
        while (this.openQueue.length > 0) {
            if (this.openQueue[0] === this.end) {
                break;
            }
            let neighbours = this.openQueue[0].neighboursCalculation(this.openQueue);
            let queue = this.openQueue;
            this.alreadyChecked.push(queue.shift());
            let newQueue = queue.concat(neighbours);
            let sortedNeighbours = newQueue.sort(function (a, b) {
                return a.heuristic - b.heuristic;
            });
            this.openQueue = sortedNeighbours;
        }
        if (this.openQueue.length !== 0) {
            this.retrieveOptimalPath(this.openQueue[0])
        }
    }

    retrieveOptimalPath(node) {
        this.optimalPath.push(node);
        if (node.through !== this.start) {
            this.retrieveOptimalPath(node.through);
        } else {
            this.optimalPath.push(this.start);
        }
    }

    eucledianDistance(node) {
        return Math.sqrt(Math.pow(Math.abs(node.row - this.end.row), 2) + Math.pow(Math.abs(node.col - this.end.col), 2));
    }
}


var level = 1;
var ghost_count = level * 3;
var fruits_count = Math.floor(10 / level);


function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function getRandomArrayElement(arr) {
    id = Math.floor(Math.random() * arr.length);
    return [id, arr[id]]
}

var mapManager = {
    grid: null,
    mapData: null, // переменная для хранения карты
    tLayer: null, // переменная для хранения ссылки на блоки карты
    xCount: 19, // количество блоков по горизонтали
    yCount: 22, // количество блоков по вертикали
    tSize: {x: 32, y: 32}, // размер блока
    mapSize: {x: 608, y: 704}, // размер карты в пикселах (вычисляется)
    tilesets: new Array(), // массив описаний блоков карты
    imgLoadCount: 0,
    imgLoaded: false,
    jsonLoaded: false,
    view: {x: 0, y: 0, w: 800, h: 800},
    clear: function () {
        this.imgLoaded = false;
        this.jsonLoaded = false;
        this.tilesets = new Array();
        this.tLayer = null;
        //this.mapData = null;
        //this.grid = null;
    },
    parseMap(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;
        this.mapSize.y = this.yCount * this.tSize.y;
        for (var i = 0; i < this.mapData.tilesets.length; i++) {
            var img = new Image();
            img.onload = function () {
                mapManager.imgLoadCount++;
                if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
                    mapManager.imgLoaded = true;
                }
            };
            img.style.zIndex = "0";
            img.src = "./assets/" + this.mapData.tilesets[i].image;
            var t = this.mapData.tilesets[i];
            var ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / mapManager.tSize.x),
                yCount: Math.floor(t.imageheight / mapManager.tSize.y)
            };
            this.tilesets.push(ts);
        }
        this.jsonLoaded = true;
    },
    setGrid: function () {
        this.grid = listToMatrix(this.tLayer.data, 19);
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] === 0 ? this.grid[i][j] = {wall: false, difficulty: 1} : this.grid[i][j] = {
                    wall: true,
                    difficulty: 1
                };
            }
        }
    },
    getTileset(tileIndex) {
        for (var i = mapManager.tilesets.length - 1; i >= 0; i--)
            if (mapManager.tilesets[i].firstgid <= tileIndex) {
                return mapManager.tilesets[i];
            }
        return null;
    },
    getTile(tileIndex) {
        var tile = {
            img: null,
            px: 0, py: 0
        };
        var tileset = this.getTileset(tileIndex);
        tile.img = tileset.image;
        var id = tileIndex - tileset.firstgid;
        var x = id % tileset.xCount;
        var y = Math.floor(id / tileset.xCount);
        tile.px = x * mapManager.tSize.x;
        tile.py = y * mapManager.tSize.y;
        return tile;
    },
    isVisible(x, y, width, height) {
        if (x + width < this.view.x || y + height < this.view.y || x > this.view.x + this.view.w || y > this.view.y + this.view.h)
            return false;
        return true;
    },
    draw(ctx) {
        ctx.globalCompositeOperation = 'destination-over';
        if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.draw(ctx);
            }, 100);
        } else {
            if (this.tLayer === null)
                for (var id = 0; id < this.mapData.layers.length; id++) {
                    var layer = this.mapData.layers[id];
                    if (layer.name === "World") {
                        this.tLayer = layer;
                        break;
                    }
                }
            for (var i = 0; i < this.tLayer.data.length; i++) {
                if (this.tLayer.data[i] !== 0) {
                    var tile = this.getTile(this.tLayer.data[i]);
                    var pX = (i % this.xCount) * (this.tSize.x);
                    var pY = Math.floor(i / this.xCount) * (this.tSize.y);
                    if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y))
                        continue;
                    pX -= this.view.x;
                    pY -= this.view.y;
                    ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y);
                }
            }
        }
        ctx.globalCompositeOperation = 'source-over';

    },
    loadMap(path) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                mapManager.parseMap(request.responseText);
            }
        }
        request.open("GET", path, true);
        request.send();
    },
    parseEntities: function () {
        if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.parseEntities();
            }, 100);
        } else {
            for (var j = 0; j < this.mapData.layers.length; j++)
                if (this.mapData.layers[j].type === "objectgroup") {
                    var entities = this.mapData.layers[j];
                    for (var i = 0; i < entities.objects.length; i++) {
                        var e = entities.objects[i];
                        try {
                            var obj = Object.create(gameManager.factory[e.name]);
                            obj.name = e.name;
                            obj.pos_x = e.x;
                            obj.pos_y = e.y - 32;
                            obj.size_x = e.width;
                            obj.size_y = e.height;
                            if (obj.name === "Ghost") {
                                obj.speed = randomInteger(3, 6);
                                obj.color = "pink";
                                obj.spawn_x = e.x;
                                obj.spawn_y = e.y - 32;
                                for (var k = 1; k < ghost_count; k++) {
                                    var new_obj = Object.create(gameManager.factory[e.name]);
                                    Object.assign(new_obj, obj);
                                    new_obj.color = getRandomArrayElement(["blue", "orange", "pink", "red"])[1];
                                    new_obj.pos_x = obj.pos_x + randomInteger(-20, 20);
                                    new_obj.pos_y = obj.pos_y + randomInteger(-20, 20);
                                    gameManager.entities.push(new_obj);
                                }
                            }
                            if (obj.name === "Dot") {
                                gameManager.dotsCount += 1;
                                obj.pos_y += 16;
                            }
                            gameManager.entities.push(obj);
                            if (obj.name === "Player") {
                                obj.spawn_x = e.x;
                                obj.spawn_y = e.y - 32;
                                gameManager.initPlayer(obj);
                            }
                        } catch (ex) {
                            console.log("Error while creating: [" + e.gid + "]" + e.type + ", " + ex);
                        }
                    }
                }
            while (fruits_count > 0) {
                var res = getRandomArrayElement(gameManager.entities);
                let id = res[0];
                let el = res[1];
                if (el.name === "Dot") {
                    var fr = Object.create(gameManager.factory["Fruit"]);
                    fr.pos_y = el.pos_y - 8;
                    fr.pos_x = el.pos_x - 8;
                    fr.size_x = 20;
                    fr.size_y = 20;
                    el.kill();
                    fr.name = getRandomArrayElement(["banana", "pineapple", "cherry"])[1];
                    gameManager.entities[id] = fr;
                    fruits_count -= 1;
                }
            }
        }
    },
    getTilesetIdx: function (x, y) {
        var wX = x;
        var wY = y;
        var idx = Math.floor(wY / this.tSize.y) * this.xCount + Math.floor(wX / this.tSize.x);
        return this.tLayer.data[idx];
    },
    centerAt: function (x, y) {
        if (x < this.view.w / 2)
            this.view.x = 0;
        else if (x > this.mapSize.x - this.view.w / 2)
            this.view.x = this.mapSize.x - this.view.w;
        else
            this.view.x = x - (this.view.w / 2);
        if (y < this.view.h / 2)
            this.view.y = 0;
        else if (y > this.mapSize.y - this.view.h / 2)
            this.view.y = this.mapSize.y - this.view.h;
        else
            this.view.y = y - (this.view.h / 2);
    },
}


var Entity = {
    pos_x: 0, pos_y: 0,
    size_x: 0, size_y: 0,
    extend: function (extendProto) {
        var object = Object.create(this);
        for (var property in extendProto) {
            if (this.hasOwnProperty(property) || typeof object[property] === 'undefined') {
                object[property] = extendProto[property];
            }
        }
        return object;
    }
}

var Sprite = {
    started: false,
    pos_x: 0,
    pos_y: 0,
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 0,
    numberOfFrames: 1,
    image: null,
    width: null,
    height: null,
    req: null,
    init: function (options) {
        this.started = false;
        this.pos_x = options.x || 0;
        this.pos_y = options.y || 0;
        this.image = options.image;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.width = options.width;
        this.height = options.height;
        this.req = null;
    },

    update: function () {
        this.tickCount++;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    },

    render: function () {
        ctx.clearRect(this.pos_x, this.pos_y, this.width / this.numberOfFrames, this.height - 2);
        if (!mapManager.isVisible(this.pos_x, this.pos_y, this.width, this.height))
            return;
        mapManager.draw(ctx);
        ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            this.pos_x,
            this.pos_y,
            this.width / this.numberOfFrames,
            this.height
        )
    },

    start: function () {
        if (!this.started) {
            this.started = true;
            let loop = () => {
                this.pos_x = gameManager.player.pos_x;
                this.pos_y = gameManager.player.pos_y;
                this.update();
                this.render();
                this.req = window.requestAnimationFrame(loop);
            }
            window.requestAnimationFrame(loop);
        }
    },

    end: function () {
        this.started = false;
        window.cancelAnimationFrame(this.req);
    },

    clear: function () {
        this.end();
    }
}


var Player = Entity.extend({
    lifetime: 100,
    spawn_x: 0, spawn_y: 0,
    move_x: 0, move_y: 0,
    speed: 5,
    sprite_left: Object.create(Sprite),
    sprite_right: Object.create(Sprite),
    sprite_down: Object.create(Sprite),
    sprite_up: Object.create(Sprite),
    draw: function (ctx) {
        if (this.pos_x >= mapManager.tSize.x * (mapManager.xCount - 1) - 5)
            this.pos_x = 5;
        else if (this.pos_x <= 5)
            this.pos_x = mapManager.tSize.x * (mapManager.xCount - 1) - 6;
        if (this.move_x === -1) {
            this.stopAllSprites(this.sprite_left);
            //spriteManager.drawSprite(ctx, "player_left", this.pos_x, this.pos_y);
        } else if (this.move_x === 1) {
            this.stopAllSprites(this.sprite_right);
            //spriteManager.drawSprite(ctx, "player_right", this.pos_x, this.pos_y);
        } else if (this.move_y === 1) {
            this.stopAllSprites(this.sprite_down);
            //spriteManager.drawSprite(ctx, "player_down", this.pos_x, this.pos_y);
        } else if (this.move_y === -1) {
            this.stopAllSprites(this.sprite_up);
            //spriteManager.drawSprite(ctx, "player_up", this.pos_x, this.pos_y);
        }
    },
    initAnim: function () {
        this.sprite_down.init({
            image: Object.assign(new Image(), {src: 'assets/pac man/down/pac_down.png'}),
            width: 96,
            height: 32,
            numberOfFrames: 3,
            ticksPerFrame: 4,
        });
        this.sprite_right.init({
            image: Object.assign(new Image(), {src: 'assets/pac man/right/pac_right.png'}),
            width: 96,
            height: 32,
            numberOfFrames: 3,
            ticksPerFrame: 4,
        });
        this.sprite_left.init({
            image: Object.assign(new Image(), {src: 'assets/pac man/left/pac_left.png'}),
            width: 96,
            height: 32,
            numberOfFrames: 3,
            ticksPerFrame: 4,
        });
        this.sprite_up.init({
            image: Object.assign(new Image(), {src: 'assets/pac man/up/pac_up.png'}),
            width: 96,
            height: 32,
            numberOfFrames: 3,
            ticksPerFrame: 4,
        });
    },
    stopAllSprites: function (sprite) {
        this.sprite_down.clear();
        this.sprite_left.clear();
        this.sprite_right.clear();
        this.sprite_up.clear();
        if (sprite)
            sprite.start();
    },
    update: function () {
        physicsManager.update(this);
    },
    onTouchEntity: function (obj) {
        if (obj.name === "cherry" || obj.name === "pineapple" || obj.name === "banana") {
            soundManager.play("assets/sounds/eatfruit.wav", {looping: false});
            this.lifetime+obj.health_regen >= 100 ? this.lifetime = 100 : this.lifetime += obj.health_regen;
            document.getElementById("health").innerText = "Player health: " + this.lifetime;
            obj.kill();
        }
        if (obj.name === "Dot") {
            soundManager.play("assets/sounds/chomp_2.wav", {looping: false});
            gameManager.score += obj.score_plus;
            document.getElementById("score").innerText = "SCORE: " + gameManager.score;
            obj.kill();
        }
        if (obj.name === "Ghost") {
            soundManager.play("assets/sounds/hurt.mp3", {looping: false});
            this.lifetime - obj.attack >= 0 ? this.lifetime -= obj.attack : this.lifetime = 0;
            document.getElementById("health").innerText = "Player health: " + this.lifetime;
            if (this.lifetime <= 0) {
                soundManager.play("assets/sounds/dead.mp3", {looping: false});
                this.kill();
            } else {
                obj.kill();
                soundManager.play("assets/sounds/hurt.mp3", {looping: false});
            }
        }
    },
    kill: function () {
        this.sprite_right.end();
        this.sprite_left.end();
        this.sprite_up.end();
        this.sprite_down.end();
        ctx.clearRect(this.pos_x, this.pos_y, this.size_x, this.size_y);
    },
    fire: function () {
    }
});

var Ghost = Entity.extend({
    lifetime: 100,
    color: "",
    spawn_x: 0, spawn_y: 0,
    move_x: 0, move_y: -1,
    speed: 1,
    attack: 10,
    draw: function (ctx) {
        if (this.move_x === -1) {
            spriteManager.drawSprite(ctx, this.color + "_enemy_left", this.pos_x, this.pos_y);
        } else if (this.move_x === 1) {
            spriteManager.drawSprite(ctx, this.color + "_enemy_right", this.pos_x, this.pos_y);
        } else if (this.move_y === 1) {
            spriteManager.drawSprite(ctx, this.color + "_enemy_left", this.pos_x, this.pos_y);
        } else if (this.move_y === -1) {
            spriteManager.drawSprite(ctx, this.color + "_enemy_right", this.pos_x, this.pos_y);
        }
    },
    update: function () {
        this.move_x = Math.random() > 0.5 ? 1 : -1;
        this.move_y = Math.random() > 0.5 ? 1 : -1;
        let cell_id_x = Math.floor((this.pos_x + 32) / mapManager.tSize.x);
        let cell_id_y = Math.floor((this.pos_y + 32) / mapManager.tSize.y);
        if (this.move_y === -1)
            cell_id_x = Math.floor((this.pos_x + 32) / mapManager.tSize.x);
        if (this.move_x === 1)
            cell_id_x = Math.floor((this.pos_x) / mapManager.tSize.x);
        if (this.move_y === -1)
            cell_id_y = Math.floor((this.pos_y + 32) / mapManager.tSize.y);
        if (this.move_y === 1)
            cell_id_y = Math.floor((this.pos_y) / mapManager.tSize.y);

        if (mapManager.grid[cell_id_y][cell_id_x - 1].wall)
            this.move_y = 1;
        var start = [cell_id_y, cell_id_x];
        let pl_id_x = Math.floor((gameManager.player.pos_x) / mapManager.tSize.x);
        let pl_id_y = Math.floor((gameManager.player.pos_y + 5) / mapManager.tSize.y);
        var end = [pl_id_y, pl_id_x];
        if (!mapManager.grid[pl_id_y][pl_id_x].wall) {
            let aStarInstance = new AStar(start, end, mapManager.grid);
            aStarInstance.startAlgorithm();
            let optimalPath = aStarInstance.optimalPath;
            let first_node = optimalPath[optimalPath.length - 2];
            this.move_x = 0;
            this.move_y = 0;
            if (first_node.row !== cell_id_y) {
                if (first_node.row > cell_id_y) {
                    this.move_y = 1;
                } else {
                    this.move_y = -1;
                }
            } else if (first_node.col !== cell_id_x) {
                if (first_node.col > cell_id_x) {
                    this.move_x = 1;
                } else {
                    this.move_x = -1;
                }
            }
        }
        physicsManager.update(this);
    },
    onTouchEntity: function (obj) {
        if (obj.name === "Player") {
            obj.onTouchEntity(this);
        }
    },
    kill: function () {
        ctx.clearRect(this.pos_x, this.pos_y, this.size_x, this.size_y);
        this.pos_x = this.spawn_x;
        this.pos_y = this.spawn_y;
    },
    fire: function () {
    }
});

var Fruit = Entity.extend({
    health_regen: 10,
    draw: function (ctx) {
        spriteManager.drawSprite(ctx, this.name, this.pos_x, this.pos_y);
    },
    kill: function () {
        ctx.clearRect(this.pos_x, this.pos_y, this.size_x, this.size_y);
        gameManager.laterKill.push(this);
    }
});

var Dot = Entity.extend({
    score_plus: 50,
    draw: function (ctx) {
        spriteManager.drawSprite(ctx, "dot", this.pos_x, this.pos_y);
    },
    kill: function () {
        ctx.clearRect(this.pos_x, this.pos_y, this.size_x, this.size_y);
        gameManager.laterKill.push(this);
    }
});

var spriteManager = {
    image: new Image(),
    sprites: new Array(),
    imgLoaded: false,
    jsonLoaded: false,
    loadAtlas: function (atlasJson, atlasImg) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                spriteManager.parseAtlas(request.responseText);
            }
        };
        request.open("GET", atlasJson, true);
        request.send();
        this.loadImg(atlasImg);
    },
    loadImg: function (imgName) {
        this.image.onload = function () {
            spriteManager.imgLoaded = true;
        };
        this.image.style.zIndex = "2";
        this.image.src = imgName;
    },
    parseAtlas: function (atlasJson) {
        var atlas = JSON.parse(atlasJson);
        for (var name in atlas.frames) {
            var frame = atlas.frames[name].frame;
            this.sprites.push({name: name, x: frame.x, y: frame.y, w: frame.w, h: frame.h});
        }
        this.jsonLoaded = true;
    },
    drawSprite: function (ctx, name, x, y) {
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(function () {
                spriteManager.drawSprite(ctx, name, x, y);
            }, 100);
        } else {
            var sprite = this.getSprite(name);
            if (!mapManager.isVisible(x, y, sprite.w, sprite.h))
                return;
            // x -= mapManager.view.x;
            // y -= mapManager.view.y;
            if (name === "dot")
                ctx.globalCompositeOperation = 'destination-over';
            else
                ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(this.image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
            ctx.globalCompositeOperation = 'source-over';
        }
    },
    getSprite: function (name) {
        for (var i = 0; i < this.sprites.length; i++) {
            var s = this.sprites[i];
            if (s.name === name)
                return s;
        }
        return null;
    }
};

var eventsManager = {
    bind: [],
    action: [],
    setup: function (canvas) {
        this.bind[87] = 'up';
        this.bind[65] = 'left';
        this.bind[83] = 'down';
        this.bind[68] = 'right';
        this.bind[32] = 'fire';
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mouseup", this.onMouseUp);
        document.body.addEventListener("keydown", this.onKeyDown);
        document.body.addEventListener("keyup", this.onKeyUp);
    },
    onMouseDown: function (event) {
        eventsManager.action['spawn'] = true;
    },
    onMouseUp: function (event) {
        eventsManager.action['spawn'] = false;
    },
    onKeyDown: function (event) {
        var action = eventsManager.bind[event.keyCode];
        if (action)
            eventsManager.action[action] = true;
    },
    onKeyUp: function (event) {
        var action = eventsManager.bind[event.keyCode];
        if (action)
            eventsManager.action[action] = false;
    },
};

var physicsManager = {
    update: function (obj) {
        if (obj.move_x === 0 && obj.move_y === 0)
            return "stop";
        var newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        var newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);
        var ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2);
        if (obj.name === "Player" || obj.name === "Ghost") {
            if (obj.move_y === 1) ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y - 4);
            if (obj.move_y === -1) ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + 4);
            if (obj.move_x === 1) ts = mapManager.getTilesetIdx(newX + obj.size_x - 4, newY + 4);
            if (obj.move_x === -1) ts = mapManager.getTilesetIdx(newX, newY + 4);
        }

        var e = this.entityAtXY(obj, newX, newY);
        if (e !== null && obj.onTouchEntity)
            obj.onTouchEntity(e);
        if (ts === 0 && obj.onTouchMap)
            obj.onTouchMap(ts);
        if (ts === 0) {
            ctx.clearRect(obj.pos_x, obj.pos_y, obj.size_x, obj.size_y);
            obj.pos_x = newX;
            obj.pos_y = newY;
        } else
            return "break";
        return "move";
    },
    entityAtXY: function (obj, x, y) {
        for (var i = 0; i < gameManager.entities.length; i++) {
            var e = gameManager.entities[i];
            if (e.name !== obj.name) {
                if (x + obj.size_x < e.pos_x || y + obj.size_y < e.pos_y || x > e.pos_x + e.size_x || y > e.pos_y + e.size_y)
                    continue;
                return e;
            }
        }
        return null;
    }
};


var gameManager = {
    score: 0,
    intervalID: null,
    dotsCount: -fruits_count,
    factory: {},
    entities: [],
    fireNum: 0,
    player: null,
    laterKill: [],
    start: false,
    initPlayer: function (obj) {
        this.player = obj;
        this.player.initAnim();
        spriteManager.drawSprite(ctx, "player_right", this.player.pos_x, this.player.pos_y);
        //this.player.sprite_right.start();
    },
    kill: function (obj) {
        this.laterKill.push(obj);
    },
    update: function () {
        if (this.player === null)
            return;
        document.getElementById('level').textContent = "Level: " + level;
        if (eventsManager.action["spawn"]) {
            let new_ghost = Object.create(this.factory["Ghost"]);
            for (var i = 0; i < gameManager.entities.length; i++)
                if (gameManager.entities[i].name === "Ghost")
                    new_ghost =  Object.assign(Object.create(this.factory["Ghost"]), gameManager.entities[i]);
            new_ghost.pos_x = new_ghost.spawn_x;
            new_ghost.pos_y = new_ghost.spawn_y;
            new_ghost.color = getRandomArrayElement(["red", "blue", "orange", "pink"])[1];
            new_ghost.speed = randomInteger(3, 6);
            this.entities.push(Object.assign(Object.create(gameManager.factory["Ghost"]), new_ghost));
        }
        if (eventsManager.action["up"]) {
            this.player.move_y = -1;
            this.player.move_x = 0;
        }
        if (eventsManager.action["down"]) {
            this.player.move_y = 1;
            this.player.move_x = 0;
        }
        if (eventsManager.action["left"]) {
            this.player.move_x = -1;
            this.player.move_y = 0;
        }
        if (eventsManager.action["right"]) {
            this.player.move_x = 1;
            this.player.move_y = 0;
        }
        this.entities.forEach(function (e) {
            try {
                e.update();
            } catch (ex) {
            }
        });
        for (var i = 0; i < this.laterKill.length; i++) {
            var idx = this.entities.indexOf(this.laterKill[i]);
            if (idx > -1)
                this.entities.splice(idx, 1);
        }
        if (this.laterKill.length > 0)
            this.laterKill.length = 0;
        mapManager.draw(ctx);
        //mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.draw(ctx);
    },
    draw: function (ctx) {
        for (var e = 0; e < this.entities.length; e++) {
            this.entities[e].draw(ctx);
        }
    },
    loadAll: function () {
        level === 1 ? mapManager.loadMap("assets/mappac.json") : mapManager.loadMap("assets/mappac_next.json");
        spriteManager.loadAtlas("assets/sprites_new.json", "assets/spritesheet_new.png");
        gameManager.factory['Player'] = Player;
        gameManager.factory['Ghost'] = Ghost;
        gameManager.factory['Dot'] = Dot;
        gameManager.factory['Fruit'] = Fruit;
        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);
    },
    play: function () {
        mapManager.setGrid();
        this.intervalID = setInterval(updateWorld, 90);
    },
    clear: function () {
        this.entities.length = 0;
        this.laterKill.length = 0;
    }
};

function updateWorld() {
    if (gameManager.player.lifetime > 0) {
        gameManager.update();
    } else {
        gameManager.start = false;
        soundManager.stopAll();
        soundManager.play("assets/sounds/dead.mp3", {looping: false});

        clearInterval(gameManager.intervalID);
        updateScoreTable();
        document.getElementById("game_over").innerText = "SCORE: "+gameManager.score+" LEVEL: "+level+" BRUH...";
        document.querySelector(".popup_end").style.display = "block";
        document.querySelector('.container').style.filter = "blur(2px) opacity(0.8) brightness(0.5) drop-shadow(0 0 1rem black)";
    }
    if (gameManager.score === gameManager.dotsCount * Dot.score_plus * level) {
        gameManager.player.stopAllSprites();
        soundManager.stopAll();
        updateScoreTable();
        if (level === 1) mapManager.clear();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameManager.start = false;
        level += 1;
        fruits_count = 10 / level;
        ghost_count = level * 3;
        gameManager.player.pos_x = gameManager.player.spawn_x;
        gameManager.player.pos_y = gameManager.player.spawn_y;
        gameManager.player.move_y = 0;
        gameManager.player.move_x = 0;
        gameManager.player.kill();
        gameManager.clear();
        gameManager.loadAll();
        clearInterval(gameManager.intervalID);
        document.querySelector('.container').style.filter = "blur(2px) opacity(0.8) brightness(0.5) drop-shadow(0 0 1rem black)";
        document.querySelector(".popup_level").style.display = "block";
    }
}

var soundManager = {
    clips: {},
    context: null,
    gainNode: null,
    loaded: false,
    muted: false,
    init: function () {
        this.context = new AudioContext();
        this.context.resume();
        this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
        this.gainNode.connect(this.context.destination);
    },
    load: function (path, callback) {
        if (this.clips[path]) {
            callback(this.clips[path]);
            return;
        }
        var clip = {path: path, buffer: null, loaded: false};
        clip.play = function (volume, loop) {
            soundManager.play(this.path, {looping: loop ? loop : false, volume: volume ? volume : 0.1});
        }
        this.clips[path] = clip;
        var request = new XMLHttpRequest();
        request.open("GET", path, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            soundManager.context.decodeAudioData(request.response, function (buffer) {
                clip.buffer = buffer;
                clip.loaded = true;
                callback(clip);
            });
        };
        request.send();
    },
    loadArray: function (array) {
        for (var i = 0; i < array.length; i++) {
            soundManager.load(array[i], function () {
                if (array.length === Object.keys(soundManager.clips).length) {
                    for (sd in soundManager.clips)
                        if (!soundManager.clips[sd].loaded) return;
                    soundManager.loaded = true;
                }
            });
        }
    },
    play: function (path, settings) {
        if (!this.muted) {
            if (!soundManager.loaded) {
                setTimeout(function () {
                    soundManager.play(path, settings)
                }, 1000);
                return;
            }
            var looping = false;
            var volume = 0.1;
            if (settings) {
                if (settings.looping)
                    looping = settings.looping;
                if (settings.volume)
                    volume = settings.volume;
            }
            var sd = this.clips[path];
            if (sd === null)
                return false;
            var sound = soundManager.context.createBufferSource();
            sound.buffer = sd.buffer;
            sound.connect(soundManager.gainNode);
            sound.loop = looping;
            soundManager.gainNode.gain.value = volume;
            sound.start(0);
            return true;
        }
    },
    stop: function (path) {
        if (!soundManager.loaded) {
            setTimeout(function (path) {
                soundManager.stop(path)
            }, 1000);
            return;
        }
        this.gainNode.stop(0);
    },
    toggleMute() {
        this.muted = !this.muted;
        if (this.gainNode.gain.value > 0)
            this.gainNode.gain.value = 0;
        else
            this.gainNode.gain.value = 0.1;
    },
    stopAll() {
        this.gainNode.disconnect();
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.context.destination);
    }
}

function playWorldSound(path, x, y) {
    if (gameManager.player === null) {
        return;
    }
    var viewSize = Math.max(mapManager.view.w, mapManager.view.h) * 0.8;
    var dx = Math.abs(gameManager.player.pos_x - x);
    var dy = Math.abs(gameManager.player.pos_y - y);
    var distance = Math.sqrt(dx * dx + dy * dy);
    var norm = distance / viewSize;
    if (norm > 1)
        norm = 1;
    var volume = 1.0 - norm;
    if (!volume)
        return;
    soundManager.play(path, {looping: false, volume: volume});
}

function updateScoreTable() {
    let SCORE = gameManager.score;
    if (localStorage['current_score'] < SCORE)
        localStorage['current_score'] = SCORE;
    let records = localStorage['SCORE'];
    if (records !== undefined && records.length) {
        records = JSON.parse(records);
        if (records[localStorage['current_user'].toUpperCase()]) {
            if (records[localStorage['current_user'].toUpperCase()] < SCORE)
                records[localStorage['current_user'].toUpperCase()] = SCORE;
        } else {
            records[localStorage['current_user'].toUpperCase()] = SCORE;
        }
    } else {
        records = {};
        records[localStorage['current_user'].toUpperCase()] = SCORE;
    }
    localStorage['SCORE'] = JSON.stringify(records);
}
