import React, { Component } from 'react';
import { ButtonsComponent } from "./components/ButtonsComponent";

export class PageCollectives extends Component {
    render() {
        return(

                <div>
                    <h1>Assurances collectives</h1>
                    <ButtonsComponent page='PageCollectives'/>
                </div>

        );
    }
}