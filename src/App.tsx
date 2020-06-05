import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import OrderForm from "./components/order-data/OrderDataForm";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles({
    centeredLayout: {
        justifyContent: 'center',
        marginTop: 40,
        display: 'flex',
    }
});

function App() {
  return (
      <div className="App">
        <Header />
        <div className={useStyles().centeredLayout}>
            <OrderForm />
        </div>
      </div>
  );
}

export default App;
