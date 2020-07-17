import { IActivity, isActor } from '../definitions/interfaces'
export function getRecipients(data: IActivity): string[] {
  let to: string[]
  if (!data.to) {
    to = []
  } else if (data.to instanceof Array) {
    to = data.to
  } else {
    to = [data.to]
  }
  let cc: string[]
  if (!data.cc) {
    cc = []
  } else if (data.cc instanceof Array) {
    cc = data.cc
  } else {
    cc = [data.cc]
  }
  let bto: string[]
  if (!data.bto) {
    bto = []
  }
  else if (data.bto instanceof Array) {
    bto = data.bto
  } else {
    bto = [data.bto]
  }
  let bcc: string[]
  if (!data.bcc) {
    bcc = []
  } else if (data.bcc instanceof Array) {
    bcc = data.bcc
  } else {
    bcc = [data.bcc]
  }
  const set = new Set(to.concat(cc, bto, bcc))
  const actor = data["actor"]
  if (typeof actor === 'string') {
    set.add(actor)
  } else if (isActor(actor)) {
    set.add(actor.id)
  }
  return Array.from(set)
}

