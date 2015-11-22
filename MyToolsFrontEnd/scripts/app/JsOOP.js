(function (JsOOP, undefined) {
    var inheritsFrom = function (child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    },
    copyProperties = function (target, source) {
        for (var attrname in source) {
            target[attrname] = source[attrname];
        }
    },
    createLocalVars = function (obj) {
        var vars = '';
        if (obj) {
            for (var attrname in obj) {
                vars += 'var ' + attrname + ' = ' + obj[attrname] + '; ';
            }
        }
        
        return vars.replace(/(\r\n|\n|\r)/gm, "");
    },
    createPubObj = function (obj) {
        var pubObj = 'var pubObj = { ';
        if (obj) {
            for (var attrname in obj) {
                pubObj += attrname + ': ' + obj[attrname] + ',';
            }
            pubObj.slice(0, pubObj.length - 2);
        }
        pubObj += '}';

        return pubObj.replace(/(\r\n|\n|\r)/gm, "");
    };


    JsOOP.createClass = function (definition, parent) {
        if (definition) {
            var _class = definition.constructor ?
                definition.constructor :
                function () {
                },
                classProto = function (priv, pub) {
                    eval(createLocalVars(priv));
                    eval(createPubObj(pub));

                    return pubObj;
                }(definition.private, definition.public);

            if (parent) {
                inheritsFrom(_class, parent);
                _class.prototype.super = parent;
            }

            copyProperties(_class.prototype, classProto);

            return _class;
        }
        return null;
    }

}(window.JsOOP = window.JsOOP || {}));

var ClassA = JsOOP.createClass({
    'constructor': function(a, b){
        this.pubVarA = a;
        this.pubVarB = b;
    },
    'private': {
        privVarA: 1,
        privVarB: 2,
        privFunA: function(param){
            return param + privVarA + privVarB;
        }
    },
    'public': {
        pubFunA: function () {
            console.log('pubFunA');
        }
    }
});

var ClassB = JsOOP.createClass({
    'constructor': function (a, b) {
        this.super(a, b);
        this.pubVarBA = a;
        this.pubVarBB = b;
    },
    'private': {
        privVarBA: 10,
        privVarBB: 20,
        privFunBA: function (param) {
            return param + privVarBA + privVarBB + this.pubVarBA + this.pubVarA;
        }
    },
    'public': {
        pubFunBA: 'privFunBA'
    }
}, ClassA);

//var classA = new ClassA(10, 20);
//console.log('classA - classA.pubVarA + classA.pubVarB: ' + (classA.pubVarA + classA.pubVarB));
//console.log('classA - classA.pubFunA: ' + classA.pubFunA(3));

//var classB = new ClassB(100, 200);
//console.log('classB - classB.pubVarBA + classB.pubVarBA: ' + (classB.pubVarBA + classB.pubVarBB));
//console.log('classB - classB.pubFunAA: ' + classB.pubFunBA(30));
//console.log('classB - classB.pubFunA: ' + classB.pubFunA(30));
//console.log('classB - classB.pubVarA: ' + classB.pubVarA);

