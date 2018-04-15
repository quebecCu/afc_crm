import React, { Component } from 'react';
import '../../../style/grid-layout.css';
import '../../../style/grid-rezisable.css';
import '../../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
import GridRequiredFormCustomer from "./GridRequiredFormCustomer";
import GridMethodOnField from "./GridMethodOnField";
import ContactsContainer from "../../ContactsContainer";
import LoadingAnimation from "../../LoadingAnimation";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCreationClient extends Component {
		constructor(props) {
			super(props);
			this.props.changeLoading(true);
		}

    render() {
        return (
          <div>
					<h1 className="text-center">Assurances collectives</h1>
						<div className="card mb-3">
							<div className="card-header">
								<i className="fa fa-file-o"></i> {this.props.title}
							</div>
							<div className="card-body">
							<div className="text-right">
								<button className="btn btn-lg btn-success" type="submit" onClick={this.props.handleSubmit}>
									<i className="fa fa-check"/> Valider
								</button>
							</div>
							<br/>
								<div id="accordion">
									<div className="card">
										<div className="card-header" id="headingOne">
											<h5 className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													Information G&eacute;n&eacute;rale
												</button>
											</h5>
										</div>

										<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
											<div className="card-body">
												<GridRequiredFormCustomer requiredFields={this.props.requiredFields} releves={this.props.releves}
																			activites={this.props.activites} provinces={this.props.provinces}
																			etats={this.props.etats} provenances={this.props.provenances}
																			changeRequiredFields={this.props.changeRequiredFields}/>
											</div>
										</div>
									</div>
									<div className="card">
										<div className="card-header" id="headingTwo">
											<h5 className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
													Information Compl&eacute;mentaire
												</button>
											</h5>
										</div>
										<div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
											<div className="card-body">
												<div className="row">
													{
														this.props.grid.map(element => {
															return (
																<div key={element.idattrentreprise} className="col-xs-12 col-sm-6 form-group">
																	<label htmlFor={element.idattrentreprise} className="control-label">{element.label}</label>
																	<br/>
																	<input type="text" name={element.idattrentreprise} id={element.idattrentreprise} className="form-control"
																			 value={element.value} onChange={this.props.handleChangeInput}
																			 placeholder={element.valeur_defaut}/>

																	<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', right: '25px', top: 0}}>
																		<span className="fa fa-info"/>
																		<span className="tooltipptext">{element.description}</span>
																	</div>
																	{
																		this.props.isAdmin &&
																		<span className="fa fa-pencil" style={{cursor:"pointer", position: 'absolute', right: '2px', top: 0}}
																				data-toggle="modal" data-target={"#"+element.idattrentreprise+"modal"}/>
																	}

																</div>
															);
														})
													}
												</div>
												{
													this.props.isAdmin && <div>
														<GridMethodOnField changeUpdateField={this.props.changeUpdateField} formUpdateField={this.props.formUpdateField}
																		 formNewField={this.props.formNewField} deleteField={this.props.deleteField}
																		 grid={this.props.grid} handleModifyField={this.props.handleModifyField}
																		 handleStatic={this.props.handleStatic} handleNonStatic={this.props.handleNonStatic}
																		 handleSubmitChamp={this.props.handleSubmitChamp} champTypes={this.props.champTypes}
																		 changeNewField={this.props.changeNewField}/>
													 </div>
												}
											</div>
										</div>
									</div>
									<div className="card">
										<div className="card-header" id="headingThree">
											<h5 className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
													Contacts
												</button>
											</h5>
										</div>
										<div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
											<div className="card-body">
												<ContactsContainer isClient="true" modification={this.props.getContacts}/>
											</div>
										</div>
									</div>
								</div>
								<br/>
							</div>
						</div>
          </div>
        )
    }
}
