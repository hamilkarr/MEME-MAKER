const saveBtn = document.getElementById('save');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraseBtn = document.getElementById('erase-btn');
const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(
    document.getElementsByClassName('color-option')
);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.height = CANVAS_WIDTH;
canvas.width = CANVAS_HEIGHT;
ctx.lineCap = 'round';
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
    isPainting = true;
}
function cancelPainting() {
    isPainting = false;
    ctx.beginPath();
}
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = 'Fill';
    } else {
        isFilling = true;
        modeBtn.innerText = 'Draw';
    }
}
function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    }
}
function onDestroyClick() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
}
function onEraseClick() {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    color.value = 'white';
    isFilling = false;
    modeBtn.innerText = 'Fill';
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = () => ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    fileInput.value = null;
}
function onDoubleClick(event) {
    const text = textInput.value;
    if (!text) return;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = '40px sans-serif';
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
}
function onSaveClick(event) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myDrawing.png';
    a.click();
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', function (event) {
    ctx.lineWidth = event.target.value;
});
color.addEventListener('change', onColorChange);
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraseBtn.addEventListener('click', onEraseClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
