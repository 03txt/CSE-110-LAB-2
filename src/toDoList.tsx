import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom";

export function ToDoList() {
 const [numRemainingItems, setNumRemainingItems] = useState(0);

 let [items, setItems] = useState(dummyGroceryList);

 function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
   const checkbox: HTMLInputElement = e.target as HTMLInputElement;

   const itemName = checkbox.name;

   const itemIndex = items.findIndex((item) => item.name === itemName);
   items[itemIndex] = { name: itemName, isPurchased: checkbox.checked };

   const uncheckedItems = items.filter((item) => !item.isPurchased);
   const checkedItems = items.filter((item) => item.isPurchased);

   const newItems = uncheckedItems.concat(checkedItems);

   setItems(newItems);

   const diff = checkbox.checked ? 1 : -1;

   setNumRemainingItems(numRemainingItems + diff);
   
 }

 const { name } = useParams();

 return (
    
   <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
     <div className="App-body"  style={{ textAlign: 'center', display: 'block' }}>
     <h1>{name}'s To Do List</h1>
       Items bought: {numRemainingItems}
       <form action=".">
         {items.map((item) => ListItem(item, handleCheckboxClick))}
       </form>
     </div>
   </div>
 );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
  const id = `checkbox-${item.name}`;
 return (
   <div>
     <input
      id={id}
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
     />
     <label htmlFor={id}>{item.name}</label>
   </div>
 );
}

export default ToDoList; 