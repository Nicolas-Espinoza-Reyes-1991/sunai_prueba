import React from "react";
import logo from './logo.svg';
import './App.css';
// import FormSunai from './components/FormSunai';
import 'bootstrap/dist/css/bootstrap.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup ,ModalFooter} from 'reactstrap';
import FormSunai from "./components/FormSunai";
import GaraficoExcel from "./components/GaraficoExcel";



class App extends React.Component {
  render() {
    return (

      <div>
      <FormSunai></FormSunai>

      <GaraficoExcel></GaraficoExcel>
  </div>
      
    )}
    
      
}



export default App;
