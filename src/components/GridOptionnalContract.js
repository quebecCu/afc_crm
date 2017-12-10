import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {Button} from 'react-bootstrap';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class GridOptionnalContract extends React.Component {
	constructor(props) {
		super(props);
		this._handleStatic = this._handleStatic.bind(this);
		this._handleNonStatic = this._handleNonStatic.bind(this);
		this._handleDrag = this._handleDrag.bind(this);
	}

	_handleStatic() {
		let layout = this.props.lilLayout.map(div => {
			return {...div, static: true};
		});
		this.props.changeLilLayout(layout);
	}

	_handleNonStatic() {
		let layout = this.props.lilLayout.map(div => {
			return {...div, static: false};
		});
		this.props.changeLilLayout(layout);
	}

	_handleDrag(newItem) {
		this.props.changeLilLayout(newItem);
	}

	render(){
		let layout = this.props.lilLayout;
		let layouts = {lg:layout, md:layout, sm:layout, xs:layout, xxs:layout};
		return <div>
			<ResponsiveReactGridLayout className="layout" layouts={layouts} rowHeight={20}
									   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
									   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
									   autoSize = {true}
									   onDragStop={this._handleDrag} onResizeStop={this._handleDrag}
			>
				<div key={1} className="form-group">
					<label htmlFor="admin" className="control-label">Administrateur</label>
					<input type="text" name="admin" id="admin" className="form-control"
						   placeholder="Admin"/>

					<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', left: '2px', top: 0}}>
						<span className="fa fa-info"/>
						<span className="tooltipptext">Administrateur du contrat</span>
					</div>
					{
						/*this.props.isAdmin &&
						<span className="fa fa-pencil" style={{cursor:"pointer", position: 'absolute', right: '2px', top: 0}}
							  data-toggle="modal" data-target={"#"+element.idattrentreprise+"modal"}/>*/
					}
				</div>
				<div key="2" className="form-group">
					<label htmlFor="admissible" className="control-label">Admissibilité</label>
					<input type="text" name="admissible" id="admissible" className="form-control"
						   placeholder="admissible"/>

					<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', left: '2px', top: 0}}>
						<span className="fa fa-info"/>
						<span className="tooltipptext">Admissibilité</span>
					</div>
				</div>
				<div key="3" className="form-group">
					<label htmlFor="hours" className="control-label">H. min</label>
					<input type="text" name="hours" id="hours" className="form-control"
						   placeholder="heures min"/>

					<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', left: '2px', top: 0}}>
						<span className="fa fa-info"/>
						<span className="tooltipptext">Heures minimum</span>
					</div>
				</div>
			</ResponsiveReactGridLayout>
			<Button onClick={this._handleStatic}>Rendre le grid static</Button>
			<Button onClick={this._handleNonStatic}>Rendre le grid non-static</Button>
		</div>;
	}
}

export default (GridOptionnalContract);
