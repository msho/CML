class Dimensions {
    constructor(domContent) {
        this._domContent = domContent;
    }

    get width() {
        const propWidth = domContent.properties.get('width');
        if (propWidth) return propWidth.pixels;

        //TODO: calc by this._domContent children?
        return 0;
    }

    set width(width) {
        domContent.properties.set('width',this.convertUnitsVal(width));
    }

    get height() {
        const propWidth = domContent.properties.get('height');
        if (propWidth) return propWidth.pixels;

        //TODO: calc by this._domContent children?
        return 0;
    }

    set height(height) {
        domContent.properties.set('height',convertUnitVal(height));
    }

    convertUnitsVal(val) {
        let tmpVal = val;
        if (typeof val === 'number') {
            tmpVal = tmpVal + 'px';
        }
        return tmpVal;
    }

    // TODO: for position x,y
    // TODO: think of a way to render only DOM elements that x,y is in current view.
    // *****    need scolling position and calculate where to draw 


}