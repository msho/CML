import CML from '../cml.js';

const strCML = `
<div style="width: 50%">
    <circle id="c1" /><squares count="10" id="s10" />
</div>
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
    canvas: document.getElementsByName('canvas')[0],
    CML: strCML,
    CCSS: strCCSS
});

cml.parse()