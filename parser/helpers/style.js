const parseCCSS = function (strCCSS) {
    if (!strCCSS) return null;

    const doc = document.implementation.createHTMLDocument(""),
        styleElement = document.createElement("style");

    styleElement.textContent = strCCSS;

    doc.body.appendChild(styleElement);

    return styleElement.sheet.cssRules;
} // parseCCSS

const handleStyles = function (arrDomElems, rule) {
    for (const domElem of arrDomElems) {
        setElemStyleObject(domElem);

        setDomStyleRuleIfNeeded(domElem, rule);
    }
} // handleStyles

function setDomStyleRuleIfNeeded(domElem, rule) {
    if (!rule.style) return;

    for (const strStyleKey of rule.style) {
        if (domElem.style[strStyleKey]) continue;

        domElem.style[strStyleKey] = rule.style[strStyleKey];
    }
} // setDomStyleRuleIfNeeded

function setElemStyleObject(domElem) {
    if (typeof domElem.style !== 'object') {
        domElem.style = {};
    }

    let styleAttr = domElem.getAttribute('style');
    //add only inline style here
    if (!styleAttr) return;

    // add some dummy 'body' selector for parsing to be successful
    styleAttr = `body {${styleAttr}}`;

    const inlineStyles = parseCCSS(styleAttr);
    
    for (const inlineStyle of inlineStyles) {
        setDomStyleRuleIfNeeded(domElem, inlineStyle);
    }
} // setElemStyleObject

export { parseCCSS, handleStyles };