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

function jumbleAnimation(elClass,intervalTime,reInit){
  var el = document.getElementsByClassName(elClass)[0];
  var charray = el.innerHTML.split('')
  .map(function(x,i){ return {id:i,char:x,pos:x=='\n'}  });
  var threshold = 1;
  var interval = setInterval(function(){
          threshold -= 0.01;
          jumble(el,charray,threshold);
          if(threshold<0){
            clearInterval(interval);
            if(reInit){
              document.location.reload()
            }
      }
  },intervalTime)
  }

  function jumbleScroll(elClass){
        var el = document.getElementsByClassName(elClass)[0]; 
        var elParent = el.parentNode;

        var charray = el.innerHTML.split('')
        .map(function(x,i){ return {id:i,char:x,pos:x=='\n'}  });
        var threshold = 1;
        window.onscroll = function(e){
          var scrollYLimit = elParent.offsetTop+(elParent.offsetHeight/2);
          threshold = window.scrollY/scrollYLimit;
          jumble(el,charray,threshold);
        }
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          var elParent = el.parentNode;
          elParent.style.height = window.innerHeight - elParent.offsetTop;
          var minFontPix = 5;
          el.style.fontSize = '20px';

          while((window.innerWidth<el.getBoundingClientRect().width || 
          el.getBoundingClientRect().height + elParent.offsetTop > elParent.offsetHeight) && 
          parseFloat(el.style.fontSize.split('px')[0])>minFontPix)
          {
            el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }

          el.style.top = ((elParent.getBoundingClientRect().height+elParent.offsetTop)/2) + 
          elParent.offsetTop/2 - 20 - 
          (el.getBoundingClientRect().height/2);

          el.style.left = (elParent.getBoundingClientRect().width/2) - 
          (el.getBoundingClientRect().width/2) +
          elParent.offsetLeft;
          el.style.visibility = 'visible';

  }
  
  function init(){
    var randomColours = ['cornflowerblue','thistle','tomato','pink','yellowgreen']
    document.body.style.backgroundColor = randomColours[Math.floor(randomColours.length*Math.random())];
    zoomFit('zoomFit');
    jumbleAnimation('effect',1,false);
   // setTimeout(function(){
      jumbleScroll('effect');
  //  },5000)

    document.getElementById('regenerate-site').onclick = function(){
      document.body.style.backgroundColor = null;
      jumbleAnimation('container',40,true);
    }

  }


window.onresize = function(){
    zoomFit('zoomFit');
}



init();


