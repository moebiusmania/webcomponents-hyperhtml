'use strict';

import hyperHTML from 'hyperhtml';

class IfData extends HTMLElement {

  constructor(){
    super();
    this.SD = this.attachShadow({mode: 'open'});
    this.condition = false;
    this._props = {
      condition: false
    };

    this.__update = {
      set: (target,name,val) => {
        console.log(target,name,val)
        this._props = Object.assign({}, this.props, {[name]: val});
        // this._props[name] = val;
        this._render(this.render, this._props);
      }
    }

    this.props = new Proxy(this._props, this.__update);
  }

  static get observedAttributes() {
    return ['condition'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + ':' + newValue);
    this.props[name] = newValue;
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
    this.render = hyperHTML.bind(this.SD);

    if(this.hasAttribute('condition')){
      this.props.condition = this.getAttribute('condition');
    }
    this._render(this.render, this._props);
  }

  _render(render, state){
    render ? render`
      <div>${
        hyperHTML.wire()`<button disabled="${state.condition}">Provami</button>`
      }</div>
    ` : null;
    console.log('RENDER',render, state);
  }

  // update(newValue = true){
  //   this._props.condition = newValue;
  //   this._render(hyperHTML.bind(this.SD), Object.assign({},this._props));
  // }


}

customElements.define('if-data', IfData);