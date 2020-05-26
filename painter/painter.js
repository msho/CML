import Shape from './shapes/common/shape.js';

function tagName2ElemType(tagName) {

    switch (tagName) {
        case 'rect':
            return Shape;

            case 'div':
                //todo: return Shape.rect

        default:
            return Shape;
    }
}

class Painter {
    constructor(domCanvas, parsedCML) {
        this.domCanvas = domCanvas;
        this.parsedCML = parsedCML;

        const childs = this.parsedCML.children;
        const childsCount = childs.length;

        const arrElements = [];

        for (const i = 0; i < childsCount; i++) {
            const elemType = tagName2ElemType(childs[i].tagName)
            arrElements.push(new elemType(this.domCanvas));
        }
    }

    paint() {
        //console.log(this.domCanvas);
        console.log(this.parsedCML);

    }
}

export default Painter;