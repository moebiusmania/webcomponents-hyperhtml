'use strict';

import hyperHTML from 'hyperhtml';

class TickElement extends HTMLElement {

  constructor(){
    super();
    this.SD = this.attachShadow({mode: 'open'});
  }

  connectedCallback(){
    this.SD.innerHTML = `<style>
      :host{
        display: block;
        padding: 10px;
        border: 1px dashed #ccc;
      }
    </style>`;
    console.log('<tick-element> added to the DOM');
    setInterval(this._tick, 1000,
      hyperHTML.bind(this.SD)
    );
  }

  _tick(render) {
    render `
      <div>
        <h1>Hello, world!</h1>
        <h2>It is ${new Date().toLocaleTimeString()}.</h2>
      </div>
    `;
  }

}

// Registra il nuovo elemento
customElements.define('tick-element', TickElement);