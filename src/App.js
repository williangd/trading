import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clickButton, errUpdate } from './actions';
import CompanyInfo from './components/CompanyInfo';
import Error from './components/Error';
import Button from './components/Button';
import InputText from './components/InputText';

import './App.css';
import Chart from './components/Chart';

const apiBaseURL = 'https://api.iextrading.com/1.0/stock';

class App extends Component {
  interval;

  getData(symbol) {
    const { clickButton, errUpdate } = this.props;

    axios
      .get(`${apiBaseURL}/${symbol}/batch?types=quote,chart`)
      .then(response => {
        const chart = response.data.chart;
        const { companyName, latestPrice } = response.data.quote;
        const quote = { companyName, latestPrice };

        clickButton({ quote, chart });
      })
      .catch(err => errUpdate(err.response.data));
  }

  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  onGetData(value) {
    this.getData(value);

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => this.getData(value), 5000);
  }

  handleSubmit = () => {
    this.getData(this.state.inputValue);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.onGetData(this.state.inputValue);
    }
  };

  render() {
    const { quote, error, errorMessage, chart } = this.props;
    const { inputValue } = this.state;

    return (
      <div className="App">
        <header className="header">
          <CompanyInfo quote={quote} />
          <div>
            <InputText
              value={inputValue}
              onChange={this.updateInputValue}
              onKeyPress={this.handleKeyPress}
              placeholder="symbol"
            />
            <Button onClick={this.handleSubmit}>Search</Button>
          </div>
        </header>
        {!error && <Chart data={chart} />}
        {error && <Error>{errorMessage}</Error>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  quote: store.clickState.quote,
  chart: store.clickState.chart,
  error: store.clickState.error,
  errorMessage: store.clickState.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({ clickButton, errUpdate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
