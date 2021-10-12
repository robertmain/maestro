import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const { PORT, NODE_ENV } = process.env;

(async (): Promise<void> => {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    if (NODE_ENV !== 'production') {
        const options = new DocumentBuilder().build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs', app, document);
    }
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(PORT);
})();
