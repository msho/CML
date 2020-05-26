import Options from '../../options.js'
import { newElem, createStyleElement } from '../../helpers/dom.js';

const FIRST_LAYER_NAME = 'mother-base';

class Layers {
    _dicLayers = {};
    _styleLayers = null;
    _arrOnDimChanged = [];

    constructor(domFirstCanvas) {
        this.canvasContainer = domFirstCanvas.parentNode;

        if (!this.canvasContainer) {
            throw new Exception('Please attach canvas to DOM before using this sh*t, sorry :(');
        }

        new ResizeObserver(this._onCanvasResize.bind(this)).observe(domFirstCanvas);

        this._setDimensionsFromCanvas(domFirstCanvas);

        this._addCanvasToLayer(FIRST_LAYER_NAME, domFirstCanvas);
    }

    get(strId) {
        if (strId) {
            return this._dicLayers[strId];
        }
        return this._dicLayers[FIRST_LAYER_NAME];
    }

    add(strId) {
        if (Object.keys(this._dicLayers).indexOf(strId) >= 0) {
            throw new Exception(`A leyer with id ${strId} already exist, please choose onther id, sorry :() `);
        }

        const newCanvas = this._createCanvas(strId);
        this._addCanvasToLayer(strId, newCanvas);
    }

    remove(strId) {
        const domCanvas = this._dicLayers[strId];

        if (!domCanvas) return;

        domCanvas.remove();
        delete this.dicL
        ayers[strId];
    }

    get dimensions() {
        return this.canvasDim;
    }

    /****** Events *****/

    onResized(funcCallback) {
        this._arrOnDimChanged.push(funcCallback);
    }

    /***** Privates *****/

    _callOnResize(param) {
        for (let i = this._arrOnDimChanged.length - 1; i >= 0; i--) {
            this._arrOnDimChanged[i](param);
        }
    }

    _onCanvasResize(e) {
        this._setDimensionsFromCanvas(this._dicLayers[FIRST_LAYER_NAME]);

        this._callOnResize(e[0].contentRect);
    }

    _createCanvas(strId) {
        return newElem('canvas', { id: strId, class: Options.className.layers }, this.canvasContainer);
    }

    _setDimensionsFromCanvas(domCanvas) {
        // { bottom, height, left, right, top, width, x, y }
        this.canvasDim = domCanvas.getBoundingClientRect();

        this._setStyleForLayers();
    }

    _setStyleForLayers() {
        const strCss = this._getCanvasCssStyleString();
        this._styleLayers = this._styleLayers || createStyleElement();

        this._styleLayers.innerHTML = strCss;
    }

    _getCanvasCssStyleString() {
        return `.${Options.className.layers} {
            left: ${this.canvasDim.left}; top: ${this.canvasDim.top}; height: ${this.canvasDim.height}px; width: ${this.canvasDim.width}px; position: absolute
        }`;
    }

    _addCanvasToLayer(id, newCanvas) {
        this._dicLayers[id] = newCanvas;
        
        if (id !== FIRST_LAYER_NAME) {
            newCanvas.classList.add(Options.className.layers);
        }

    } // _addCanvasToLayer

} // Layers

export default Layers;