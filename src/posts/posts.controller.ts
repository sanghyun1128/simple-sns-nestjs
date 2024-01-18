import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  // - 모든 게시물을 가져옵니다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  //2) GET /posts/:id
  // - id에 해당되는 특정 게시물을 가져옵니다.
  @Get('/:id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  //3) POST /posts
  // - 새로운 게시물을 생성합니다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  //4) PUT /posts/:id
  // - id에 해당되는 특정 게시물을 수정합니다.
  @Put('/:id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(author, title, content, +id);
  }

  //5) DELETE /posts/:id
  // - id에 해당되는 특정 게시물을 삭제합니다.
  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
