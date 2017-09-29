function ready() {

  // Slider

  function toArr(obj) {
    return [].slice.call(obj);
  }

  function canPress() {
    canUserPress = true;
  }

  function getCurrentTransform() {
    return slidesList.style.transform
  }

  function transitionOn(){
    slidesList.style.transition = 'transform 500ms ease';
  }

  function transitionOff(){
    slidesList.style.transition = '';
  }

  function prevSlide(dotNum) {
    if (typeof dotNum === 'number') { currentImg = dotNum };
    if (canUserPress) {
      canUserPress = false;
      currentTransform = getCurrentTransform();
      transitionOn();
      slidesList.style.transform = `translate3d(${-imgWidth * currentImg + imgWidth}px, 0px, 0px)`;
      setTimeout(transitionOff, 500);
      currentImg--;
      setTimeout(function() {
        if (currentImg === 0) {
          transitionOff();
          currentImg = slidesArr.length - 2;
          slidesList.style.transform = `translate3d(${-imgWidth * currentImg}px, 0px, 0px)`;
          dotsReRender();
          setTimeout(transitionOn, 500);
          return
        }
      }, 500);

      setTimeout(canPress, 500);
      dotsReRender();
    }
  }

  function nextSlide(dotNum) {
    if (typeof dotNum === 'number') { currentImg = dotNum };
    if (canUserPress) {
      canUserPress = false;
      transitionOn();
      slidesList.style.transform = `translate3d(${-imgWidth * (currentImg + 1)}px, 0px, 0px)`;
      setTimeout(transitionOff, 500);
      setTimeout(function() {
        if (currentImg === slidesArr.length - 1) {
          transitionOff();
          currentImg = 1;
          slidesList.style.transform = `translate3d(${-imgWidth * currentImg}px, 0px, 0px)`;
          dotsReRender();
          setTimeout(transitionOn, 500);
          return
        }
      }, 500);

      currentImg++;
      setTimeout(canPress, 500);
      dotsReRender();
    }
  }

  const imgWidth = 560;
  let currentImg = 1;
  let canUserPress = true;
  const regTemplate = /\(-\d{3,}/;

  const images = document.getElementsByClassName('slider__img');
  const imagesArr = toArr(images);

  const prevButton = document.getElementById('slider__button-prev');
  prevButton.addEventListener('click', prevSlide);
  const nextButton = document.getElementById('slider__button-next');
  nextButton.addEventListener('click', nextSlide);

  const firstElem = imagesArr[0].cloneNode(true);
  const lastElem = imagesArr[imagesArr.length - 1].cloneNode(true);

  let slidesList = document.getElementById('slider__list');
  slidesList.appendChild(firstElem);
  slidesList.insertBefore(lastElem, slidesList.children[0]);

  const slides = document.getElementsByClassName('slider__img');
  const slidesArr = toArr(slides);

  const summWidth = imgWidth * slidesArr.length;
  slidesList.style.width = summWidth + 'px';
  slidesList.style.transform = `translate3d(${-imgWidth}px, 0px, 0px)`;

  for (let i = 0; i < slidesArr.length; i++) {
    slidesArr[i].style.width = imgWidth + 'px';
  }

  // Dots

  function dotsReRender() {
    for (let i = 0; i < dots.length; i++) {
      let dot = dots[i];
      dot.id = dot.num === currentImg ? 'slider-dots__active' : '';
    }
  }

  function onDotClick() {
    if (this.num < currentImg) {
      prevSlide(this.num + 1);
      dotsReRender();
    } else
    if (this.num > currentImg) {
      nextSlide(this.num - 1);
      dotsReRender();
    } else {
      return
    }
  }

  let dots = [];
  const sliderDots = document.getElementById('slider-dots');

  for (let i = 0; i < images.length - 2; i++) {
    let dot = document.createElement('button');
    let li = document.createElement('li');
    dot.num = i + 1;
    dot.id = dot.num === currentImg ? 'slider-dots__active' : '';
    dot.addEventListener('click', onDotClick);
    li.appendChild(dot);
    sliderDots.appendChild(li);
    dots.push(dot);
  }

  const interval = setInterval(nextSlide, 5000);
}

document.addEventListener("DOMContentLoaded", ready);
