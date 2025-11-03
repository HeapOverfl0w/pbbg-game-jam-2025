import React, { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import { Tooltip } from './tooltip';
import { ActorActionType, ActorColorType, ActorData, ActorOtherEffectsType, ActorStatType } from '../redux/actor-data';
import { getBuffCurseTypeName, getColorFromType, getOtherEffectsTypeDescription, getRarityColorFromType, getRarityNameFromType, roundValue2Decimals } from '../canvas/constants';
import { ActionTargetsIndicator } from './action-targets-indicator';
import { CustomDragIcon } from '../custom-cursor';

export type ItemProps = {
  item: ActorData;
  canDrag: boolean;
}

export function Item({ item, canDrag }: ItemProps) {
  const [hover, setHover] = useState(false);
  const hoverTargetRef = useRef<HTMLDivElement>(null);

  const [{ isDragging}, drag] = useDrag(() => ({
    type: 'item',
    item: { name: item?.name, id: item?.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging() && canDrag,
    }),
  }), [item, canDrag]);

  function isPercentageBasedStat(statType: ActorStatType) {
    return statType == 'critChance' || statType == 'allResists' || statType == 'bluntResist' || statType == 'magicResist' || statType == 'pierceResist';
  }

  function getIconSource() {
    return './img/icons/' + ActorColorType[item.color] + '_' + item.name.toLowerCase().replace(' ', '_') + '.png';
  }

  return (
    <>
      <div ref={drag as any} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{borderWidth: '2px', borderStyle: 'solid', borderColor: getRarityColorFromType(item.rarity)}}>
        <div ref={hoverTargetRef}>
          {hover &&
            <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', background: 'rgba(172, 164, 164, 0.35)' }}></div>
          }
          <img className='responsive small' style={{ aspectRatio: '1/1' }} src={getIconSource()} alt='' />
          {isDragging && <CustomDragIcon src={getIconSource()}/>}
          <Tooltip open={hover} targetRef={hoverTargetRef}>
            <div style={{display: 'flex', flexDirection: 'column', minWidth: '400px', maxWidth: '500px', alignItems: 'center'}}>
              <h2 style={{color: getColorFromType(item.color)}}>{item.name}</h2>
              <div className='statline' style={{textAlign: 'center', justifyContent: 'center'}}>
                <p>Level {item.stats.level}</p>
              </div>
              <div className='statline' style={{flex: 1, minWidth: 0, whiteSpace: 'normal'}}>
                <p>{item.description}</p>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', width: '400px'}}>
                <div className='statline-rarity' style={{textAlign: 'center', justifyContent: 'center', color: getRarityColorFromType(item.rarity)}}>
                  <p>{getRarityNameFromType(item.rarity)}</p>
                </div>
                <ActionTargetsIndicator type={item.action.targets}/>
                <div className='statline'>
                  <p>Health</p>
                  <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{item.stats.maxHealth}</p>
                </div>
                <div className='statline'>
                  <p>Range</p>
                  <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{item.action.range}</p>
                </div>
                {item.action.type == ActorActionType.ATTACK && (
                  <div>
                    <div className='statline'>
                      <p>Attack Speed</p>
                      <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.actionSpeed / 1000)} Seconds</p>
                    </div>
                    {item.stats.pierceDamage > 0 && 
                      <div className='statline'>
                        <p>Pierce Damage</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.pierceDamage)}</p>
                      </div>
                    }
                    {item.stats.bluntDamage > 0 && 
                      <div className='statline'>
                        <p>Blunt Damage</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.bluntDamage)}</p>
                      </div>
                    }
                    {item.stats.magicDamage > 0 && 
                      <div className='statline'>
                        <p>Magic Damage</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicDamage)}</p>
                      </div>
                    }
                  </div>
                )}
                {item.action.type == ActorActionType.HEAL && (
                  <div>
                    <div className='statline'>
                      <p>Heal Speed</p>
                      <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.actionSpeed / 1000)} Seconds</p>
                    </div>
                    {item.stats.magicDamage > 0 && 
                      <div className='statline'>
                        <p>Heal Amount</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicDamage)}</p>
                      </div>
                    }
                  </div>
                )}
                {item.action.type == ActorActionType.BUFF && (
                  <div>
                    <div className='statline'>
                      <p>Buff Speed</p>
                      <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.actionSpeed / 1000)} Seconds</p>
                    </div>
                    {item.action.buffCurseStatType && 
                      <div className='statline'>
                        <p>Buff Type</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{getBuffCurseTypeName(item.action.buffCurseStatType)}</p>
                      </div>
                    }
                    {item.stats.magicDamage > 0 && item.action.buffCurseStatType && isPercentageBasedStat(item.action.buffCurseStatType) ?
                      (<div className='statline'>
                        <p>Buff Amount</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicDamage * 100)} %</p>
                      </div>) :
                      (<div className='statline'>
                        <p>Buff Amount</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicDamage)}</p>
                      </div>)
                    }
                  </div>
                )}
                {item.action.type == ActorActionType.CURSE && (
                  <div>
                    <div className='statline'>
                      <p>Curse Speed</p>
                      <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.actionSpeed / 1000)} Seconds</p>
                    </div>
                    {item.action.buffCurseStatType && 
                      <div className='statline'>
                        <p>Curse Type</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{getBuffCurseTypeName(item.action.buffCurseStatType)}</p>
                      </div>
                    }
                    {item.stats.magicDamage > 0 && item.action.buffCurseStatType && isPercentageBasedStat(item.action.buffCurseStatType) ?
                      (<div className='statline'>
                        <p>Curse Amount</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicDamage * 100)} %</p>
                      </div>) :
                      (<div className='statline'>
                        <p>Curse Amount</p>
                        <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicDamage)}</p>
                      </div>)
                    }
                  </div>
                )}
                {item.stats.critChance > 0 && 
                  <div className='statline'>
                    <p>Critical Chance</p>
                    <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.critChance * 100)} %</p>
                  </div>
                }
                {item.stats.pierceResist > 0 && 
                  <div className='statline'>
                    <p>Pierce Resistance</p>
                    <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.pierceResist * 100)} %</p>
                  </div>
                }
                {item.stats.bluntResist > 0 && 
                  <div className='statline'>
                    <p>Blunt Resistance</p>
                    <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.bluntResist * 100)} %</p>
                  </div>
                }
                {item.stats.magicResist > 0 && 
                  <div className='statline'>
                    <p>Magic Resist</p>
                    <p style={{marginLeft: 'auto', marginBottom: '15px'}}>{roundValue2Decimals(item.stats.magicResist * 100)} %</p>
                  </div>
                }
              </div>
              <div className='statline-rarity' style={{flex: 1, minWidth: 0, whiteSpace: 'normal', textAlign: 'center', justifyContent: 'center', color: '#dfcd7a'}}>
                {item.action.otherActionEffect != undefined && (
                  <p>{getOtherEffectsTypeDescription(item.action.otherActionEffect)}</p>
                )}
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </>

  )
}