'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SizeSensor = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};

var SizeSensor = exports.SizeSensor = function (_Component) {
    _inherits(SizeSensor, _Component);

    function SizeSensor() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SizeSensor);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SizeSensor.__proto__ || Object.getPrototypeOf(SizeSensor)).call.apply(_ref, [this].concat(args))), _this), _this.width = null, _this.height = null, _this.ref = function (object) {
            return _this.object = object;
        }, _this.onObjectResize = function () {
            var _this$getSize = _this.getSize(),
                _this$getSize2 = _slicedToArray(_this$getSize, 2),
                width = _this$getSize2[0],
                height = _this$getSize2[1];

            var _this$props = _this.props,
                onResize = _this$props.onResize,
                onWidth = _this$props.onWidth,
                onHeight = _this$props.onHeight;

            onResize(width, height);
            if (width !== _this.width) onWidth(width);
            if (height !== _this.height) onHeight(height);
            _this.width = width;
            _this.height = height;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SizeSensor, [{
        key: 'wnd',
        value: function wnd() {
            return this.object.contentDocument.defaultView;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timeout = setTimeout(function () {
                _this2.wnd().addEventListener('resize', _this2.onObjectResize);

                var _getSize = _this2.getSize(),
                    _getSize2 = _slicedToArray(_getSize, 2),
                    width = _getSize2[0],
                    height = _getSize2[1];

                _this2.width = width;
                _this2.height = height;

                var _props = _this2.props,
                    onSize = _props.onSize,
                    onWidth = _props.onWidth,
                    onHeight = _props.onHeight;

                onSize(width, height);
                onWidth(width);
                onHeight(height);
            }, 20);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timeout);
            if (this.object) {
                this.wnd().removeEventListener('resize', this.onObjectResize);
            }
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            return this.object ? [this.object.offsetWidth, this.object.offsetHeight] : [null, null];
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                onSize = _props2.onSize,
                onResize = _props2.onResize,
                onWidth = _props2.onWidth,
                onHeight = _props2.onHeight,
                rest = _objectWithoutProperties(_props2, ['children', 'onSize', 'onResize', 'onWidth', 'onHeight']);

            if (!rest.style) {
                rest.style = {};
            }

            rest.style.position = 'relative';

            return (0, _react.createElement)('div', rest, children, (0, _react.createElement)('object', {
                data: 'about:blank',
                ref: this.ref,
                style: {
                    display: 'block',
                    height: '100%',
                    left: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: '-1'
                },
                type: 'text/html'
            }));
        }
    }]);

    return SizeSensor;
}(_react.Component);

SizeSensor.defaultProps = {
    onResize: noop,
    onSize: noop,
    onHeight: noop,
    onWidth: noop
};