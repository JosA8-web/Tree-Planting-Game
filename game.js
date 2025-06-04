const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let trees = [];
let score = 0;

// Tree class
class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.growthRate = 0.1;
  }

  grow() {
    this.size += this.growthRate;
  }

  draw(ctx) {
    // Draw trunk
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(this.x - 2, this.y, 4, 20);

    // Draw leaves
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
  }
}

// Plant a tree on click
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  trees.push(new Tree(x, y));
  score++;
});

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

  // Draw and grow trees
  trees.forEach((tree) => {
    tree.grow();
    tree.draw(ctx);
  });

  // Score display
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Trees Planted: ${score}`, 20, 30);

  requestAnimationFrame(update);
}

update();
