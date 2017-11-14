import React, { Component } from 'react';
import '../../style/grid-layout.css';
import '../../style/grid-rezisable.css';
import '../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCreationClient extends Component {

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <form action='/' onSubmit={this.props.handleSubmit}>
                    <ResponsiveReactGridLayout className="layout" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
											   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}} autoSize={true}
											   onDragStop={this.props.handleDrag} compactType={null} >
                        {
                            this.props.grid.map(element => {
                                return (
                                    <div key={element.key} className="form-group">
                                        <label htmlFor={element.label} className="control-label">{element.nom}</label>
                                        <input type="text" name={element.label} id={element.label} className="form-control"
											   value={element.value} onChange={this.props.handleChangeInput}/>
                                    </div>
                                );
                            })
                        }

                    </ResponsiveReactGridLayout>
					<div className="form-group">
						<input type="submit" value="Valider" className="btn btn-primary"/>
					</div>
                </form>

				<div className="form-group">
                	<button onClick={this.props.handleStatic}>Ancrer les champs</button>
                	<button onClick={this.props.handleNonStatic}>Changer la position des boutons</button>
				</div>

                <hr/>

                <form onSubmit={this.props.handleSubmitChamp} className="col-4 offset-4">
					<div className="form-group">
                    	<label htmlFor="champ" style={{fontSize: 13}} className="control-label">Nom du nouveau champ </label>
                    	<input type="text" name="champNom" id="champNom" className="form-control"/>
					</div>
					<div className="form-group">
                    	<label htmlFor="champ" style={{fontSize: 13}} className="control-label">Identifiant du nouveau champ </label>
                    	<input type="text" name="champId" id="champId" className="form-control"/>
					</div>
					<div className="form-group">
						<input type="submit" value="Créer un nouveau champ" className="btn btn-primary"/>
					</div>
                </form>
            </div>

        )
    }
}
