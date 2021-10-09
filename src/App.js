import React, { Component } from 'react';
import AddItem from './AddItem';
import './App.css';
import ProductItem from './ProductItem';

const products = [
  {
    name: 'ipad',
    price: 200

  },
  {
    name: 'iphone',
    price: 650
  }
]

localStorage.setItem('products',JSON.stringify(products));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };
  }
  

  componentDidMount(){
    const products = this.getProducts();
    this.setState({products});
  }

  getProducts(){
    return this.state.products;
  }

  onAdd = (name,price) => {
    console.log(name,price);
    const products = this.getProducts();
    products.push({
      name,price
    });
    // console.log(products);
    this.setState({products});
  }

  onDelete = (name) => {
    const products = this.getProducts();
    const filteredProducts = products.filter(product=> product.name !== name)
    console.log(filteredProducts);
    this.setState({products:filteredProducts});
  }

  onEditSubmit = (name,price,originalName) =>{
    let products = this.getProducts();
    products = products.map(product => {
      if(product.name === originalName){
        product.name = name;
        product.price = price;
      }
      return product
    });
    this.setState({products});
    
  }

  render() {
    {console.log("rednering App")};
    return (
      <div className="App">
        <h1>Products Manager</h1>
        <AddItem onAdd = {this.onAdd}/>
        {
          this.state.products.map(product => {
            return(
              <ProductItem 
              key = {product.name}
              {...product}
              onDelete = {this.onDelete}
              onEditSubmit = {this.onEditSubmit}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
