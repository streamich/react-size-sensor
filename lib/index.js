'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SizeSensor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};

var SizeSensor = exports.SizeSensor = function (_Component) {
    _inherits(SizeSensor, _Component);

    function SizeSensor(props, context) {
        _classCallCheck(this, SizeSensor);

        var _this = _possibleConstructorReturn(this, (SizeSensor.__proto__ || Object.getPrototypeOf(SizeSensor)).call(this, props, context));

        _this.objectRef = function (object) {
            _this.object = object;
        };
        _this.onObjectResize = function () {
            var _this$props;

            (_this$props = _this.props).onResize.apply(_this$props, _toConsumableArray(_this.getSize()));
        };
        return _this;
    }

    _createClass(SizeSensor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timeout = setTimeout(function () {
                var _props;

                _this2.object.contentDocument.defaultView.addEventListener('resize', _this2.onObjectResize);
                (_props = _this2.props).onSize.apply(_props, _toConsumableArray(_this2.getSize()));
            }, 20);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timeout);
            if (this.object) {
                this.object.contentDocument.defaultView.removeEventListener('resize', this.onObjectResize);
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
            var props = _extends({}, this.props);

            delete props.children;
            delete props.onSize;
            delete props.onResize;

            if (!props.style) {
                props.style = {};
            }

            props.style.position = 'relative';

            return _react2.default.createElement(
                'div',
                props,
                this.props.children,
                _react2.default.createElement('object', {
                    data: 'about:blank',
                    ref: this.objectRef,
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
                })
            );
        }
    }]);

    return SizeSensor;
}(_react.Component);

SizeSensor.defaultProps = {
    onResize: noop,
    onSize: noop
};