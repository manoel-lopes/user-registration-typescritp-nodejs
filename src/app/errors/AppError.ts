/* eslint-disable no-useless-constructor */
export class AppError {
  constructor(
        public readonly message: string,
        public readonly status: 400 | 404 = 400
  ) {}
}
