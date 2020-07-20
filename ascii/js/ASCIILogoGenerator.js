"use strict";
var generatePhrase = "Pamp\nthe\nHorn";
var fonts = ["3-X.flf", "3D-ASCII.flf", "3D Diagonal.flf", "3x5.flf", "5 Line Oblique.flf", "Acrobatic.flf", "Alligator.flf", "Alligator2.flf", "Alpha.flf", "Alphabet.flf", "AMC AAA01.flf", "AMC Razor.flf", "AMC Slider.flf", "AMC Untitled.flf", "ANSI Regular.flf", "ANSI Shadow.flf", "Arrows.flf", "ASCII New Roman.flf", "Banner.flf", "Banner3-D.flf", "Banner3.flf", "Banner4.flf", "Barbwire.flf", "Bell.flf", "Benjamin.flf", "Big.flf", "Big Chief.flf", "Big Money-ne.flf", "Big Money-nw.flf", "Big Money-se.flf", "Big Money-sw.flf", "Bigfig.flf", "Block.flf", "Blocks.flf", "Bloody.flf", "Bolger.flf", "Bright.flf", "Broadway.flf", "Broadway KB.flf", "Bubble.flf", "Bulbhead.flf", "Caligraphy.flf", "Caligraphy2.flf", "Calvin S.flf", "Catwalk.flf", "Chiseled.flf", "Chunky.flf", "Coinstak.flf", "Cola.flf", "Colossal.flf", "Computer.flf", "Contessa.flf", "Cosmike.flf", "Crawford.flf", "Crawford2.flf", "Crazy.flf", "Cricket.flf", "Cursive.flf", "Cyberlarge.flf", "Cybermedium.flf", "Cybersmall.flf", "Cygnet.flf", "Delta Corps Priest 1.flf", "Doh.flf", "Doom.flf", "Electronic.flf", "Elite.flf", "Epic.flf", "Fire Font-k.flf", "Fire Font-s.flf", "Flower Power.flf", "Ghost.flf", "Graceful.flf", "Graffiti.flf", "Impossible.flf", "Isometric1.flf", "Isometric2.flf", "Isometric3.flf", "Isometric4.flf", "Merlin1.flf", "Modular.flf", "Ogre.flf", "Slant", "Slant.flf", "Slant Relief.flf", "Slant520Relief.flf", "Small Isometric1.flf", "Small Slant.flf", "Soft.flf", "Standard.flf", "Star Wars.flf", "Sub-Zero.flf", "Swamp Land.flf", "Sweet.flf", "The Edge.flf", "THIS.flf", "Train.flf", "Twisted.flf"];
var font = fonts[0];

var ASCII = ASCII || {};
ASCII.fonts = {};
ASCII.fonts.figlet = [];
ASCII.fonts.figlet[0] = new Figlet();
ASCII.currentFont = null;
ASCII.lastAjax = {};

ASCII.updateFont = function(newFont, callback) {
    var fontUrl = "./fonts/"+newFont;
        ASCII.lastAjax = fetch(fontUrl).then(function(res){
            return res.text();}).then(function(responseText){
                ASCII.fonts.figlet[0].load(responseText);
                ASCII.currentFont = ASCII.fonts.figlet[0];
                ASCII.currentFont.loadHorizontalOpts("default");
                ASCII.currentFont.loadVerticalOpts("default");
                console.log(fontUrl);
                if (callback) {callback();}
        });
};

ASCII.fontReady = function() {
    if (ASCII.currentFont !== null) {
        return true;
    }
    return false;  
};

ASCII.getText = function(txt) {
    var txt = ASCII.currentFont.getText(txt);
    txt = txt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return "<pre>" + txt + "</pre>";
};

ASCII.updateDisplay = function() {
    var output = document.getElementById("logo");
    output.innerHTML = ASCII.getText(generatePhrase);
};

(function() {
    var updateFontRandomly = function() {
        var randomIndex = Math.floor(Math.random()*fonts.length);
        font = fonts[randomIndex];
        ASCII.updateFont(font, function() {
            ASCII.updateDisplay();   
        });
    };
    setInterval(updateFontRandomly,3000);
    updateFontRandomly();
})();