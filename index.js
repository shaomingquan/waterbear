;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.waterbear = factory()
})(this, function () {

    var render = function (tpl, data) {
        var vars = Object.keys(data);
        var varEvalList = '';
        for(var i = 0; i < vars.length ;i++) {
            varEvalList += `var ${vars[i]} = ${JSON.stringify(data[vars[i]])};`;
        }
        eval(varEvalList); //exports the vars
        var finalOutArr = [];
        var tempArr = [];
        var index = 0;
        while(true) {
            index = tpl.indexOf('<%');
            if(index === -1) {
                tempArr.push(`finalOutArr.push(\`${tpl}\`)`);
                break;
            }
            tempArr.push(`finalOutArr.push(\`${tpl.substring(0, index)}\`)`);
            tpl = tpl.substring(index);
            index = tpl.indexOf('%>');
            if(tpl[2] === '-') {
                tempArr.push(`finalOutArr.push(eval('${tpl.substring(3, index)}'))`);
            } else {
                tempArr.push(tpl.substring(2, index));
            }
            tpl = tpl.substring(index + 2);
        }
        try {
            eval(tempArr.join('\n'));
        } catch (e) { console.error(e); }
        return finalOutArr.join('\n')
    };
    return render;

});
