import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadController } from "src/controllers/Upload/upload.controller";
import { UploadService } from "src/controllers/Upload/upload.service";
import { Upload } from "src/database/entity/upload.entity";

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [TypeOrmModule.forFeature([Upload])]
})
export class UploadModule {}