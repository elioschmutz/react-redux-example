import React from 'react';

export default function List(props) {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>
          <span onClick={() => props.toggle && props.toggle(item.id)}
            className={item.complete ? 'complete' : ''}>
            {item.name}
          </span>
          <button onClick={() => props.remove(item)}>x</button>
        </li>
      ))}
    </ul>
  );
}
