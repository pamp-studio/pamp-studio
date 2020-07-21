function difference(a, b) {
  return Math.abs(a - b);
}

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
  var el = document.querySelectorAll(elClass)[0];
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

  function jumbleScroll(selector){
        var el = document.querySelectorAll(selector)[0];
        var logoContainers = [].slice.call(document.getElementsByClassName('logo-container'));
        var counts = logoContainers.map(function(x){return x.offsetTop});
        
        var charray = el.innerHTML.split('').map(function(x,i){ return {id:i,char:x,pos:x=='\n'}});

        window.onscroll = function(e){
          var scrollY = window.pageYOffset;
          var closest = counts.reduce(function(prev, curr) {
            return (Math.abs(curr - scrollY) < Math.abs(prev - scrollY) ? curr : prev);
          });
  
          var elParent = logoContainers.filter(function(x){return x.offsetTop==closest})[0];
          var thresholdRaw = 1;
          var threshold = 1;
    
          threshold = scrollY/(document.body.offsetHeight-window.innerHeight);
          console.log(threshold,scrollY,document.body.offsetHeight,window.innerHeight)
          jumble(el,charray,threshold);
        }
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          var elParents = [].slice.call(document.getElementsByClassName('logo-container'));
          var elParent =  elParents[0];
          //  elParents.forEach(function(x,i,arr){
          //    x.style.height = window.innerHeight - arr[i].offsetTop*2;
          //  })
          var minFontPix = 5;
          el.style.fontSize = '40px';

          while((window.innerWidth<el.getBoundingClientRect().width || 
          el.getBoundingClientRect().height > elParent.offsetHeight) && 
          parseFloat(el.style.fontSize.split('px')[0])>minFontPix)
          {
            el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }
          el.style.visibility = 'visible';
          el.style.opacity = 1;
  }

  var updateFontRandomly = function() {
    var randomIndex = Math.floor(Math.random()*fonts.length);
    font = fonts[randomIndex];
    ASCII.updateFont(font, function() {
        ASCII.updateDisplay();
        zoomFit('zoomFit');
       // jumbleAnimation('effect',1,false);
        jumbleScroll('#logo pre');
    });
  };
  
  function init(){

    var randomColours = ['pink','thistle','tomato','yellow'];
    document.querySelectorAll('footer')[0].style.borderColor = randomColours[Math.floor(randomColours.length*Math.random())];

    document.getElementById('regenerate-site').onclick = function(){
      document.body.style.backgroundColor = null;
      jumbleAnimation('.container',40,true);
    }

// for autoplay to work in ios?
//var minisVideo = document.getElementById("minisVideo");
//minisVideo.muted = true;
//minisVideo.play();

updateFontRandomly();

setInterval(function(){
  document.getElementById('logo').style.opacity = 0;
  updateFontRandomly()},65000);
  }


window.onresize = function(){
    zoomFit('zoomFit');
}


init();


