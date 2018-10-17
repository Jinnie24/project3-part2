import React, { Component } from "react";
import Product from "../components/Product";
import CustomPaginationActionsTable from "../components/CustomPaginationActionsTable";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

const HOST = "http://localhost:3001";


class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productFormModal: false,
      name: "",
      snackMessage: "",
      quantity: "",
      price: "",
      selectedProducts: []
    };
    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  

  componentWillMount() {
    var url = HOST + `/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }
  handleNewProduct = e => {
    e.preventDefault();
    this.setState({ productFormModal: false });
    var newProduct = {
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price,
    };

    axios
      .post(HOST + `/inventory/product`, newProduct)
      .then(
        response =>
          window.location.reload(),
        
      )
      .catch(err => {
        console.log(err.response),
          this.setState({ snackMessage: "Product failed to save" }),
          this.handleSnackbar();
      });
    
    
  };
  handleEditProduct = editProduct => {
    axios
      .put(HOST + `/inventory/product`, editProduct)
      .then(response => {
        this.setState({ snackMessage: "Product Updated Successfully!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product Update Failed!" }),
          this.handleSnackbar();
        return false;
      });
  };
  handleAddProduct = e => {
    var { products } = this.state;
    const selectedProducts = products.filter(product => (product.selected = true));
    this.setState({selectedProducts: selectedProducts});
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ quantity: e.target.value });
  };
  handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
      bar.className = bar.className.replace("show", "");
    }, 3000);

    var url = HOST + `/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  };

  render() {
    var { products, snackMessage, selectedProducts } = this.state;

    var renderProducts = () => {
      if (products.length === 0) {
        return <p>{products}</p>;
      } else {
        return products.map(product => (
          <Product {...product} onEditProduct={this.handleEditProduct} />
        ));
      }
    };
    var renderSelectedProducts = () => {
      if (products.length === 0) {
        return <p>{selectedProducts}</p>;
      } else {
        return 
          <Product {...selectedProducts} onChange={this.handleAddProduct} />
      }
    };

    return (
      <div>

        <div className="container">
          <a
            className="btn btn-success pull-right"
            onClick={() => this.setState({ productFormModal: true })}
          >
            <i className="glyphicon glyphicon-plus" /> Add New Item
          </a>
          <br />
          <br />
          <Paper>
          <Table className="table">
            <TableHead>
              <TableRow className="inv-table">
                <TableCell>Name</TableCell>
                <TableCell numeric>Price</TableCell>
                <TableCell numeric>Quantity on Hand</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderSelectedProducts()}</TableBody>
          </Table>
          </Paper>
          
          <Paper>
          <Table className="table">
            <TableHead>
              <TableRow className="inv-table">
                <TableCell>Name</TableCell>
                <TableCell numeric>Price</TableCell>
                <TableCell numeric>Quantity on Hand</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderProducts()}</TableBody>
          </Table>
          </Paper>
        </div>

        <Modal show={this.state.productFormModal}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="barcode">
                  Barcode
                </label>
                <div className="col-md-4">
                  <input
                    id="barcode"
                    name="barcode"
                    placeholder="Barcode"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    onChange={this.handleName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="price">
                  Price
                </label>
                <div className="col-md-4">
                  <input
                    name="price"
                    placeholder="Price"
                    className="form-control"
                    onChange={this.handlePrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="quantity_on_hand">
                  Quantity On Hand
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="image">
                  Upload Image
                </label>
                <div className="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productFormModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleNewProduct}>Submit</Button>
          </Modal.Footer>
        </Modal>
        <div id="snackbar">{snackMessage}</div>
      </div>
    );
  }
}

export default Inventory;
