import { Body, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { join } from "path";
import { Public } from "src/common/decorator/public.decorator";
import { UploadService } from "src/controllers/Upload/upload.service";
import { Upload } from "src/database/entity/upload.entity";
import { getFileInfo } from "src/utils";

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Public()
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
          const fileInfo = getFileInfo(file)
          return cb(null, `${randomName}${fileInfo.originalName}`)
        }
      })
    })
  )
  async upload(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    const res = await this.uploadService.saveMany(files.map(item => ({
      fileSize: item.size,
      filePath: item.path,
      filename: item.filename,
      fileOriginalName: item.originalname
    } as Upload)))
    
    return res
  }

  @Public()
  @Get('export/:id')
  async export(@Param() { id }, @Res() res: Response) {
    const file = await this.uploadService.findOne({
      where: {
        id: id,
      }
    })
    if (!file) {
      return res.json({
        statusCode: 200,
        message: '文件不存在',
        success: false,
        timestamp: new Date().toISOString(),
      })
    }
    const url = join(process.cwd(), `uploads/${file?.filename}`)
    return res.download(url)
  }

  @Public()
  @Get('list')
  async list() {
    return this.uploadService.findAll()
  }
}
