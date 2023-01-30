import React, { useState, useEffect } from 'react';
import { Container, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ShoppingList() {
  let [items, setItems] = useState([])
  let [trigger, setTrigger] = useState(0)

  const getItems = async () => {
    const res = await fetch('/api/items')
    const data = await res.json()
    setItems(data)
  }

  const addItem = async () => {
    const name = prompt('Enter some text');
    if (name) {
      console.log("add name" + name)
    }

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
      .then(data => console.log(data))

      setTrigger(trigger += 1)

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
      .then(data => console.log(data))

      setTrigger(trigger += 1)
    //setItems(items => items.filter((item) => item._id !== _id))
  }


  useEffect(() => {
    getItems()
  }, [trigger])

  console.log("---items", items)


  return (
    <Container style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <TransitionGroup className="shoppingList">
          {items.map(({ _id, name }) => (
            <CSSTransition
              key={_id}
              timeout={600}
              classNames="item"
            >

              <div>
                <Button
                  style={{ margin: '1rem' }}
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => deleteItem(_id)}>
                  &times;
                </Button>
                {name}
              </div>

            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Button color="dark"
        onClick={addItem}
      >
        Add Item
      </Button>
      {/* <Button color="success"
        onClick={getItems}
      >
        Get Items
      </Button> */}
    </Container>
  );
}