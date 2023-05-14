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
    return this.prisma.user.findMany();
  }
  async oneUser(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: number, { name, email, password, birthAt }: UpdateUserDTO) {
    await this.exists(id);
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
    await this.exists(id);
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
    await this.exists(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Usuário ${id} não existe`);
    }
  }
}
