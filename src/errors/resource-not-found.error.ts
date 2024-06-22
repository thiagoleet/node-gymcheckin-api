export class ResourceNotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super("Resource not found");
  }
}
