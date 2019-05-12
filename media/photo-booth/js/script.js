'use strict';

const app = document.querySelector('.app');

document.addEventListener('DOMContentLoaded', () => {
    window.navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    }).then((stream) => {
    	const video = document.createElement('video');
    	app.appendChild(video);
        video.srcObject = stream;
        video.addEventListener('canplay', (event) => {
        video.play();
        document.querySelector('.controls').style.display ='block';//

            document.querySelector('#take-photo').addEventListener('click', () => {
            	const audio = document.createElement('audio');
				audio.src = './audio/click.mp3';
				audio.play();
            	const canvas = document.createElement('canvas');
            	app.appendChild(canvas);
            	const ctx = canvas.getContext('2d');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0);
                const imgSrc  = canvas.toDataURL();
                const photo = createPhoto(createPhotoTemplate(imgSrc));
                const photoList = document.querySelector('.list')
                photoList.insertBefore(photo, photoList.firstChild);

                photo.addEventListener('click', event => {

                	// скачивание изображения (достигается за счет атрибутов download и href);
                	if (event.target.textContent === 'file_download') {
				        event.target.style.display = 'none';
				    }

				    if (event.target.textContent === 'file_upload') {
				    	event.target.style.display = 'none';
				    	const figure = event.target.closest('figure');
					    const image = figure.querySelector('img');
					    const canvas = document.querySelector('canvas');
					    const ctx = canvas.getContext('2d');
					    ctx.drawImage(image, 0, 0);

				    	canvas.toBlob(blob => {
					    const data = new FormData();
					    data.append('image', blob);
					    const xhr = new XMLHttpRequest();
					    xhr.open("POST", "https://neto-api.herokuapp.com/photo-booth");
					    xhr.send(data);
					    xhr.addEventListener('load', event => {

					        if (xhr.status === 200) {
					        console.log(xhr.responseText);
					        } else {
					        console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`);
					        }
					    });
					  });
				    }

                	if (event.target.textContent === 'delete') {
			            photoList.removeChild(event.target.closest('figure'));
			        }
                });
            });
        });

        
    }).catch((error) => {
        document.querySelector('#error-message').style.display ='block';
        document.querySelector('#error-message').textContent = error.message;
    });
});

function createPhotoTemplate(imgSrc) {
    return {
	tag: 'figure',
	content: [
	    {tag: 'img', 
	    attrs: {src: imgSrc}
	    },
		{tag: 'figcaption',
		content: [	
		    {tag: 'a', 
		    attrs: {href: imgSrc, download: 'snapshot.png'},
		    content: 
		      {tag: 'i', 
		      cls: 'material-icons',
		      content: 'file_download'
		      }
		    },
		    {tag: 'a',
		    content: 
		      {tag: 'i', 
		      cls: 'material-icons',
		      content: 'file_upload'
		      }
		    },
		    {tag: 'a',
		    content: 
		      {tag: 'i', 
		      cls: 'material-icons',
		      content: 'delete'
		      }
		    }
		]}
	]}
}	  
function createPhoto(node) {
    if ((node === undefined) || (node === null) || (node === false)) {
        return document.createTextNode('');
    }
    if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
        return document.createTextNode(node);
    }
    if (Array.isArray(node)) {
        const fragment = document.createDocumentFragment();
        node.forEach(el => {
            fragment.appendChild(createPhoto(el));
        });
        return fragment;
    }
    const element = document.createElement(node.tag);

    const classes = Array.isArray(node.cls) ? node.cls : [node.cls];
    classes.forEach(cls => {
        if (!cls) return;
        element.classList.add(cls);
    });
    //element.classList.add(...[].concat(node.cls).filter(Boolean));
    if (node.attrs) {
        Object.keys(node.attrs).forEach(key => {
            element.setAttribute(key, node.attrs[key]);
        });
    }

    element.appendChild(createPhoto(node.content));

    return element;
}

