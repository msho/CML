import Parser from './parser/parser.js'

class CML {
    /**
     * 
     * @param {object} data is optional and should look like this 
     * * data: {
     * *  canvas - The canvas dom element
     * *  CML - The file CML string
     * *  CCSS - The file CCSS (style) string
     * * }
     * @param {*} settings 
     */
    constructor(data, settings)  {
        this.settings = settings || {};
        this.setData(data);
    }

    setData(data) {
        // TODO: type cheking (check if data obj, check if canvas is canvas ect...)
        if (!data) return;

        if (data.canvas) this.domCanvas = data.canvas;
        if (data.CML) this.strCML =  data.CML;
        if (data.CCSS) this.strCCSS = data.CCSS;
    }

    /**
     * doYourJob parsing the @data and then painting it to the canvas.
     * @param {object} data is optional (can be given at @CML constructor and should look like this data: {canvas, CML, CCSS}
     */
    doYourJob(data) {
        this.paint(this.parse(data));
    }

    parse(data) {
        this.setData(data);

        this.parser = new Parser(this.strCML, this.strCCSS, this.settings);
        this.parsedCML = this.parser.parse();

        return this.parsedCML;
    }

    paint(parsedCML) {
        if (!parsedCML) {
            this.parsedCML = parsedCML;
        }

        this.painter = new Painter(this.domCanvas, this.parsedCML);

        
    } // paint
}

export default CML;