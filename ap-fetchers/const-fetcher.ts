import IAbstractFetcher from "./abstract-fetcher"
import { CannotFetchError } from "./abstract-fetcher"
import { IObject } from "../definitions/interfaces"

class ConstFetcher implements IAbstractFetcher {
  consts: { [id: string]: IObject} = {}
  constructor(consts: IObject[]) {
    consts.forEach((aso: IObject, _idx: number, _arr: IObject[]) => {
      if (aso.id) {
       this.consts[aso.id] = aso
      }
    })
  }

  async getById(id: string): Promise<IObject> {
    try {
      const result = this.consts[id]
      if (typeof result !== "object") {
        throw new CannotFetchError(id)
      } else {
        return result
      }
    } catch {
      throw new CannotFetchError(id)
    }
  }
}

export default ConstFetcher