'use strict';

const editTab = document.querySelector('#edit-tab');
const imageTab = document.querySelector('#image-tab');
const textareaInput = document.querySelector('#chatlog');
const imageEditorPreview = document.querySelector('.editor');
const uploadLogBtn = document.querySelector('.upload__text');
const formatBtn = document.querySelector('#btn1');
const swapBtns = document.querySelector('.swap');
const form = document.querySelector('#form');
const leftMenu = document.querySelector('.main__left-wrapper');
const asideRight = document.querySelector('.aside_right');
const outputTextarea = document.querySelector('#textarea2');

editTab.addEventListener('click', () => {
  if (imageTab.classList.contains('processing__tab_active')) {
    editTab.classList.add('processing__tab_active');
    imageTab.classList.remove('processing__tab_active');
    textareaInput.classList.remove('visually-hidden');
    imageEditorPreview.classList.add('visually-hidden');
    uploadLogBtn.classList.remove('visually-hidden');
    formatBtn.classList.remove('visually-hidden');
    swapBtns.classList.remove('visually-hidden');
    form.style.display = 'block';
    leftMenu.classList.add('visually-hidden');
    asideRight.classList.add('aside_hidden');
    outputTextarea.classList.remove('processing__textarea-output_low');
  }
});

imageTab.addEventListener('click', () => {
  if (editTab.classList.contains('processing__tab_active')) {
    imageTab.classList.add('processing__tab_active');
    editTab.classList.remove('processing__tab_active');
    textareaInput.classList.add('visually-hidden');
    imageEditorPreview.classList.remove('visually-hidden');
    uploadLogBtn.classList.add('visually-hidden');
    formatBtn.classList.add('visually-hidden');
    swapBtns.classList.add('visually-hidden');
    form.style.display = 'none';
    leftMenu.classList.remove('visually-hidden');
    asideRight.classList.remove('aside_hidden');
    outputTextarea.classList.add('processing__textarea-output_low');
  }
});