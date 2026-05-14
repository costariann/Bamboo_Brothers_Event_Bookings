import { prisma } from '../../../config/prisma';
import bcrypt from 'bcrypt';
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } from '../../env';

async function seedSuperAdmin() {
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email: SUPER_ADMIN_EMAIL,
    },
  });

  if (existingAdmin) {
    console.log('Super admin already exists');
  }

  const passwordHash = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

  await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: SUPER_ADMIN_EMAIL,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Super admin seeded successfully 🚀');
}

seedSuperAdmin()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
