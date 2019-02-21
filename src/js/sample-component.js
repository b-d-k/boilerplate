/*
  Sample Javascript
*/

function SampleComponent(node) {

  node.addEventListener('click', (e) => {
    e.target.classList.toggle('SampleComponent--active');
   })
}

document.addEventListener('DOMContentLoaded', function() {

  var sampleComponents = document.querySelectorAll('.SampleComponent');

  for(let i = 0; i < sampleComponents.length; i++) {
    new SampleComponent(sampleComponents[i]);
  }
});
