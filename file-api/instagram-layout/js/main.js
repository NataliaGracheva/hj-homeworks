const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className );
class iLayout {
  constructor( container ) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => this.showLayout(event));
    this.positionsContainer.addEventListener('dragleave', event => this.hideLayout(event));
    this.positionsContainer.addEventListener('drop', event => this.loadImage(event));
    this.actionButton.addEventListener('click', () => this.getCollage());
  }
  showLayout(event) {
    event.preventDefault();
    addClass ('layout__item_active', event.target);
  }
  hideLayout(event) {
    event.preventDefault();
      removeClass ('layout__item_active', event.target);
  }
  loadImage(event) {
    event.preventDefault();
    removeClass ('layout__item_active', event.target);
    const file = event.dataTransfer.files[0];
    const imageTypeRegExp = /^image\//;
    if (imageTypeRegExp.test(file.type)) {
      event.target.textContent = '';
      const img = document.createElement('img');
      addClass ('layout__image', img);
      img.src = URL.createObjectURL(file);
      img.addEventListener('load', event => {
      URL.revokeObjectURL(event.target.src);
      });
      event.target.appendChild(img);
    } else {
      event.target.textContent = 'файл не является изображением';
    }
  }
  getCollage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imagesForCollage = this.positionsContainer.querySelectorAll('.layout__item')
    canvas.width = this.positionsContainer.offsetWidth;
    canvas.height = this.positionsContainer.offsetHeight;
    
    Array.from(imagesForCollage).forEach(el => {
      let boundEl = el.parentElement.getBoundingClientRect();
      let x = Math.abs( Math.round( el.offsetLeft - boundEl.left) );
      let y =  Math.abs( Math.round( el.offsetTop - boundEl.top) );
      let img = document.createElement('img');
          img.src = el.querySelector('img').src;
          ctx.drawImage( img, x, y, el.offsetWidth, el.offsetWidth * img.height / img.width );
      });
      this.result.value = `<img src="${canvas.toDataURL()}">`;
  }
}

new iLayout( document.getElementById( 'layout' ));


