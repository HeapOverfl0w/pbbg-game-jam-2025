import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'

export function Item(props: any) {
  const [hover, setHover] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { name: props.item?.name, id: props.item?.id, parent: props.parent },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    
  });

  return (
    <>
      <div ref={drag as any} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ overflow: 'hidden', opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
        {hover &&
          <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', background: 'rgba(172, 164, 164, 0.35)' }}></div>
        }
        <img className='responsive small' style={{ aspectRatio: '1/1' }} src={'./img/logo192.png'} alt='' />
        {/* <div className='tooltip max left'>
        <b>Title</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <a className='inverse-link'>Action</a>
        </nav>
      </div> */}
      </div>
    </>

  )
}