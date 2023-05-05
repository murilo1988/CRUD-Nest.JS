import { Module } from "@nestjs/common";
import { PrismaService } from "./primas.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
