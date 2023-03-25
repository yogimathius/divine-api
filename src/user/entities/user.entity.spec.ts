import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a user instance', () => {
    const user = new User();
    expect(user).toBeDefined();
  });

  it('should have a generated id', () => {
    const user = new User();
    expect(user.id).toBeUndefined();
    user.id = 1;
    expect(user.id).toEqual(1);
  });

  it('should have a name', () => {
    const user = new User();
    expect(user.name).toBeUndefined();
    user.name = 'Test User';
    expect(user.name).toEqual('Test User');
  });

  it('should have an optional email', () => {
    const user = new User();
    expect(user.email).toBeUndefined();
    user.email = 'This is a test user';
    expect(user.email).toEqual('This is a test user');
  });

  it('should have password', () => {
    const user = new User();
    expect(user.password).toBeUndefined();
    user.password = 'test112';

    expect(user.password).toEqual('test112');
  });
});
