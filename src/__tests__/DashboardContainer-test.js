import React from 'react';
import {shallow} from 'enzyme';
import DashboardContainer from "../containers/DashboardContainer";

test('testing view change', () => {
    const checkbox = shallow(
        <DashboardContainer />
    );

    expect(checkbox.text()).toEqual('Off');

    checkbox.find('input').simulate('change');

    expect(checkbox.text()).toEqual('On');
});