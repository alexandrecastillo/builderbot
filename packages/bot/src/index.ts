import { CoreClass } from './core/coreClass'
import { EventEmitterClass } from './core/eventEmitterClass'
import { MemoryDB } from './db'
import { LIST_ALL as EVENTS } from './io/events'
import FlowClass from './io/flowClass'
import { addAnswer } from './io/methods/addAnswer'
import { addKeyword } from './io/methods/addKeyword'
import { ProviderClass } from './provider/interface/provider'
import { TestProvider } from './provider/providerMock'
import type { GeneralArgs, TFlow } from './types'
import * as utils from './utils'

/**
 * Crear instancia de clase Bot
 */
const createBot = async <P extends ProviderClass = any, D extends MemoryDB = any>(
    { flow, database, provider }: { flow: FlowClass; database: D; provider: P },
    args?: Omit<GeneralArgs, 'listEvents'>
): Promise<CoreClass<P, D>> => {
    const defaultArgs: GeneralArgs = {
        blackList: [],
        listEvents: EVENTS,
        delay: 0,
        globalState: {},
        extensions: [],
        queue: {
            timeout: 50000,
            concurrencyLimit: 15,
        },
    }

    const combinedArgs: GeneralArgs = {
        ...defaultArgs,
        ...args,
    }
    return new CoreClass<P, D>(flow, database, provider, combinedArgs)
}

/**
 * Crear instancia de clase Io (Flow)
 */
const createFlow = (args: TFlow[]): FlowClass => {
    return new FlowClass(args)
}

/**
 * Crear instancia de clase Provider
 * Depdendiendo del Provider puedes pasar argumentos
 * Ver Documentacion
 */
const createProvider = <T = ProviderClass, K = typeof ProviderClass.prototype.globalVendorArgs>(
    providerClass: new (args: K) => T,
    args: K = null
): T => {
    const providerInstance = new providerClass(args)
    return providerInstance
}

const TestTool = {
    TestProvider,
    TestDB: MemoryDB,
}

export * from './context/globalstateClass'
export * from './context/idlestateClass'
export * from './context/index'
export * from './context/stateClass'

export * from './core/coreClass'
export * from './core/eventEmitterClass'

export * from './db/index'

export * from './io/events/eventAction'
export * from './io/events/eventCustom'
export * from './io/events/eventDocument'
export * from './io/events/eventLocation'
export * from './io/events/eventMedia'
export * from './io/events/eventOrder'
export * from './io/events/eventTemplate'
export * from './io/events/eventVoiceNote'
export * from './io/events/eventWelcome'
export * from './io/events/index'

export * from './io/methods/addAnswer'
export * from './io/methods/addChild'
export * from './io/methods/addKeyword'
export * from './io/methods/index'
export * from './io/methods/toCtx'
export * from './io/methods/toJson'
export * from './io/methods/toSerialize'

export * from './io/flowClass'

export * from './provider/interface/provider'
export * from './provider/interface/server'

export * from './provider/providerMock'

export * from './utils/blacklistClass'
export * from './utils/cleanImage'
export * from './utils/convertAudio'
export * from './utils/delay'
export * from './utils/download'
export * from './utils/event'
export * from './utils/flattener'
export * from './utils/hash'
export * from './utils/index'
export * from './utils/interactive'
export * from './utils/queueClass'

export * from './types'

export {
    createBot,
    createFlow,
    createProvider,
    addKeyword,
    addAnswer,
    ProviderClass,
    EventEmitterClass,
    CoreClass,
    EVENTS,
    MemoryDB,
    TestTool,
    utils,
}
