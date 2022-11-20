/* eslint-disable require-jsdoc */
'use strict';

const imageUploader = document.querySelector('#image-file');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.crossOrigin = 'anonymous';

const actionTypeColor = {
  text: '#fff',
  me: '#E066FF',
  do: '#E066FF',
  todo: '#E066FF',
}

const actionType = {
  text: 'text',
  me: 'me',
  do: 'do',
  todo: 'todo',
};

const formattedTextDataList = [
  {id: 1, coords: {x: 5, y: 20}, text: '', actionType: actionType.text},
  {id: 2, coords: {x: 5, y: 40}, text: '', actionType: actionType.text},
  {id: 3, coords: {x: 5, y: 60}, text: '', actionType: actionType.text},
  {id: 4, coords: {x: 5, y: 80}, text: '', actionType: actionType.text},
  {id: 5, coords: {x: 5, y: 100}, text: '', actionType: actionType.text},
  {id: 6, coords: {x: 5, y: 120}, text: '', actionType: actionType.text},
  {id: 7, coords: {x: 5, y: 140}, text: '', actionType: actionType.text},
  {id: 8, coords: {x: 5, y: 160}, text: '', actionType: actionType.text},
  {id: 9, coords: {x: 5, y: 180}, text: '', actionType: actionType.text},
  {id: 10, coords: {x: 5, y: 200}, text: '', actionType: actionType.text},
  {id: 11, coords: {x: 5, y: 220}, text: '', actionType: actionType.text},
  {id: 12, coords: {x: 5, y: 240}, text: '', actionType: actionType.text},
  {id: 13, coords: {x: 5, y: 260}, text: '', actionType: actionType.text},
  {id: 14, coords: {x: 5, y: 280}, text: '', actionType: actionType.text},
  {id: 15, coords: {x: 5, y: 300}, text: '', actionType: actionType.text},
  {id: 16, coords: {x: 5, y: 320}, text: '', actionType: actionType.text},
];

const textParams = {
  fillStyle: 'white',
  textBaseline: 'middle',
  fontFamily: 'Proxima Nova',
  fontSize: '20px',
  strokeStyle: 'black',
  strokeLineWidth: 2,
  rowMargin: 0,
  imageSource: 'https://unsplash.it/1920/1080/?random',
  canvasURL: null,
};

const drawOverlay = () => {
  ctx.drawImage(img, 0, 0);
};

function downloadImage() {
  let canvasUrl = canvas.toDataURL();
  const createEl = document.createElement('a');
  createEl.href = canvasUrl;
  createEl.download = "rpw-ss";
  createEl.click();
  createEl.remove();
}

const setDrawTextParams = () => {
  ctx.fillStyle = textParams.fillStyle;
  ctx.textBaseline = textParams.textBaseline;
  ctx.font = `${textParams.font} ${textParams.fontSize}`;
  setStroke(textParams.strokeLineWidth);
};

function setStroke(lineWidth) {
  lineWidth = parseInt(lineWidth);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = textParams.strokeStyle;
  textParams.strokeLineWidth = lineWidth;
  applyFontParams();
}

function setRowActionType(rowId, action) {
  const foundRowId = getFormattedTextByRowId(rowId);
  foundRowId.actionType = action;
  applyFontParams();
}

function setTextColorByType(color) {
  ctx.fillStyle = color;
}

function setRowMargin(rowMargin) {
  textParams.rowMargin = rowMargin;
  applyFontParams();
}

function setFontSize(size) {
  textParams.fontSize = size + 'px';
  applyFontParams();
}

function setFontFamily(fontFamily) {
  textParams.fontFamily = fontFamily;
  applyFontParams();
}

function applyFontParams() {
  ctx.font = `${textParams.fontSize} ${textParams.fontFamily}`;
  clearTextOnImage();
  drawOverlay();
  fillFormattedText();
}

function clearTextOnImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderDynamicText(text, rowId) {
  const formattedTextData = getFormattedTextByRowId(rowId);
  if (formattedTextData === undefined) return;
  clearTextOnImage();
  drawOverlay();
  setDrawTextParams();
  setFormattedText(formattedTextData, text);
  fillFormattedText();
}

function fillFormattedText() {
  formattedTextDataList.forEach(data => {
    if (data.text !== null) {
      let offsetX = 0;
      switch(data.actionType) {
        case actionType.text:
          setTextColorByType(actionTypeColor.text);
          fillTextOnImage(data.text, data.coords, data.id, offsetX);
          break;
        case actionType.me:
          setTextColorByType(actionTypeColor.me);
          fillTextOnImage(data.text, data.coords, data.id, offsetX);
          break;
        case actionType.do:
          setTextColorByType(actionTypeColor.do);
          fillTextOnImage(data.text, data.coords, data.id, offsetX);
          break;
        case actionType.todo:
          const [todoText, todoAction] = splitTodoActionText(data.text);
          if (todoAction !== undefined && todoText !== undefined) {
            setTextColorByType(actionTypeColor.text);
            fillTextOnImage(todoText, data.coords, data.id, offsetX);
            setTextColorByType(actionTypeColor.todo);
            const todoTextWidth = getMeasureTextWidth(todoText);
            offsetX = todoTextWidth;
            fillTextOnImage(todoAction, data.coords, data.id, offsetX);
          }
          break;
      }
    }
  });
}

function fillTextOnImage(text, coords, rowId, offsetX) {
  textParams.rowMargin = parseInt(textParams.rowMargin);
  ctx.strokeText(text, coords.x + offsetX, coords.y + textParams.rowMargin * (rowId - 1));
  ctx.fillText(text, coords.x + offsetX, coords.y + textParams.rowMargin * (rowId - 1));
}

function getMeasureTextWidth(text) {
  return ctx.measureText(text).width;
}

function splitTodoActionText(text) {
  if (text.includes(', - сказал') === false) return undefined;
  const actionStartIndex = text.indexOf(', - сказал');
  return [text.slice(0, actionStartIndex + 1), text.slice(actionStartIndex + 1)];
}

function setFormattedText(formattedTextData, newText) {
  formattedTextData.text = newText;
}

function getFormattedTextByRowId(rowId) {
  return formattedTextDataList.find(data => data.id === rowId);
}

const drawImage = () => {
  img.onload = () => {
    drawOverlay();
    fillFormattedText();
  };
  img.src = textParams.imageSource;
};

window.addEventListener('load', () => {
  drawImage();
});

const handleImage = e => {
  const reader = new FileReader();
  reader.onload = function(event) {
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);
    };
    textParams.imageSource = event.target.result;
    img.src = event.target.result;
    canvas.classList.add('show');
    drawOverlay();
  };

  reader.readAsDataURL(e.target.files[0]);
};

imageUploader.addEventListener('change', handleImage, false);
