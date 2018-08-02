
import React from 'react';
import "./info-density.css";


export default class InfoDensity extends React.Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

    }


    componentDidMount() {}

    componentWillUnmount(){}

    update( density ){
        this.props.update( density );
    }

    render() {
        var self = this;

        return (
            <div>
                <button className={this.props.infoDensity=='info-density-lo' ? 'selected' : null}
                        onClick={this.update.bind(this, 'info-density-lo')}>
                    <i className="fas fa-th-large"></i>
                </button>
                
                <button className={this.props.infoDensity=='info-density-hi' ? 'selected' : null}
                    onClick={this.update.bind(this, 'info-density-hi')}>
                    <i className="fas fa-th"></i>
                </button>
            </div>
        );
    }
}