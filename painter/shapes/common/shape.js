
import Properties from '../../dom/properties/properties.js';
import GlobalCML from '../../../globalCml.js';

class Shape {

    children = [];
    properties = new Properties(this);
    dimensions = new Dimensions(this);

    constructor(domCanvas, parent, settings) {

        this.context = domCanvas.getContext('2d'); //GlobalCML.layers.get(strLayer).getContext('2d');

        this.parent = parent;

        this.isRoot = settings?.isRoot;

        this.root = this.getRoot(this);

        // TODO: init children

    } // constructor

    /**
     * @param {object} parent is the parent of this object on the DOM tree
     */
    set parent(parent) {
        const oldParent = this.domParent;

        this.domParent = parent;
        this.root = this.getRoot(this);

        this.properties.parentChanged(parent, oldParent);

        // TODO: check if parent is attached to context and positioned in view and call needToDraw()
        if (oldParent) {
            
        }
    } // set parent

    setProperty(name, value) {
        this.properties.setProperty(name, value);
    }

    getProperty(name) {
        if (name === 'font-size') return this.getFontSize();

        return this.properties.getProperty(strProp);
    }

    getFontSize() {
        const fontSize = this.properties.get('font-size');
        if (fontSize) return fontSize;

        if (this.isRoot === true || !this.domParent) return { pixels: 18 };//TODO: Defults[strProp]; // for font-size etc..

        return this.domParent.getFontSize();
    }

    appendChild(child) {
        this.children.append(child);
        child.setParent(this);

        // TODO: check if parent is attached to context and positioned in view and call needToDraw()
    }

    draw() {

    }

    clear() {

    }

    /*** Events */

    onPropertyChanged(propertyName, funcOnChanged) {
        this.properties.onChanged(propertyName, funcOnChanged);
    }

    /*** Privates */
    getRoot(shape) {
        if (!shape) return null;

        if (shape.isRoot) return shape;

        return getRoot(shape.parent);
    }


} // Shape

export default Shape;