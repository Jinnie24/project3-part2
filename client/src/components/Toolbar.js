import React, { Component } from 'react';
export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.sorted = { age: true, name: true };
    }

    sort(type) {
        
        const { update, products } = this.props;
        const isSorted = this.sorted[type];
        let direction = isSorted ? 1 : -1;


        const sorted = [].slice.call(products).sort((a, b) => {

            if (a[type] === b[type]) { return 0; }
            return a[type] > b[type] ? direction : direction * -1;
        });

        this.sorted[type] = !isSorted;

        update({
            products: sorted,
            active: 0
        });
    }
    reset() {
        this.props.update({
            products: this.props.initialproducts,
            term: '',
            active: 0,
            selectedProducts: {},
            selectedImportProducts: {}
        });
    }

    render() {
        return (
            <div className="toolbar">
                <button className="btn btn-default" onClick={() => this.sort('name')}>
                    <i className="glyphicon glyphicon-sort"></i>   Sort by name
                </button>
                <button className="btn btn-default" onClick={() => this.sort('price')}>
                    <i className="glyphicon glyphicon-sort"></i>   Sort by price
                </button>
                <button className="btn btn-danger" onClick={this.reset.bind(this)}>
                    <i className="glyphicon glyphicon-ban-circle"></i>   Reset
                </button>
            </div>
        );
    }
}