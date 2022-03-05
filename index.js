const blurElement = document.getElementById("blur");
const contrastElement = document.getElementById("contrast");
const hueRotateElement = document.getElementById("hue-rotate");
const sepiaElement = document.getElementById("sepia");

const fileInputElement = document.getElementById("file-input");
const fileNameElement = document.getElementById("file-name");
const chosenImageElement = document.getElementById("chosen-image");
const defaultImageElement = document.getElementById("default-image");
const wrapperImageElement = document.querySelector(".wrapper-image");
const wrapperInputElement = document.querySelector(".wrapper-input");
const submitButtonElement = document.getElementById("submit-button");
const imageCompareSliderElement = document.getElementById("img-comp-slider")

const imageContainerElement = document.querySelector(".image-container");
const sliders = document.querySelectorAll(".filter input[type='range']");
const imgCompOverlayElement = document.getElementById("img-comp-overlay");



submitButtonElement.addEventListener('click',() => {
  wrapperImageElement.style.visibility = 'visible';
  wrapperInputElement.style.display = "none";
})


function attachEventListenerToFileInput() {
  fileInputElement.addEventListener("change", changeFileName)
  function changeFileName(){
    const file = fileInputElement.files[0];
    fileNameElement.innerHTML = file.name;
  }
}

function resetFilter(){
  blurElement.value = "0";
  contrastElement.value = "100";
  hueRotateElement.value = "25";
  sepiaElement.value = "0";
  addFilter();
} 

fileInputElement.onchange = () => {
  resetFilter();
  let reader = new FileReader();
  reader.readAsDataURL(fileInputElement.files[0])
  reader.addEventListener("load", function(){
      chosenImageElement.setAttribute("src", reader.result)
      defaultImageElement.setAttribute("src", reader.result)
  })
}

sliders.forEach( slider => {
    slider.addEventListener("input", addFilter);
});

function addFilter(){
  chosenImageElement.style.filter = `blur(${blurElement.value}px) contrast(${contrastElement.value}%) hue-rotate(${hueRotateElement.value}deg) sepia(${sepiaElement.value}%)`;
}



function compareImage(img) {
  function slideReady(e) {
    function slideMove(e) {
      function getCursorPos(e) {
        let a, x = 0;
        e = e || window.event;
        /*получить x позиции изображения:*/
        a = img.getBoundingClientRect();
        /*вычислите координату х курсора относительно изображения:*/
        x = e.pageX - a.left;
        /*рассмотрим любую прокрутку страницы:*/
        x = x - window.pageXOffset;
        return x;
      }
  
      function slide(x) {
        /*изменение размера изображения:*/
        img.style.width = x + "px";
        /*расположите ползунок:*/
        imageCompareSliderElement.style.left = img.offsetWidth - (imageCompareSliderElement.offsetWidth / 2) + "px";
      }
  
      let pos;
      /*если ползунок больше не нажат, выйдите из этой функции:*/
      if (clicked == 0) return false;
      /*получить х положения курсора :*/
      pos = getCursorPos(e)
      /*не допускайте расположения ползунка вне изображения:*/
      if (pos < 0) pos = 0;
      if (pos > imgWidth) pos = imgWidth;
      /*выполните функцию, которая изменит размер наложенного изображения в соответствии с курсором:*/
      slide(pos);
    }

    /*предотвратите любые другие действия, которые могут произойти при перемещении по изображению:*/
    e.preventDefault();
    /*теперь ползунок нажат и готов к перемещению:*/
    clicked = 1;
    /*выполнение функции при перемещении ползунка:*/
    window.addEventListener("mousemove", slideMove);
  }

  function slideFinish() {
    /*ползунок больше не нажимается:*/
    clicked = 0;
  }


  var clicked = 0;
  /*получить ширину и высоту элемента img*/
  let imgWidth = img.offsetWidth;
  let imgHeight = img.offsetHeight;
  /*установите ширину элемента img на 50%:*/
  img.style.width = (imgWidth / 2) + "px";
  /*расположите ползунок посередине:*/
  imageCompareSliderElement.style.top = (imgHeight / 2) - (imageCompareSliderElement.offsetHeight / 2) + "px";
  imageCompareSliderElement.style.left = (imgWidth / 2) - (imageCompareSliderElement.offsetWidth / 2) + "px";
  /*выполнение функции при нажатии кнопки мыши:*/
  imageCompareSliderElement.addEventListener("mousedown", slideReady);
  /*и еще одна функция при отпускании кнопки мыши:*/
  window.addEventListener("mouseup", slideFinish);
}

attachEventListenerToFileInput()

compareImage(imgCompOverlayElement);
