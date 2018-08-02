
import React from 'react';
import CleverTableHeadRow from './clever-table-head-row.js'

export default class CleverTableHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.setTheadElementRef( this.refs.thead );
    }

    render() {
        return (

            <thead  ref="thead">
                <tr>
                    <CleverTableHeadRow data={this.props.data} handleSort={this.props.handleSort}></CleverTableHeadRow>
                </tr>
            </thead>

        );
    }
}