import { useState } from "react";


export default function App(){

  const [items, setItems] = useState([]);

  function handleAddItems(item){
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id){
    setItems((items) => items.filter((item) => item.id != id));
  }

  return <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handleDeleteItems} />
    <Stats/>
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
    setQuantity("");
  
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

function PackingList({items, onDeleteItem}){
  return( 
  <div className="list">
      <ul className="list">
      {items.map(item=><Item item={item} onDeleteItem={onDeleteItem} key={item.id}/> )}
      </ul>
  </div>
  );
}




function Item({item, onDeleteItem}){
  return ( 
    <li>
      <span style={item.packed ? {textDecoration:"line-through"} : {}}>
        {item.quantity} {item.description}
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </span>
    </li>
  );
}



function Stats(){
  return <footer className="stats">
    <em> 👜You have X numbers on your list, and you have already packed X (X%) </em>
  </footer>
}


