import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CompleteTransactions from "../components/CompleteTransactions.js";
import axios from "axios";

const HOST = "http://localhost:3001";
const url = HOST + `/transactions`;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [],
    itemOptions: [] };
  }
  componentWillMount() {
    axios
      .get(url)
      .then(response => this.setState({ transactions: response.data }))
      .catch(err => {
        console.log(err.response);
      });
  }

  handleSelectItems = () => {
    axios
      .get(HOST + `/inventory/products`)
      .then(response => this.setState({ itemOptions: response.data }))
      .catch(err => {
        console.log(err.response);
      });
  }
  
  render() {
    var { transactions } = this.state;
    console.log(transactions);

    var rendertransactions = () => {
      if (transactions.length === 0) {
        return <p>No Transactions found</p>;
      } else {
        return transactions.map(transaction => (
          <CompleteTransactions {...transaction} />
        ));
      }
    };

    return (

    <div className="container">
        <a
            className="btn btn-success pull-right"
            onClick={() => this.setState({ productFormModal: true })}
          >
            <i className="glyphicon glyphicon-plus" /> Add new transaction
          </a>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Time</th>
              <th>Total</th>
              <th>Products</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>{rendertransactions()}</tbody>
        </table>

        <Modal show={this.state.productFormModal}>
          <Modal.Header>
            <Modal.Title>Add Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newTransactionForm">
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="transactionType">
                  Type of transaction
                </label>
                <div className="col-md-4">
                    <select id="transactionType" class="form-control">
                        <option selected>Add</option>
                        <option>Subtract</option>
                        <option>Write-off</option>
                    </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="itemOptions">
                  Items
                </label>
                <div className="col-md-4">
                    <select id="transactionType" class="form-control">
                        <option selected>Add</option>
                        <option>Subtract</option>
                        <option>Write-off</option>
                    </select>
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
    </div>
    );
  }
}

export default Transactions;