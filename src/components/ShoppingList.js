import React, { useState, useEffect } from 'react';
import { Container, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemModal from './ItemModal'


export default function ShoppingList() {
  let [items, setItems] = useState([])


  const getItems = async () => {
    const res = await fetch('/api/items')
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    getItems()
  }, [])


  const addItem = async (name) => {
    fetch('/api/items', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(res => res.json())
      .then(data => {
        getItems()
      })
  }

  
  const deleteItem = async (_id) => {
    fetch(`/api/items/${_id}`, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        getItems()
      })
  }

  console.log("---items", items)

  return (
    <Container style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <TransitionGroup className="shoppingList">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={600} classNames="item">
              <div>
                <Button style={{ margin: '1rem' }} className="remove-btn" 
                  color="danger" size="sm" onClick={() => deleteItem(_id)}>&times;
                </Button> {name}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <ItemModal addItem={addItem} />
    </Container>
  );
}