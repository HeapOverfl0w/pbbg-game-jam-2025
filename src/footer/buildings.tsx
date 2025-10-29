import React, { useState } from 'react';
import { BuildingData, StoreData } from '../redux/actor-data';
import { getBuildingCost, levelUpBuilding } from '../redux/store-slice';
import { useDispatch, useSelector } from 'react-redux';
import { getBuffCurseTypeName } from '../canvas/constants';

/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Buildings() {
  const buildings = useSelector((state: StoreData) => state.buildings);

  return (
    <div style={{ flex: 'auto', width: '100%', height: '100%'}}>
      <h3>Buildings</h3>
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
      <img className='responsive small' style={{ aspectRatio: '1/1' }} src={'./img/logo192.png'} alt='' />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <h4>{building.name}</h4>
          <div style={{display: 'flex', flexDirection: 'row',marginLeft: 'auto', gap: '20px'}}>
            <p>Level {building.level}</p>
            <p>{getBuildingCost(building.level + 1)} Gold</p>
            <button onClick={() => gold < getBuildingCost(building.level + 1) ? setShowDeny(true) : setShowAccept(true)}>+</button>
          </div>
        </div>
        <p>{getBuffCurseTypeName(building.statType)} : +{building.value}</p>
        <p>{building.description}</p>
      </div>
      {showAccept && 
        <dialog>
          <p>Are you sure you want to upgrade {building.name} for {getBuildingCost(building.level + 1)} gold?</p>
          <nav className='right-align no-space'>
            <button onClick={levelUp}>Yes</button>
            <button onClick={() => setShowAccept(false)}>No</button>
          </nav>
        </dialog>
      }
      {showDeny && 
        <dialog>
          <p>You do not have enough gold.</p>
          <nav className='center-align no-space'>
            <button onClick={() => setShowDeny(false)}>OK</button>
          </nav>
        </dialog>
      }
    </div>
  )
}