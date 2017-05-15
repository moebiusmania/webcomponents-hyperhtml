'use strict';

import hyperHTML from 'hyperhtml';

class IfData extends HTMLElement {

  constructor(){
    super();
    this.html = hyperHTML.bind(
      this.attachShadow({mode: 'open'})
    );
    this._props = {
      condition: false
    };

    this.__update = {
      set: (target,name,val) => {
        console.log(target,name,val);
        this._props = Object.assign({}, this.props, {[name]: val});
        this.render(this._props);
        return true;
      }
    }

    this.props = new Proxy(this._props, this.__update);
  }

  static get observedAttributes() {
    return ['condition'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + ':' + newValue);
    newValue = newValue === null ? false : true;
    this.props[name] = newValue;
  }

  connectedCallback(){
    if(this.hasAttribute('condition')){
      this.props.condition = this.getAttribute('condition');
    }
    this.render(this._props);
    console.log('<if-data> added to the DOM');
  }

  render(state){
    this.html`<style>
      :host{
        display: block;
        padding: 10px;
        border: 1px dashed #ccc;
      }
    </style>
    <div>
        <button disabled="${state.condition}">Provami</button>
    </div>`; 
    console.log('RENDER', state);
  }

}

customElements.define('if-data', IfData);