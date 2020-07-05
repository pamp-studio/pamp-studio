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

function jumbleAnimation(elClass){
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
  },10000/el.innerHTML.length)
  }

  function jumbleScroll(elClass){
        var el = document.getElementsByClassName(elClass)[0];
        var charray = el.innerHTML.split('')
        .map(function(x,i){ return {id:i,char:x,pos:x=='\n'}  });
        var threshold = 1;
        window.onscroll = function(){
                threshold -= 0.01;
                jumble(el,charray,threshold);
                if(threshold<0){
                  clearInterval(interval);
                  init()
            }
        }
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          var elParent = el.parentNode;
          el.style.fontSize = '20px';
          while((window.innerWidth<el.getBoundingClientRect().width || 
          el.getBoundingClientRect().height + elParent.offsetTop > elParent.offsetHeight) && 
          parseFloat(el.style.fontSize.split('px')[0])>5)
          {
                  el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }
          el.style.top = elParent.getBoundingClientRect().height/2 - 
          el.getBoundingClientRect().height/2 +
          elParent.offsetTop
          el.style.left = elParent.getBoundingClientRect().width/2 - 
          el.getBoundingClientRect().width/2 +
          elParent.offsetLeft



  }
  
  var randomColours = ['chocolate','cornflowerblue','thistle','tomato','pink','yellowgreen']
  document.body.style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];
  //document.getElementById('').style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];

  
  function init(){
    zoomFit('zoomFit');
  }


window.onresize = function(){
    zoomFit('zoomFit');
}

zoomFit('zoomFit');
jumbleAnimation('effect');
jumbleScroll('effect');

