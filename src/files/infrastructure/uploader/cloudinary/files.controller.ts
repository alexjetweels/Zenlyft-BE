import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from './files.service';
import { FileResponseDto } from './dto/file-response.dto';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class CloudinaryController {
  constructor(private readonly filesService: CloudinaryService) {}

  @ApiCreatedResponse({
    type: FileResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload-cloudinary')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async(
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return this.filesService.uploadFile(file);
  }
}
