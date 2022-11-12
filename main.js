function newObjectId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const objectId = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return Math.floor(Math.random() * 16).toString(16);
  }).toLowerCase();

  return objectId;
}


class Game {
  constructor(id,title,players,timestamp, owner) {
    if (id  === undefined || id  === null  ){
      this.id = newObjectId();
    }
    else{
      this.id = id;
    }
    if (title != undefined && title !== null ){
      this.title = title;
    } 
    if (timestamp != undefined && timestamp != null ){
      this.date = new  Date();
    } 
    if (owner != undefined && owner != null ){
      this.owner = owner;
    } 
    if (players === undefined || players === null ){
      this.players = [];
    } 
    else{
      //convert json to objects to create players
      this.players =[];
      for (const [key, value] of Object.entries(players)) {
        console.log(key, value);
        let player = new Player(value.id,value.name,value.email);
        this.players.push(player);
      }
    }
  }

  toJSON() {
		console.log("to json");
    let player_ids = this.players.map(({ id }) => id)
		return(      
      /// multiple values example = [this.description,this.todos]
      JSON.stringify({title:this.title,date: !!this.date ? this.date.toISOString() : '',owner:this.owner,players:player_ids})
    )
	}
  deserialize(){
    $.ajax({
      type: 'POST',
      url: 'http://vitcs.us:5000/get_game/'+ this.id,
      async: false,
      contentType: "application/json; charset=utf-8",
    })
    .done(function(data) {
      // If successful
      let obj = JSON.parse(data);
      let players=[];
      obj.players.forEach(function (item, index) {
        console.log(item, index);
        $.ajax({
          type: 'POST',
          url: 'http://vitcs.us:5000/get_player/'+ item,
          async: false,
          contentType: "application/json; charset=utf-8",
          data: obj,
          success: function(resp){
              console.log(resp);
              if(obj!==null){
                let player = new Player(null,resp.name,resp.email,1);
                players.push(player);
              }
              
          }
        });
      });
      this.players = players;
      this.name =data.name;
      this.date= data.date;
     console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // If fail
      console.log(textStatus + ': ' + errorThrown);
    });
  }
  serialize() {
    let obj = this.toJSON();
    console.log(obj);
    $.ajax({
      type: 'POST',
      url: 'http://vitcs.us:5000/add_game/'+ this.id,
      dataType: 'json',
      async: false,
      contentType: "application/json; charset=utf-8",
      data: obj,
      success: function(resp){
          console.log(resp);
      }
    });
  }
}

class Player {
  constructor(id,player_name,email,active) {
    if (this.id === undefined || this.id === null ){
      this.id = newObjectId();
    } 
    if (this.active === undefined  || this.active === null ){
      this.active = 0;
    } 
    else{
      this.active = 1;
    }
    this.name = player_name;
    this.email =  email;
  }
  toJSON() {
		console.log("to json");
    var obj = new Object();
    obj.name = this.name;
    obj.email  = this.email;
    obj.active= this.active;
		return(JSON.stringify(obj));
	}
  serialize() {
    let obj = this.toJSON();
    console.log(obj);
    $.ajax({
      type: 'POST',
      url: 'http://vitcs.us:5000/add_player/'+ this.id,
      dataType: 'json',
      async: false,
      contentType: "application/json; charset=utf-8",
      data: obj,
      success: function(resp){
          console.log(resp);
      }
    });
  }
}

$(document).ready(function() {
  let player1 = new Player(null,"james1",'james1@yahoo.com',1);
  player1.serialize();
  let player2 = new Player(null,"james2",'james2@yahoo.com',1);
  let player3 = new Player(null,"james3",'james3@yahoo.com',1);
  let player4 = new Player(null,"james4",'james4@yahoo.com',1);
  let players = new Array();
  players.push(player1);
  players.push(player2);
  players.push(player3);
  players.push(player4);
  //let Game1 = new Game(null,"gamde",players,'2022-07-21T09:35:31.820Z','james1@yahoo.com')
  //Game1.serialize();
  g1 = new Game('636fbdae4637cc1d2107088c?636fe0cd29558490d48e24f9');
  g1.deserialize();
 /* $("#save").click(function(event){
    alert("Thanks for saving!");
    console.log("saved");
    listEle.serialize();
  });


  $("#add").click(function(event){
    var text = $('#input').val();
    listEle.addTodo(text);
    //let list = document.getElementById("todo-list");
    //var li = document.createElement("li");
    $("#todo-list").append('<li>' +  text + '</li>');
    //li.textContent = text;
    //list.appendChild(li);
    //let input = document.getElementById("input").value;
  });*/


  
   
});