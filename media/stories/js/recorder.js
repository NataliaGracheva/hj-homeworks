'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

// function record(app) {
//   return new Promise((done, fail) => {
//     app.mode = 'preparing';
//     setTimeout(() => {
//       fail('Не удалось записать видео');
//     }, app.limit);
//   });
// }

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';// приложение готовится к началу записи
    navigator.mediaDevices
      .getUserMedia(app.config)
      .then(stream => {
        app.mode = 'recording';// идет запись видео
        app.preview.srcObject = stream;// направить видеопоток с камеры в окно предварительного просмотра

        setTimeout(() => {
          let recorder = new MediaRecorder(stream);
          let chunks = [];

          recorder.addEventListener('dataavailable', (event) => chunks.push(event.data));
          recorder.addEventListener('stop', (event) => {
            app.preview.srcObject = null;// отключить предварительный просмотр с камеры
            stream.getTracks().forEach(track => track.stop());// после остановки выключить камеру

            const recorded = new Blob(chunks, {'type': recorder.mimeType});
            chunks = recorder = stream = null;
            
            createThumbnail(recorded)
              .then(result => done({video: recorded, frame: result}))
              .catch(error => fail(error))
          });// cоздать кадр из видео 

          recorder.start();
          setTimeout(() => recorder.stop(), app.limit);// запись остановить спустя количество миллисекунд, заданное в app.limit
        }, 1000);// запись начинать через одну секунду с момента включения камеры
        
      })
      .catch(error => fail(error));
  });
}