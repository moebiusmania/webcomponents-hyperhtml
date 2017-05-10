'use strict';

import hyperHTML from 'hyperhtml';

class RepeatData extends HTMLElement {

  constructor(){
    super();
    this.SD = this.attachShadow({mode: 'open'});
    this.base = 'http://jsonplaceholder.typicode.com'
    this.data = [];
  }

  static get observedAttributes() {
    return ['source'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + ':' + newValue);
  }

  connectedCallback(){
    this.SD.innerHTML = `<style>
      :host{
        display: block;
        padding: 10px;
        border: 1px dashed #ccc;
      }
    </style>`;
    console.log('<repeat-data> added to the DOM');
    this.root = hyperHTML.bind(this.SD)

    this.posts();
  }

  _renderData(data){
    console.log(data);
      this.data = data;
      this.root`
        <ul>${
          this.data.map(e => `<li>${e.body}</li>`)
        }</ul>
      `
  }

  posts(){
    fetch(`${this.base}/posts`).then( r => r.json() )
      .then(this._renderData.bind(this));
  }

  comments(){
    fetch(`${this.base}/comments`).then( r => r.json() )
      .then(this._renderData.bind(this));
  }


}

// Registra il nuovo elemento
customElements.define('repeat-data', RepeatData);