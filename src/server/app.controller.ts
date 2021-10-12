import { Get, Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    private readonly appService: AppService;

    public constructor(@Inject(AppService) appService: AppService) {
        this.appService = appService;
    }

    @Get()
    root(): string {
        return this.appService.root();
    }
}
