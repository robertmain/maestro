import request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpServer, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/server/app.module';

describe('AppController (e2e)', () => {
    let api: HttpServer;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        const app = moduleFixture.createNestApplication();
        await app.init();
        api = app.getHttpServer();
    });
    it.skip('', () => {
        // Do something in here
    });
});
