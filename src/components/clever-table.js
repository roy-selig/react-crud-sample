
import React from 'react';
import "./clever-table.css";
import CleverTableHeader from './clever-table-header.js';
import CleverTableBody from './clever-table-body.js';

export default class CleverTable extends React.Component {
    constructor(props) {
        super(props);

        this.setTheadElementRef = this.setTheadElementRef.bind(this);
        this.setTbodyElementRef = this.setTbodyElementRef.bind(this);



    }

    componentDidMount() {
        //pass the requested ref here
        //console.log("REFS:", this.thead, this.tbody);

        var thead = this.thead;
        var tbody = this.tbody;

        tbody.addEventListener("scroll",function(e) { //detect a scroll event on the tbody
          /*
          Setting the thead left value to the negative value of tbody.scrollLeft
          will make it track the movement of the tbody element. Setting an elements
          left value to that of the tbody.scrollLeft left makes it maintain it's relative
          position at the left of the table.
          */

            var offset = tbody.scrollLeft;
            thead.style.left = -offset +"px"; //fix the thead relative to the body scrolling

            var firstColumnHeaders = thead.querySelectorAll("th:nth-child(1)");
            firstColumnHeaders.forEach(function( element ){
                element.style.left = offset +"px";
            });

            var firstColumnCells = tbody.querySelectorAll("td:nth-child(1)");
            firstColumnCells.forEach(function( element ){
                element.style.left = offset + "px";
            });

        });


    }

    componentWillUnmount(){
        this.tbody.removeEventListener("scroll");
    }

    setTheadElementRef( ref ){
        this.thead = ref;
    }
    setTbodyElementRef( ref ){
        this.tbody = ref;
    }



    render() {
        return (

            <table>
                <CleverTableHeader setTheadElementRef={this.setTheadElementRef} data={this.props.data.columns} handleSort={this.props.handleSort}></CleverTableHeader>
                <CleverTableBody currentRowId={this.props.currentRowId} setCurrentRow={this.props.setCurrentRow} setTbodyElementRef={this.setTbodyElementRef} data={this.props.data.rows} columns={this.props.data.columns}></CleverTableBody>
            </table>

        );
    }
}