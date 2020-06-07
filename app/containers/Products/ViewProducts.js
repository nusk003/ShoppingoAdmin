import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import ProductAccordian from './ProductAccordian';
import Axios from 'axios';
import { host } from '../../../constants';
import { Input, Button } from '@material-ui/core';

class BlankPage extends React.Component {

  state = {
    categories : [],
    brands : [],
    products : [],
    loading : false,
    search : "",
    next : true,
    timeout : null
  }

  page = 1

  componentDidMount(){
    this.getBrands()
    this.getCategories()
    this.timeout = null
  }

  getCategories = () => {
    Axios.get(`${host}/products/admin/get-categories/`)
    .then(({data})=>{
      this.setState({categories : data})
    })
    .catch(error=>{
      alert(error.message)
    })
  }

  searchProducts = () => {

    const {search} = this.state
    if (!this.state.next){
      return
    }
    this.setState({loading : true})
    Axios.get(`${host}/products/admin/get-products/?${search && search !== "" ? `search=${search}&` : ''}page_size=${search ? `5` : `5`}&page=${this.page}`)
    .then(({data})=>{
      const products = this.state.products
      const newProducts = products.concat(data.results)
      this.page += 1
      this.setState({products : newProducts,loading : false,next : data.next !== null})
      
    })
    .catch(error=>{
      alert(error.message)
      this.setState({loading : false})
    })
  }

  getProducts = (e) => {
    const search = e.target.value
    this.page = 1
    this.setState({search,products : [],next : true})
    if (this.state.timeout){
      clearTimeout(this.state.timeout)
    }

    this.setState({timeout : setTimeout(()=>this.searchProducts(),300)})

  }

  seeMoreHandler =  () => {
    this.searchProducts()
  }

  seeAllHandler = () => {
    this.page = 1
    this.setState({search : "",products : [],next : true})
    this.searchProducts()
  }

  getBrands = () => {
    Axios.get(`${host}/products/admin/get-brands/`)
    .then(({data})=>{
      this.setState({brands : data})
    })
    .catch(error=>{
      alert(error.message)
    })
  }

  render() {
    const title = brand.name + ' - Products';
    const description = brand.desc;
    const {categories,brands,products,loading,next} = this.state
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="View Products" desc="All your products at one place">
          <Input placeholder = "Search Products" onChange = {this.getProducts} />
          <Button onClick = {this.seeAllHandler} >Show All</Button>
          {products.map((product,i)=>
            <ProductAccordian key = {i} product = {product} categories = {categories} brands = {brands} />
          )}
          
          {loading ?
          <p>Loading...</p>
          :
          next &&
          <Button onClick = {this.seeMoreHandler} >
            See More
          </Button>
          }
          
        </PapperBlock>
      </div>
    );
  }
}

export default BlankPage;
