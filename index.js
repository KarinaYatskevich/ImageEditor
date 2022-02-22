const blurElement = document.getElementById("blur");
const contrastElement = document.getElementById("contrast");
const hueRotateElement = document.getElementById("hue-rotate");
const sepiaElement = document.getElementById("sepia");

const uploadButtonElement = document.getElementById("upload-button");
const chosenImageElement = document.getElementById("chosen-image");
const defaultImageElement = document.getElementById("default-image");
const wrapperImageElement = document.querySelector(".wrapper-image");
const wrapperInputElement = document.querySelector(".wrapper-input");
const submitButtonElement = document.getElementById("submit-button");

const imageContainerElement = document.querySelector(".image-container");
const sliders = document.querySelectorAll(".filter input[type='range']");


submitButtonElement.addEventListener('click',() => {
  wrapperImageElement.style.visibility = 'visible';
  wrapperInputElement.style.display = "none";
})

const inputElement = wrapperInputElement.getElementsByTagName('input')
Array.prototype.forEach.call(inputElement, function(item) {
  item.addEventListener("change", changeFileName)
  function changeFileName(){
    let fileName = '';
    fileName = this.value.split("\\").slice(-1)[0];
    this.parentNode.nextElementSibling.innerHTML = fileName;
  }
});

function resetFilter(){
  blurElement.value = "0";
  contrastElement.value = "100";
  hueRotateElement.value = "25";
  sepiaElement.value = "0";
  addFilter();
} 

uploadButtonElement.onchange = () => {
  resetFilter();
  let reader = new FileReader();
  reader.readAsDataURL(uploadButtonElement.files[0])
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



function initComparisons() {
    /*найти все элементы с классом "overlay":*/
    const imgCompOverlayElement = document.getElementsByClassName("img-comp-overlay");
    for (let i = 0; i < imgCompOverlayElement.length; i++) {
      compareImages(imgCompOverlayElement[i]);
    }
    function compareImages(img) {
      var slider, img, clicked = 0;
      /*получить ширину и высоту элемента img*/
      let imgWidth = img.offsetWidth;
      let imgHeight = img.offsetHeight;
      /*установите ширину элемента img на 50%:*/
      img.style.width = (imgWidth / 2) + "px";
      /*создать слайдер:*/
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      /*вставить ползунок*/
      img.parentElement.insertBefore(slider, img);
      /*расположите ползунок посередине:*/
      slider.style.top = (imgHeight / 2) - (slider.offsetHeight / 2) + "px";
      slider.style.left = (imgWidth / 2) - (slider.offsetWidth / 2) + "px";
      /*выполнение функции при нажатии кнопки мыши:*/
      slider.addEventListener("mousedown", slideReady);
      /*и еще одна функция при отпускании кнопки мыши:*/
      window.addEventListener("mouseup", slideFinish);
      /*или прикоснулся (для сенсорных экранов:*/
      slider.addEventListener("touchstart", slideReady);
      /*и выпущенный (для сенсорных экранов:*/
      window.addEventListener("touchstop", slideFinish);


      function slideReady(e) {
        /*предотвратите любые другие действия, которые могут произойти при перемещении по изображению:*/
        e.preventDefault();
        /*теперь ползунок нажат и готов к перемещению:*/
        clicked = 1;
        /*выполнение функции при перемещении ползунка:*/
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }

      function slideFinish() {
        /*ползунок больше не нажимается:*/
        clicked = 0;
      }

      function slideMove(e) {
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
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
  }

  initComparisons()