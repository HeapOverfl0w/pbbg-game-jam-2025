import React, { useState } from 'react';
import { BuildingData, StoreData } from '../redux/actor-data';
import { getBuildingCost, levelUpBuilding } from '../redux/store-slice';
import { useDispatch, useSelector } from 'react-redux';
import { getBuffCurseTypeName } from '../canvas/constants';
import { createPortal } from 'react-dom';

/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Buildings() {
  const buildings = useSelector((state: StoreData) => state.buildings);
  const gold = useSelector((state: StoreData) => state.gold);

  return (
    <div style={{ flex: 'auto', width: '100%', height: '100%'}}>
      <div className='row horizontal' style={{marginBottom: '20px'}}>
        <h3>Buildings</h3>
        <h4 style={{marginLeft: 'auto'}}>{gold} Gold</h4>
      </div>
      <div className='row horizontal wrap'>
        {buildings.map((building) => (
          <Building building={building} />
        ))}
      </div>
    </div>
  );
}

export type BuildingProp = {
  building: BuildingData;
}

export function Building({ building }: BuildingProp) {
  const [showAccept, setShowAccept] = useState(false);
  const [showDeny, setShowDeny] = useState(false);
  const gold = useSelector((state: StoreData) => state.gold);
  const dispatch = useDispatch();

  function levelUp() {
    dispatch(levelUpBuilding(building.name));
    setShowAccept(false);
  }

  return (
    <div className='building'>
      <img style={{ aspectRatio: '1/1', alignItems: 'center', width: '8rem', height: '8rem', marginTop: '10px', marginRight: '5px' }} src={building.image} alt='' />
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <h5>{building.name}</h5>
          <div style={{display: 'flex', flexDirection: 'row',marginLeft: 'auto', gap: '20px'}}>
            <p style={{marginTop: '20px'}}>Level {building.level}</p>
            <p style={{marginTop: '20px'}}>{getBuildingCost(building.level + 1)} Gold</p>
            <button style={{margin: '0px'}} onClick={() => gold < getBuildingCost(building.level + 1) ? setShowDeny(true) : setShowAccept(true)}>+</button>
          </div>
        </div>
        <p>{getBuffCurseTypeName(building.statType)} : +{building.value}</p>
        <p style={{marginBottom: '10px'}}>{building.description}</p>
      </div>
      {showAccept && 
        createPortal(
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur">
          <dialog className="active absolute center middle">
            <p>Are you sure you want to upgrade {building.name} for {getBuildingCost(building.level + 1)} gold?</p>
            <nav className='right-align no-space'>
              <button onClick={levelUp}>Yes</button>
              <button onClick={() => setShowAccept(false)}>No</button>
            </nav>
          </dialog>
        </div>, document.body)
      }
      {showDeny && 
        createPortal(
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur">
          <dialog className="active absolute center middle">
            <p>You do not have enough gold.</p>
            <nav className='center-align no-space'>
              <button onClick={() => setShowDeny(false)}>OK</button>
            </nav>
          </dialog>
        </div>, document.body)
      }
    </div>
  )
}