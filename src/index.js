import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import './App.css';
import { Feed } from './Feed';
import FullPost from './Full-Post';
import Editor from './Editor';
import Profile from './Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-jcxah3qxlr2qrvw4.us.auth0.com"
    clientId="UcQXiXwT5fdNXtSRZ8Pmy3pbFqy5AmTl"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}>
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/post/:_id' element={<FullPost/>}/>
          <Route path='/editor/:_id?' element={<Editor/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
