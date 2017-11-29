import React from 'react';
import NavBarLink from '../components/NavBarLink';
import renderer from 'react-test-renderer';

test('Link Assurances Collectives', () => {
    const component = renderer.create(
        <NavBarLink name="Assurances Collectives" id="collIns"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    /* // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot(); 

    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();*/
});
//
test('Link Accueil', () => {
    const component = renderer.create(
        <NavBarLink name="Accueil" id="Home"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
//
//test('Link Assurances Individuelles', () => {
//    const component = renderer.create(
//        <NavBarLink name="Assurances Individuelles" id="indIns" />
//    );
//    let tree = component.toJSON();
//    expect(tree).toMatchSnapshot();
//
//});
//
//test('Link Placements', () => {
//    const component = renderer.create(
//        <NavBarLink name="Placements" id="placements" />
//    );
//    let tree = component.toJSON();
//    expect(tree).toMatchSnapshot();
//
//});
//
//test('Link Fournisseurs', () => {
//    const component = renderer.create(
//        <NavBarLink name="Fournisseurs" id="suppliers" />
//    );
//    let tree = component.toJSON();
//    expect(tree).toMatchSnapshot();
//
//});
//
//test('Link Gestion des utilisateurs', () => {
//    const component = renderer.create(
//        <NavBarLink name="Gestion des utilisateurs" id="usersManagement" />
//    );
//    let tree = component.toJSON();
//    expect(tree).toMatchSnapshot();
//
//});
//
