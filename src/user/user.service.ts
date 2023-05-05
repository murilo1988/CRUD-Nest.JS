import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/primas.service";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";
import { UpdatePartialUserDTO } from "./dto/updatePartial.user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async list() {
    return await this.prisma.user.findMany();
  }
  async oneUser(id: number) {
    await this.IsExist(id);
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: number, { name, email, password, birthAt }: UpdateUserDTO) {
    await this.IsExist(id);
    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }
  async updatePartial(
    id: number,
    { name, email, password, birthAt }: UpdatePartialUserDTO
  ) {
    await this.IsExist(id);
    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    await this.IsExist(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async IsExist(id: number) {
    if (await this.oneUser(id))
      throw new NotFoundException(`Usuário ${id} não existe`);
  }
}
