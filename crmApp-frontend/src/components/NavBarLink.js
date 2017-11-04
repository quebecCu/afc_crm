import React, { Component } from 'react';

class NavBarLink extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.props.handleClick(this.props.id);
        if(this.props.resetView){
            this.props.resetView("");
        }
    }

    render() {
        let link;
        if(this.props.view === this.props.id) {
            link = (<div onClick={this._handleClick} className="link active">
                            {this.props.name}
                        </div>)
        }
        else {
            link = (<div onClick={this._handleClick} className="link">
                {this.props.name}
            </div>)
        }
        return (
                link
        );
    }
}

export default NavBarLink;