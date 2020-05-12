import { parseUnits } from '../../helpers/lengthUnits.js';

// TODO: move to another file with import!
// TODO: write comments on public fields
// TODO: change all for-of loop to reverse for loop for performance... !! (oh dear)
class LengthProperties {

    // {width: {original: 12px, px: 12} ...}
    dicProperties = {};

    // {propertyName: [eventFunc,...],...}
    dicPropertyChangedFuncs = [];

    constructor(domContainer) {
        domContainer.onParentFontSizeChanged(this.#parentFontSizeChanged.bind(this)); // TODO at Shape
        domContainer.onRootFontSizeChanged(this.#rootFontSizeChanged.bind(this)); // TODO at Shape
        domContainer.onViewPortDimensionChanged(this.#viewPortDimChanged.bind(this)); // TODO at Shape

        this.parentFontSizePx = domContainer.getParentFontSizePixel(); // TODO: at Shape
        this.rootFontSizePx = domContainer.getRootFontSizePixel(); // TODO: at Shape
        this.viewPortDim = domContainer.getViewPortDimension(); // TODO: at Shape (width, height)
    }

    onChanged(name, funcEvent) {
        this.dicPropertyChangedFuncs[name] = this.dicPropertyChangedFuncs[name] || [];
        this.dicPropertyChangedFuncs[name].push(funcEvent);
    }
    removeOnChange(name, funcEvent) {
        const arrEvents = this.dicPropertyChangedFuncs[name];

        if (!arrEvents) return;

        const pos = this.dicPropertyChangedFuncs[name].indexOf(funcEvent);
        if (pos >= 0) {
            arrEvents.splice(pos, 1);
        }
    }

    setProperty(name, value) {

        let oldValue = null;
        if (this.dicProperties.hasOwnProperty(name)) {
            oldValue = this.dicProperties[name];
        }

        this.dicProperties[name] = this.#setPropertyValues(value);

        if (oldValue !== null) {
            this.#eventChanged(name, value, oldValue.original);
        }

    } // setProperty


    /********* privates ************/

    #setPropertyValues(strValue) {
        const parsedValue = parseUnits(strValue);
        return {
            original: strValue,
            originalValue: parsedValue.value,
            originalUnit: parsedValue.unit,

            pixels: this.#lengthUnitsToPixels(parsedValue)
        };
    } // setPropertyValues

    #lengthUnitsToPixels(parsedValue) {

        // px   Represent 1 pixel
        if (parsedValue.unit === 'px') return parsedNumUnit.value

        // em   Relative to the font-size of the element (2em means 2 times the size of the current font)	
        if (parsedValue.unit === 'em') {
            return this.parentFontSizePx * parsedValue.value;
        }

        // rem  Relative to font-size of the root element	
        if (parsedValue.unit === 'rem') {
            return this.rootFontSizePx * parsedValue.value;
        }

        //}
        /*


vw	    Relative to 1% of the width of the viewport*
vh	    Relative to 1% of the height of the viewport*	
vmin	Relative to 1% of viewport's* smaller dimension	
vmax	Relative to 1% of viewport's* larger dimension	
%
        */
    } // lengthUnitsToPixels


    #eventChanged(name, newValue, oldValue) {
        if (!this.dicPropertyChangedFuncs.hasOwnProperty(name)) return;
        if (newValue === oldValue) return;

        const eventParam = { name: name, newValue: newValue, oldValue: oldValue };

        if (name === 'font-size') {
            this.#fontSizeChanged(eventParam);
        }

        const arrFuncEvents = this.dicPropertyChangedFuncs[name];
        for (let i = arrFuncEvents.length - 1; i >= 0; i--) { //for (const funcEvent of this.dicPropertyChangedFuncs[name]) {
            const funcEvent = arrFuncEvents[i];
            funcEvent(eventParam);
        }

    } // eventChanged

    #fontSizeChanged(e) {
        // font size effect 'em' units
        const dicEmProps = this.#getAllProperties({ unit: 'em' });

        this.#setProperties(dicRemProps, true);
    } // fontSizeChanged

    #parentFontSizeChanged(e) {
        // for font-size property with unit 'em', calculate by parent font-size
        this.parentFontSizePx = e.pixels;

        const fontSizeProp = this.dicProperties['font-size'];
        if (fontSizeProp && fontSizeProp.originalUnit === 'em') {
            this.setProperty('font-size', fontSizeProp.original);
        }
    }

    #rootFontSizeChanged(e) {
        // all rem units are affected by root font-size
        this.rootFontSizePx = e.pixels;

        const dicRemProps = this.#getAllProperties({ unit: 'rem' });

        this.#setProperties(dicRemProps);
    }

    #viewPortDimChanged(e) {
        this.viewPortDim = e;

        const arrDimPortUnits = ['vw', 'vh', 'vmin', 'vmax'];
        for (let i = arrDimPortUnits.length - 1; i >= 0; i--) { // for each unit
            const dicViewPortProps = this.#getAllProperties({ unit: arrDimPortUnits[i] });
            this.#setProperties(dicViewPortProps);
        }
    } // viewPortDimChanged

    #setProperties(dicProperties, isExcludeFontSize) {
        const keys = Object.keys(dicProperties);
        for (let i = keys.length - 1; i >= 0; i--) { //for (const [name, value] of Object.entries(dicProperties)) {
            const name = keys[i];

            if (isExcludeFontSize && name === 'font-size') continue;

            // re-calculate
            this.setProperty(name, dicProperties[name].original);
        }
    } // setProperties

    #getAllProperties(filter) {
        const dicFilteredProps = {};
        const keys = Object.keys(this.dicProperties);
        for(i = keys.length - 1; i>=0; i--) {
            const name = keys[i];
            const val = this.dicProperties[name];
            
            if (val.unit === filter.unit) {
                dicFilteredProps[name] = val;
            }
        }

        return dicFilteredProps;
    } // getAllProperties

} // LengthProperties

class Shape {

    children = [];
    lengthProperties = new LengthProperties(this);

    constructor(context, parent) {
        this.context = context;
        this.domParent = parent;
    }
    /**
     * @param {object} parent is the parent of this object on the DOM tree
     */
    set parent(parent) {
        const oldParent = this.domParent;

        this.domParent = parent;

        //TODO: check if parent is attached to context and call needToDraw()
    }

    get fontSize() {
        const thisFontSize = this.lengthProperties.get('font-size');
        if (thisFontSize) return thisFontSize;

        if (!this.domParent) return Defults.fontSize; // <-- TODO:

        return this.domParent.fontSize;
    }

    appendChild(child) {
        this.children.append(child);
        child.setParent(this);

        //TODO: check if parent is attached to context and call needToDraw()
    }

    draw() {

    }

    clear() {

    }


} // Shape

export default Shape;