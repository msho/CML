const parseCML = function (strCML) {
    if (!strCML) return null;

    const parser = new DOMParser();

    // TODO: handle errors!
    return parser.parseFromString(strCML, "text/xml");

} // parseCML

export { parseCML };