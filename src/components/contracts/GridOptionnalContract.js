import React from 'react';
import GridMethodOnFieldContract from "./form/GridMethodOnFieldContract";

class GridOptionnalContract extends React.Component {
	_container: HTMLElement;
	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this);
		this.state = {
	    useContainer: false,
	  };
	}

	_handleChange(event) {
		let grid = this.props.formState.facultatif;
		let facultatif = grid.map(champ => {
			if(event.target.id === champ.label) {
				return {...champ, value: event.target.value};
			}
			else {
				return champ;
			}
		});
		this.props.setGrid(facultatif);
	}

	render(){
		return <div className="container">
        <div className="row">
          {
						this.props.formState.facultatif &&
            this.props.formState.facultatif.map(element => {
              return <div key={element.label} className="col-xs-12 col-md-6">
                <div className="form-group">
                  <label id="representantLabel" className="col-form-label">{ element.label }</label>
                  <br/>
                  {
          					element.libelletype === 'Booléen' &&
          					<select className="form-control" id={element.label} value={element.value} name={element.label}
          							required onChange={this._handleChange}>
          						<option value="">-- Veuillez choisir une valeur --</option>
          						<option value="Oui">Oui</option>
          						<option value="Non">Non</option>
          					</select>
          				}
          				{
          					!(element.libelletype === 'Booléen') &&
          					<input type="text" name={element.label} id={element.label}
          							 className="form-control"
          							 value={element.value} onChange={this._handleChange}
          							 placeholder={element.valeur_defaut}
          					/>
          				}
          				<div className="tooltipp" style={{
          					cursor: "pointer",
          					position: 'absolute',
          					right: '20px',
          					top: '5px'
          				}}>
          					<span className="fa fa-info"/>
          					<span className="tooltipptext">{element.description}</span>
          				</div>
                </div>
        				{
        					this.props.isAdmin &&
        					<span className="fa fa-pencil" style={{
        						cursor: "pointer",
        						position: 'absolute',
        						right: '2px',
        						top: 0
        					}}
        							data-toggle="modal"
        							data-target={"#" + element.idattrcontratcoll + "modal"}/>
        				}
              </div>;
            })
          }
        </div>
				{
					this.props.isAdmin &&
					<div>
						<hr/>
		        <div className="row">
		          <div className="col-sm-4 offset-md-4">
		      			<GridMethodOnFieldContract changeNewField={this.props.changeNewField}
		  					   newField={this.props.newField}
		  					   formState={this.props.formState}
		  					   types={this.props.types}
		  					   handleSubmitChamp={this.props.handleSubmitChamp}
		      			/>
		        	</div>
			      </div>
					</div>
				}
  			
			</div>;
	}
}

export default (GridOptionnalContract);
