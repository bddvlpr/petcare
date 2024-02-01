import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pets = {
    sylke: await prisma.pet.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        name: 'Sylke',
        type: 'CAT',
        birthday: new Date(2007, 7, 7),
        picture: 'https://i.imgur.com/enO4Ap9.jpeg'
      },
      update: {}
    }),
    poesie: await prisma.pet.upsert({
      where: { id: 2 },
      create: {
        id: 2,
        name: 'Poesie',
        type: 'CAT',
        picture: 'https://i.imgur.com/wx2cnm6.jpeg'
      },
      update: {}
    }),
    aiko: await prisma.pet.upsert({
      where: { id: 3 },
      create: {
        id: 3,
        name: 'Aiko',
        type: 'PARROT',
        birthday: new Date(2017, 1, 23),
        picture: 'https://i.imgur.com/SIG2Bc0.jpeg'
      },
      update: {}
    }),
    sky: await prisma.pet.upsert({
      where: { id: 4 },
      create: {
        id: 4,
        name: 'Sky',
        type: 'DOG',
        birthday: new Date(2019, 8, 2),
        picture: 'https://i.imgur.com/JDBeJfn.jpeg'
      },
      update: {}
    })
  };
  console.log('Pets processed', Object.keys(pets).length);

  const medication = {
    meloxicam: await prisma.medication.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        name: 'Meloxicam',
        notes: 'Pijnstiller artrose'
      },
      update: {}
    })
  };
  console.log('Medication processed', Object.keys(medication).length);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
