import { IObject } from "../definitions/interfaces"
import url from "url"

export function getId(data: IObject | string): string{
    if (typeof data==='string') {
        return data
    } else if (data.id) {
        return data.id
    } else {
        return ""
    }
}

export function isDomainEqual(data1: IObject | string, data2: IObject | string) {
    const id1 = getId(data1)
    const id2 = getId(data2)
    return url.parse(id1).host === url.parse(id2).host
}