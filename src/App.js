import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import shopee from './shopee.jpg'
import Cart from './Cart'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background: linear-gradient(-180deg, #f53d2d, #f63);
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const ShoppyImg = styled.img`
  height: 50px;
  border-radius: 10px;
`
const ShoppyContainer = styled.div`
  display: flex;
  align-items: center;
`

const Span = styled.span`
  font-size: 40px;
  color: white;
  margin-right: 20px;
`
const Body = styled.div``

const ContainerProducts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 750px;
  min-height: 200px;
  border: 1px solid black;
  margin: 10px;
`
const PictureProduct = styled.img`
  width: 150px;
  height: 150px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 10px;
`
const InfoProduct = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
`

const ButtonProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  width: 100px;
  height: 100px;
  background-color: ${props => props.status};
  border-radius: 50%;
  :hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`

export class Box extends Component {
  constructor(props) {
    super()
    this.state = {
      status:
        props.cart.filter(val => val.login.uuid === props.val.login.uuid)
          .length !== 0
          ? 'green'
          : 'red',
      count: props.cart
        ? props.cart.filter(val => val.login.uuid === props.val.login.uuid)
            .length
        : 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    let item = this.props.path === 'landing' ? this.props.val : this.props.index
    this.props.path === 'landing' &&
      this.setState({status: 'green', count: this.state.count + 1})
    this.props.handle(item)
  }
  render() {
    return (
      <ContainerProducts>
        <PictureProduct src={this.props.val.picture.large} />
        <InfoProduct>
          <span>
            {`Name : ${this.props.val.name.title} 
            ${this.props.val.name.first} ${this.props.val.name.last}`}
          </span>
          <span>{`Email : ${this.props.val.email}`}</span>
          <span>{`Address : ${this.props.val.location.street}
           ${this.props.val.location.city} ${this.props.val.location.state}
            ${this.props.val.location.postcode}`}</span>
        </InfoProduct>
        <ButtonProduct status={this.state.status} onClick={this.handleClick}>
          {this.state.status !== 'red' && this.state.count}
        </ButtonProduct>
      </ContainerProducts>
    )
  }
}

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?results=10&seed=tqld')
      .then(res => this.setState({list: res.data.results}))
      .catch(e => console.log(e))
  }
  render() {
    const {list} = this.state
    return (
      <Container>
        {list &&
          list.map((val, idx) => (
            <Box
              val={val}
              key={idx}
              handle={this.props.handleAddCart}
              path={'landing'}
              cart={this.props.cart}
            />
          ))}
      </Container>
    )
  }
}

const HeaderBar = withRouter(({cart, location: {pathname}}) => (
  <Header>
    <ShoppyContainer>
      <ShoppyImg src={shopee} />
      <Span>Shoppy</Span>
    </ShoppyContainer>
    <Link to={pathname === '/cart' ? '/' : '/cart'}>
      {pathname === '/cart' ? (
        <Span>Back </Span>
      ) : (
        <React.Fragment>
          &#x1F6D2; <Span>{cart.length}</Span>
        </React.Fragment>
      )}
    </Link>
  </Header>
))
class App extends Component {
  constructor() {
    super()
    this.state = {
      cart: [],
    }
    this.handleAddCart = this.handleAddCart.bind(this)
    this.handleDeleteCart = this.handleDeleteCart.bind(this)
  }
  handleAddCart = item => {
    this.setState({cart: [...this.state.cart, item]})
  }

  handleDeleteCart = index => {
    let deleteCart = this.state.cart.filter((val, idx) => idx !== index)
    this.setState({cart: deleteCart})
  }

  render() {
    return (
      <Router>
        <HeaderBar cart={this.state.cart} />
        <div>
          <Route
            path="/"
            exact
            render={() => (
              <Landing
                cart={this.state.cart}
                handleAddCart={this.handleAddCart}
              />
            )}
          />
          <Route
            path="/cart"
            exact
            render={() => (
              <Cart
                cart={this.state.cart}
                handleDeleteCart={this.handleDeleteCart}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

const RootApp = () => (
  // <Provider>
  <App />
  // </Provider>
)

export default RootApp
