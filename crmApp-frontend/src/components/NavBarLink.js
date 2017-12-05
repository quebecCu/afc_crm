import React, { Component } from 'react';

class NavBarLink extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this.state = {
        	deleted: false
		};
    }

    _handleClick() {
        this.props.handleClick(this.props.id);
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
    }

    _handleDelete() {
		this.setState({deleted: true}, () => {
			if(this.props.idUser) {
				this.props.deleteSub(this.props.idUser);
			}
			if(this.props.idCustomer) {
				this.props.deleteSub(this.props.idCustomer);
			}
		});
	}

    render() {
        let link;
        if(this.props.view === this.props.id && this.props.menu !== "subMenu") {
            link = (<div onClick={this._handleClick} className="link active text-center" id={this.props.id}>
                             {"  " + this.props.name}
                        </div>)
        }
        else if (this.props.menu === "subMenu") {
			link = (<div onClick={this._handleClick} className="link text-center" id={this.props.id}>
				<span className="fa fa-minus-circle" onClick={this._handleDelete}/>
				{"  " + this.props.name}
			</div>)
		}
        else {
            link = (<div onClick={this._handleClick} className="link text-center" id={this.props.id}>
                 {"  " + this.props.name}
            </div>)
        }
        return (
                link
        );
    }
}

export default NavBarLink;
