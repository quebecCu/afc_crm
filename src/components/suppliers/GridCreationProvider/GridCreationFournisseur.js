import React, { Component } from 'react';
import GridRequiredFormProvider from "./GridRequiredFormProvider";
import GridMethodOnFieldProvider from "./GridMethodOnFieldProvider";
import LoadingAnimation from "../../LoadingAnimation";
import ContactsContainer from "../../ContactsContainer";

export class GridCreationFournisseur extends Component {
	constructor(props) {
		super(props);
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
												<GridRequiredFormProvider requiredFields={this.props.requiredFields}
																			changeRequiredSup={this.props.changeRequiredSup}
												/>
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
																<div key={element.idattrfournisseur} className="col-xs-12 col-sm-6 form-group">
																	<label htmlFor={element.label} className="control-label">{element.label}</label>
																	<br/>
																	<input type="text" name={element.label} id={element.label}
																		   className="form-control"
																		   value={element.value} onChange={this.props.handleChangeInput}
																		   placeholder={element.valeur_defaut}/>
																	<div className="tooltipp" style={{
																			cursor: "pointer",
																			position: 'absolute',
																			right: '25px',
																			top: 0
																		}}>
																		<span className="fa fa-info"/>
																		<span className="tooltipptext">{element.description}</span>
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
																			  data-target={"#" + element.idattrfournisseur + "modal"}/>
																	}

																</div>
															);
														})
													}
												</div>
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
												<ContactsContainer isSupplier="true" modification={this.props.getContacts}/>
											</div>
										</div>
									</div>
								</div>
								<br/>
								<div className="form-group text-center">
									<button className="buttonload btn btn-primary" type="submit" onClick={this.props.handleSubmit}>
										{
											this.props.loadingValidation &&
											<i className="fa fa-refresh fa-spin"/>
										}
										Valider
									</button>
								</div>
							</div>
						</div>
					</div>
        )
    }
}
