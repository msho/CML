import { parseUnits, percentage } from '../../../helpers/lengthUnits.js';
import PropertiesBase from './propertiesBase.js';
import {onViewportDimensionChanged, getViewportDimension} from '../../../globalCml.js';

// TODO: write comments on public fields
// TODO: change all for-of loop to reverse for loop for performance... !! (oh dear)
class LengthProperties extends PropertiesBase {

    constructor(domContent) {

        super(domContent);

        this._initPrivateEvents(domContent);
        this._initPrivateProperties(domContent);

    } // constructor

    domParentChanged(domNewParent, domOldParent) {
        
    }


    /*** protected privates ****/

    /**
     * @override on event changed, check if font-size for special care
     * @param {Object} eventParam 
     */
    _callSpesificEventChanged(eventParam) {
        if (!this.dicPropertyChangedFuncs.hasOwnProperty('name')) return;

        let name = eventParam.name;
        
        if (name === 'font-size') {
            this._fontSizeChanged(eventParam);
        }

        const arrFuncEvents = this.dicPropertyChangedFuncs[name];
        for (let i = arrFuncEvents.length - 1; i >= 0; i--) { //for (const funcEvent of this.dicPropertyChangedFuncs[name]) {
            const funcEvent = arrFuncEvents[i];
            funcEvent(eventParam);
        }
    } // callSpesificEventChanged

    /**
     * @override set Property length value
     * @param {String} strValue 
     */
    _setPropertyValues(strName, strValue) {
        const parsedValue = parseUnits(strValue);
        return {
            original: strValue,
            originalValue: parsedValue.value,
            originalUnit: parsedValue.unit,

            pixels: this._lengthUnitsToPixels(strName, parsedValue)
        };
    } // setPropertyValues

    /*** internal privates ****/

    _initPrivateEvents(domContent) {
        // on parent font-size changed
        domContent.parent?.onPropertyChanged('font-size', this._parentFontSizeChanged.bind(this));
        
        //on root font-size changed
        domContent.root?.onChanged('font-size', this._rootFontSizeChanged.bind(this));

        //on view-port dimension changed
        onViewportDimensionChanged(this._viewPortDimChanged.bind(this));
    } // _initPrivateEvents

    _initPrivateProperties(domContent) {
        this._parentFontSizePx = domContent?.parent.getFontSize().pixels;
        
        this._rootFontSizePx = domContent?.root.getFontSize().pixels;

        this._viewPortDim = getViewportDimension();

        this.parentDim = domContent.parent?.dimensions
    }

    _lengthUnitsToPixels(strName, parsedValue) {
        //TODO: should be called only after attached to DOM tree. check it somehow
        
        // px   Represent 1 pixel
        if (parsedValue.unit === 'px') return parsedNumUnit.value

        // em   Relative to the font-size of the element (2em means 2 times the size of the current font)	
        if (parsedValue.unit === 'em') {
            return this._parentFontSizePx * parsedValue.value;
        }

        // rem  Relative to font-size of the root element	
        if (parsedValue.unit === 'rem') {
            return this._rootFontSizePx * parsedValue.value;
        }

        // Relative to 1% of the width of the viewport
        if (parsedValue.unit === 'vw') {
            return percentage(this._viewPortDim.width, parsedValue.value);
        }

        // Relative to 1% of the height of the viewport
        if (parsedValue.unit === 'vh') {
            return percentage(this._viewPortDim.height, parsedValue.value);
        }

        // Relative to 1% of viewport's smaller dimension	
        if (parsedValue.unit === 'vmin') {
            return percentage(Math.min(this._viewPortDim.height, this._viewPortDim.width), parsedValue.value);
        }

        // Relative to 1% of viewport's larger dimension	
        if (parsedValue.unit === 'vmax') {
            return percentage(Math.max(this._viewPortDim.height, this._viewPortDim.width), parsedValue.value);
        }

        // 	Relative to the parent element
        if (parsedValue.unit === '%') {
            if (strName.includes('height')) {
                return percentage(this.parentDim.height, parsedValue.value); 
            } else {
                return percentage(this.parentDim.width, parsedValue.value);
            }
        }

        
        
    } // lengthUnitsToPixels

    _fontSizeChanged(e) {
        // font size effect 'em' units
        const dicEmProps = this._getAllProperties({ unit: 'em' });

        this._setProperties(dicEmProps, true);
    } // fontSizeChanged

    _parentFontSizeChanged(e) {
        // for font-size property with unit 'em', calculate by parent font-size
        this._parentFontSizePx = e.pixels;

        const fontSizeProp = this.dicProperties['font-size'];
        if (fontSizeProp && fontSizeProp.originalUnit === 'em') {
            this.set('font-size', fontSizeProp.original);
        }
    }

    _rootFontSizeChanged(e) {
        // all rem units are affected by root font-size
        this._rootFontSizePx = e.pixels;

        const dicRemProps = this._getAllProperties({ unit: 'rem' });

        this._setProperties(dicRemProps);
    }

    _viewPortDimChanged(e) {
        this._viewPortDim = e;

        const arrDimPortUnits = ['vw', 'vh', 'vmin', 'vmax'];
        for (let i = arrDimPortUnits.length - 1; i >= 0; i--) { // for each unit
            const dicViewPortProps = this._getAllProperties({ unit: arrDimPortUnits[i] });
            this._setProperties(dicViewPortProps);
        }
    } // viewPortDimChanged

    _setProperties(dicProperties, isExcludeFontSize) {
        const keys = Object.keys(dicProperties);
        for (let i = keys.length - 1; i >= 0; i--) { //for (const [name, value] of Object.entries(dicProperties)) {
            const name = keys[i];

            if (isExcludeFontSize && name === 'font-size') continue;

            // re-calculate
            this.set(name, dicProperties[name].original);
        }
    } // setProperties

    _getAllProperties(filter) {
        const dicFilteredProps = {};
        const keys = Object.keys(this.dicProperties);
        for (i = keys.length - 1; i >= 0; i--) {
            const name = keys[i];
            const val = this.dicProperties[name];

            if (val.unit === filter.unit) {
                dicFilteredProps[name] = val;
            }
        }

        return dicFilteredProps;
    } // getAllProperties

} // LengthProperties


export default LengthProperties;