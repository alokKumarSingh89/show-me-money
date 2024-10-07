import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => of({})),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get(AppController);
    appService = moduleRef.get(AppService);
  });

  describe('App Controller', () => {
    it('should return "Welcome NestJs World!"', () => {
      jest
        .spyOn(appService, 'welcome')
        .mockImplementation(() => 'Welcome NestJs World!');
      expect(appController.welcome()).toBe('Welcome NestJs World!');
    });
    it('should return reports', async () => {
      jest
        .spyOn(appService, 'generateReport')
        .mockImplementation(() =>
          Promise.resolve({ statusCode: 200, data: { title: 'Test' } }),
        );
      const resp = await appController.generateReport();
      expect(resp.statusCode).toBe(200);
      expect(resp.data.title).toBe('Test');
    });
  });
});
