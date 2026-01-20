class App
{
    constructor(presentContainer, titleContainer)
    {
     this.presentContainer = presentContainer;
     this.titleContainer = titleContainer;
     
     this.presents = [];
     this.openedCount = 0;
     this._fillPresentContainer();
     this.openedCount = 0;
     document.addEventListener('presentOpened', this._onPresentOpened.bind(this));
    }

    _onPresentOpened()
    {
        this.openedCount++;
        if (this.openedCount === this.presents.length)
        {
            this.titleContainer.textContent = 'Enjoy your presents!';
        } 
    }

    _fillPresentContainer()
    {
        for (const source of PRESENT_SOURCES)
        {
            const present = new Present(this.presentContainer, source, this);
            this.presents.push(present);
        }
    }
}