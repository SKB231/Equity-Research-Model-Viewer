import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { FirebaseService } from './firebase.service';
import { Company } from './databaseTypes';

@Controller('firebase')
export class FirebaseController {
  constructor(private service: FirebaseService) {}
  @Get('getAllCompanies')
  getCompanyCollection() {
    return this.service.getCompanyCollection();
  }

  @Get('getCompanyFromId/:companyId')
  getCompanyFromId(@Param('companyId') id: string) {
    return this.service.getCompany(id);
  }

  @Post('deleteCompanyById')
  async deleteCompanyById(@Body() body: { companyId: string }) {
    return this.service.deleteCompany(body.companyId);
  }

  @Post('createCompany')
  async createCompany(
    @Body()
    body: Company,
  ) {
    return this.service.addCompany({
      jsonFile: body.jsonFile,
      name: body.name,
      ticker: body.ticker,
      type: body.type,
    });
  }
}
