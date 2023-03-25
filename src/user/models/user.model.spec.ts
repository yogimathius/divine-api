import { User } from './user.model';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.name = 'John Doe';
    user.email = 'john@example.com';
    user.password = 'password123';
  });

  describe('constructor()', () => {
    it('should create a new user instance with the provided properties', () => {
      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
      expect(user.name).toEqual('John Doe');
      expect(user.email).toEqual('john@example.com');
      expect(user.password).toEqual('password123');
    });
  });
});
