import { randomUUID } from "node:crypto"
import { Entity } from "../../core/entities/entity"

interface answerProps {
  content: string, 
  authorId: string,
  questionId: string
}

export class Answer extends Entity {

  constructor(props: answerProps, id?:string){
    super(props, id)
  }
}