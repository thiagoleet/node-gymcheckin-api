export class LateCheckInValidateError extends Error {
  constructor(
    message: string = "The check-in can only be validated until 20 minutes of its creation."
  ) {
    super(message);
  }
}
