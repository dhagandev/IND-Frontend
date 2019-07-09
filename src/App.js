import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import { login, logout, auth } from "./utils/firebaseService";

const linkStyle = {
    textDecoration: 'underline',
    color: 'rebeccapurple',
    cursor: 'pointer'
};

// Here's our Private Route

function PrivateRoute({ authenticated, component: Component, ...rest }) {
    return (
        <Route render={props => (
            authenticated
            ? <Component {...rest} {...props} />
            : <Redirect to="/login" />
        )}/>
    )
}

// Here's our child components

function Home() {
  console.log("home called")
  return(
    <div>
      <h1>Welcome to React Firebase Todos</h1>
    </div>
  )
}

function Dashboard({
  user, 
  text, 
  handleChange, 
  handleSubmit}) {
  console.log("dashboard called")
  return(
    <div>
      <h2>Welcome to your Dashboard, {user.displayName.split(" ")[0]}</h2>
      <img
      style={{
        height: 100,
        borderRadius: '50%',
        border: '2px solid black'
      }} 
      src={user.photoURL} 
      alt={user.displayName}
      />
      <hr />
      <h5>Here's your todo items</h5>
      <ul>
          {/* We'll map through our todo items here */}
      </ul>

      <form onSubmit={handleSubmit}>
        <input name="text" value={text} onChange={handleChange} />
        <button>Add Todo</button>
      </form>
    </div>
  )
}

function Login({ authenticated }) {
  console.log("in login method")
  if(authenticated) {
    console.log("Considered authenticated already")
    return <Redirect to="/" />
  }
  console.log("should be returning the login div area")
  return(
    <div>
        <h2>You need to be logged in to see this page</h2>
        <button onClick={login}>Login With Google</button>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: null,
      text: "",
      todos:[],
      dbRef: null,
    }
  }

  handleChange = e => {
  this.setState({
    [e.target.name] : e.target.value
  })
};

handleSubmit = e => {
  const {dbRef, text} = this.state;
  e.preventDefault();
  // createTodo(dbRef, {
  //   text,
  //   completed: false
  // }).then(()=>this.setState({text:""}));
};

handleRemove = todoId => {
  // removeTodo(this.state.dbRef, todoId);
};


handlePopulateTodos = () => {
  // database.ref(this.state.dbRef).on("value", snapshot => {
  //   const newStateArr = [];
  //   snapshot.forEach(childSnapshot => {
  //     newStateArr.push({
  //       id: childSnapshot.key,
  //       ...childSnapshot.val()
  //     });
  //   });
  //   this.setState({todos: newStateArr});
  // });
}


  componentDidMount() {
    this.callTestRoute()
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ 
          authenticated: true,
          user,
          dbRef: `users/${user.uid}/todos` 
        }, this.handlePopulateTodos);
      } else {
        this.setState({ 
          authenticated: false,
          user: null,
          dbRef: null
        });
      }
    });
  }

  callTestRoute = async () => {
    console.log("Test Route")
    const response = await fetch('/api/test')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  render() {
    return (
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {
            this.state.authenticated &&
            <li style={linkStyle}>
              <span onClick={logout}>Logout</span>
            </li>
          }
        </ul>
        <Switch>
          <Route 
            exact path="/" 
            component={Home} />
          <PrivateRoute 
            authenticated={this.state.authenticated} 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleRemove={this.handleRemove}
            user={this.state.user} 
            text={this.state.text} 
            todos={this.state.todos}
            path="/dashboard" 
            component={Dashboard} />
          <Route 
            path="/login" 
            render={props => (
              <Login
                {...props}
                authenticated={this.state.authenticated}
              />
            )}/>
        </Switch>
      </Router>
    );
  };
}

export default App;
