import { useState } from "react";


export default function App(){

  const [items, setItems] = useState([]);

  function handleAddItems(item){
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id){
    setItems((items) => items.filter((item) => item.id != id));
  }

  function handleToggleItem(id){
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item))
  }


  return <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem} />
    <Stats items={items}/>
  </div>


}

function Logo(){
  return <h1>🌴Far Away👜</h1>
}

function Form({onAddItems}){

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  

  function handleSubmit(e){
    e.preventDefault(); 
    if(!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()}
    console.log(newItem)

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  
  }

  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your trip? 😺</h3>
    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({length: 20}, (_, i) => i + 1).map(num=><option value={num} key={num}>{num}</option>)}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button>Add</button>
  </form>
}

function PackingList({items, onDeleteItem, onToggleItem}){
  return( 
  <div className="list">
      <ul className="list">
      {items.map(item=><Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/> )}
      </ul>
  </div>
  );
}




function Item({item, onDeleteItem, onToggleItem}){
  return ( 
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? {textDecoration:"line-through"} : {}}>
        {item.quantity} {item.description}
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </span>
    </li>
  );
}



function Stats({items}){
  const numItems = items.length; 
  const numPacked = items.filter((item) => item.packed).length;
  const numPercent = Math.round(numPacked/numItems * 100); 


  return <footer className="stats">
    <em> {numPercent === 100 ? "You've packed everything!" : `👜You have ${numItems} numbers on your list, and you have already packed ${numPacked} (${numPercent}%)`} </em>
  </footer>
}


