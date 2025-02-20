import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix("api/v1");
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");
  const app_origin = configService.get<string>(
    "FRONTEND_ORIGIN",
    "http://localhost:8000",
  );
  const node_env = configService.get<string>("NODE_ENV", "PRODUCTION");

  if (node_env !== "PRODUCTION") {
    const config = new DocumentBuilder()
      .setTitle("LifeSwap")
      .setDescription("LifeSwap API")
      .setVersion("1.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
        "JWT-auth",
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("doc", app, document);
  }

  app.enableCors({
    origin: app_origin,
  });

  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);
