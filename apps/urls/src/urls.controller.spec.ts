import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';

describe('UrlsController', () => {
  let urlsController: UrlsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
    }).compile();

    urlsController = app.get<UrlsController>(UrlsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(urlsController.getHello()).toBe('Hello World!');
    });
  });
});
