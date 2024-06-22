import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users.repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[];

  constructor() {
    this.items = [];
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.items.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id === id) || null;
  }
}
