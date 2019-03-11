/**
 * @author mrdoob / http://mrdoob.com/
 */

var UI = {};

UI.Element = function (dom) {

    this.dom = dom;

};

UI.Element.prototype = {

    add: function () {

        for (var i = 0; i < arguments.length; i++) {

            var argument = arguments[i];

            if (argument instanceof UI.Element) {

                this.dom.appendChild(argument.dom);

            } else {

            }

        }

        return this;

    },

    remove: function () {

        for (var i = 0; i < arguments.length; i++) {

            var argument = arguments[i];

            if (argument instanceof UI.Element) {

                this.dom.removeChild(argument.dom);

            } else {}

        }

        return this;

    },

    clear: function () {

        while (this.dom.children.length) {

            this.dom.removeChild(this.dom.lastChild);

        }

    },

    setId: function (id) {

        this.dom.id = id;

        return this;

    },

    setClass: function (name) {

        this.dom.className = name;

        return this;

    },

    setStyle: function (style, array) {

        for (var i = 0; i < array.length; i++) {

            this.dom.style[style] = array[i];

        }

        return this;

    },

    setDisabled: function (value) {

        this.dom.disabled = value;

        return this;

    },

    setParentDisplay: function (value) {

        if (value !== undefined) {
            if (null != this.dom) {
                this.dom.parentNode.style.display = value;
            }
        }
        return this;
    },

    setTextContent: function (value) {

        this.dom.textContent = value;

        return this;

    }

};
var properties = ['position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'border', 'borderLeft',
    'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'display', 'overflow', 'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'color',
    'background', 'backgroundColor', 'opacity', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'textTransform', 'cursor', 'zIndex'
];

properties.forEach(function (property) {

    var method = 'set' + property.substr(0, 1).toUpperCase() + property.substr(1, property.length);

    UI.Element.prototype[method] = function () {

        this.setStyle(property, arguments);

        return this;

    };

});

var events = ['KeyUp', 'KeyDown', 'MouseOver', 'MouseOut', 'Click', 'DblClick', 'Change'];

events.forEach(function (event) {

    var method = 'on' + event;

    UI.Element.prototype[method] = function (callback) {
        if (null != this.dom && null != callback)
            this.dom.addEventListener(event.toLowerCase(), callback.bind(this), false);

        return this;

    };

});

UI.Span = function () {

    UI.Element.call(this);

    this.dom = document.createElement('span');

    return this;

};

UI.Span.prototype = Object.create(UI.Element.prototype);
UI.Span.prototype.constructor = UI.Span;

UI.Div = function () {

    UI.Element.call(this);

    this.dom = document.createElement('div');

    return this;

};

UI.Div.prototype = Object.create(UI.Element.prototype);
UI.Div.prototype.constructor = UI.Div;

UI.Row = function () {

    UI.Element.call(this);

    var dom = document.createElement('div');
    dom.className = 'Row';

    this.dom = dom;

    return this;

};

UI.Row.prototype = Object.create(UI.Element.prototype);
UI.Row.prototype.constructor = UI.Row;


UI.GetRow = function (name) {

    UI.Element.call(this);

    var dom = document.getElementById(name);
    dom.className = 'Row';

    this.dom = dom;

    return this;

};

UI.GetRow.prototype = Object.create(UI.Element.prototype);
UI.GetRow.prototype.constructor = UI.GetRow;

UI.Panel = function () {

    UI.Element.call(this);

    var dom = document.getElementById('ViewPanel');

    this.dom = dom;

    return this;

};

UI.Panel.prototype = Object.create(UI.Element.prototype);
UI.Panel.prototype.constructor = UI.Panel;

UI.GetPanel = function (name) {

    UI.Element.call(this);

    var dom = document.getElementById(name);

    this.dom = dom;

    return this;
};
UI.GetPanel.prototype = Object.create(UI.Element.prototype);
UI.GetPanel.prototype.constructor = UI.GetPanel;
UI.GetPanel.prototype.setDisplay = function (value) {

    if (value !== undefined) {
        if (null != this.dom) {
            this.dom.style.display = value;
        }
    }
    return this;
};

UI.Text = function (text) {

    UI.Element.call(this);

    var dom = document.createElement('span');
    dom.className = 'Text';
    dom.style.cursor = 'default';
    dom.style.display = 'inline-block';
    dom.style.verticalAlign = 'middle';

    this.dom = dom;
    this.setValue(text);

    return this;

};

