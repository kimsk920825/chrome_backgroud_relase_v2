console.log("1");
const background = [
  "배경사진1.jpg",
  "배경사진2.jpg",
  "배경사진3.jpg",
  "배경사진4.jpg",
  "배경사진5.jpg",
  "배경사진6.jpg",
  "배경사진7.jpg",
  "배경사진8.jpg",
  "배경사진9.jpg",
  "배경사진10.jpg",
  "배경사진11.jpg",
  "배경사진12.jpg",
  "배경사진13.jpg",
  "배경사진14.jpg",
  "배경사진15.jpg",
  "배경사진16.jpg",
  "배경사진17.jpg",
];
const chosenImg = background[Math.floor(Math.random() * background.length)];
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImg}`;
bgImage.classList.add("bgImage");
document.body.prepend(bgImage);
