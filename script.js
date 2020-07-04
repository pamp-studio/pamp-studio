function effect(elId){
  var charray = document.getElementById(elId).innerHTML.split('')
  .map(function(x,i){ return {id:i,char:x,pos:x=='\n'}  });
  var charrayClone = JSON.parse(JSON.stringify(charray));
  var random = Math.random();
  var threshold = 1;
  var switchy = 1
  
  var interval = setInterval(function(){
          threshold -= 0.01;
          charrayClone = JSON.parse(JSON.stringify(charray)).map(function(x,i){
                  random = Math.random();
                  if(random<threshold && !x.pos && !charrayClone[Math.floor(charray.length*random)].pos){
                          x.char = switchy.toString();
                  }
                  switchy = switchy ? 0 : 1;
                  return x;
          })
  
          document.getElementById(elId).innerHTML = 
          charrayClone.map(function(x,i){return x.char;}).join('')
          if(threshold<0){
                  clearInterval(interval);
                  init()
          }
  },5000/charray.length)
  
  }
  
  function zoomFit(elId){
          var el = document.getElementById(elId);
          el.style.zoom = 1.5;
          console.log(el.scrollWidth,el.scrollWidth+100,el.getBoundingClientRect().width)
          while(el.scrollWidth>el.getBoundingClientRect().width){
                  el.style.zoom = el.style.zoom-0.1;
          }
  }
  
  var randomColours = ['yellow','pink','yellowgreen']
  
  function init(){
  zoomFit('logo');
  document.body.style.backgroundColor = randomColours[Math.round(randomColours.length*Math.random())];
  }

window.onload = function(){
   // zoomFit('logo');
    effect('effect');
}

window.onresize = function(){
   // zoomFit('logo');
}