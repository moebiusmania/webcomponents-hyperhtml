'use strict';

import hyperHTML from 'hyperhtml';

const config = { attributes: true };
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
  });    
});

class IfData extends HTMLElement {

  constructor(){
    super();
    this.SD = this.attachShadow({mode: 'open'});
    this.condition = false;
  }

 /* get condition(){
    return this.gasAttribute('condition');
  }

  set condition(val){
      console.log(val);
    const bool = val == 'true';
    if(bool){
      this.condition = val == 'true';
      this._render();
      this.setAttribute('condition', true);
    } else {
      this.removeAttribute('condition');
    }
  }*/

  static get observedAttributes() {
    return ['condition'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + ':' + newValue);
    /*this.condition = newValue == 'true';
    this._render();*/
  }

  connectedCallback(){
    this.SD.innerHTML = `<style>
      :host{
        display: block;
        padding: 10px;
        border: 1px dashed #ccc;
      }
    </style>`;
    console.log('<if-data> added to the DOM');
    observer.observe(this, config);
    this.render = hyperHTML.bind(this.SD);
    this._render();
  }

  _render(){
    this.render ? this.render`
      <div>${
        hyperHTML.wire()`<button disabled="${this.condition}">Provami</button>`
      }</div>
    ` : null;
    console.log(this.root,this.render,this.condition);
  }

  update(newValue = true){
    this.condition = newValue;
    this._render();
  }


}

customElements.define('if-data', IfData);