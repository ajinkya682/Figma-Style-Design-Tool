const createRectangle = document.getElementById("create-rectangle");
const createText = document.getElementById("create-text");
const canvas = document.getElementById("canvas");
const layerPanel = document.getElementById("layer");

let rectCount = 0;

// CLICK OUTSIDE → DESELECT
document.addEventListener("mousedown", e => {
  if (!e.target.closest(".rectangle") && !e.target.closest(".layer")) {
    deselectAll();
  }
});

// DELETE / BACKSPACE KEY
document.addEventListener("keydown", e => {
  if (e.key !== "Delete" && e.key !== "Backspace") return;

  const activeRect = document.querySelector(".rectangle.active");
  if (!activeRect) return;

  const id = activeRect.dataset.id;

  // remove rectangle
  activeRect.remove();

  // remove layer
  const layer = document.querySelector(`.layer[data-id="${id}"]`);
  if (layer) layer.remove();
});

createRectangle.addEventListener("click", () => {
  rectCount++;

  // CREATE RECTANGLE
  const rectangle = document.createElement("div");
  rectangle.className = "rectangle";
  rectangle.dataset.id = rectCount;

  rectangle.style.backgroundColor = randomRGB();
  rectangle.style.width = "150px";
  rectangle.style.height = "100px";
  rectangle.style.position = "absolute";
  rectangle.style.left = "50px";
  rectangle.style.top = "50px";

  canvas.appendChild(rectangle);

  // CREATE LAYER
  const layerItem = document.createElement("div");
  layerItem.className = "layer";
  layerItem.dataset.id = rectCount;
  layerItem.textContent = `Rectangle ${rectCount}`;

  layerPanel.appendChild(layerItem);

  // LAYER CLICK → SELECT RECTANGLE
  layerItem.addEventListener("click", e => {
    e.stopPropagation();
    selectRectangle(rectangle);
  });

  // ENABLE RECTANGLE
  enableRectangle(rectangle);
});

createText.addEventListener("click", () => {
  alert("Create Soon!");
});

// ================================
// HELPERS
// ================================
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function deselectAll() {
  document.querySelectorAll(".rectangle").forEach(r =>
    r.classList.remove("active")
  );
}

function selectRectangle(rectangle) {
  deselectAll();
  rectangle.classList.add("active");
}

// ================================
// RECTANGLE LOGIC
// ================================
function enableRectangle(rectangle) {
  let isDragging = false;
  let isResizing = false;
  let startX, startY, startW, startH, startTop, startLeft;

  // RESIZE HANDLE
  const handle = document.createElement("div");
  handle.className = "resize-handle";
  rectangle.appendChild(handle);

  // SELECT + ACTION
  rectangle.addEventListener("mousedown", e => {
    e.stopPropagation();
    selectRectangle(rectangle);

    startX = e.clientX;
    startY = e.clientY;
    startW = rectangle.offsetWidth;
    startH = rectangle.offsetHeight;
    startTop = rectangle.offsetTop;
    startLeft = rectangle.offsetLeft;

    if (e.target === handle) {
      isResizing = true;
    } else {
      isDragging = true;
    }
  });

  // MOVE / RESIZE
  document.addEventListener("mousemove", e => {
    if (!rectangle.classList.contains("active")) return;

    if (isDragging) {
      rectangle.style.left = startLeft + (e.clientX - startX) + "px";
      rectangle.style.top = startTop + (e.clientY - startY) + "px";
    }

    if (isResizing) {
      rectangle.style.width = startW + (e.clientX - startX) + "px";
      rectangle.style.height = startH + (e.clientY - startY) + "px";
    }
  });

  // STOP
  document.addEventListener("mouseup", () => {
    isDragging = false;
    isResizing = false;
  });
}


function notSoon(){
    alert("Create Soon")
}
