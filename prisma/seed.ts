/* eslint-disable no-await-in-loop */
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

const prisma = new PrismaClient();

const main = async () => {
  const users: any[] = [];

  // Créer 5 utilisateurs
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.displayName(),
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      },
    });
    users.push(user);

    // Créer un nombre aléatoire de personnages (entre 5 et 10) pour chaque utilisateur
    const characterCount = faker.number.int({ min: 5, max: 10 });
    for (let j = 0; j < characterCount; j++) {
      const pictureId = faker.string.uuid();
      const characterId = faker.string.uuid();

      const name = faker.internet.displayName();

      const picture = PICTURES[Math.floor(Math.random() * PICTURES.length)];

      await prisma.character.create({
        data: {
          name,
          publishDate: faker.date.past(),
          userId: user.id,
          pictureId: pictureId,
          fileId: characterId,
          downloadCount: faker.number.int({ min: 0, max: 1000 }),
          files: {
            create: [
              {
                id: pictureId,
                etag: faker.string.uuid(),
                bucket:
                  env.NODE_ENV === 'development'
                    ? 'staracter-dev'
                    : 'staracter',
                fileName: picture.filename,
                originalName: picture.originalName,
                size: picture.size,
                url: picture.url,
              },
              {
                id: characterId,
                etag: faker.string.uuid(),
                bucket:
                  env.NODE_ENV === 'development'
                    ? 'staracter-dev'
                    : 'staracter',
                fileName:
                  'charactersFiles/535faa54-28b7-4606-ad63-8bc1b9b2142a.chf',
                originalName: `${name}.chf`,
                size: 4096,
                url: 'https://s3.dercraker.fr/staracter-dev/charactersFiles/1a9c371e-94c1-4c14-87c8-e599273552ea.chf',
              },
            ],
          },
        },
      });
    }
  }
};

const PICTURES = [
  {
    filename: 'charactersPictures/d33fad1a-95bd-46d8-b051-6787a34cc5d8.jpeg',
    originalName: 'claus_santa_ruprecht.jpeg',
    size: 98813,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/d33fad1a-95bd-46d8-b051-6787a34cc5d8.jpeg',
  },
  {
    filename: 'charactersPictures/2df3b3cb-386d-47d1-b9ce-f66f2ab854c8.jpeg',
    originalName: 'xiulan.jpeg',
    size: 84283,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/2df3b3cb-386d-47d1-b9ce-f66f2ab854c8.jpeg',
  },
  {
    filename: 'charactersPictures/d63b9744-259c-4679-95b5-b5b3008d8b76.jpeg',
    originalName: 'zephyra_starlyn.jpeg',
    size: 41576,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/d63b9744-259c-4679-95b5-b5b3008d8b76.jpeg',
  },
  {
    filename: 'charactersPictures/fd541f34-0560-4079-bccd-bd7e9b88b8e2.jpeg',
    originalName: 'sergeant_johnson_halo.jpeg',
    size: 39609,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/fd541f34-0560-4079-bccd-bd7e9b88b8e2.jpeg',
  },
  {
    filename: 'charactersPictures/988a3a3c-9ab1-44e3-ab4c-4c2cf77014ca.jpeg',
    originalName: 'amos_burton_the_expanse.jpeg',
    size: 42751,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/988a3a3c-9ab1-44e3-ab4c-4c2cf77014ca.jpeg',
  },
  {
    filename: 'charactersPictures/036197e7-b4bb-438f-b560-876c7c35a242.jpeg',
    originalName: 'akari_tomara.jpeg',
    size: 63955,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/036197e7-b4bb-438f-b560-876c7c35a242.jpeg',
  },
  {
    filename: 'charactersPictures/80277406-0800-45c0-860b-b562dfd714c6.jpeg',
    originalName: 'hulk_hogan.jpeg',
    size: 54602,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/80277406-0800-45c0-860b-b562dfd714c6.jpeg',
  },
  {
    filename: 'charactersPictures/4536ba6b-6a15-4065-a2c4-00cba9c27a2c.jpeg',
    originalName: 'jim_lasko.jpeg',
    size: 66651,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/4536ba6b-6a15-4065-a2c4-00cba9c27a2c.jpeg',
  },
  {
    filename: 'charactersPictures/45e58c5b-771b-47a3-ba75-ceac26c458dc.jpeg',
    originalName: 'rose_gonagle.jpeg',
    size: 56336,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/45e58c5b-771b-47a3-ba75-ceac26c458dc.jpeg',
  },
  {
    filename: 'charactersPictures/d2c9adba-c196-4a55-b7f4-4c4a915fcb22.jpeg',
    originalName: 'jesus_christ.jpeg',
    size: 59855,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/d2c9adba-c196-4a55-b7f4-4c4a915fcb22.jpeg',
  },
  {
    filename: 'charactersPictures/7948aebc-d843-4cfe-98a7-99624a089dc3.jpeg',
    originalName: 'layla_.jpeg',
    size: 51102,
    url: 'https://s3.dercraker.fr/staracter-dev/charactersPictures/7948aebc-d843-4cfe-98a7-99624a089dc3.jpeg',
  },
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
