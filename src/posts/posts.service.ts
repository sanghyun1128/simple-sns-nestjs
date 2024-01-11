import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '2023 Yearbook Teaser',
    content: 'happyhpappthpahphaphap',
    likeCount: 10000000,
    commentCount: 92232,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '2023 mmamama',
    content: 'sdfdfsfdfdfdsfdsf',
    likeCount: 92892382,
    commentCount: 11132,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '2023 blue red green',
    content: 'asldfkjsldfa;jfdkfdf',
    likeCount: 2334985792,
    commentCount: 98442,
  },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const post = posts.find((post) => post.id === +id);
    if (post) {
      return post;
    } else {
      throw new NotFoundException();
    }
  }

  createPost(author: string, title: string, content: string): PostModel {
    const newPost: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, newPost];

    return newPost;
  }

  updatePost(author: string, title: string, content: string, id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return post;
  }

  deletePost(id: string) {
    posts = posts.filter((post) => post.id !== +id);

    if (!posts) {
      throw new NotFoundException();
    }

    return { id: +id };
  }
}
