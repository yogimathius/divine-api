import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { RootTestModule } from './testing/root-test.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

describe('AppModule', () => {
  let resolver: UserResolver;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          useFactory: async () => ({
            autoSchemaFile: 'schema.gql',
          }),
        }),
        RootTestModule,
      ],
    }).compile();

    resolver = moduleRef.get<UserResolver>(UserResolver);
  });

  it('should include the UserResolver in the imports array', () => {
    expect(resolver).toBeDefined();
  });

  it('should include the UserModule in the imports array', async () => {
    const userModule = moduleRef.get<UserModule>(UserModule);
    expect(userModule).toBeDefined();
  });

  it('should include the GraphQLModule in the imports array', async () => {
    const graphqlModule = moduleRef.get<GraphQLModule>(GraphQLModule);
    expect(graphqlModule).toBeDefined();
  });

  it('should include the DatabaseModule in the imports array', async () => {
    const databaseModule = moduleRef.get<DatabaseModule>(DatabaseModule);
    expect(databaseModule).toBeDefined();
  });
});
