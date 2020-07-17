import { getId, isDomainEqual } from "commune-common/components/asobject"
import { ActorTypes } from "commune-common/definitions/enums"

const aso = {
  "id": "https://m.hitorino.moe/users/misaka4e22",
  "type": ActorTypes.Person
}

const asoEqualDomain = {
  "id": "https://m.hitorino.moe/users/misaka4e21",
  "type": ActorTypes.Person
}

const asoDifferentDomain = {
  "id": "https://transsteps.xyz/users/misaka4e23",
  "type": ActorTypes.Person
}


test('Can get AP id from string or IObject', async ()=>{
  expect(getId(aso)).toBe(aso.id)
  expect(getId(aso.id)).toBe(aso.id)
})

test('Can check domain equality', async ()=>{
  expect(isDomainEqual(aso, asoEqualDomain)).toBe(true)
  expect(isDomainEqual(aso.id, asoEqualDomain)).toBe(true)
  expect(isDomainEqual(aso, asoEqualDomain.id)).toBe(true)
  expect(isDomainEqual(aso.id, asoEqualDomain.id)).toBe(true)


  expect(isDomainEqual(aso, asoDifferentDomain)).toBe(false)
  expect(isDomainEqual(aso.id, asoDifferentDomain)).toBe(false)
  expect(isDomainEqual(aso, asoDifferentDomain.id)).toBe(false)
  expect(isDomainEqual(aso.id, asoDifferentDomain.id)).toBe(false)
})