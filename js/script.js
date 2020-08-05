var globalRandomColor = 'black';

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
        var charray = el.innerHTML.split('').map(function(x,i){ return {id:i,char:x,pos:x=='\n'}});

        window.onscroll = function(e){
          var scrollY = window.pageYOffset;
          var threshold = 1;
          if(scrollY/((document.body.scrollHeight-window.innerHeight)/2)<1){
              threshold =  scrollY/((document.body.scrollHeight-window.innerHeight)/2);
          }
          else{
            threshold = 1-((1-(scrollY/((document.body.scrollHeight-window.innerHeight)/2)))*-1)
          }
          // if(scrollY==document.body.scrollHeight-window.innerHeight){
          //   [].slice.call(document.getElementsByClassName('bgstripe')).forEach(function(x){
          //     x.classList.add('bgstripe-animation');
          //   })
          // }
          // if(scrollY==0){
          //   [].slice.call(document.getElementsByClassName('bgstripe')).forEach(function(x){
          //     x.classList.remove('bgstripe-animation');
          //   })
          // }
          // console.log(threshold,scrollY,document.body.scrollHeight,window.innerHeight)
          jumble(el,charray,threshold);
        }
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          var elParents = [].slice.call(document.getElementsByClassName('logo-container'));
          var elParent =  elParents[0];
          var minFontPix = 5;
          el.style.fontSize = '60px';
          elParent.classList.remove('trans-height');
          elParent.style.height = '500px';
          el.classList.remove('trans-opacity');
          el.style.opacity = 0;
          while((elParent.offsetWidth<el.getBoundingClientRect().width || 
          el.getBoundingClientRect().height > elParent.offsetHeight) && 
          parseFloat(el.style.fontSize.split('px')[0])>minFontPix)
          {
            el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }
          elParent.classList.add('trans-height');
          elParent.style.height = el.getBoundingClientRect().height.toString() + 'px';
          el.style.visibility = 'visible';
          el.classList.add('trans-opacity');
          el.style.opacity = 1;
  }

  var updateFontRandomly = function() {
    var randomIndex = Math.floor(Math.random()*fonts.length);
    font = fonts[randomIndex];

    ASCII.updateFont(font, function() {
        ASCII.updateDisplay();
        zoomFit('zoomFit');
      //  jumbleAnimation('.effect',1,false);
        jumbleScroll('#logo pre');
    });
  };
  
  function setColors(){
    var randomColours = ['pink','thistle','orange','yellow','lightblue','lightgreen','mediumaquamarine','tomato','hotpink'];
    var randomColour = randomColours[Math.floor(randomColours.length*Math.random())];
    var randomColour2 = randomColours[Math.floor(randomColours.length*Math.random())];

    globalRandomColor = randomColour;
    document.querySelectorAll('footer')[0].style.borderColor = randomColour;
    //document.querySelectorAll('div.bgstripe')[0].style.backgroundColor = randomColour;
    document.getElementById('logo').style.textShadow = '1px 1px '+ randomColour;
 //   document.getElementById('logo').style.backgroundColor = randomColour;
    document.body.style.backgroundColor = randomColour2;
    document.getElementById('title').style.textShadow = '1px 1px '+ randomColour2;
  }

  function init(){
  setColors();
  updateFontRandomly();
  document.getElementById('regenerate-site').onclick = function(){
  document.body.style.backgroundColor = null;
  jumbleAnimation('.container',20,true);
  }

// for autoplay to work in ios?
//var minisVideo = document.getElementById("minisVideo");
//minisVideo.muted = true;
//minisVideo.play();


document.getElementById('logo').onclick = function(){
  setColors();
  updateFontRandomly();
  if(logoChangeInterval){
    clearInterval(logoChangeInterval)
  }
}

var logoChangeInterval = setInterval(function(){
  updateFontRandomly()
},120000);

// // wouldbe good but a bit mad on safari ios cos the windowheight 
// // changes everytime you scroll down from the top when the addressbar 
// // disappears
// window.onresize = function(){
//   updateFontRandomly()
// }

window.onblur = function(){
//  document.title = "Ԁɐɯd"; //dɯɐԀ
  [].slice.call(document.getElementsByClassName('favicon')).forEach(function(x){
      x.href = x.href.replace('earth','air');
  })
  window.onfocus = function(){
 //     document.title = "Pamp";
      [].slice.call(document.getElementsByClassName('favicon')).forEach(function(x){
        x.href = x.href.replace('air','earth');
    })
      }
  }

}

init();


