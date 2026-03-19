export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", { cause });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido.");
    this.name = "MethodNotAllowedError";
    this.action = "Verifique o método HTTP utilizado.";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
    };
  }
}
