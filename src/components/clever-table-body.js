
import React from 'react';
import CleverTableBodyRow from './clever-table-body-row.js';


export default class CleverTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentRow = this.setCurrentRow.bind(this);
    }

    componentDidMount() {
        this.props.setTbodyElementRef( this.refs.tbody );
    }

    setCurrentRow( row ){
        this.props.setCurrentRow( row );
    }

    render() {
        var self = this;
        var rows = this.props.data.map(function( row , index){
            return (
                <tr key={row.key}
                    onClick={self.setCurrentRow.bind(this,row)}
                    className={ row.id == self.props.currentRowId ? "selected" : ""}
                    >
                    <CleverTableBodyRow row={row} columns={self.props.columns}></CleverTableBodyRow>
                </tr>
            );
        });


        return (

            <tbody ref="tbody">
                {rows}
            </tbody>

        );
    }
}