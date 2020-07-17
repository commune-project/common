import { IObject } from "../definitions/interfaces"

interface IAbstractFetcher {
  getById(id: string): Promise<IObject>
}

class CannotFetchError extends Error {
  id: string
  constructor(id: string, ...params: any[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CannotFetchError.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CannotFetchError)
    }

    this.name = 'CannotFetchError'
    // Custom debugging information
    this.id = id
  }
}

interface IFetcherMiddleware {
  setupFetcher(fetcher: IAbstractFetcher): void
}

export default IAbstractFetcher
export { CannotFetchError, IFetcherMiddleware }