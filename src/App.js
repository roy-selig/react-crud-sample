import React, { Component } from 'react';
import './App.css';
import './components/toolbar.css';
import CleverTable from "./components/clever-table";
import CleverForm from "./components/clever-form";
import InfoDensity from "./components/info-density";
import Datasource from "./components/datasource";



class App extends Component {


  constructor(props){
      super(props);
      var self = this;



      self.state = {
            columns:[],
            rows:[],
            searchTerm:"",
            infoDensity:"info-density-lo",
            currentRow:null,
            currentRowId:null,
            showForm: ""
      };

      //this.datasource = new Datasource();
      this.getRowData = this.getRowData.bind(this);
      this.updateInfoDensity = this.updateInfoDensity.bind(this);
      this.setCurrentRow = this.setCurrentRow.bind(this);
      this.updateRowData = this.updateRowData.bind(this);
      this.saveRow = this.saveRow.bind(this);
      this.addRow = this.addRow.bind(this);
      this.closeForm = this.closeForm.bind(this);
      this.exportJSON = this.exportJSON.bind(this);
      this.sortOrder =  "asc";
      this.sortColumnId = "full_name";


      this.initialize();


  }

    updateInfoDensity( density ){
        this.setState({infoDensity:density});
    }

    initialize(){
      this.getColumnData()
    }

    getColumnData(){
      var self = this;
      fetch(    'http://localhost:3004/users-columns'   )
          .then( function(response){ return response.json(); /*needs error checking*/ } )
          .then( function( data ) { self.setState( { columns: data  } ); } )
          .then( this.getRowData );
    }

    getRowData(evt){
        this.closeForm();
        /*to-do: search should be debounced*/

        var self = this,
            url="http://localhost:3004/users?_page=1&_limit=100",
            value = (evt && evt.target) ? evt.target.value : "";


        //sorting
        url+= "&_sort=" + this.sortColumnId;
        url+= "&_order=" + this.sortOrder;

        this.setState({searchTerm:value});

        if(value.length){
          url+="&q="+ value;
        }

        fetch(    url   )
          .then( function(response){ return response.json(); /*needs error checking*/ } )
          .then( function( data ) { self.setState( { rows: data } ); } );

    }

    handleSort( columnId ){

        this.sortOrder = (columnId === this.sortColumnId) ? "desc" : "asc";
        this.sortColumnId = columnId;

        this.getRowData();
    }

    setCurrentRow( row ){

        //hide form if selected record is already open
        if( row === this.state.currentRow ){
            this.closeForm();
        } else {
            this.setState({currentRow: row});
            this.setState({currentRowId: row.id});
            this.setState({showForm: "showForm"});
        }
    }

    updateRowData( row ){
      this.setState({currentRow: row });
    }

    saveRow(){

        var formData = JSON.stringify(this.state.currentRow),
            id = this.state.currentRow.id,
            url = 'http://localhost:3004/users/',
            methodName;

        if( id ){
            url += id;
            methodName = 'PUT';
        } else {
            methodName = "POST";
        }



        var response = fetch(url, {
            method: methodName,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData
        });

        response.then( this.getRowData );


    }

    addRow(){

        var newRecord = {};
        this.state.columns.forEach( function(column, index){
            newRecord[ column.id ] = "";
        });

        this.setState({currentRow: newRecord });
        this.setState({currentRowId: null });
        this.setState({showForm: "showForm"});
    }

    closeForm(){
        this.setState({currentRow: null });
        this.setState({currentRowId: null });
        this.setState({showForm: ""});
    }

    exportJSON(){
      window.open("http://localhost:3004/users")
    }



  render() {
      return (
      <div className={'App ' + this.state.infoDensity + " " + this.state.showForm}>
          <div className="header">
              <div className="toolbar for-header">

                  <span className="title">Employees</span>

                  <span className="search-field">
                      <input type="search"
                             placeholder="Search"
                             value={this.state.searchTerm}
                             onChange={evt => this.getRowData(evt)}/>
                  </span>

                  <span className="force-right"></span>

                  <span>
                      <button onClick={this.addRow}>
                          Add <i className="fas fa-user-plus"></i>
                      </button>
                  </span>

                  <span>
                      <button onClick={this.exportJSON}>Export <i className="fas fa-file-download"></i>
                      </button>
                  </span>

                  <span className="divider"> </span>

                  <span>
                      <InfoDensity update={this.updateInfoDensity} infoDensity={this.state.infoDensity}/>
                  </span>

              </div>
          </div>
          <div className="page">
            <div className="panel">
                <CleverTable currentRowId={this.state.currentRowId}
                             setCurrentRow={this.setCurrentRow}
                             data={this.state}
                             handleSort={this.handleSort.bind(this)}/>
                <CleverForm currentRowId={this.state.currentRowId}
                            updateRowData={this.updateRowData}
                            saveRow={this.saveRow}
                            closeForm={this.closeForm}
                            columns={this.state.columns}
                            row={this.state.currentRow}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
