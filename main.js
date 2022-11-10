class MakeTodoList {
  constructor(list) {
    this.id = '';
    this.todos = [];
  }

  toJSON() {
		console.log("to json");
		return(      
      JSON.stringify(this.todos.slice()));
	}

  serialize() {
    $.ajax({
      type: 'GET',
      url: '/',
      dataType: 'json',
      processData: false,
      data: self.toJSON,
      success: function(resp){
          console.log(resp);
      }
  });

  }

  addTodo(text) {
    this.todos.push(text);
  }

  get getList() {
    return this._todos;
  }

}

$(document).ready(function() {
  let listEle = new MakeTodoList(list);
  $("#save").click(function(event){
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
  });


  



   
});