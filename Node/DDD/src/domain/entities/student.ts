import { randomUUID } from "node:crypto"
import { Entity } from "../../core/entities/entity"

interface StudentProps {
  name: string
}

export class Student extends Entity {

  constructor(props: StudentProps, id?:string){
    super(props, id)
  }
}