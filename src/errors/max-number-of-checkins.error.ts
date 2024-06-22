export class MaxNumberOfCheckInsError extends Error {
  constructor(message: string = "Max number of check-ins reachead") {
    super(message);
  }
}
