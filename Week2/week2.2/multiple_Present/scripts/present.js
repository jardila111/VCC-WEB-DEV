class Present
{
    constructor(container, source, app)
    {
        this.containerElement = container;
        this.presentSrc = source;
        this.app = app;
        
        // create image and append to container
        this.image = document.createElement('img');
        this.image.src = 'https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg';
        this.image.addEventListener('click', this._openPresent.bind(this));
        this.containerElement.appendChild(this.image);
    }

    _openPresent(event)
    {
        this.image.src = this.presentSrc;
        this.image.removeEventListener('click', this._openPresent);
        this.app._onPresentOpened();
    }

}