import React, { Component } from 'react';
import '../../style/grid-layout.css';
import '../../style/grid-rezisable.css';
import '../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCreationClient extends Component {

    render() {
    	console.log("render grid");
        return (
            <div>
                <h1>Création d'un client</h1>
                <form action='/' onSubmit={this.props.handleSubmit}>
                    <ResponsiveReactGridLayout className="layout" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
											   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}} autoSize={true}
											   onDragStop={this.props.handleDrag} verticalCompact={false} >
                        {
                            this.props.grid.map(element => {
                                return (
                                    <div key={element.key}>
                                        <label htmlFor={element.label}>{element.nom} </label>
                                        <input type="text" name={element.label} id={element.label}
											   value={element.value} onChange={this.props.handleChangeInput}/>
                                    </div>
                                );
                            })
                        }

                    </ResponsiveReactGridLayout>
					<input type="submit" value="Créer une fiche client"/>
                </form>
                <button onClick={this.props.handleStatic}>Ancrer les champs</button>
                <button onClick={this.props.handleNonStatic}>Changer la position des boutons</button>

                <hr/>

                <form onSubmit={this.props.handleSubmitChamp}>
                    <label htmlFor="champ" style={{fontSize: 13}}>Nom du nouveau champ </label>
                    <input type="text" name="champNom" id="champNom" />
                    <label htmlFor="champ" style={{fontSize: 13}}>Identifiant du nouveau champ </label>
                    <input type="text" name="champId" id="champId" />
                    <input type="submit" value="Créer un nouveau champ"/>
                </form>
            </div>
        )
    }
}
