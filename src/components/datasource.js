
export default class Datasource {


    constructor(props) {

        this.columnDataAPI='http://localhost:3004/users-columns';
        this.dataAPI='http://localhost:3004/users';
        this.pagination = "_page=1&_limit=100";
        this.sort="&_sort=last_name&_order=asc";
        this.columns=[];
        this.rows=[];

        this.initialize();
    }

    initialize(){
        this.fetchColumnData();
    }

    fetchColumnData(){
        var self = this;
        fetch(  this.columnDataAPI    )
            .then( function(response){ return response.json(); /*needs error checking*/ } )
            .then( function( data ) { self.columns = data; } )
            .then( self.fetchData.bind(this) );
    }

    fetchData( value ){

        //this.closeForm();
        //this.setState({searchTerm:value});
        /*to-do: search should be debounced*/

        var self = this,
            url= self.dataAPI + "?" + self.pagination + self.sort;

        if(value && value.length){
            url+="&q="+ value;
        }

        fetch(    url   )
            .then( function(response){ return response.json(); /*needs error checking*/ } )
            .then( function( data ) { self.rows = data; } );



    }

    saveRecord( record, recordId ){
        var self = this;

        var formData = JSON.stringify( record ),
            id = recordId,
            url = this.dataAPI + "/",
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

        response.then( self.fetchData.bind(this) );


    }


}