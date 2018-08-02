
import React from 'react';
import "./clever-form.css";


export default class CleverForm extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.closeForm = this.closeForm.bind(this);

    }


    componentDidMount() {}

    componentWillUnmount(){}

    updateField( fieldId, evt){
        const newState = {...this.props.row};
        newState[ fieldId ] = evt.target.value;
        this.props.updateRowData( newState );
    }

    saveForm(){
        this.props.saveRow();
    }

    closeForm(){
        this.props.closeForm();
    }

    render() {
        var self = this,
            fields = self.props.columns.map( function( field, index ){

            var value = (self.props.row) ? self.props.row[field.id] : "";
            var input="";

            switch( field.type ){
                case "hidden":
                    return;
                    break;
                case "read-only":
                    input = (
                        <input type="text"
                               readonly
                               value={value}/>
                    );
                    break;
                case "text":
                default:
                    input = (
                        <input type={field.type}
                               placeholder={"Enter " + field.label}
                               value={value}
                               onChange={self.updateField.bind(this,field.id)}/>
                    );
                    break;


            }

            return (
                <div className="clever-form-cell">
                    <div className="clever-form-label">{field.label}</div>
                    <div className="clever-form-field">
                        {input}
                        </div>
                </div>
            );

        });

        var text = this.props.currentRowId ? "Edit" : "Add";

        return (

            <div className="clever-form">

                <div className="clever-form-title toolbar">
                    <span>{text} Employee</span>
                    <span className="force-right"></span>
                    <span onClick={this.closeForm}><i className="far fa-times-circle"></i></span>


                </div>

                {fields}

                <div className="clever-form-footer toolbar">
                    <span><button className="submit" onClick={this.saveForm}>Save</button></span>

                    <span className="force-right"></span>

                </div>

            </div>

        );
    }
}