export class LateChackInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated until 20 minutes of this creation. ',
    )
  }
}
