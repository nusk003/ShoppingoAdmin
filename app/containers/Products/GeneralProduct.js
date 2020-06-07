import React from 'react'
import { FormControl, InputLabel, Input, MenuItem, Select, Button, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Axios from 'axios'
import { host } from '../../../constants';

const styles = theme => ({
    demo: {
      height: 'auto',
    },
    divider: {
      margin: `${theme.spacing.unit * 3}px 0`,
    },
    input: {
      margin: theme.spacing.unit * 3,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit * 3,
      marginTop : 0
    },
  });

class GeneralProduct extends React.Component {

    state = {
        mainCategory : {},
        title : this.props.product.title,
        brand : {},
        category : {},
        isDelete : this.props.product.isDelete
    }

    componentDidMount () {

        const {category,brand} = this.props.product
        const {id,parent} = category
        const index = this.props.categories.findIndex(category=>category.id === parent)
        if(index>-1){
            this.setState({mainCategory : this.props.categories[index]})
        }

        const mainCategory = this.props.categories[index]
        const {SubCats} = mainCategory

        const catIndex = SubCats.findIndex(cat => cat.id === id)

        if (catIndex > -1) {
            this.setState({category : SubCats[catIndex]})
        }

        const brandIndex = this.props.brands.findIndex(brandobj => brandobj.id === brand)

        if (brandIndex > -1){
            this.setState({brand : this.props.brands[brandIndex]})
        }
    }

    onChangeMainCategory = event => {

        const {SubCats} = event.target.value
        this.setState({mainCategory:event.target.value,category : SubCats.length > 0 ? SubCats[0] : {} })
    }

    onBrandChange = event => {
        this.setState({brand : event.target.value})
    }

    onSubCategoryChange = event => {
        this.setState({category:event.target.value})
    }

    update = (id,payload) => {
        Axios.put(`${host}/products/admin/${id}/edit/`,payload)
        .then(({data})=>{
            alert(JSON.stringify(data))
        })
        .catch(error=>{
            alert(error.message)
        })
    }

    submitHandler = e => {

        e.preventDefault()

        const {isDelete,category,title,brand} = this.state

        if (!category.id){
            alert("Please provide the category")
            return
        }

        if (!brand.id){
            alert("Please provide the brand")
            return
        }

        const payload = {
            title,
            isDelete,
            category : category.id,
            brand : brand.id
        }

        this.update(this.props.product.id,payload)

    }

    render(){
        const {classes,brands,categories,product} = this.props
        const {mainCategory,category,brand,isDelete} = this.state
        return(
            <form onSubmit = {this.submitHandler} >
            <div >
                <FormGroup row>
            <FormControl className={classes.formControl} >
                <InputLabel htmlFor="name-simple">Title</InputLabel>
                <Input onChange = {(e)=>this.setState({title : e.target.value})} required id="filled-select-currency-native" defaultValue={product.title} />
            </FormControl>
            </FormGroup>
            <FormGroup row>
            <FormControl className={classes.formControl} style = {{width : 120}} >
                <InputLabel htmlFor="age-simple">Category</InputLabel>
                <Select
                    value={mainCategory}
                    onChange={this.onChangeMainCategory}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                    
                >
                {categories.map((category,i)=>
                    
                    <MenuItem key = {i} value={category}>{category.title}</MenuItem>

                )}
                
                </Select>
            </FormControl>
            </FormGroup>
            {mainCategory.SubCats && mainCategory.SubCats.length > 0 &&
                <FormGroup row>
                <FormControl className={classes.formControl} style = {{width : 120}} >
                    <InputLabel htmlFor="category-sub">{mainCategory.title}</InputLabel>
                    <Select
                    value= {category}
                    onChange={this.onSubCategoryChange}
                    inputProps={{
                        name: mainCategory.title,
                        id: 'category-sub',
                    }}
                    >
                    {mainCategory.SubCats.map((category,i)=>
                        <MenuItem value={category}>{category.title}</MenuItem>
                    )}
                    </Select>
                </FormControl>
                </FormGroup>
            }
            <FormGroup row >
            <FormControl className={classes.formControl} style = {{width : 120}} >
                <InputLabel htmlFor="brand">Brand</InputLabel>
                <Select
                value={brand}
                onChange={this.onBrandChange}
                inputProps={{
                    name: 'brand',
                    id: 'brand',
                }}
                >
                {brands.map((brand,i)=>
                    <MenuItem key = {i} value={brand}>{brand.title}</MenuItem>
                )}
                
                </Select>
            </FormControl>
            </FormGroup>
            <FormControlLabel
                  control={(
                    <Switch
                      checked={isDelete}
                      onChange={()=>this.setState({isDelete : !isDelete})}
                      value={isDelete}
                    />
                  )}
                  label="Delete"
                  className={classes.formControl}
            />
            <FormGroup row className={classes.formControl} >
            <Button type = "submit" variant = "contained" color="primary" className={classes.button}>
              Update
            </Button>  
            </FormGroup>         
            </div>
            </form>
        )
    }
}

GeneralProduct.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(GeneralProduct)