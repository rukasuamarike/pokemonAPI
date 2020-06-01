console.log("js connect");
var request;
var movereq;
var qmode="id";
//window.addEventListener('keydown',Request,false);
var num=document.getElementById("inID").value;
document.getElementById("inID").addEventListener('change',Request,false);
var list=document.getElementById("moves");
var acc = document.getElementsByClassName("accordion");
var inputs=document.getElementsByClassName("dropdown-content");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
for (var i = 0; i < inputs[0].children.length; i++) {
inputs[0].children[i].addEventListener('click',function() {
console.log(this.innerHTML);
var el=document.getElementById("inID");
if(this.id=="I"){
  el.type="number";
  el.min=1;
  el.max=807;
  document.getElementById("dropbtn").innerHTML="poké ID";
  qmode="ID";
  console.log(el);
}
if(this.id=="T"){
  el.type="number";
  document.getElementById("dropbtn").innerHTML="Type";
  qmode="type";
}
if(this.id=="N"){
  el.type="text";
  document.getElementById("dropbtn").innerHTML="Name";
  qmode="name";
}
 });
}


function Request(){
  var intype=document.getElementById("inID").id;
  num=document.getElementById("inID").value;
    if(qmode=='type'){num="type/"+num;console.log("in type is T!",num)}else{
      num="pokemon/"+num;}
      if(qmode=='pkmnreq'){}
    
request=new XMLHttpRequest();//new obj
request.addEventListener('load',getResponse,false)
request.open("GET","https://pokeapi.co/api/v2/"+num+"/");
console.log("https://pokeapi.co/api/v2/"+num+"/");
console.log(request);
request.send();
}

function getResponse(){
    var inData=JSON.parse(request.response);
    console.log(inData);
    //if(inData.)
    if(qmode!="type"){
      if(qmode="pkmnreq"){
        document.getElementById(inData.name)

      }
    document.getElementById("poki").src=inData.sprites.front_default;
    document.getElementById("answer").innerHTML=inData.name;
    var k="l";var t="";if(inData.types.length>1){k="types: ";t=", ";}else{k="type: ";t="";}
    for(var i=0;i<inData.types.length;i++){k+=inData.types[i].type.name;if(i!==inData.types.length-1)(k+=t)}
    document.getElementById("type").innerHTML=k;

    for(var i=0;i<document.getElementById("stats").children.length;i++){
        var el=document.getElementById("stats").children[i];
       el.innerHTML=el.id+": "+inData.stats[i].base_stat;
    }
    clearmoves();
    
    for(var i=0;i<inData.moves.length;i++){
      var b=document.createElement('button');
      var bigdiv=document.createElement('div');
      var div=document.createElement('div');
      var a=document.createElement('p');
      var text =inData.moves[i].move.name;
      bigdiv.id="m"+i;
      bigdiv.className="temp";
      b.innerHTML=text;
      b.className="accordion";
      div.className="panel";
      bigdiv.appendChild(b);
      bigdiv.appendChild(div);
      div.appendChild(a);
        a.innerHTML = text;
        a.id=text;
        a.style="color:#000";
        a.title = inData.moves[i].move.url;
        
        
        b.addEventListener('click', function() {
          /* Toggle between adding and removing the "active" class,
          to highlight the button that controls the panel */
          this.classList.toggle("active");
          
          /* Toggle between hiding and showing the active panel */
          movereq=new XMLHttpRequest();//new obj
        movereq.addEventListener('load',move,false)
        movereq.open("GET",this.nextElementSibling.firstChild.title);
        movereq.send();
          var panel = this.nextElementSibling;
          
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
        list.appendChild(bigdiv);
        
    }
  }else /*if(qtype=="type")*/{
    var pkmnlist=inData.pokemon;
    var pcbox=document.getElementById("pcBox");
    
    console.log(pkmnlist);
    for(var i=0;i<pkmnlist.length;i++){
      var pkmn=pkmnlist[i].pokemon;  
      t=0;
      qmode='pkmnreq';
      request=new XMLHttpRequest();//new obj
      request.addEventListener('load',Request,false)
      request.open("GET",pkmn.url);
      request.send();
      console.log(pkmn);
      var pim=document.createElement('img');

      var ptext=document.createElement('p');
      ptext.innerHTML=pkmn.name;
      ptext.className="np";
      pim.id=pkmn.name;

      pcbox.appendChild(ptext);
    }
  }
}
function getPokemon(){
  var inData=JSON.parse(request.response);
  console.log(inData);
}

function move(e){
  if(!movereq.isNullOrUndefined){
    var inData2=JSON.parse(movereq.response);
    console.log(inData2);
    var movebox=document.getElementById(inData2.name);
    var mpower=document.createElement('p');
    mpower.innerHTML="PWR:"+inData2.power;
    var mpp=document.createElement('p');
    mpp.innerHTML="PP:"+inData2.pp;
    var mtype=document.createElement('p');
    mtype.innerHTML="TYPE:"+inData2.type.name;
    var macc=document.createElement('p');
    macc.innerHTML="ACCURACY:"+inData2.accuracy;
    var movestat=document.createElement('div');
    movestat.appendChild(mtype);
    movestat.appendChild(mpower);
    movestat.appendChild(macc);
    movestat.appendChild(mpp);
    
    movebox.parentElement.appendChild(movestat);
    movebox.innerHTML=inData2.flavor_text_entries[2].flavor_text;
    console.log(inData2.flavor_text_entries[2]);
//var out=document.getElementById("movep");
//out.innerHTML=inData2.name;
  }
}
function clearmoves(){
  var movelist=document.getElementsByClassName("temp");
  for(var i=0;i<movelist.length;i++){
    var elem = document.getElementById("m"+i);
    elem.parentNode.removeChild(elem);
  }

}
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  