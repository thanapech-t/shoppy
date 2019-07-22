import React, {Component} from 'react'
import styled from 'styled-components'
import {Box} from './App'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    console.log('item', this.props.cart)
  }
  render() {
    return (
      <Container>
        {this.props.cart &&
          this.props.cart.map((val, index) => (
            <Box
              val={val}
              index={index}
              key={index}
              handle={this.props.handleDeleteCart}
              cart={[]}
            />
          ))}
      </Container>
    )
  }
}

export default Cart
