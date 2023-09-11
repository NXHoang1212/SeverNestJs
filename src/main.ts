import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as Admin from 'firebase-admin';

async function bootstrap() {

  Admin.initializeApp({
    credential: Admin.credential.cert({
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgJpC0TfKTsLrd\nxXJ30o/rybePJQuIbcR7gQ8srQ2lUC5FJi0qEtJ/bp59aUwb4J9NEYbiylSOY9gK\nXVY5Itxyl2qyq6zaBfx6fOPrbkadoRfDnQpimuC0H3sq8XSPPMIHYCvkJG0JAMAW\nQmq72YoPXG39pSUEy/p9/cuHPFeDuVy+uDeusmRZk1mVmQF1OhBduaHdgXwjkFKQ\np8vZnEo7xSkHPYCahu2d85tpSLiipTkEi1L1xtUb3HAOA22oM8gz2MYc6Sz9NAM6\nqYyoWphvOyO+GGDCCAO5BvsGwlRehQCrhAIQhLGLD2O+73jG+f9WHjW+B5JhjicQ\neNT9I8qbAgMBAAECggEAFCkT0cvC+iqmnATCx2kuXag+dMcBswsgZXVVrpCADjLY\nfoqw/DxGJ4UFB0WdvVImMdHWPnaxRT9Qspnzg98RUdMxmxFa0h9Atqmd/FJmUo4n\nK4Zn5TeF511/f/zInYt67hvlxrbKAcnJ/RaLMAsgYkJPeEVOv5AzHvrhP/Aa9PNf\nZwAs5rYZ3rF+qq95eRMhz74w3Pn6nHfO47cdwQbwod04Qh9VlTzuPqWyfKmmZVV3\nzQX0zaYJSjC4q3sp2KzB2Mcqw30N0iijpNNvhrRDye/c9qBqy2hPd1yx8ZF6zuah\nRmUGQiXzGf+ZAK6rn8U4au0SNceigsz0eAQEWop2SQKBgQD//HNMgEJEXAQjlxe9\naNABUwHl0jDoALO/diitl6H8inozQJ3Jk05ula9VZl865zpb+6dBsNuDwe4FGqiC\nJoiKspoVfWpzClTkc75LQg/vich29cozhzvH57jx9awNSsxe3/UFptnWj9XzD5hv\nGHiTpMEhOEO3kydVvEvUd2nr4wKBgQDgKaxlSmgyBeHX2eMV8fBfODuKe6Hl6vLW\nvsV/lC7TVg1ZTaUMR13eZuHVNQviqjQG28b/lql6533wd+PXbVE64DRlJ/YEGMQo\nmALB+A2IKaudzKdSIaAXnGZSR2DUxgx9AjPcz0kKGwG4EnvgCNjssjuRWQRQe8bl\nQ7zvj3DT6QKBgAGJ+P96ves/Sl8UZ3YiDS4U26wQCW87odkC0tfIU5b7FiT8vHYb\nxprvl3BB/0yRW052QtkoQQmXvuCU+nJd3PBIhpieemdapowBDiHRsdrUzzm33JFW\nvMtE313FBlXGH1hqrERublzV3IlrjJUOZpssoGScu/t8jP389c+/MAnVAoGBAJeS\nVimfaFj6tT0Y7X33PAuGoGwBMPWgKleeYzji386yzw/leoaU8xnhAy8BUWoQoGFK\n1oIYQ70BLp0c1AjkuBpRY9xKawVWIb05HBRAQBYj5xEqQrE8X13XuTBFZ2o4CFW2\n2Y6i8sZMgJsQlIZmNRfHZJPhVxN8vn5jkSuDGE2RAoGAPmrbn4lkJW6zs81jDgjt\n1a3QO7G7+fnVQwJ+Fvbci+Qa6Eisb8cmwlnhmjlF+oABXSwLet2OyNCfZt0MT3C4\njMf5XMyciKa6EX7IdBcutN/YNPYm38rejoNHj0VOCAnecAU/eUgtU8xEWQwapI6F\nFpA95HsqiAfGHiw+Un9PW5E=\n-----END PRIVATE KEY-----\n",
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      project_id: process.env.FIREBASE_PROJECT_ID
    } as Partial<Admin.ServiceAccount>),
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'src/views/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  await app.listen(3000);


}
bootstrap();
