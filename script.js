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
                  if(random<threshold && !x.pos && !charrayClone[Math.round((charray.length-1)*random)].pos){
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
  },105000/charray.length)
  
  }
  
  function zoomFit(elId){
          var el = document.getElementById(elId);
          el.style.fontSize = '1em';
          console.log(el.getBoundingClientRect().width,window.innerWidth)
          while(window.innerWidth-50<el.getBoundingClientRect().width && parseFloat(el.style.fontSize.split('em')[0])>0.01){
                  el.style.fontSize = (parseFloat(el.style.fontSize.split('em')[0])-0.01).toString()+'em';
          }
  }
  
  var randomColours = ['chocolate','blanchedalmond','cornflowerblue','azure','thistle','tomato']
  
  function init(){
  zoomFit('logo');
  document.body.style.backgroundColor = randomColours[Math.round(randomColours.length*Math.random())];
  }

window.onload = function(){
    effect('effect');
}

window.onresize = function(){
    zoomFit('logo');
}