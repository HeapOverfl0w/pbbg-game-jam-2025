import React, { useState } from 'react';
import { ActorActionType, ActorColorType, ActorData, ActorStatType, StoreData } from './redux/actor-data';
import { createRandomUnit } from './units';
import { useDispatch, useSelector } from 'react-redux';
import { victory } from './redux/store-slice';
import { getBuffCurseTypeName, getColorFromType, getOtherEffectsTypeDescription, getRarityColorFromType, getRarityNameFromType, roundValue2Decimals } from './canvas/constants';
import { ActionTargetsIndicator } from './grid/action-targets-indicator';

type UnitSelectionProps = {
  onNextRound: () => void;
}

export function UnitSelection(props: UnitSelectionProps) {
  const dispatch = useDispatch();
  const isDemon = useSelector((state: StoreData) => state.playerIsDemon);
  const currentRound = useSelector((state: StoreData) => state.currentRound);
  const [selections, setSelections] = useState<number[]>([]);
  const [position, setPosition] = useState<string>('right');
  const [units] = useState<ActorData[]>([
    createRandomUnit(currentRound, isDemon),
    createRandomUnit(currentRound, isDemon),
    createRandomUnit(currentRound, isDemon),
    createRandomUnit(currentRound, isDemon)
  ]);

  function getIconSource(unit: ActorData) {
    return './img/icons/' + ActorColorType[unit.color] + '_' + unit.name.toLowerCase().replace(' ', '_') + '.png';
  }

  function isPercentageBasedStat(statType: ActorStatType) {
    return statType == 'critChance' || statType == 'allResists' || statType == 'bluntResist' || statType == 'magicResist' || statType == 'pierceResist';
  }

  const handleSelection = (index: number) => {
    if (selections.includes(index)) {
      setSelections(selections.filter(_ => _ !== index));
    } else {
      setSelections([...selections, index]);
    }
  };

  const handleNextRound = () => {
    dispatch(victory({ units: units, selections: selections }));
    props.onNextRound();
  }

  const handleMouseMove = (evt: React.MouseEvent) => {
    const vw = window.innerWidth;

    if (evt.clientX > (vw / 2)) {
      setPosition('left');
    } else {
      setPosition('right');
    }
  }

  return (
    <div onMouseMove={(e) => handleMouseMove(e)} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur">

      <dialog className="active absolute center middle" style={{ maxWidth: '800px', overflow: 'visible' }}>
        <h3 style={{ justifySelf: 'center' }}>{"VICTORY!"}</h3>
        <p>{"Your army has destroyed all foes leaving none alive. You have been awarded " + currentRound * 5 + " gold."}</p>
        <p>{"Select 2 souls to bolster your forces, but beware, the unchosen souls will be " + (isDemon ? "purified" : "twisted") + " and join your enemy in the next battle."}</p>
        <div className='row' style={{ justifySelf: 'center' }}>
          {units.map((unit, index) => {
            return (
              <div>
                <button
                  key={index}
                  disabled={selections.length === 2 && !selections.includes(index)}
                  style={{ border: 'none', height: 'auto', width: 'auto' }}
                  onClick={() => handleSelection(index)}>
                  <article className={'border'} style={{ borderColor: selections.includes(index) ? 'white' : 'transparent' }}>
                    <img className='responsive tiny' style={{ aspectRatio: '1/1' }} src={getIconSource(unit)} alt='' />
                  </article>
                </button>
                <div className={"tooltip " + position} style={{ width: 'auto', height: 'auto' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: '400px', maxWidth: '500px', alignItems: 'center' }}>
                    <h2 style={{ color: getColorFromType(unit.color) }}>{unit.name}</h2>
                    <div className='statline' style={{ textAlign: 'center', justifyContent: 'center' }}>
                      <p>Level {unit.stats.level}</p>
                    </div>
                    <div className='statline' style={{ flex: 1, minWidth: 0, whiteSpace: 'normal' }}>
                      <p>{unit.description}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                      <div className='statline-rarity' style={{ textAlign: 'center', justifyContent: 'center', color: getRarityColorFromType(unit.rarity) }}>
                        <p>{getRarityNameFromType(unit.rarity)}</p>
                      </div>
                      <ActionTargetsIndicator type={unit.action.targets} />
                      <div className='statline'>
                        <p>Health</p>
                        <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{unit.stats.maxHealth}</p>
                      </div>
                      <div className='statline'>
                        <p>Range</p>
                        <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{unit.action.range}</p>
                      </div>
                      {unit.action.type == ActorActionType.ATTACK && (
                        <div>
                          <div className='statline'>
                            <p>Attack Speed</p>
                            <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.actionSpeed / 1000)} Seconds</p>
                          </div>
                          {unit.stats.pierceDamage > 0 &&
                            <div className='statline'>
                              <p>Pierce Damage</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.pierceDamage)}</p>
                            </div>
                          }
                          {unit.stats.bluntDamage > 0 &&
                            <div className='statline'>
                              <p>Blunt Damage</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.bluntDamage)}</p>
                            </div>
                          }
                          {unit.stats.magicDamage > 0 &&
                            <div className='statline'>
                              <p>Magic Damage</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicDamage)}</p>
                            </div>
                          }
                        </div>
                      )}
                      {unit.action.type == ActorActionType.HEAL && (
                        <div>
                          <div className='statline'>
                            <p>Heal Speed</p>
                            <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.actionSpeed / 1000)} Seconds</p>
                          </div>
                          {unit.stats.magicDamage > 0 &&
                            <div className='statline'>
                              <p>Heal Amount</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicDamage)}</p>
                            </div>
                          }
                        </div>
                      )}
                      {unit.action.type == ActorActionType.BUFF && (
                        <div>
                          <div className='statline'>
                            <p>Buff Speed</p>
                            <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.actionSpeed / 1000)} Seconds</p>
                          </div>
                          {unit.action.buffCurseStatType &&
                            <div className='statline'>
                              <p>Buff Type</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{getBuffCurseTypeName(unit.action.buffCurseStatType)}</p>
                            </div>
                          }
                          {unit.stats.magicDamage > 0 && unit.action.buffCurseStatType && isPercentageBasedStat(unit.action.buffCurseStatType) ?
                            (<div className='statline'>
                              <p>Buff Amount</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicDamage * 100)} %</p>
                            </div>) :
                            (<div className='statline'>
                              <p>Buff Amount</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicDamage)}</p>
                            </div>)
                          }
                        </div>
                      )}
                      {unit.action.type == ActorActionType.CURSE && (
                        <div>
                          <div className='statline'>
                            <p>Curse Speed</p>
                            <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.actionSpeed / 1000)} Seconds</p>
                          </div>
                          {unit.action.buffCurseStatType &&
                            <div className='statline'>
                              <p>Curse Type</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{getBuffCurseTypeName(unit.action.buffCurseStatType)}</p>
                            </div>
                          }
                          {unit.stats.magicDamage > 0 && unit.action.buffCurseStatType && isPercentageBasedStat(unit.action.buffCurseStatType) ?
                            (<div className='statline'>
                              <p>Curse Amount</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicDamage * 100)} %</p>
                            </div>) :
                            (<div className='statline'>
                              <p>Curse Amount</p>
                              <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicDamage)}</p>
                            </div>)
                          }
                        </div>
                      )}
                      {unit.stats.critChance > 0 &&
                        <div className='statline'>
                          <p>Critical Chance</p>
                          <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.critChance * 100)} %</p>
                        </div>
                      }
                      {unit.stats.pierceResist > 0 &&
                        <div className='statline'>
                          <p>Pierce Resistance</p>
                          <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.pierceResist * 100)} %</p>
                        </div>
                      }
                      {unit.stats.bluntResist > 0 &&
                        <div className='statline'>
                          <p>Blunt Resistance</p>
                          <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.bluntResist * 100)} %</p>
                        </div>
                      }
                      {unit.stats.magicResist > 0 &&
                        <div className='statline'>
                          <p>Magic Resist</p>
                          <p style={{ marginLeft: 'auto', marginBottom: '15px' }}>{roundValue2Decimals(unit.stats.magicResist * 100)} %</p>
                        </div>
                      }
                    </div>
                    <div className='statline-rarity' style={{ flex: 1, minWidth: 0, whiteSpace: 'normal', textAlign: 'center', justifyContent: 'center', color: '#dfcd7a' }}>
                      {unit.action.otherActionEffect != undefined && (
                        <p>{getOtherEffectsTypeDescription(unit.action.otherActionEffect)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>);
          })
          }
        </div>
        <nav className="center-align">
          <button disabled={selections.length < 2} onClick={() => handleNextRound()}>OK</button>
        </nav>
      </dialog>
    </div>
  );
}