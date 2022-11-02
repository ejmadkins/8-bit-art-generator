
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let mousePressed = false

console.log(canvas.getBoundingClientRect())

window.addEventListener('resize', function() {
    draw();
})

canvas.addEventListener('mousemove', function(e) {
    draw(e.clientX, e.clientY);
})

canvas.addEventListener('mousedown', function(e) {
    mousePressed = true
})

canvas.addEventListener('mouseup', function(e) {
    mousePressed = false
})

let pixels = [];

const h = 20;
const w = 20;
const ps = canvas.height / h

let prevPixel = {x: undefined, y: undefined}



function generateGrid() {
    for(let i = 0; i < h; i++) {
        pixels[i] = []
        for(let j = 0; j < w; j++) {
            p = {x: i * ps, y: j * ps , fill: i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0 ? 'white': '#D0D0D0'}
            pixels[i][j] = p
            ctx.fillStyle = p.fill
            ctx.fillRect(p.x, p.y, ps, ps)
        }
    }
}

function getPixel(x,y) {
    px = Math.floor(x / ps)
    py = Math.floor(y / ps)
    return {x: px, y: py}
}

function draw(x,y) {
    p = getPixel(x,y)
    if (prevPixel.x != p.x && prevPixel.x != undefined || prevPixel.y != p.y && prevPixel.y != undefined) {
        console.log("fixing prev pixel: " + prevPixel)
        ctx.fillStyle = pixels[prevPixel.x][prevPixel.y].fill
        ctx.fillRect(pixels[prevPixel.x][prevPixel.y].x, pixels[prevPixel.x][prevPixel.y].y, ps, ps)
    } if (prevPixel.x === p.x && prevPixel.y === p.y) {
        return
    } else {       
        prevPixel = p
        let color = '#888888'
        ctx.fillStyle = color
        ctx.fillRect(pixels[p.x][p.y].x, pixels[p.x][p.y].y, ps, ps)
    }
}

generateGrid();