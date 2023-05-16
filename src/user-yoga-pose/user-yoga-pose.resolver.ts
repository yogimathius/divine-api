import { Resolver, Query } from '@nestjs/graphql';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { UserYogaPoseService } from './user-yoga-pose.service';

@Resolver(() => UserYogaPose)
export class UserYogaPoseResolver {
  constructor(private readonly userYogaPoseService: UserYogaPoseService) {}

  // Implement your resolver methods here
}
