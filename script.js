const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

console.log(canvas.getBoundingClientRect())

window.addEventListener('resize', function() {
    draw();
})

canvas.addEventListener('mousemove', function(e) {
    console.log(e)
    draw(e.clientX, e.clientY);
})

let rects = [];

const h = 2;
const w = 2;
const ps = canvas.height / h


function generateGrid() {
    // ctx.scale(5,5)
    console.log(ps)
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < w; j++) {
            let p = {x: i * 250 , y: j * 250, fill:  i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0 ? 'white': '#BEBEBE'}
            rects.push(p)
            console.log(p)
            ctx.fillStyle = p.fill
            ctx.fillRect(p.x, p.y, ps, ps)
        }
    }
}

function draw(x,y) {
    let color = 'green'
    let i = 0
    while(r = rects[i++]) {
        ctx.beginPath();
        ctx.rect(r.x, r.y, ps, ps);    
        
        ctx.fillStyle = ctx.isPointInPath(x, y) ? "red" : r.fill;
        ctx.fill();
      }
    
}

generateGrid();