UI.Text.prototype = Object.create(UI.Element.prototype);
UI.Text.prototype.constructor = UI.Text;

UI.Text.prototype.getValue = function () {

    return this.dom.textContent;

};

UI.Text.prototype.setValue = function (value) {

    if (value !== undefined) {

        this.dom.textContent = value;

    }

    return this;

};

UI.Input = function (text) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('input');
    dom.className = 'Input';
    dom.style.padding = '2px';
    dom.style.border = '1px solid transparent';

    dom.addEventListener('keydown', function (event) {

        event.stopPropagation();

    }, false);

    this.dom = dom;
    this.setValue(text);

    return this;

};

UI.Input.prototype = Object.create(UI.Element.prototype);
UI.Input.prototype.constructor = UI.Input;

UI.Input.prototype.getValue = function () {

    return this.dom.value;

};

UI.Input.prototype.setValue = function (value) {

    this.dom.value = value;

    return this;

};

UI.GetInput = function (text, name) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.getElementById(name);
    if (null == dom) return;
    dom.addEventListener('keydown', function (event) {

        event.stopPropagation();

    }, false);

    this.dom = dom;
    this.setValue(text);

    return this;

};

UI.GetInput.prototype = Object.create(UI.Element.prototype);
UI.GetInput.prototype.constructor = UI.Input;

UI.GetInput.prototype.getValue = function () {
    if (null != this.dom)
        return this.dom.value;

};

UI.GetInput.prototype.setValue = function (value) {
    if (null != this.dom)
        this.dom.value = value;

    return this;

};
UI.TextArea = function () {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('textarea');
    dom.className = 'TextArea';
    dom.style.padding = '2px';
    dom.spellcheck = false;

    dom.addEventListener('keydown', function (event) {

        event.stopPropagation();

        if (event.keyCode === 9) {

            event.preventDefault();

            var cursor = dom.selectionStart;

            dom.value = dom.value.substring(0, cursor) + '\t' + dom.value.substring(cursor);
            dom.selectionStart = cursor + 1;
            dom.selectionEnd = dom.selectionStart;

        }

    }, false);

    this.dom = dom;

    return this;

};

UI.TextArea.prototype = Object.create(UI.Element.prototype);
UI.TextArea.prototype.constructor = UI.TextArea;

UI.TextArea.prototype.getValue = function () {

    return this.dom.value;

};

UI.TextArea.prototype.setValue = function (value) {

    this.dom.value = value;

    return this;

};
UI.Select = function () {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('select');
    dom.className = 'Select';
    dom.style.padding = '2px';

    this.dom = dom;

    return this;

};

UI.Select.prototype = Object.create(UI.Element.prototype);
UI.Select.prototype.constructor = UI.Select;

UI.Select.prototype.setMultiple = function (boolean) {

    this.dom.multiple = boolean;

    return this;

};

UI.Select.prototype.setOptions = function (options) {

    var selected = this.dom.value;

    while (this.dom.children.length > 0) {

        this.dom.removeChild(this.dom.firstChild);

    }

    for (var key in options) {

        var option = document.createElement('option');
        option.value = key;
        option.innerHTML = options[key];
        this.dom.appendChild(option);

    }

    this.dom.value = selected;

    return this;

};

UI.Select.prototype.getValue = function () {

    return this.dom.value;

};

UI.Select.prototype.setValue = function (value) {

    value = String(value);

    if (this.dom.value !== value) {

        this.dom.value = value;

    }

    return this;

};

UI.GetSelect = function (value, name) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.getElementById(name);
    this.dom = dom;
    this.value = value;

    return this;
};

UI.GetSelect.prototype.getValue = function () {
    if (null != this.dom)
        return this.dom.value;
};

UI.GetSelect.prototype.setValue = function (value) {

    value = String(value);

    if (null != this.dom && this.dom.value !== value) {

        this.dom.value = value;

    }

    return this;
};

UI.Checkbox = function (boolean) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('input');
    dom.className = 'Checkbox';
    dom.type = 'checkbox';

    this.dom = dom;
    this.setValue(boolean);

    return this;

};

UI.Checkbox.prototype = Object.create(UI.Element.prototype);
UI.Checkbox.prototype.constructor = UI.Checkbox;

UI.Checkbox.prototype.getValue = function () {

    return this.dom.checked;

};

UI.Checkbox.prototype.setValue = function (value) {

    if (value !== undefined) {

        this.dom.checked = value;

    }

    return this;

};
UI.GetCheckbox = function (boolean, name) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.getElementById(name);
    if (null != dom)
        this.dom = dom;
    this.setValue(boolean);

    return this;

};

