import React, {useEffect, useRef} from 'react'
import { useDrag } from 'react-dnd'
import * as images from '../../images.js'; // Tell webpack this JS file uses this image

const HEIGHT = 64;
const WIDTH = 64;

export function Item(props) {
  const imageRef = useRef(null);

  const [{ isDragging, didDrop }, drag] = useDrag(() => ({
    type: 'item',
    item: { name: props.item?.name, id: props.item?.id, parent: props.parent },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop()
    }),
  }))

  useEffect(() => {
    if (imageRef.current && imageRef.current.naturalWidth && props.item.iid) {
      let naturalWidth = imageRef.current.naturalWidth;
      let index = props.item.iid.split(':');

      let naturalPercent = WIDTH / naturalWidth;
      let displayPercent = 100 / naturalPercent;
      let topOffset = 100 * index[1];
      let leftOffset = 100 * index[0];

      imageRef.current.style.objectFit = 'contain';
      imageRef.current.style.width = displayPercent + '%';
      imageRef.current.style.position = 'absolute';
      imageRef.current.style.top = '-' + topOffset + '%';
      imageRef.current.style.left = '-' + leftOffset + '%';
      imageRef.current.style.maxWidth = 'none';
    }
  }, [props.item.iid]);

  useEffect(() => {
    if (didDrop) {
      props.onMove();
    }
  }, [isDragging]);

  return (
    <div ref={drag} style={{ overflow: 'hidden', opacity: isDragging ? 0.5 : 1, cursor: 'move', aspectRatio: '1/1', transform: `scaleX(${props.scale}) translateY(${props.translation}em)` }}>
      { (props.item) && 
        <img ref={imageRef} src={images.inventory} /> 
      }
    </div>
  )
}