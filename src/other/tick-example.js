'use strict';

import hyperHTML from 'hyperhtml';

function tick(render) {
  render `
    <div>
      <h1>Hello, world!</h1>
      <h2>It is ${new Date().toLocaleTimeString()}.</h2>
    </div>
  `;
}
setInterval(tick, 1000,
  hyperHTML.bind(document.getElementById('root'))
);


// or a generic article update
// function update(render, state) {
//   render `
//   <article data-magic="${state.magic}">
//     <h3>${state.title}</h3>
//     List of ${state.paragraphs.length} paragraphs:
//     <ul>${
//       state.paragraphs
//         .map(p => `<li>${p.title}</li>`)
//     }</ul>
//   </article>
//   `;
// }

// update(
//   hyperHTML.bind(articleElement),
//   {
//     title: 'True story',
//     magic: true,
//     paragraphs: [
//       {title: 'touching'},
//       {title: 'incredible'},
//       {title: 'doge'}
//     ]
//   }
// );