UI.GetCheckbox.prototype = Object.create(UI.Element.prototype);
UI.GetCheckbox.prototype.constructor = UI.GetCheckbox;

UI.GetCheckbox.prototype.getValue = function () {
    if (null != this.dom)
        return this.dom.checked;
    return false;
};

UI.GetCheckbox.prototype.setValue = function (value) {

    if (value !== undefined && null != this.dom) {

        this.dom.checked = value;

    }

    return this;

};

UI.Color = function () {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('input');
    dom.className = 'Color';
    dom.style.width = '64px';
    dom.style.height = '17px';
    dom.style.border = '0px';
    dom.style.padding = '2px';
    dom.style.backgroundColor = 'transparent';

    try {

        dom.type = 'color';
        dom.value = '#ffffff';

    } catch (exception) {}

    this.dom = dom;

    return this;

};

UI.Color.prototype = Object.create(UI.Element.prototype);
UI.Color.prototype.constructor = UI.Color;

UI.Color.prototype.getValue = function () {

    return this.dom.value;

};

UI.Color.prototype.getHexValue = function () {

    return parseInt(this.dom.value.substr(1), 16);

};

UI.Color.prototype.setValue = function (value) {

    this.dom.value = value;

    return this;

};

UI.Color.prototype.setHexValue = function (hex) {

    this.dom.value = '#' + ('000000' + hex.toString(16)).slice(-6);

    return this;

};
UI.Number = function (number) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('input');
    dom.className = 'Number';
    dom.value = '0.00';

    dom.addEventListener('keydown', function (event) {

        event.stopPropagation();

        if (event.keyCode === 13) dom.blur();

    }, false);

    this.value = 0;

    this.min = -Infinity;
    this.max = Infinity;

    this.precision = 2;
    this.step = 1;
    this.unit = '';

    this.dom = dom;

    this.setValue(number);

    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);

    var distance = 0;
    var onMouseDownValue = 0;

    var pointer = [0, 0];
    var prevPointer = [0, 0];

    function onMouseDown(event) {

        event.preventDefault();

        distance = 0;

        onMouseDownValue = scope.value;

        prevPointer = [event.clientX, event.clientY];

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

    }

    function onMouseMove(event) {

        var currentValue = scope.value;

        pointer = [event.clientX, event.clientY];

        distance += (pointer[0] - prevPointer[0]) - (pointer[1] - prevPointer[1]);

        var value = onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
        value = Math.min(scope.max, Math.max(scope.min, value));

        if (currentValue !== value) {

            scope.setValue(value);
            dom.dispatchEvent(changeEvent);

        }

        prevPointer = [event.clientX, event.clientY];

    }

    function onMouseUp(event) {

        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);

        if (Math.abs(distance) < 2) {

            dom.focus();
            dom.select();

        }

    }

    function onChange(event) {

        scope.setValue(dom.value);

    }

    function onFocus(event) {

        dom.style.backgroundColor = '';
        dom.style.cursor = '';

    }

    function onBlur(event) {

        dom.style.backgroundColor = 'transparent';
        dom.style.cursor = 'col-resize';

    }

    onBlur();

    dom.addEventListener('mousedown', onMouseDown, false);
    dom.addEventListener('change', onChange, false);
    dom.addEventListener('focus', onFocus, false);
    dom.addEventListener('blur', onBlur, false);

    return this;

};

UI.Number.prototype = Object.create(UI.Element.prototype);
UI.Number.prototype.constructor = UI.Number;

UI.Number.prototype.getValue = function () {

    return this.value;

};

UI.Number.prototype.setValue = function (value) {

    if (value !== undefined) {

        value = parseFloat(value);

        if (value < this.min) value = this.min;
        if (value > this.max) value = this.max;

        this.value = value;
        this.dom.value = value.toFixed(this.precision);

        if (this.unit !== '') this.dom.value += ' ' + this.unit;

    }

    return this;

};

UI.Number.prototype.getInitValue = function () {

    return this.initValue;

};

UI.Number.prototype.setInitValue = function (initValue) {

    if (initValue !== undefined) {

        initValue = parseFloat(initValue);

        if (initValue < this.min) initValue = this.min;
        if (initValue > this.max) initValue = this.max;

        this.initValuet = initValue.toFixed(this.precision);
    }

    return this;

};

