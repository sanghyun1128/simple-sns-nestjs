import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { BaseModel } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { POST_PUBLIC_IMAGE_PATH } from '../const/path.const';
import { join } from 'path';
import { Transform } from 'class-transformer';
import { PostsModel } from 'src/posts/entity/posts.entity';

export enum ImageModelType {
  POST_IMAGE,
}

@Entity()
export class ImageModel extends BaseModel {
  @Column({
    default: 0,
  })
  @IsInt()
  @IsOptional()
  order: number;

  @Column({
    enum: ImageModelType,
  })
  @IsEnum(ImageModelType)
  @IsString()
  type: ImageModelType;

  @Column()
  @IsString()
  @Transform(({ value, obj }) => {
    if (obj.type === ImageModelType.POST_IMAGE) {
      return join('/', POST_PUBLIC_IMAGE_PATH, value);
    }
    return value;
  })
  path: string;

  @ManyToOne((type) => PostsModel, (post) => post.images)
  post?: PostsModel;
}
