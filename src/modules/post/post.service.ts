import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from '../../core/interfaces/list-options.interface';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ){}

    async store(data: PostDto, user: User) {
        console.log(user)
        const entity = await this.postRepository.create(data);
        await this.postRepository.save({
            ...entity,
            user
        });
        return entity;
    }
 
    async index(options: ListOptionsInterface) {
        // const entities = await this.postRepository.find({
        //     relations: ['user', 'category']
        // });
        // return entities;
        console.log('options');
        const {categories} = options;
        const queryBuilder = await this.postRepository
        .createQueryBuilder('post');

        queryBuilder.leftJoinAndSelect('post.user', 'user');
        queryBuilder.leftJoinAndSelect('post.category', 'category');

        if (categories) {
            queryBuilder.where('category.alias IN (:...categories)', {categories});
        }

        const entities = queryBuilder.getMany();
        return entities; 
    }

    async show(id: string) {
        const entity = await this.postRepository.findOne(id);
        return entity;
    }

    async update(id: string, data: Partial<PostDto>) {
        const result = await this.postRepository.update(id, data);
        return result;
    }

    async destroy(id: string) {
        const result = await this.postRepository.delete(id);
        return result;
    }

    async vote(id: number, user: User) {
        await this.postRepository
        .createQueryBuilder()
        .relation(User, 'voted')
        .of(user)
        .add(id);
    }
}
