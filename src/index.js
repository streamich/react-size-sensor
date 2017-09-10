import React, {Component} from 'react';


const noop = () => {};


export class SizeSensor extends Component {
    width = null;
    height = null;

    constructor (props, context) {
        super(props, context);
        this.objectRef = object => this.object = object;
        this.onObjectResize = () => {
            const [width, height] = this.getSize();
            const {onResize, onWidth, onHeight} = this.props;
            onResize(width, height);
            if(width !== this.width) onWidth(width);
            if(height !== this.height) onHeight(height);
            this.width = width;
            this.height = height;
        };
    }

    componentDidMount () {
        this.timeout = setTimeout(() => {
            this.object.contentDocument.defaultView.addEventListener('resize', this.onObjectResize);
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
    onSize: noop,
    onHeight: noop,
    onWidth: noop,
};
