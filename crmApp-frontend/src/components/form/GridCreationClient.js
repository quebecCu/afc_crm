import React, { Component } from 'react';
import '../../style/grid-layout.css.css';
import '../../style/grid-rezisable.css.css';
import '../../style/GridCreationClient.css';
import ReactGridLayout from 'react-grid-layout';

export class GridCreationClient extends Component {

    render() {
        return (
            <div>
                <h1>Création d'un client</h1>
                <form action='/' onSubmit={this.props.handleSubmit}>
                    <ReactGridLayout className="layout" layout={this.props.layout} cols={12} rowHeight={30} width={1200}
                                     verticalCompact={false} autoSize={true} onDragStop={this.props.handleDrag}>
                        {
                            this.props.grid.map(element => {
                                return (
                                    <div key={element.key}>
                                        <label for={element.label}>{element.nom} </label>
                                        <input type="text" name={element.label} id={element.label} />
                                    </div>
                                );
                            })
                        }

                    </ReactGridLayout>
                </form>
                <button onClick={this.props.handleStatic}>Ancrer les champs</button>
                <button onClick={this.props.handleNonStatic}>Changer la position des boutons</button>

                <hr/>

                <form onSubmit={this.props.handleSubmitChamp}>
                    <label for="champ" style={{fontSize: 13}}>Nom du nouveau champ </label>
                    <input type="text" name="champNom" id="champNom" />
                    <label for="champ" style={{fontSize: 13}}>Identifiant du nouveau champ </label>
                    <input type="text" name="champId" id="champId" />
                    <input type="submit" value="Créer un nouveau champ"/>
                </form>
            </div>
        )
    }
}