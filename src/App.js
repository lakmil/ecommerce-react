import React, {Component} from 'react';
import './default.scss';
import Homepage from './pages/Homepage/index';
import Registration from './pages/Registration/index';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import HomepageLayout from './layouts/homepageLayout';
import Login from './pages/Login/index';
import { auth, handleUserProfile } from './firebase/utils';
import Recovery from './pages/Recovery/index';

const initialState = {
  currentUser: null
};

class App extends Component  {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     ...initialState
  //   };
  // }
  state = {
    currentUser: null
  }
  authListner = null;

  componentDidMount(){
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef =await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    })
  }
  componentWillUnmount(){
    this.authListner();
  }
  render() {
    const { currentUser } =this.state;
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" render={() => (
              <HomepageLayout >
                <Homepage />
              </HomepageLayout>
            )} />
            <Route path="/Registration" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )} />
            <Route path="/Login" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )} />
            <Route path="/Recovery" render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )} />
          </Switch>
      </div>
    );
  }
}

export default App;
