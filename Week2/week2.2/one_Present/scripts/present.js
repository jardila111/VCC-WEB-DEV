class Present{
    constructor(element){
        this.containerElement = element;
        // Bind event listener
        this._openPresent = this._openPresent.bind(this);
        
        this.image = document.createElement('img');
        this.image.src = 'https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg';
        this.image.addEventListener('click', this._openPresent);
        this.containerElement.appendChild(this.image);
    }

    _openPresent(event){
        this.image.src = 'https://i.pinimg.com/originals/a3/f1/86/a3f186387eb5237d79bd9b520c681ada.gif';
        this.image.removeEventListener('click', this._openPresent);
    }

}