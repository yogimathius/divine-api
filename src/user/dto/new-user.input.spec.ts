import { validate } from 'class-validator';
import { NewUserInput } from './new-user.input';

describe('NewUserInput', () => {
  it('should be valid with all fields', async () => {
    const input = new NewUserInput();
    input.username = 'Test User';
    input.email = 'test@test.ca';
    input.password = 'test12';
    const errors = await validate(input);

    expect(errors.length).toBe(0);
  });

  it('should be invalid if username is longer than 30 characters', async () => {
    const input = new NewUserInput();
    input.username =
      'Test asdfakjsdlgakjsbgjasdfasnjkghalsjgabadsflkjklvjnancncnmmmcmkdkdfnf';
    input.email = 'test@test.ca';
    input.password = '123456';
    const errors = await validate(input);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      maxLength: 'username must be shorter than or equal to 30 characters',
    });
  });

  it('should be invalid if password is too short', async () => {
    const input = new NewUserInput();
    input.username = 'Test';
    input.email = 'test@test.ca';
    input.password = '12345';

    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      minLength: 'password must be longer than or equal to 6 characters',
    });
  });

  it('should be invalid if password is too long', async () => {
    const input = new NewUserInput();
    input.username = 'Test';
    input.email = 'test@test.ca';
    input.password = '1234512345123451234512345123451234512345123451234512345';

    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      maxLength: 'password must be shorter than or equal to 20 characters',
    });
  });
});
