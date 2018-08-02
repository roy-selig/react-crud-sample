
import React from 'react';

export default class CleverTableHeadRow extends React.Component {
    constructor(props) {
        super(props);

        this.handleSort = this.handleSort.bind(this);
    }

    handleSort( columnName ){
        this.props.handleSort( columnName );
    }


    render() {
        var self = this;
        var cells = this.props.data.map(function( column , index){

            if(column.type==="hidden") return;

            var width = { "width": column.width };
            return (
                <th style={ width } key={column.key}>
                    <span style={ width } className="toolbar">
                        <span>{column.label}</span>
                        <span className="force-right"></span>
                        <span>
                            <button onClick={self.handleSort.bind(this, column.id)}>
                                <i className="fas fa-sort"></i>
                            </button>
                        </span>
                    </span>
                </th>
            );
        });
        return cells;
    }
}