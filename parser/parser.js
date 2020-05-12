
import * as styleHelper from './helpers/style.js';
import * as domHelper from './helpers/dom.js'

class Parser {
    constructor(strCML, strCCSS, settings) {
        this.setStrings({ CML: strCML, CCSS: strCCSS });
    } // constructor

    setStrings(strings) {
        if (strings.CML) this.strCML = strings.CML;
        if (strings.CCSS) this.strCCSS = strings.CCSS;
    }

    parse(strCML, strCCSS) {
        this.setStrings({ CML: strCML, CCSS: strCCSS });

        const parsedCML = domHelper.parseCML(this.strCML);
        if (!parsedCML) return null;

        const parsedCCSS = styleHelper.parseCCSS(this.strCCSS);

        const parsedFullCML = this.addStyleToDom(parsedCML, parsedCCSS);

        return parsedFullCML;

    } // parse

    addStyleToDom(domCML, rulesCCSS) {
        if (rulesCCSS === null) return null;

        for (let i = rulesCCSS.length - 1; i >= 0; i--) {
            // backward loop so last css query would compute
            const rule = rulesCCSS[i];
            const arrDomElems = domCML.querySelectorAll(rule.selectorText)
            styleHelper.handleStyles(arrDomElems, rule);
        } //for each ccss rule

        return domCML;
    } // addStyleToDom

} // Parser

export default Parser;