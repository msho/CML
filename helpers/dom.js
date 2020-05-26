const attr = function (domElem, objAttr) {
    if (attr === null || typeof objAttr !== 'object') {
        return;
    }

    for (const [name, value] of Object.entries(objAttr)) {
        domElem.setAttribute(name, value);
    }
}

const newElem = function (name, objAttr, parent) {
    const domElem = document.createElement(name);
    attr(domElem, objAttr);

    if (parent) {
        parent.appendChild(domElem);
    }

    return domElem;
}

const addClassForAWhile = function (domElem, msTimeToDisplay, temporaryClass) {
    domElem.classList.add(temporaryClass);
    setTimeout(() => { domElem.classList.remove(temporaryClass); }, msTimeToDisplay)
}

const createStyleElement = function(innerStyle) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.type = 'text/css';

    if (innerStyle) {
        style.innerHTML = innerStyle;
    }
    
    return style;
}

export { attr, newElem, addClassForAWhile, createStyleElement };