import React, { Component } from 'react';

class NavBarLinkGroup extends Component {
    constructor(props) {
      super(props);
      this._handleClick = this._handleClick.bind(this);
      this._handleDelete = this._handleDelete.bind(this);
      this._handleResetState = this._handleResetState.bind(this);
      this.state = {
      	deleted: false
	    };
    }

    _handleClick(id) {
      this.props.handleClick(id);
      if(this.props.resetView && !this.state.deleted){
        this.props.resetView(this.props.reset);
      }
      if(this.props.idUser) {
      	this.props.changeLoading(true);
      	this.props.displayUser(this.props.idUser);
    	}
    	if(this.props.idCustomer) {
      	this.props.changeLoading(true);
    		this.props.displayUser(this.props.idCustomer);
    	}
    	if(this.props.idSupplier && !this.state.deleted) {
      	this.props.changeLoading(true);
      	this.props.displayUser(this.props.idSupplier);
    	}
    	if(this.props.idContract) {
    		this.props.changeLoading(true);
    		this.props.displayUser(this.props.idContract);
    	}
    	this._handleResetState();
    }

    _handleResetState() {
    	if(this.props.resetFor === "contract") {
    		this.props.resetState({
				idClient: false,
				name: '',
				sousGroupe: '',
				nombreEmployes: ''
			});
		}
	}

  _handleDelete() {
		this.setState({deleted: true}, () => {
			if(this.props.idUser) {
				this.props.deleteSub(this.props.idUser);
			}
			if(this.props.idCustomer) {
				this.props.deleteSub(this.props.idCustomer);
			}
			if(this.props.idSupplier) {
				this.props.deleteSub(this.props.idSupplier);
			}
			if(this.props.idContract) {
				console.log(this.state.deleted);
				this.props.deleteSub(this.props.idContract);
			}
		});
	}

  _renderChilds() {
    let childs = [];
    for (var i=0; i < this.props.childs.length; i++) {
      if(this.props.view === this.props.childs[i].id){
        childs.push(
          <li className="active" key={this.props.childs[i].id}>
            <a
              href="#"
              onClick={this._handleClick.bind(this, this.props.childs[i].id)}
              id={this.props.childs[i].id}
              >
              {this.props.childs[i].name}
            </a>
          </li>
        )
      }else{
        childs.push(
          <li key={this.props.childs[i].id}>
            <a
              href="#"
              onClick={this._handleClick.bind(this, this.props.childs[i].id)}
              id={this.props.childs[i].id}
              >
              {this.props.childs[i].name}
            </a>
          </li>
        )
      }
    }
    return childs
  }

  render() {
      let link;
      if(this.props.menu !== "subMenu") {
        link = (
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title={this.props.name}>
            <a
              className="nav-link nav-link-collapse collapsed"
              data-toggle="collapse"
              data-parent="#exampleAccordion"
              href={"#" + this.props.id + "Sub"}
              id={this.props.id}>
	            <span className="nav-link-text">{"  " + this.props.name}</span>
	          </a>
            <ul className="sidenav-second-level collapse" id={this.props.id + "Sub"}>
              {
                this._renderChilds()
              }
            </ul>
          </li>
        )
      }
      else {
  			link = (
          <li>
            <a
              onClick={this._handleClick}
              id={this.props.id}>
  	            <span className="nav-link-text">
                  <span className="fa fa-minus-circle" onClick={this._handleDelete}/>
                  {"  " + this.props.name}
                </span>
	          </a>
        </li>
        )
	    }
      return (
              link
      );
  }
}

export default NavBarLinkGroup;
