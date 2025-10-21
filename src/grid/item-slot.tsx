import React, { useState } from 'react';
import { useDrop } from 'react-dnd'

/**
 * Base UI component for the Inventory Item.
 * 
 * @param {*} props 
 * @returns 
 */
export function ItemSlot(props: any) {
  const [hover, setHover] = useState(false);

  /**
   * Method that handles proccessing an item when it has been dropped into the equipment slot.
   * 
   * @param {*} item 
   */
  const handleDrop = (item: any) => {
    props.onEquip(item.id)
  }

  /**
   * Drag/Drop hook to enable dropping items into the equipment slot.
   */
  const [{ isOver, canDrop }, ref] = useDrop(
    () => ({
      accept: "item",
      drop: (item) => handleDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    []
  );

  return (
    <div className='no-padding border' ref={ref as any} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      { hover &&
        <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', background: 'rgba(255, 0, 0, 0.35)' }}></div>
      }
      <img className='responsive small' style={{ aspectRatio: '1/1' }} src={''} alt='' />

      {/* <div className='tooltip max left'>
        <b>Title</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <a className='inverse-link'>Action</a>
        </nav>
      </div> */}
    </div>
  );
}