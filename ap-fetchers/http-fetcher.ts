import IAbstractFetcher from "./abstract-fetcher"
import { CannotFetchError, IFetcherMiddleware } from "./abstract-fetcher"
import { IObject } from "../definitions/interfaces"

if (global.fetch === undefined) {
  global.fetch = require("node-fetch")
}

class HttpFetcher implements IAbstractFetcher {
  constructor(middleware?: IFetcherMiddleware) {
    middleware?.setupFetcher(this)
  }

  async headerGenerator(id: string): Promise<{[id: string]: string}> { return {} }

  async getById(id: string): Promise<IObject> {
    try {
      const response = await fetch(id, {
        method: "GET",
        mode: "no-cors",
        credentials: "omit",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
          "Accept": 'application/ld+json; profile="https://www.w3.org/ns/activitystreams',
          ...await this.headerGenerator(id)
        }
      })
      return await response.json()
    } catch (err) {
      throw new CannotFetchError(id, ...err)
    }
  }
}

export default HttpFetcher