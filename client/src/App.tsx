import React from 'react';
import './App.css';
import  {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"
import Users from './Users';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Landing from './components/Landing';
import {setContext} from 'apollo-link-context';
import SignUp from './pages/SignUp';
import Login from './pages/Login';


const httpLink = new HttpLink({
  uri : "http://localhost:4000",
})

const authLink = setContext(async (req,{ headers })=>{
  const token = localStorage.getItem('token')

   return {
     ...headers,
     headers:{
       Authorization: token ? `Bearer ${token}`: null
     }
   }
})
 
const link = authLink.concat(httpLink as any);

 const client = new ApolloClient({
   link :(link as any),
   cache: new InMemoryCache(),
 })


function App() {
  return (
    <ApolloProvider client ={client}>
      <Router>
        <Switch>


          < Route path = '/landing'>
            <Landing></Landing>
          </Route>

          < Route path = '/login'>
            <Login></Login>
          </Route>

          < Route path = '/signUp'>
            <SignUp></SignUp>
          </Route>
         
          <Route  exact path= '/'>
             <div> hello world</div>
          </Route>

        </Switch>
      </Router>
  </ApolloProvider>
  );
}

export default App;
