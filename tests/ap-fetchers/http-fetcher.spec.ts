import HttpFetcher from "commune-common/ap-fetchers/http-fetcher"
import { ActorTypes } from "commune-common/definitions/enums"
import { IObject, IActor } from "commune-common/definitions/interfaces"
import { CannotFetchError } from "commune-common/ap-fetchers/abstract-fetcher"
import fetch from "node-fetch"

jest.mock("node-fetch")

const data: any[] = [
  {
    "@context": "https://litepub.social/litepub/context.jsonld",
    "id": "https://m.hitorino.moe/users/misaka4e22",
    "type": "Person",
    "following": "https://m.hitorino.moe/users/misaka4e22/following",
    "followers": "https://m.hitorino.moe/users/misaka4e22/followers",
    "inbox": "https://m.hitorino.moe/users/misaka4e22/inbox",
    "outbox": "https://m.hitorino.moe/users/misaka4e22/outbox",
    "featured": "https://m.hitorino.moe/users/misaka4e22/collections/featured",
    "preferredUsername": "misaka4e22", "name": "▼ Misaka0x4e22 ▼",
    "summary": "\u003cp\u003e御坂0x4e22 :trans_comm:\u003cbr /\u003e特权阶级得到的只有锁链，他们将失去整个世界！\u003cbr /\u003eThe privileged have nothing to win but their chains, they have a world to lose!\u003c/p\u003e",
    "url": "https://m.hitorino.moe/@misaka4e22",
    "manuallyApprovesFollowers": false,
    "discoverable": true,
    "publicKey": {
      "id": "https://m.hitorino.moe/users/misaka4e22#main-key",
      "owner": "https://m.hitorino.moe/users/misaka4e22",
      "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtqsq4VhIQsVsfPvGckVT\nVR0NOO/dBGQsqIkma++HwwL5vKEc3ojHPK4aLdLDGzd1YI1CV7NDIVFvwZr9Y2UT\nRGh2lwCUhzELtj65g2RgMECzUaiYRSbE387pG5AxKnHLfGs9UPmmME1gaWBVB41B\nYZVVhxKjhgA9ph/APj/dePrQa89+BbZk9m9gMl/rjtko95A/WRQOLHQaRmcHnvtz\nvdKdWxnB8dQ4+mTpizHYWvK5gNMCwvHqleihfTa3jPWCffMlIzNZBATd9PutPJdH\n7WQQkwEXmvraofHRm5WEdnitVp5v/P6pmFonlqUIhAVuZ1a78Kll1j0RmoUTuZN8\njwIDAQAB\n-----END PUBLIC KEY-----\n"
    },
    "tag": [
      {
        "id": "https://m.hitorino.moe/emojis/9757", "type": "Emoji", "name": ":trans_comm:", "updated": "2018-12-21T20:45:08Z",
        "icon": {
          "type": "Image", "mediaType": "image/png", "url": "https://m.hitorino.moe/system/custom_emojis/images/000/009/757/original/985a574160c05966.png?1545425108"
        }
      }
    ],
    "attachment": [{ "type": "PropertyValue", "name": "Language(s)", "value": "现代标准汉语 / (a little bit) English" }],
    "endpoints": { "sharedInbox": "https://m.hitorino.moe/inbox" },
    "icon": {
      "type": "Image", "mediaType": "image/png", "url": "https://m.hitorino.moe/system/accounts/avatars/000/000/001/original/63d24033f7575069.png?1523040154"
    },
    "image": {
      "type": "Image",
      "mediaType": "image/png",
      "url": "https://m.hitorino.moe/system/accounts/headers/000/000/001/original/7a9de5c947a45a1d.png?1534813122"
    }
  }
]

// @ts-ignore
fetch.mockResolvedValue({
  async json() {
    return data[0]
  }
})

test('Can get Actor from HttpFetcher', async () => {
  const id = "https://m.hitorino.moe/users/misaka4e22"
  const fetcher = new HttpFetcher()
  const actor: IObject = await fetcher.getById(id)
  expect(actor.id).toBe(id)
})

test('Can read Actor properties', async () => {
  const id = "https://m.hitorino.moe/users/misaka4e22"
  const fetcher = new HttpFetcher()
  const aso: IObject = await fetcher.getById(id)
  if ((<any>Object).values(ActorTypes).includes(aso.type)) {
    const actor = <IActor>aso
    expect(actor.id).toBe(id)
    expect(actor.type).toBe("Person")
    expect(actor.preferredUsername).toBe("misaka4e22")
  } else {
    expect(aso.type).toBe("Actor")
  }
})

test("Cannot get Actor that does not exist", async () => {
  // @ts-ignore
  fetch.mockImplementationOnce(() => Promise.reject("404 Not Found"));
  const id = "https://m.hitorino.moe/xxxx"
  const fetcher = new HttpFetcher()
  await expect(fetcher.getById(id)).rejects.toThrow(CannotFetchError)
})