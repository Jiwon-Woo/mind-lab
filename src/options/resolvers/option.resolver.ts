import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { Option } from '../entities/option.entity';
import { OptionsService } from '../options.service';
import { Question } from 'src/questions/entities/question.entity';

@Resolver(Option)
export class OptionResolver {
  constructor(private optionsService: OptionsService) {}

  @Query(() => [Option], {
    description: '특정 설문지 문항에 해당하는 선택지 목록',
  })
  async findOptions(
    @Args('questionId', {
      type: () => Int,
      description: '설문지 문항의 고유 아이디',
    })
    questionId: number,
  ) {
    return await this.optionsService.findByQuestionId(questionId);
  }

  @Query(() => Option, {
    description: '선택지 고유 아이디를 통한 특정 선택지 조회',
  })
  async option(
    @Args('id', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
  ) {
    return await this.optionsService.findById(id);
  }

  @ResolveField(() => Question)
  async question(@Parent() option: Option) {
    return await this.optionsService.findQuestionById(option.id);
  }
}
