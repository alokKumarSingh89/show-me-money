import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Report, RowType } from './Report.dto';
import { IResponse } from './Response.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  welcome(): string {
    return 'Welcome NestJs World!';
  }

  async generateReport(): Promise<{ statusCode: number; data: IResponse }> {
    const res = {};
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          Reports: [Report];
        }>('http://localhost:9000/api.xro/2.0/Reports/BalanceSheet')
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw error;
          }),
        ),
    );
    if (!data.Reports.length) {
      throw new HttpException('Report Not Found', HttpStatus.NOT_FOUND);
    }
    try {
      const reports = data.Reports[0];
      res['title'] = reports.ReportTitles.join(' - ');
      res['data'] = [];
      const header = reports.Rows.find(
        (rowType) => rowType.RowType == 'Header',
      )['Cells'];

      reports.Rows.filter((rowType) => rowType.RowType == 'Section').map(
        (rowType: RowType) => {
          const data = rowType.Rows.forEach((row) => {
            const data = row.Cells.map((cell, index) => ({
              [header[index].Value || 'title']: cell.Value,
              section: rowType.Title,
            })).reduce((acc, cell) => {
              return Object.assign(acc, cell);
            }, {});
            res['data'] = [...res['data'], data];
          });

          return { title: rowType.Title, data };
        },
      );

      // res['data'] = section;
      return { data: res, statusCode: HttpStatus.OK };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'INternal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
