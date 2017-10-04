import React, {Component} from 'react';


const noop = () => {};


export class SizeSensor extends Component {
    width = null;
    height = null;

    ref = object => this.object = object;

    onObjectResize = () => {
        const [width, height] = this.getSize();
        const {onResize, onWidth, onHeight} = this.props;
        onResize(width, height);
        if(width !== this.width) onWidth(width);
        if(height !== this.height) onHeight(height);
        this.width = width;
        this.height = height;
    };

    wnd() {
        return this.object.contentDocument.defaultView;
    }

    componentDidMount () {
        this.timeout = setTimeout(() => {
            this.wnd().addEventListener('resize', this.onObjectResize);
            const [width, height] = this.getSize();
            this.width = width;
            this.height = height;

            const {onSize, onWidth, onHeight} = this.props;
            onSize(width, height);
            onWidth(width);
            onHeight(height);
        }, 20);
    }

    componentWillUnmount () {
        clearTimeout(this.timeout);
        if (this.object) {
            this.wnd().removeEventListener('resize', this.onObjectResize);
        }
    }

    getSize () {
        return this.object ?
            [this.object.offsetWidth, this.object.offsetHeight] :
            [null, null];
    }

    render () {
        const {children, onSize, onResize, onWidth, onHeight, ...rest} = this.props;

        if (!rest.style) {
            rest.style = {};
        }

        rest.style.position = 'relative';

        return h('div', rest,
            children,
            h('object', {
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
                type: 'text/html',
            })
        );
    }
}

SizeSensor.defaultProps = {
    onResize: noop,
    onSize: noop,
    onHeight: noop,
    onWidth: noop,
};
