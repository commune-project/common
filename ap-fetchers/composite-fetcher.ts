import IAbstractFetcher from "./abstract-fetcher"
import { CannotFetchError } from "./abstract-fetcher"
import { IObject } from "../definitions/interfaces"

class CompositeFetcher implements IAbstractFetcher {
  fetchers: IAbstractFetcher[]
  constructor(fetchers: IAbstractFetcher[]) {
    this.fetchers = fetchers
  }

  async getById(id: string): Promise<IObject> {
    for (const fetcher of this.fetchers) {
      try {
        return await fetcher.getById(id)
      } catch(e) {
        continue
      }
    }
    throw new CannotFetchError(id)
  }
}

export default CompositeFetcher