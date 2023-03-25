import { UsersArgs } from './users.args';

describe('UsersArgs', () => {
  it('should default page to 1 and limit to 10', () => {
    const args = new UsersArgs();
    expect(args.page).toEqual(1);
    expect(args.limit).toEqual(10);
  });

  it('should set page and limit to the specified values', () => {
    const args = new UsersArgs();
    args.page = 2;
    args.limit = 5;
    expect(args.page).toEqual(2);
    expect(args.limit).toEqual(5);
  });
});
