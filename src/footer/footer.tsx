import React, { useState } from 'react';

import { Inventory } from './inventory';
import { Buffs } from './buffs';

enum PageType {
  INVENTORY,
  BUFFS,
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function Footer() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState<PageType>(PageType.INVENTORY);

  return (
    <footer className='fill row padding wrap' style={{ userSelect: 'none', flexFlow: 'row', height: open ? '26em' : '' }}>
      <div className='row vertical'>
        <button className='circle transparent' onClick={() => setOpen(!open)}>
          <i>menu</i>
        </button>
        {open &&
          <>
            <button title='Inventory' onClick={() => setPage(PageType.INVENTORY)}>
              <i>inventory_2</i>
            </button>
            <button title='Buffs' onClick={() => setPage(PageType.BUFFS)}>
              <i>equalizer</i>
            </button>
          </>
        }
      </div>
      {open &&
        <>
          {page === PageType.INVENTORY &&
            <Inventory />
          }
          {page === PageType.BUFFS &&
            <Buffs />
          }
        </>
      }
    </footer>
  );
}