UI.Number.prototype.setPrecision = function (precision) {

    this.precision = precision;

    return this;

};

UI.Number.prototype.setStep = function (step) {

    this.step = step;

    return this;

};

UI.Number.prototype.setRange = function (min, max) {

    this.min = min;
    this.max = max;

    return this;

};

UI.Number.prototype.setUnit = function (unit) {

    this.unit = unit;

    return this;

};

UI.GetNumber = function (number, name) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.getElementById(name);
    if (null == dom) return;
    dom.className = 'Number';
    dom.value = '0.0000';
    dom.initValue = '0.0000';

    dom.addEventListener('keydown', function (event) {

        event.stopPropagation();

        if (event.keyCode === 13) dom.blur();

    }, false);

    this.value = 0;
    this.initValue = 0; //初始值

    this.min = -Infinity;
    this.max = Infinity;

    this.precision = 4;
    this.step = 1;
    this.unit = '';

    this.dom = dom;

    this.setValue(number);
    this.setInitValue(number);

    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);

    var distance = 0;
    var onMouseDownValue = 0;

    var pointer = [0, 0];
    var prevPointer = [0, 0];

    function onMouseDown(event) {

        event.preventDefault();

        distance = 0;

        onMouseDownValue = scope.value;

        prevPointer = [event.clientX, event.clientY];

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

    }

    function onMouseMove(event) {

        var currentValue = scope.value;

        pointer = [event.clientX, event.clientY];

        distance += (pointer[0] - prevPointer[0]) - (pointer[1] - prevPointer[1]);

        var value = onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
        value = Math.min(scope.max, Math.max(scope.min, value));

        if (currentValue !== value) {

            scope.setValue(value);
            dom.dispatchEvent(changeEvent);

        }

        prevPointer = [event.clientX, event.clientY];

    }

    function onMouseUp(event) {

        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);

        if (Math.abs(distance) < 2) {

            dom.focus();
            dom.select();

        }

    }

    function onChange(event) {
        scope.setValue(dom.value);
    }

    function onFocus(event) {
        dom.style.backgroundColor = '';
        dom.style.cursor = '';
        dom.removeEventListener('mousedown', onMouseDown, false);
    }

    function onBlur(event) {
        dom.style.backgroundColor = 'transparent';
        dom.style.cursor = 'col-resize';
        dom.addEventListener('mousedown', onMouseDown, false);
    }

    onBlur();

    dom.addEventListener('mousedown', onMouseDown, false);
    dom.addEventListener('change', onChange, false);
    dom.addEventListener('focus', onFocus, false);
    dom.addEventListener('blur', onBlur, false);

    return this;

};

UI.GetNumber.prototype = Object.create(UI.Element.prototype);
UI.GetNumber.prototype.constructor = UI.Number;

UI.GetNumber.prototype.getValue = function () {

    return this.value;

};

UI.GetNumber.prototype.setValue = function (value) {

    if (value !== undefined) {

        value = parseFloat(value);

        if (value < this.min) value = this.min;
        if (value > this.max) value = this.max;

        this.value = value;
        if (null != this.dom) {
            this.dom.value = value.toFixed(this.precision);

            if (this.unit !== '') this.dom.value += ' ' + this.unit;
        }

    }

    return this;

};
//初始值
UI.GetNumber.prototype.getInitValue = function () {

    return this.initValue;

};

UI.GetNumber.prototype.setInitValue = function (initValue) {

    if (initValue !== undefined) {

        initValue = parseFloat(initValue);

        if (initValue < this.min) initValue = this.min;
        if (initValue > this.max) initValue = this.max;

        this.initValue = initValue.toFixed(this.precision);
        // if (this.unit !== '') this.initValue += ' ' + this.unit;
    }

    return this;

};

UI.GetNumber.prototype.setPrecision = function (precision) {

    this.precision = precision;

    return this;

};

UI.GetNumber.prototype.setStep = function (step) {

    this.step = step;

    return this;

};

UI.GetNumber.prototype.setRange = function (min, max) {

    this.min = min;
    this.max = max;

    return this;

};

UI.GetNumber.prototype.setUnit = function (unit) {

    this.unit = unit;

    return this;

};

