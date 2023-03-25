import { validate } from 'class-validator';
import { UpdateUserInput } from './update-user.input';

describe('UpdateUserInput', () => {
  it('should be valid with all fields', async () => {
    const input = new UpdateUserInput();
    input.name = 'Test Recipe';
    input.email = 'test@test.ca';
    input.password = 'test12';
    const errors = await validate(input);

    expect(errors.length).toBe(0);
  });

  it('should be invalid if name is longer than 30 characters', async () => {
    const input = new UpdateUserInput();
    input.name =
      'Test asdfakjsdlgakjsbgjasdfasnjkghalsjgabadsflkjklvjnancncnmmmcmkdkdfnf';
    input.email = 'test@test.ca';
    input.password = '123456';
    const errors = await validate(input);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      maxLength: 'name must be shorter than or equal to 30 characters',
    });
  });

  it('should be invalid if password is too short', async () => {
    const input = new UpdateUserInput();
    input.name = 'Test';
    input.email = 'test@test.ca';
    input.password = '12345';

    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      minLength: 'password must be longer than or equal to 6 characters',
    });
  });

  it('should be invalid if password is too long', async () => {
    const input = new UpdateUserInput();
    input.name = 'Test';
    input.email = 'test@test.ca';
    input.password = '1234512345123451234512345123451234512345123451234512345';

    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      maxLength: 'password must be shorter than or equal to 20 characters',
    });
  });
});
