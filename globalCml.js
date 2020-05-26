import Layers from "./painter/dom/layers.js";

const onViewportDimensionChanged = function(callback) {
    GlobalCML.layers?.onResized(callback);
}

const getViewportDimension = function () {
    return GlobalCML.layers?.dimensions;
}

const GlobalCML = {
    layers: null,

    init: function (domCanvas) {
        GlobalCML.layers = new Layers(domCanvas);    
    }

};

export default GlobalCML;

export {onViewportDimensionChanged, getViewportDimension};