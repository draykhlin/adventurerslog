import { useEffect, useState } from 'react'

// components
import AddItem from '../components/AddItem'
import Item from '../components/Item'

const Inventory = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchInventory = async () => {
      const res = await fetch('/api/inventory')
      const json = await res.json()

      if (res.ok) {
        setItems(json)
        console.log(json)
      }
    }

    fetchInventory()
  }, [])

  ////////
  // useEffect(() => {
  //   const getInventory = async () => {
  //     const inventoryFromServer = await fetchInventory()
  //     setItems(inventoryFromServer)
  //   }
  //   getInventory()
  // }, [])

  // // Fetch inventory items
  // const fetchInventory = async () => {
  //   const res = await fetch('/api/inventory')
  //   const data = await res.json()

  //   return data
  // }
  ////////////
  
  // Add item
  const addItem = (item) => {
    setItems([...items, item])
  }

  // Delete item
  const deleteItem = async (id) => {
    await fetch(`/api/inventory/${id}`, {
      method: 'DELETE'
    })

    await setItems(items.filter((item) => item._id !== id))
  }

  const updateItem = async (updatedItem) => {
    const updatedItems = items.map(item => {
      if (item._id === updatedItem._id) {
        return updatedItem
      } else {
        return item
      }
    })

    setItems(updatedItems)
  }

    // await fetch('/api/inventory', {
    //   method: 'PATCH',
    //   body: JSON.stringify(items),
    //   headers: {
    //      'Content-Type': 'application/json'
    //   }
    // })
  


  return (
    <div className="inventory-container">
      <AddItem onAdd={addItem} />

      <div className="card inventory-table">
        <div className="inventory-row inventory-header">
          <div className="item-cell">
            Item
          </div>
          <div className="item-cell">
            Quantity 
          </div>
          <div className="item-cell notes-header">
            Notes
          </div>
        </div>
        {items && items.map((item, index) => 
          <Item
            key={index}
            keyId={item._id}
            item={item}
            onDelete={deleteItem}
            updateItem={updateItem}
            />
        )}
      </div>




                {/* <table className="card inventory-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Notes</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    {items && items.map((item, index) => 
                      <Item
                        key={index}
                        keyId={item._id}
                        item={item}
                        onDelete={deleteItem}
                        updateItem={updateItem}
                        />
                    )}

                  </tbody>
                </table> */}

      {/* <Items items={items} onDelete={deleteItem} /> */}
    </div>
   )
 }

 export default Inventory