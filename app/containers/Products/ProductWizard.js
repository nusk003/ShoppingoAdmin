import React from 'react'
import StyledMenu from './StyledMenu';
import GeneralProduct from './GeneralProduct';
import Combinations from './Combinations';

class ProductWizard extends React.Component{

    state = {
        activeMenu : "General"
    }

    changeMenu = activeMenu => {

        this.setState({activeMenu})
    }

    render(){

        const {activeMenu} = this.state
        const {brands,categories,product} = this.props
        return(
            <div style = {{display : 'flex',flexDirection : 'row'}} >
                <StyledMenu onChange = {this.changeMenu} activeMenu = {activeMenu}  />
                {activeMenu === "General" &&
                    <GeneralProduct {...{brands,categories,product}} />
                }
                {activeMenu === "Combinations" && 
                    <Combinations {...{brands,categories,product}} />
               
                }
            </div>
        )
    }
}

export default ProductWizard