import React, { Component } from 'react';
import { ButtonsComponent } from "./ButtonsComponent";

class PageCollectives extends Component {
	constructor(props) {
		super(props);
	}
    render() {
        return(

                <div>
                    <h1>Assurances collectives</h1>
                    <ButtonsComponent page='PageCollectives'/>
                </div>

        );
    }
}

export default (PageCollectives);