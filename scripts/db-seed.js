// Usage:
//   npm run db:seed           create missing tables and add the demo psychologists if the table is empty
//   npm run db:reset          DROP all tables, recreate them and seed (destroys data)
import { sequelize, Psychologist } from '../src/models/index.js';

const reset = process.argv.includes('--reset');

const psychologists = [
  {
    name: 'Ирина Иванова', specialization: 'Психотерапевт', experienceYears: 10, schedule: 'Пн–Пт, 10:00–18:00', photo: 'images/6.jpeg',
    translations: {
      en: { name: 'Irina Ivanova', specialization: 'Psychotherapist', schedule: 'Mon–Fri, 10:00–18:00' },
      ar: { name: 'إيرينا إيفانوفا', specialization: 'معالجة نفسية', schedule: 'الإثنين–الجمعة، 10:00–18:00' },
    },
  },
  {
    name: 'Анна Смирнова', specialization: 'Психолог', experienceYears: 8, schedule: 'Вт–Сб, 09:00–17:00', photo: 'images/2.jpeg',
    translations: {
      en: { name: 'Anna Smirnova', specialization: 'Psychologist', schedule: 'Tue–Sat, 09:00–17:00' },
      ar: { name: 'آنا سميرنوفا', specialization: 'أخصائية نفسية', schedule: 'الثلاثاء–السبت، 09:00–17:00' },
    },
  },
  {
    name: 'Ольга Петрова', specialization: 'Клинический психолог', experienceYears: 15, schedule: 'Пн–Чт, 08:00–16:00', photo: 'images/3.jpeg',
    translations: {
      en: { name: 'Olga Petrova', specialization: 'Clinical psychologist', schedule: 'Mon–Thu, 08:00–16:00' },
      ar: { name: 'أولغا بيتروفا', specialization: 'أخصائية نفسية إكلينيكية', schedule: 'الإثنين–الخميس، 08:00–16:00' },
    },
  },
  {
    name: 'Мария Алексеева', specialization: 'Психотерапевт', experienceYears: 12, schedule: 'Ср–Вс, 10:00–19:00', photo: 'images/4.webp',
    translations: {
      en: { name: 'Maria Alekseeva', specialization: 'Psychotherapist', schedule: 'Wed–Sun, 10:00–19:00' },
      ar: { name: 'ماريا ألكسييفا', specialization: 'معالجة نفسية', schedule: 'الأربعاء–الأحد، 10:00–19:00' },
    },
  },
  {
    name: 'Мария Кузнецова', specialization: 'Семейный психолог', experienceYears: 20, schedule: 'Пн–Сб, 11:00–20:00', photo: 'images/5.jpeg',
    translations: {
      en: { name: 'Maria Kuznetsova', specialization: 'Family psychologist', schedule: 'Mon–Sat, 11:00–20:00' },
      ar: { name: 'ماريا كوزنيتسوفا', specialization: 'أخصائية علاج أسري', schedule: 'الإثنين–السبت، 11:00–20:00' },
    },
  },
  {
    name: 'Дмитрий Орлов', specialization: 'Коуч', experienceYears: 7, schedule: 'Вт, Чт, 10:00–14:00', photo: 'images/man.jpg',
    translations: {
      en: { name: 'Dmitry Orlov', specialization: 'Coach', schedule: 'Tue, Thu, 10:00–14:00' },
      ar: { name: 'دميتري أورلوف', specialization: 'مدرب حياة', schedule: 'الثلاثاء والخميس، 10:00–14:00' },
    },
  },
  {
    name: 'Елена Васильева', specialization: 'Психотерапевт', experienceYears: 9, schedule: 'Ср, Пт, 13:00–18:00', photo: 'images/girl.jpg',
    translations: {
      en: { name: 'Elena Vasilyeva', specialization: 'Psychotherapist', schedule: 'Wed, Fri, 13:00–18:00' },
      ar: { name: 'إيلينا فاسيليفا', specialization: 'معالجة نفسية', schedule: 'الأربعاء والجمعة، 13:00–18:00' },
    },
  },
];

try {
  await sequelize.sync({ force: reset });
  if ((await Psychologist.count()) === 0) {
    await Psychologist.bulkCreate(psychologists);
    console.log(`Seeded ${psychologists.length} psychologists`);
  } else {
    console.log('Psychologists already present, skipping seed');
  }
} catch (err) {
  console.error('Seed failed:', err.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
