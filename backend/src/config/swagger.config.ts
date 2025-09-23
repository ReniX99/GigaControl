import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('GigaControl')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
