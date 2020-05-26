import CML from '../cml.js';

const strCML = `
<rect style="width: 50%">
    <rect id="c1" /><rect count="10" id="s10" />
</rect>
`;

const strCCSS = `
div {
    width: 100%;
}
#c1 {
    width: 2rem;
}
#s10 {
    width: 0.5rem;
    height: 0.8rem;
}
`;

window.cml = new CML({
    canvas: document.getElementsByTagName('canvas')[0],
    CML: strCML,
    CCSS: strCCSS
});

cml.doYourJob();