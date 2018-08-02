
import React from 'react';

export default class CleverTableBodyRow extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        var self = this;
        var cells = this.props.columns.map(function( column , index ){

            if(column.type==="hidden") return;

            var value = self.props.row[ column.id ];
            var width = { "width": column.width };
            return (
                <td title={value} key={column.key}><span style={ width }>
                    { value ? value : "\u2014" }</span></td>
            );
        });
        return cells;
    }
}