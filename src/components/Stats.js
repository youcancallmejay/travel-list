export function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats"><em>Start adding some items to your packing list!</em></p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPercent = Math.round(numPacked / numItems * 100);


  return <footer className="stats">
    <em> {numPercent === 100 ? "You've packed everything!✈️" : `👜You have ${numItems} numbers on your list, and you have already packed ${numPacked} (${numPercent}%)`} </em>
  </footer>;
}
