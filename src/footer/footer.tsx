import React, { useState } from 'react';

import { Inventory } from './inventory';
import { Buildings } from './buildings';

enum PageType {
  UNITS,
  BUFFS,
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function Footer() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState<PageType>(PageType.UNITS);

  function getExpandButtonText() {
    if (open) {
      return 'X';
    } else if (page == PageType.UNITS) {
      return 'Units';
    } else {
      return 'Buildings';
    }
  }

  return (
    <footer
  className='fill row padding wrap footer'
  style={{
    position: 'relative',
    userSelect: 'none',
    flexFlow: 'row',
    height: open ? '26em' : '3em',
  }}
>
  <button
    onClick={() => setOpen(!open)}
    style={{
      position: 'absolute',
      top: '0.7rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1
    }}
  >
    {getExpandButtonText()} 
  </button>

  <div className='row vertical' style={{ marginTop: '3em' }}>
    {open && (
      <>
        <button title='Units' onClick={() => setPage(PageType.UNITS)}>
          <i>inventory_2</i>
        </button>
        <button title='Buildings' onClick={() => setPage(PageType.BUFFS)}>
          <i>house</i>
        </button>
      </>
    )}
  </div>

  {open && (
    <>
      {page === PageType.UNITS && <Inventory />}
      {page === PageType.BUFFS && <Buildings />}
    </>
  )}
</footer>
  );
}