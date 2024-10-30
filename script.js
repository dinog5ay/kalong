let blurAmount = 0;
let skewAmount = 0;

function meltImage() {
    const image = document.getElementById("meltingImage");
    blurAmount += 2; // 클릭할 때마다 흐림 효과 증가
    skewAmount += 5; // 클릭할 때마다 기울기 증가
    
    image.style.filter = `blur(${blurAmount}px)`; // 흐려짐 적용
    image.style.transform = `skewY(${skewAmount}deg)`; // 기울기 적용
}