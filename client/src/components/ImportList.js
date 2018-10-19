import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductData from './ProductData';
import Autosuggest from 'react-autosuggest';
// import Product from "./Product";

export default ({ products,selectedProducts,update,type,inventoryState,selectedImportProducts }) => {
    if (!products) { return ('Select smth please'); }
    let totalprice=0;
    let selimportprod = products.filter((product) => {
        return !!selectedImportProducts[product['_id']];
         // console.log(product);
    });
    const selimportprodview = selimportprod.map((product, index) => {
        // totalprice=totalprice+product.price*+selectedImportProducts[product._id];

        return (<ProductData key={product._id}
                             product={product}
                             selectedProducts={selectedProducts}
                             index={index}
                             keyto={product._id}
                             update={update}
                             type={type}
                             inventoryState={inventoryState}
                             selectedImportProducts={selectedImportProducts}/>);
    });

    if(Object.keys(selectedImportProducts).length===0){
        return (
            <div>
                <Table className="table user-list">
                    <TableHead>
                        <TableRow className="inv-table">
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Quantity to add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="empty-selected">
                            Add something
                            <a
                            className="btn btn-success"
                            onClick={() => update({productFormModal: true})}
                            >
                            <i className="glyphicon glyphicon-plus"/>     Add New Item
                            </a>
                        </TableRow>
                    </TableBody>
                </Table>
                <div>

                </div>
            </div>
        );
    }else {
        return (
            <div>
                <Table className="table user-list">
                    <TableHead>
                        <TableRow className="inv-table">
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Quantity to add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selimportprodview}
                    </TableBody>
                </Table>
                <div className={"text-right import-total"}>
                    <a
                        className="btn btn-success"
                        onClick={() => update({productFormModal: true})}
                    >
                        <i className="glyphicon glyphicon-plus"/>     Add New Item
                    </a>
                    <a
                        className="btn btn-success"
                        
                    >
                        <i className="glyphicon glyphicon-shopping-cart"/> ADD NEW PRODUCTS
                    </a>
                </div>
            </div>
        );
    }
};