const throttle = ( handler, ms ) => {
  let timeout;
  return () => {
    clearTimeout( timeout );
    timeout = setTimeout( handler, ms );
  }
};

class TextEditor {
  constructor( container, storageKey = '_text-editor__content' ) {
    this.container = container;
    this.contentContainer = container.querySelector( '.text-editor__content' );
    this.hintContainer = container.querySelector( '.text-editor__hint' );
    this.filenameContainer = container.querySelector( '.text-editor__filename' );
    this.storageKey = storageKey;
    this.registerEvents();
    this.load( this.getStorageData());
  }
  registerEvents() {
    const save = throttle( this.save.bind( this ), 1000 );
    this.contentContainer.addEventListener( 'input', save );

    this.container.addEventListener('dragover', event => this.showHint(event));
    this.container.addEventListener('dragleave', event => this.hideHint(event));
    this.container.addEventListener('drop', event => this.loadFile(event));
  }
  loadFile( e ) {// для загрузки файла после переноса в окно редактора
    e.preventDefault();
    this.hideHint(e);//
    const file = e.dataTransfer.files[0];
    
    if (file.type == 'text/plain') {
      this.readFile(file);
    } else {
      this.contentContainer.value = 'Файл не может быть прочитан, т.к. имеет неподходящее расширение';
    }
  }
  readFile( file ) {// для чтения .txt файла
    const reader = new FileReader();
    this.contentContainer.value = '';
    reader.addEventListener('load', event => this.load(event.target.result));
    reader.readAsText(file);
    this.setFilename(file.name);
  }
  setFilename( filename ) {// для установки имени файла
    this.filenameContainer.textContent = filename;
  }
  showHint( e ) {// для показа подсказки
    e.preventDefault();
    this.hintContainer.classList.add('text-editor__hint_visible');
  }
  hideHint( e ) {// для скрытия подсказки
      if (e.type === 'drop') {//
      this.hintContainer.classList.remove('text-editor__hint_visible');
    }
  }
  load( value ) {
    this.contentContainer.value = value || '';
  }
  getStorageData() {
    return localStorage[ this.storageKey ];
  }
  save() {
    localStorage[ this.storageKey ] = this.contentContainer.value;
  }
}

new TextEditor( document.getElementById( 'editor' ));
