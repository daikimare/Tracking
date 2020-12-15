// Webカメラの起動
const video = document.getElementById('video');
const media = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
      width: 640,
      height: 360,
      aspectRatio: 1.77,
      facingMode: "user",
  }
  }).then((stream) => {
  video.srcObject = stream;
  video.onloadeddata = () => {
      video.play();
  }
  }).catch((e) => {
  console.log(e);
});

// 描画用canvasの設定
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
cvs.width = 640; cvs.height = 360;

// APIの取得
Promise.all([
  faceapi.nets.tinyFaceDetector.load("JS/weights/"),
  faceapi.nets.faceLandmark68Net.load("JS/weights/"),
]).catch((e) => {
  console.log(`face-apiを読み込めませんでした${e}`);
});

// 顔のランドマーク取得
let faceData;
async function getLandMarks(){
  faceData = await faceapi.detectSingleFaces(video).withFaceLandmarks();

  if (faceData == null) return;
  drawLandMarks(faceData.landmarks.positions);
}

// 画像の取得
const app = async () => {
  await faceapi.nets.tinyFaceDetector.load("JS/weights/");
  await faceapi.nets.faceLandmark68Net.load("JS/weights/");

  const detections = await faceapi.detectSingleFaces(video,
    new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()

  console.log(detectionsWithLandmarks);
}
app()