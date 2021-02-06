"use strict";

/** API key for signing the request */
const API_KEY = 'D600F8I0CUP4QEX2';
/** Alpha Vantage REST endpoint */

const ENDPOINT = 'https://www.alphavantage.co/query?function=';
/**
 * Display the current price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data. Must
 * contain a .symbol, .price, and .date elements.
 * @param {Object} data The returned stock symbol data
 */

const resultDisplay = (el, data) => {
  let {
    '05. price': price,
    '07. latest trading day': date,
    '01. symbol': symbol
  } = data['Global Quote'];
  el.querySelector('.price').innerHTML = `$${Number(price).toFixed(2)}`;
  el.querySelector('.symbol').innerHTML = symbol.toUpperCase();
  el.querySelector('.date').innerHTML = `${date} ${date.includes(':') ? date : ''}`;
};
/**
 * Handle symbol form submit to fetch the desired symbol information.
 * @param {Event} evt Event object for this listener function
 */


const fetchTickerData = evt => {
  evt.preventDefault(); // get the symbol

  const symbol = evt.target.elements['symbol'].value;
  fetch(`${ENDPOINT}GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`).then(response => {
    return response.json();
  }).then(data => {
    // log and export all data
    if (data['Error Message']) {
      // BONUS
      throw new Error(`There was an error. Please enter a valid symbol`);
    }

    resultDisplay(document.querySelector('.stock-display'), data);
    console.log(data);
  }).catch(err => {
    // BONUS
    alert(`There was an error: ${err}`);
  });
}; // add the submit listener


document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);