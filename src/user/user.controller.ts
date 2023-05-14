import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from "@nestjs/common";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";
import { UpdatePartialUserDTO } from "./dto/updatePartial.user.dto";
import { UserService } from "./user.service";

// @UseInterceptors(LogInterceptor) // está no main.ts sendo utilizado de maneira global
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @Get()
  async userList() {
    return await this.userService.list();
  }
  @Get(":id")
  async oneUser(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.oneUser(id);
  }
  @Put(":id")
  async update(
    @Body() data: UpdateUserDTO,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.userService.update(id, data);
  }
  @Patch(":id")
  async updatePartial(
    @Body() data: UpdatePartialUserDTO,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.userService.updatePartial(id, data);
  }
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
