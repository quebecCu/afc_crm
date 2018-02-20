import React, { Component } from 'react';
import '../../../style/grid-layout.css';
import '../../../style/grid-rezisable.css';
import '../../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
import GridRequiredFormCustomer from "./GridRequiredFormCustomer";
import GridMethodOnField from "./GridMethodOnField";
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
                <h1>{this.props.title}</h1>
					<div>
						<form action='/' onSubmit={this.props.handleSubmit}>
							<GridRequiredFormCustomer requiredFields={this.props.requiredFields} releves={this.props.releves}
													  activites={this.props.activites} provinces={this.props.provinces}
													  etats={this.props.etats} provenances={this.props.provenances}
													  changeRequiredFields={this.props.changeRequiredFields}/>
							<ResponsiveReactGridLayout className="layout" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
													   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}} autoSize={true}
													   onDragStop={this.props.handleDrag} onResizeStop={this.props.handleDrag} compactType={null}>
								{
									this.props.grid.map(element => {
										return (
											<div key={element.idattrentreprise} className="form-group">
												<label htmlFor={element.label} className="control-label">{element.label}</label>
												<input type="text" name={element.idattrentreprise} id={element.idattrentreprise} className="form-control"
													   value={element.value} onChange={this.props.handleChangeInput}
													   placeholder={element.valeur_defaut}/>

												<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', left: '2px', top: 0}}>
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

							</ResponsiveReactGridLayout>
							<div className="form-group">
								<button className="buttonload btn btn-primary" type="submit">
									{
										this.props.loadingValidation &&
										<i className="fa fa-refresh fa-spin"/>
									}
									 Valider
								</button>
							</div>
						</form>
						{
							this.props.isAdmin &&
							<GridMethodOnField changeUpdateField={this.props.changeUpdateField} formUpdateField={this.props.formUpdateField}
											   formNewField={this.props.formNewField} deleteField={this.props.deleteField}
											   grid={this.props.grid} handleModifyField={this.props.handleModifyField}
											   handleStatic={this.props.handleStatic} handleNonStatic={this.props.handleNonStatic}
											   handleSubmitChamp={this.props.handleSubmitChamp} champTypes={this.props.champTypes}
											   changeNewField={this.props.changeNewField}/>
						}
					</div>

            </div>

        )
    }
}
