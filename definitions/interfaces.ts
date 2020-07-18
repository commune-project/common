import {
  ActorTypes, 
  ActivityTypes,
  ObjectTypes
} from "./enums"

interface IObject {
  id?: string
  type?: keyof typeof ActorTypes | keyof typeof ActivityTypes | keyof typeof ObjectTypes
  url?: string
  actor?: string | IActor
  published?: Date | string
  updated?: Date | string
  [key: string]: any
}

interface IActor extends IObject {
  id: string
  type: keyof typeof ActorTypes
  following?: string
  followers?: string
  liked?: string
  inbox: string
  outbox: string
  preferredUsername: string
  name?: string
  summary?: string
  // icon, image, ...

  publicKey: {
    id: string
    owner: string
    publicKeyPem: string
  }

  [key: string]: any
}

interface IActivity {
  id?: string
  type: keyof typeof ActivityTypes
  actor: string | IActor
  object: string | IObject
  to?: string | string[]
  cc?: string | string[]
  bto?: string | string[]
  bcc?: string | string[]

  [key: string]: any
}

function isASType<ET, IT>(et: { [id: string]: string}): ((x: any)=> x is IT) {
  return (x: any): x is IT => x.type !== undefined && !!Object.getOwnPropertyNames(et).includes(x.type)
}

const isActor = isASType<ActorTypes, IActor>(ActorTypes)
const isActivity = isASType<ActivityTypes, IActivity>(ActivityTypes)
const isASObject = isASType<ObjectTypes, IObject>(ObjectTypes)

export { IObject, IActor, IActivity, isActivity, isActor, isASObject }