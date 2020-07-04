function effect(elClass){
  var el = document.getElementsByClassName(elClass)[0];
  var charray = el.innerHTML.split('')
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
  
          el.innerHTML = 
          charrayClone.map(function(x,i){return x.char;}).join('')
          if(threshold<0){
                  clearInterval(interval);
                  init()
          }
  },30000/charray.length)
  
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          el.style.fontSize = '20px';
          console.log(el.getBoundingClientRect().width,window.innerWidth)
          while(window.innerWidth-150<el.getBoundingClientRect().width && parseFloat(el.style.fontSize.split('px')[0])>5){
                  el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }
  }
  
  var randomColours = ['chocolate','cornflowerblue','thistle','tomato','pink','yellowgreen']
  
  function init(){
    zoomFit('zoomFit');
    document.body.style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];
    document.getElementById('services').style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];
    document.getElementById('header').style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];

  //  document.body.querySelectorAll('main h1')[0].style.backgroundColor = 'black';// randomColours[Math.round(randomColours.length*Math.random())];
    document.getElementById('stripey-canvas').style.color = 'white';//randomColours[Math.round(randomColours.length*Math.random())];
  //  document.getElementById('stripey-canvas').style.display = 'none'; 

  }

window.onload = function(){
}

window.onresize = function(){
    zoomFit('zoomFit');
}

effect('effect');
