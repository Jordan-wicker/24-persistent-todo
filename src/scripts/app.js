const React = require('react')
const ReactDOM = require('react-dom')
const Backbone = require('backbone')

const HomeView = React.createClass({

   getInitialState: function(){

      return {
         allItems: [],
      }
   },

   componentWillMount: function(){


      var self = this
      Backbone.Events.on('change-if-done',function(checkedId, status){

         let copyOfItems = self.state.allItems.map((copy) => {return copy})

         copyOfItems[checkedId].isDone = status

         self.setState({allItems: copyOfItems})

      })

   },

   _addNewTask: function(evt){

      if(evt.keyCode === 13){
         let newTitle = evt.target.value

         let newId = this.state.allItems.length
         let copyOfArray = this.state.allItems
         copyOfArray.push({tasktitle: newTitle, isDone: false, taskId: newId})

         evt.target.value = ''

         let newTask = {allItems: copyOfArray, }

         return this.setState(newTask)
      }
   },

   _removeItems: function(){

      let newList = this.state.allItems.filter(function(obj){
         console.log(obj.isDone)
         if(obj.isDone != true){

            return true
         }


      })
      console.log(newList)

      return this.setState({allItems: newList})

   },

   render: function(){
      console.log(this.state)
      let createListing = this.state.allItems.map(function(itemObj, i){


           return <NewToDoList itemData={itemObj} key = {i} />
        })
      return(
         <div className="container todo-container text-center">
            <h1 className='app-header'>Kansas list</h1>
               <h4 className='app-header'>Because "To Do" looks like Todo sometimes...</h4>
               <input type="text" className="add-todo" placeholder="Add Dog" onKeyDown={this._addNewTask}/>
                  <NewNavBar/>
                     <div className="row todo-list">
                        {createListing}
                     </div>
               <button className="btn btn-primary remove-tasks" onClick={this._removeItems}>Remove Dog</button>
         </div>
      )
   }
})

const NewNavBar = React.createClass({




   render: function(){

      return (
         <div className="row nav-bar">
            <div className="col-xs-4 text-center nav-tab selected"><h3>All Tasks</h3></div>
               <div className="col-xs-4 text-center nav-tab"><h3>Complete</h3></div>
            <div className="col-xs-4 text-center nav-tab"><h3>Incomplete</h3></div>
         </div>


      )


   },

})

const NewToDoList = React.createClass({

   _setDone: function(evt){
      console.log(evt.target.checked)
      console.log(this.props.itemData.taskId)
      let isChecked = evt.target.checked
      let taskNum = this.props.itemData.taskId

      this.props.itemData.isDone = evt.target.checked

      Backbone.Events.trigger("change-if-done", taskNum, isChecked )



   },
   _removeSelected: function(evt){
      console.log(this.state)
      let i = this.props.itemData.taskId
      Backbone.Events.trigger('remove-clicked', i, )

   },



   render: function(){
      return (
         <div className="row">
            <div className="col-xs-10 todo-item">
               <input type="checkbox" className="task-checkbox" onClick={this._setDone} />
               <p>{this.props.itemData.tasktitle}</p>
            </div>
            <div className="col-xs-2 right-col">
               <i className="fa fa-eraser item-eraser" aria-hidden="true" onClick={this._removeSelected}></i>
            </div>
         </div>


      )
   }


})

ReactDOM.render(<HomeView/>, document.querySelector('#app-container'))
