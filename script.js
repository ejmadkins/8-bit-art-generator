
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let mousePressed = false

window.addEventListener('resize', function() {
    draw();
})

canvas.addEventListener('mousemove', function(e) {
    draw(e.clientX, e.clientY);
})

canvas.addEventListener('mousedown', function(e) {
    mousePressed = true
    draw(e.clientX, e.clientY);
})

canvas.addEventListener('mouseup', function(e) {
    mousePressed = false
})

canvas.addEventListener('mouseleave', function(e) {
    mousePressed = false
    ctx.fillStyle = pixels[prevPixel.x][prevPixel.y].fill
    ctx.fillRect(pixels[prevPixel.x][prevPixel.y].x, pixels[prevPixel.x][prevPixel.y].y, ps, ps)    
    prevPixel = {x: undefined, y: undefined }

})

let pixels = [];

const h = 16;
const w = 16;

// todo: Change this when a resize event occure and the grid is drawn.
// implement a render grid function and use this in init grid. Seperate the initial creation of the pixel array.
// the pixel position will need to be computed each draw.
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
    if (mousePressed) {
        let color = document.getElementById('color').value
        // Interpolate if mouse is more than 1 pixel away:
        if(Math.abs(p.x - prevPixel.x) > 1 || Math.abs(p.y - prevPixel.y) > 1) {
            if(p.x === prevPixel.x) {
                    for(i = p.y > prevPixel.y ? prevPixel.y : p.y; i > p.y; i++) {
                        pixels[interpPixels[i].x][interpPixels[i].y].fill = color
                        ctx.fillStyle = color
                        ctx.fillRect(pixels[p.x][i].x, pixels[p.x][i].y, ps, ps)
                        prevPixel = p
                    }
                return
            }
            if(p.y === prevPixel.y) {
                for(i = p.x > prevPixel.x ? prevPixel.x : p.x; i > p.x; i++) {
                    pixels[interpPixels[i].x][interpPixels[i].y].fill = color
                    ctx.fillStyle = color
                    ctx.fillRect(pixels[p.x][i].x, pixels[p.x][i].y, ps, ps)
                    prevPixel = p
                }
                return
            }
            interpPixels = helper(prevPixel.x, prevPixel.y, p.x, p.y)
            for(let i = 0; i < interpPixels.length; i++) {
                pixels[interpPixels[i].x][interpPixels[i].y].fill = color
                ctx.fillStyle = color
                ctx.fillRect(pixels[interpPixels[i].x][interpPixels[i].y].x, pixels[interpPixels[i].x][interpPixels[i].y].y, ps, ps)
            }
        }
        pixels[p.x][p.y].fill = color
        ctx.fillStyle = color
        ctx.fillRect(pixels[p.x][p.y].x, pixels[p.x][p.y].y, ps, ps)
        prevPixel = p
    } else {
        if (prevPixel.x != p.x && prevPixel.x != undefined || prevPixel.y != p.y && prevPixel.y != undefined) {
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
}

function helper(x0, y0, x1, y1) {
    num_xvals = Math.max(Math.abs(y1-y0), Math.abs(x1-x0))+1
    xvals = Array.from({length: num_xvals}, (v, i) => x0+(i+1)*(x1-x0)/(num_xvals))
    interpPixels = []
    for(let i = 0; i < xvals.length; i++) {
        let p = { x: Math.round(xvals[i]), y: Math.round(interpolate(x0, y0, x1, y1, xvals[i]))}
        interpPixels.push(p)
    }
    return interpPixels
}

function interpolate(x0, y0, x1, y1, x) {
    y = (y0*(x1 - x) + y1*(x - x0))/(x1 - x0)
    return y
}

generateGrid();
