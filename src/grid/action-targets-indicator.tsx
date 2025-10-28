import { ActorActionTargetsType } from "../redux/actor-data"

export type ActionTargetsIndicatorProps = {
    type: ActorActionTargetsType;
}

export function ActionTargetsIndicator({ type }: ActionTargetsIndicatorProps ) {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            {type == ActorActionTargetsType.SINGLE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td className='td-target'></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.CLEAVE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='td-target'></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.LARGE_CLEAVE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='td-target'></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.SMALL_AOE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='td-target'></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.ONE_PIERCE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td className='td-target'></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.TWO_PIERCE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td className='td-target'></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.THREE_PIERCE && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td className='td-target'></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            {type == ActorActionTargetsType.CROSS && (
                <table className='table-target'>
                    <tbody>
                        <tr>
                            <td className='td-transparent'></td>
                            <td></td>
                            <td className='td-transparent'></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='td-target'></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='td-transparent'></td>
                            <td></td>
                            <td className='td-transparent'></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    )
}