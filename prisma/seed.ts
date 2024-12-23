import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cities = [
    'Billund',
    'Grindsted',
    'Vorbasse',
    'Filskov',
    'Sdr. Omme',
    'Hejnsvig',
    'Stenderup-Krogager'
  ]

  for (const cityName of cities) {
    await prisma.city.upsert({
      where: { name: cityName },
      update: {},
      create: { name: cityName }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 