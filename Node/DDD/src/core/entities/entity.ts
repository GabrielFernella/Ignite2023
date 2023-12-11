import { randomUUID } from "node:crypto"

export class Entity {
  private _id: string
  protected props: string

  get id(){
    return this._id
  }

  constructor(props: any, id?: string){
    this.props = props
    this._id = id ?? randomUUID()
  }
}