import React, {Component} from 'react';


const noop = () => {};


export class SizeSensor extends Component {
    constructor (props, context) {
        super(props, context);
        this.objectRef = (object) => {
            this.object = object;
        };
        this.onObjectResize = () => {
            this.props.onResize(...this.getSize());
        };
    }

    componentDidMount () {
        this.timeout = setTimeout(() => {
            this.object.contentDocument.defaultView.addEventListener('resize', this.onObjectResize);
            this.props.onSize(...this.getSize());
        }, 20);
    }

    componentWillUnmount () {
        clearTimeout(this.timeout);
        if (this.object) {
            this.object.contentDocument.defaultView.removeEventListener('resize', this.onObjectResize);
        }
    }

    getSize () {
        return this.object ?
            [this.object.offsetWidth, this.object.offsetHeight] :
            [null, null];
    }

    render () {
        const props = {
            ...{},
            ...this.props
        };

        delete props.children;
        delete props.onSize;
        delete props.onResize;

        if (!props.style) {
            props.style = {};
        }

        props.style.position = 'relative';

        return <div {...props}>
            {this.props.children}
            <object
                data='about:blank'
                ref={this.objectRef}
                style={{
                    display: 'block',
                    height: '100%',
                    left: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: '-1'
                }}
                type='text/html'
            />
        </div>;
    }
}

SizeSensor.defaultProps = {
    onResize: noop,
    onSize: noop
};
