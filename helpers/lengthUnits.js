const parseUnits = function(numUnit) {
    if (typeof numUnit === 'number') return {unit: 'px', value: numUnit};

    let i=0;
    for(; i< numUnit.length; i++) {
        if (numUnit[i] < '0' || numUnit[i]>'9') break;
    }
    const strUnit = numUnit.substring(i);
    const strLength = numUnit.substring(0,i);

    return {unit: strUnit || 'px', value: Number(strLength)};
}

const percentage = function(whole, val) {
    return (val*whole)/100;
}

export {parseUnits, percentage};