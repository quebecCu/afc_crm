import React from 'react';
import DraggableList from 'react-draggable-list';
import GridMethodOnFieldContract from "./form/GridMethodOnFieldContract";
import '../style/draggable-list.css'

type OptionnalItemProps = {
  item: Object;
  itemSelected: number;
  dragHandle: *;
};
class OptionnalItem extends React.Component<PlanetProps> {

  getDragHeight() {
    return this.props.item.subtitle ? 47 : 28;
  }

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={"itemDraggable" + (dragged ? "dragged" : "")}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        }}
      >
        {dragHandle(<div className="dragHandle" />)}
        <p>{ item.label }</p>
				{
					item.libelletype === 'Booléen' &&
					<select className="form-control" id={item.label} name={item.label}
							required value={item.value} onChange={this._handleChange}>
						<option value="">-- Veuillez choisir une valeur --</option>
						<option value="Oui">Oui</option>
						<option value="Non">Non</option>
					</select>
				}
				{
					!(item.libelletype === 'Booléen') &&
					<input type="text" name={item.label} id={item.label}
							 className="form-control"
							 value={item.value} onChange={this._handleChange}
							 placeholder={item.valeur_defaut}
					/>
				}
				<div className="tooltipp" style={{
					cursor: "pointer",
					position: 'absolute',
					right: '5px',
					top: '2px'
				}}>
					<span className="fa fa-info"/>
					<span className="tooltipptext">{item.description}</span>
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
							data-target={"#" + item.idattrcontratcoll + "modal"}/>
				}
      </div>
    );
  }
}

class GridOptionnalContract extends React.Component {
	_container: HTMLElement;
	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this);
		this.state = {
	    useContainer: false,
	  };
	}

	_handleChange(list) {
		this.props.setGrid(list);
	}

	render(){
		return <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
  			     <DraggableList
                itemKey="idattrcontratcoll"
                template={OptionnalItem}
                list={this.props.formState.facultatif}
                onMoveEnd={newList => this._handleChange(newList)}
                container={()=>this.state.useContainer ? this._container : document.body}
              />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 offset-md-3">
      			<GridMethodOnFieldContract changeNewField={this.props.changeNewField}
  					   newField={this.props.newField}
  					   formState={this.props.formState}
  					   types={this.props.types}
  					   handleSubmitChamp={this.props.handleSubmitChamp}
      			/>
        </div>
      </div>
		</div>;
	}
}

export default (GridOptionnalContract);
