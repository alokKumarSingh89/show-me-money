import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
const data = {
  Reports: [
    {
      ReportID: 'BalanceSheet',
      ReportName: 'Balance Sheet',
      ReportType: 'BalanceSheet',
      ReportTitles: ['Balance Sheet', 'Demo Org', 'As at 07 October 2024'],
      ReportDate: '07 October 2024',
      Rows: [
        {
          RowType: 'Header',
          Cells: [
            {
              Value: '',
            },
            {
              Value: '07 October 2024',
            },
            {
              Value: '08 October 2023',
            },
          ],
        },
        {
          RowType: 'Section',
          Title: 'Bank',
          Rows: [
            {
              Cells: [
                {
                  Value: 'My Bank Account',
                  Attributes: [
                    {
                      Value: 'd2e3044e-2fb8-42fa-be17-64c8956d5f57',
                      Id: 'account',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
describe('App Service', () => {
  let appService: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();
    appService = module.get(AppService);
    httpService = module.get(HttpService);
  });
  it('should throw error on zero Report', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: {
          Reports: [],
        },
        headers: {},
        config: {
          url: '',
          headers: undefined,
        },
        status: 200,
        statusText: 'OK',
      }),
    );
    try {
      await appService.generateReport();
    } catch (err) {
      expect(err.status).toBe(404);
      expect(err.message).toBe('Report Not Found');
    }
  });
  it('return Report', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data,
        headers: {},
        config: {
          url: '',
          headers: undefined,
        },
        status: 200,
        statusText: 'OK',
      }),
    );
    const res = await appService.generateReport();
    expect(res.statusCode).toBe(200);
    expect(res.data.title).toBe(data.Reports[0].ReportTitles.join(' - '));
  });
});
