var orangelink = ["../tito4.html", "../bathtoys.html", "../pulls3.html","../adventure-time:-fabulous-explorations-in-neurodiversity.html", "index.html", "../relationshapes.html", "FUET-memo.html", "exploding-plastic-hands.html", "fabulation-and-fake-news.html", "howtodiis4ppearcompletely0.html", "nemo-memo.html", "orange.html", "o%C9%AF%C7%9D%C9%AF%20pl%C9%B9o%CA%8D%20p%C7%9D%CA%87%C9%B9%C7%9D%CA%8Cu%E1%B4%89%20pu%C9%90%20uo%E1%B4%89%CA%87%C9%94%E1%B4%89%C9%9F%20%C7%9D%CA%8C%E1%B4%89%CA%87%C9%90ln%C9%94%C7%9Dds%20%C9%90.html", "shape-shifting_memo.html", "so-fa_bulouss.html", "sparks-memo.html", "zlip.html", "video_2_2.html", "izsafe.html", "../spaze1.html", "../spaze2.html", "../spaze3.html", "../catzz.html", "../flcl", "../whispering-walls.html", "../The%20Extraordinary%20Adventures%20in%20Neurodiversity%20of%20Dougie%20Jones-1/", "../The%20Extraordinary%20Adventures%20in%20Neurodiversity%20of%20Dougie%20Jones-1/TheExtraordinaryAdventuresinNeurodiversityofD.html"];
var orangeslice = ["oranges/orange1.png", "oranges/orange2.png", "oranges/orange3.png", "oranges/orange4.png"];
// orangelink.forEach(oranges);

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

//top left orange
var orangefirst =document.createElement('div');
orangefirst.setAttribute('class', 'topleft');
orangefirst.setAttribute('onclick', 'changeImage();myFunction();');
var orangeinside = document.createElement('img');
orangeinside.setAttribute('id', 'rr');
orangeinside.setAttribute('src', orangeslice[1]);
orangeinside.setAttribute('height', '50');
orangeinside.setAttribute('width', '50');
orangefirst.appendChild(orangeinside);
document.body.appendChild(orangefirst);
var orangebigdiv = document.createElement('div');
orangebigdiv.setAttribute('id', 'myDIV');
document.body.appendChild(orangebigdiv);
// all the oranges
for (const element of orangelink) {
  var orangediv = document.createElement('div');
  orangediv.setAttribute('class', 'random');
  orangediv.setAttribute('width', '100px');
  orangediv.setAttribute('height', '100px');
  var orangea = document.createElement('a');
  orangea.setAttribute('href', element);
  var orangeimg = document.createElement('img');
  var item = orangeslice.random();
  orangeimg.setAttribute('src', item);
  orangeimg.setAttribute('width', '100px');
  orangeimg.setAttribute('height', '100px');
  orangea.appendChild(orangeimg);
  orangediv.appendChild(orangea);
  document.getElementById('myDIV').appendChild(orangediv);
}
