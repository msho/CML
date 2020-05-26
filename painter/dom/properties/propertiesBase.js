export default class PropertiesBase {
    // {width: {original: 12px, px: 12} ...}
    dicProperties = {};

    // {propertyName: [eventFunc,...],...}
    dicPropertyChangedFuncs = {};

    // [eventFunc, ...]
    arrOnAnyChanged = []

    constructor(domContainer) { }

    get(name) {
        return this.dicProperties[name];
    }

    set(name, value) {

        let oldValue = null;
        if (this.dicProperties.hasOwnProperty(name)) {
            oldValue = this.dicProperties[name];
        }

        this.dicProperties[name] = this._setPropertyValues(name, value);

        if (oldValue !== null) {
            this._eventChanged(name, value, oldValue.original);
        }
    } // setProperty

    domParentChanged(domNewParent, domOldParent) {
        // Should be inherited by concrete class
        console.log('Should be inherited by concrete class');
    }

    /*** Events ****/
    onChanged(name, funcEvent) {
        this.dicPropertyChangedFuncs[name] = this.dicPropertyChangedFuncs[name] || [];
        this.dicPropertyChangedFuncs[name].push(funcEvent);
    }
    removeOnChanged(name, funcEvent) {
        const arrEvents = this.dicPropertyChangedFuncs[name];

        if (!arrEvents) return;

        const pos = arrEvents.indexOf(funcEvent);
        if (pos >= 0) {
            arrEvents.splice(pos, 1);
        }
    }

    onAnyChanged(funcEvent) {
        this.arrOnAnyChanged.push(funcEvent);
    }

    removeOnAnyChanged(funcEvent) {
        const pos = this.arrOnAnyChanged.indexOf(funcEvent);
        if (pos >= 0) {
            this.arrOnAnyChanged.splice(pos, 1);
        }
    }

    /********* privates ************/

    _setPropertyValues(name, value) {
        return value;
    }

    _eventChanged(name, newValue, oldValue) {

        if (newValue === oldValue) return;

        const eventParam = { name: name, newValue: newValue, oldValue: oldValue };

        this._callAnyEventChanged(eventParam);

        this._callSpesificEventChanged(eventParam);

    } // eventChanged

    _callAnyEventChanged(eventParam) {
        for (let i = this.arrOnAnyChanged.length - 1; i >= 0; i--) {
            const funcEvent = this.arrOnAnyChanged[i];
            funcEvent(eventParam);
        }
    } // callAnyEventChanged

    _callSpesificEventChanged(eventParam) {
        if (!this.dicPropertyChangedFuncs.hasOwnProperty(name)) return;

        const arrFuncEvents = this.dicPropertyChangedFuncs[name];
        for (let i = arrFuncEvents.length - 1; i >= 0; i--) { //for (const funcEvent of this.dicPropertyChangedFuncs[name]) {
            const funcEvent = arrFuncEvents[i];
            funcEvent(eventParam);
        }
    } // callSpesificEventChanged

} // PropertiesBase