UI.Integer = function (number) {

    UI.Element.call(this);

    var scope = this;

    var dom = document.createElement('input');
    dom.className = 'Number';
    dom.value = '0';

    dom.addEventListener('keydown', function (event) {

        event.stopPropagation();

    }, false);

    this.value = 0;

    this.min = -Infinity;
    this.max = Infinity;

    this.step = 1;

    this.dom = dom;

    this.setValue(number);

    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);

    var distance = 0;
    var onMouseDownValue = 0;

    var pointer = [0, 0];
    var prevPointer = [0, 0];

    function onMouseDown(event) {

        event.preventDefault();

        distance = 0;

        onMouseDownValue = scope.value;

        prevPointer = [event.clientX, event.clientY];

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

    }

    function onMouseMove(event) {

        var currentValue = scope.value;

        pointer = [event.clientX, event.clientY];

        distance += (pointer[0] - prevPointer[0]) - (pointer[1] - prevPointer[1]);

        var value = onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
        value = Math.min(scope.max, Math.max(scope.min, value)) | 0;

        if (currentValue !== value) {

            scope.setValue(value);
            dom.dispatchEvent(changeEvent);

        }

        prevPointer = [event.clientX, event.clientY];

    }

    function onMouseUp(event) {

        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);

        if (Math.abs(distance) < 2) {

            dom.focus();
            dom.select();

        }

    }

    function onChange(event) {

        scope.setValue(dom.value);

    }

    function onFocus(event) {

        dom.style.backgroundColor = '';
        dom.style.cursor = '';

    }

    function onBlur(event) {

        dom.style.backgroundColor = 'transparent';
        dom.style.cursor = 'col-resize';

    }

    onBlur();

    dom.addEventListener('mousedown', onMouseDown, false);
    dom.addEventListener('change', onChange, false);
    dom.addEventListener('focus', onFocus, false);
    dom.addEventListener('blur', onBlur, false);

    return this;

};

UI.Integer.prototype = Object.create(UI.Element.prototype);
UI.Integer.prototype.constructor = UI.Integer;

UI.Integer.prototype.getValue = function () {

    return this.value;

};

UI.Integer.prototype.setValue = function (value) {

    if (value !== undefined) {

        value = parseInt(value);

        this.value = value;
        this.dom.value = value;

    }

    return this;

};

UI.Integer.prototype.setStep = function (step) {

    this.step = parseInt(step);

    return this;

};

UI.Integer.prototype.setRange = function (min, max) {

    this.min = min;
    this.max = max;

    return this;

};

UI.Break = function () {

    UI.Element.call(this);

    var dom = document.createElement('br');
    dom.className = 'Break';

    this.dom = dom;

    return this;

};

UI.Break.prototype = Object.create(UI.Element.prototype);
UI.Break.prototype.constructor = UI.Break;


UI.HorizontalRule = function () {

    UI.Element.call(this);

    var dom = document.createElement('hr');
    dom.className = 'HorizontalRule';

    this.dom = dom;

    return this;

};

UI.HorizontalRule.prototype = Object.create(UI.Element.prototype);
UI.HorizontalRule.prototype.constructor = UI.HorizontalRule;


UI.Button = function (value) {

    UI.Element.call(this);

    var dom = document.createElement('button');
    dom.className = 'Button';

    this.dom = dom;
    this.dom.textContent = value;

    return this;

};

UI.Button.prototype = Object.create(UI.Element.prototype);
UI.Button.prototype.constructor = UI.Button;

UI.Button.prototype.setLabel = function (value) {

    this.dom.textContent = value;

    return this;

};


UI.Modal = function (value) {

    var scope = this;

    var dom = document.createElement('div');

    dom.style.position = 'absolute';
    dom.style.width = '100%';
    dom.style.height = '100%';
    dom.style.backgroundColor = 'rgba(0,0,0,0.5)';
    dom.style.display = 'none';
    dom.style.alignItems = 'center';
    dom.style.justifyContent = 'center';
    dom.addEventListener('click', function (event) {

        scope.hide();

    });

    this.dom = dom;

    this.container = new UI.Panel();
    this.container.dom.style.width = '200px';
    this.container.dom.style.padding = '20px';
    this.container.dom.style.backgroundColor = '#ffffff';
    this.container.dom.style.boxShadow = '0px 5px 10px rgba(0,0,0,0.5)';

    this.add(this.container);

    return this;

};

UI.Modal.prototype = Object.create(UI.Element.prototype);
UI.Modal.prototype.constructor = UI.Modal;

UI.Modal.prototype.show = function (content) {

    this.container.clear();
    this.container.add(content);

    this.dom.style.display = 'flex';

    return this;

};

UI.Modal.prototype.hide = function () {

    this.dom.style.display = 'none';

    return this;

};