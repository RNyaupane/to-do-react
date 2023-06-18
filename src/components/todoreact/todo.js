import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState('');
  const [items, setItems] = useState(getLocalData("mytodolist"));
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);


  // Add Items
  const addItem = () => {
    if (!inputdata) {
      alert("fill the data")
    }
    else if (inputdata && toggleButton) {
      setItems(
        items.map((props) => {
          if (props.id === isEditItem) {
            return { ...props, name: inputdata };
          }
          return props;
        })
      )
      setIsEditItem(null);
      setInputData([])
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  }
  // Edit Item
  const editItem = (index) => {
    const item_todo_edited = items.find((props) => {
      return props.id === index;
    });
    setIsEditItem(index);
    setInputData(item_todo_edited.name)
    setToggleButton(true);
  }
  // Delete Items
  const deleteItem = (index) => {
    const updatedItems = items.filter((props) => {
      return props.id !== index;
    })
    setItems(updatedItems);
  }
  // Delete All items
  const removeAll = () => {
    setItems([]);
  }

  // Adding items to local Storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todo logo" />
            <figcaption ><b>Add Your List Here</b></figcaption>
          </figure>

          {/* AddItems */}
          <div className="addItems">
            <input type='text' className='form-control' placeholder='✍️ Add Items'
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )
            };
          </div>

          {/* ITEMS */}
          <div className="showItems">
            {items.map((props, index) => {
              return (
                <div className="eachItem" key={props.id}>
                  <h3>{props.name}</h3>
                  <div className="todo-btn" key={props.id}>
                    <i className="far fa-edit add-btn" onClick={() => editItem(props.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(props.id)}></i>
                  </div>
                </div>
              )
            })}
          </div>


          <div className="showItems">
            <button className='btn effect04' data-sm-link-text="Remove all"
              onClick={removeAll}>
              <span className='button-span'>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo