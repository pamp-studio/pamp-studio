function jumble(elem,charray,threshold){
  var random = Math.random();

  var charrayClone = JSON.parse(JSON.stringify(charray)).map(function(x,i,arr){
    random = Math.random();
    if(random<threshold && !x.pos && !arr[Math.round((charray.length-1)*random)].pos){
            x.char = charray[Math.round((charray.length-1)*random)].char;
    }
    return x;
})
elem.innerHTML = 
charrayClone.map(function(x,i){return x.char;}).join('')
}

function effect(elClass){
  var el = document.getElementsByClassName(elClass)[0];
  var charray = el.innerHTML.split('')
  .map(function(x,i){ return {id:i,char:x,pos:x=='\n'}  });
  var threshold = 1;
  var interval = setInterval(function(){
          threshold -= 0.01;
          jumble(el,charray,threshold);
          if(threshold<0){
            clearInterval(interval);
            init()
      }
  },50000/el.innerHTML.length)
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          var elParent = el.parentNode;
          el.style.fontSize = '20px';
          while((window.innerWidth-50<el.getBoundingClientRect().width || 
          el.getBoundingClientRect().height-50 > elParent.offsetHeight) && 
          parseFloat(el.style.fontSize.split('px')[0])>5)
          {
                  el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }
          el.style.top = window.innerHeight/2 - 
          el.getBoundingClientRect().height/2 -
          elParent.offsetTop


  }
  
  var randomColours = ['chocolate','cornflowerblue','thistle','tomato','pink','yellowgreen']
  document.body.style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];
  
  function init(){
    zoomFit('zoomFit');
  }

window.onload = function(){
}

window.onresize = function(){
    zoomFit('zoomFit');
}
zoomFit('zoomFit');
effect('effect');
zoomFit('zoomFit');
