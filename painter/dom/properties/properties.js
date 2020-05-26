import LengthProperties from "./lengthProperties";

const LENGTH_TYPE  = 1;

/**
 * Holds all the properties of dom canvas object
 */
class Properties {

    dicPropertiesType = {
        width: LENGTH_TYPE, height: LENGTH_TYPE, 'font-size': LENGTH_TYPE,
    };

    constructor(domContainer) {
        this.lengthProperties = new LengthProperties(domContainer);

        //TODO:
        //generalProperties = new GeneralProperties(domContainer);
    }

    getPropertyType(name) {
        if (this.dicPropertiesType[name] === LENGTH_TYPE) return lengthProperties;

        //TODO:
        return this.generalProperties;
    }

    getProperty(name) {
        return getPropertyType(name).get(name);
    }

    setProperty(name, value) {
        return getPropertyType(name).set(name, value);
    }

    /*** Events ****/

    onAnyChanged(func) {
        return getPropertyType(name).onAnyChanged(func);
    }

    removeOnAnyChanged(func) {
        return getPropertyType(name).removeOnAnyChanged(func);
    }

    onChanged(name, func) {
        return getPropertyType(name).onChanged(name, func);
    }

    removeOnChange(name, func) {
        return getPropertyType(name).removeOnChanged(name, func);
    }

} // Properties

export default Properties;