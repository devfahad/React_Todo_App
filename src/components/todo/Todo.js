import React from "react";
import "./style.css";
import {useState, useEffect} from "react";

// Get data from localstorage
const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

export const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // Add item function
    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data");
        } else if (inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return {...curElem, name: inputData};
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem("");
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };

            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    // Delete item function
    const deleteItem = (id) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== id;
        });
        setItems(updatedItems);
    };

    // Edit item funciton
    const editItem = (id) => {
        const itemEdited = items.find((curElem) => {
            return curElem.id === id;
        });
        setInputData(itemEdited.name);
        setIsEditItem(id);
        setToggleButton(true);
    };

    // Set data to localstorage
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items]);

    return (
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='./images/todo.svg' alt='todologo' />
                    <figcaption>Add Your List Here ✌</figcaption>
                </figure>
                <div className='additems'>
                    <input
                        type='text'
                        placeholder='✍ Add Item'
                        className='form-control'
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />
                    {toggleButton ? (
                        <i
                            className='far fa-edit add-btn toggle-btn'
                            onClick={addItem}
                        ></i>
                    ) : (
                        <i className='fa fa-plus add-btn' onClick={addItem}></i>
                    )}
                </div>
                {/* Show Item List */}
                <div className='showItems'>
                    {items.map((curElem) => {
                        return (
                            <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                    <i
                                        className='far fa-edit add-btn'
                                        onClick={() => editItem(curElem.id)}
                                    ></i>
                                    <i
                                        className='far fa-trash-alt add-btn'
                                        onClick={() => deleteItem(curElem.id)}
                                    ></i>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Remove all btn */}
                <div className='showItems'>
                    <button
                        className='btn effect04'
                        data-sm-link-text='Remove All'
                        onClick={() => setItems([])}
                    >
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
