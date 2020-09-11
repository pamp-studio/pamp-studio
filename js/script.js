var globalRandomColor = 'black';

function tabs(){
var container = document.getElementById('tabs');
if(container==null){return}
var tabs = [].slice.call(container.querySelectorAll('li[data-tabctrl]'));
var pages = [].slice.call(container.querySelectorAll('div[data-tab]'));
var tabLinks = [].slice.call(document.querySelectorAll('*[data-tab-link]'));


function hideAllPages(){
  pages.forEach(function(x,i){
    x.style.display = 'none';
    tabs[i].className = '';
  })
}

tabs.forEach(function(x,i){
  x.onclick = function(){
    var oldHeight = container.offsetHeight;
    hideAllPages();
    pages[i].style.display = 'block';
    container.style.height='auto';
    var newHeight = container.offsetHeight;
    container.style.height=oldHeight+'px';
    setTimeout(function(){
      container.style.height= newHeight+'px';
    },.1)
    x.className = 'active';
  }
})

tabLinks.forEach(function(x){
  var index = parseInt(x.dataset.tabLink); 
  x.onclick = function(){
    tabs[index].click();
    container.scrollIntoView();
  }
   })

hideAllPages();
pages[0].style.display = 'block';
tabs[0].className = 'active';
}



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

function matrixJumble(elem,charray,threshold){
  var random = Math.random();

  var charrayClone = JSON.parse(JSON.stringify(charray)).map(function(x,i,arr){
    random = Math.random();
    if(random<threshold && !x.pos && !arr[Math.round((charray.length-1)*random)].pos){
            x.char = charray[Math.round((charray.length-1)*random)].char + (random<=0.5?"0":"1");
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
          matrixJumble(el,charray,threshold);
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
          jumble(el,charray,threshold);
        }
  }
  
  function zoomFit(elClass){
          var el = document.getElementsByClassName(elClass)[0];
          var elParents = [].slice.call(document.getElementsByClassName('logo-container'));
          var elParent =  elParents[0];
          var minFontPix = 5;
          el.style.fontSize = '60px';
          el.style.width = 'fit-content';
          el.style.height = 'fit-content';
        
          elParent.classList.remove('trans-height');
          elParent.style.height = '500px';
          el.classList.remove('trans-opacity-color');
          el.style.opacity = 0;
          while((elParent.offsetWidth<el.getBoundingClientRect().width || 
          el.getBoundingClientRect().height > elParent.offsetHeight) && 
          parseFloat(el.style.fontSize.split('px')[0])>minFontPix)
          {
            el.style.fontSize = (parseFloat(el.style.fontSize.split('px')[0])-1).toString()+'px';
          }
          elParent.classList.add('trans-height');
          elParent.style.height = el.getBoundingClientRect().height.toString() + 'px';
         // el.style.width = '100%';
          el.style.visibility = 'visible';
          el.classList.add('trans-opacity-color');
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
    var randomColours = ['#6B5B95','#C3447A','#E15D44','#D65076','#EFC050','#5B5EA6','#92A8D1','#88B04B','#FF6F61','orchid','turquoise','#009B77','pink','thistle','orange','yellow','lightblue','lightgreen','mediumaquamarine','tomato','hotpink'];
    var randomColour = randomColours[Math.floor(randomColours.length*Math.random())];
    var randomColour2 = randomColours[Math.floor(randomColours.length*Math.random())];
    var blackOrWhite = Math.random() <= 0.5 ? 'black' : 'white';
    var blackOrWhiteOpposite = blackOrWhite == 'black' ? 'white' : 'black';
    globalRandomColor = randomColour;
  //  document.querySelectorAll('footer')[0].style.borderColor = randomColour;
    document.getElementById('themeColor').content = randomColour;
    document.body.style.backgroundImage = window.innerWidth >= 450 ? 'repeating-linear-gradient(90deg,'+randomColour2+','+randomColour2+' 2px, transparent 2px, transparent 4px)' :
    'repeating-linear-gradient(90deg,'+randomColour2+','+randomColour2+' 1px, transparent 1px, transparent 2px)';
    document.body.style.backgroundColor = randomColour;
    document.getElementById('logo').style.color = blackOrWhite;
    document.getElementById('title').style.textShadow = '1px 1px '+ randomColour;
    document.getElementById('logo').style.textShadow = '1px 1px '+ randomColour + ',2px 2px '+blackOrWhiteOpposite+', 3px 3px '+ randomColour2;
   // [].slice.call(document.getElementsByClassName('logo-container'))[0].style.backgroundImage = 'repeating-linear-gradient(180deg,'+'black'+','+'black'+' 1px, transparent 1px, transparent 2px)';
  }

  function init(){
    updateFontRandomly();
  setColors();
  tabs();
  document.getElementById('regenerate-site').onclick = function(){
  document.body.style.background = null;
  document.getElementById('logo').style.visibility = 'hidden';
  [].slice.call(document.querySelectorAll("*")).forEach(function(el){
    el.style.width="100%";
    el.style.maxWidth="100%";
    el.style.color = "black";
    el.style.backgroundColor ="white"
  })
  jumbleAnimation('.regen-effect',25,true);
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
      x.href = x.href.replace('earth','earth-invert');
  })
  window.onfocus = function(){
 //     document.title = "Pamp";
      [].slice.call(document.getElementsByClassName('favicon')).forEach(function(x){
        x.href = x.href.replace('earth-invert','earth');
    })
      }
  }

}

init();


