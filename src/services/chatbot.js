import { config } from '../config/env.js';
import { DEFAULT_LANG } from '../i18n/index.js';

// Keywords from all three languages are checked for every message; the reply uses the interface language.
const CRISIS_KEYWORDS = [
  'суицид', 'покончить с собой', 'не хочу жить', 'убить себя',
  'suicide', 'kill myself', 'end my life', "don't want to live",
  'انتحار', 'أقتل نفسي', 'اقتل نفسي', 'لا أريد أن أعيش', 'لا اريد ان اعيش',
];

const CRISIS_REPLY = {
  ru: 'Мне очень жаль, что вам так тяжело. Пожалуйста, прямо сейчас позвоните на бесплатный телефон доверия 8-800-2000-122 или в экстренные службы 112. Вы не одни, и помощь рядом. 💙',
  en: 'I am really sorry you are going through this. Please contact your local emergency number (112 / 911) or a crisis hotline right now. You are not alone, and help is near. 💙',
  ar: 'أنا آسف جدًا لأنك تمر بهذا. من فضلك اتصل الآن برقم الطوارئ في بلدك (112) أو بخط مساندة نفسية. لست وحدك، والمساعدة قريبة. 💙',
};

const RESPONSES = [
  {
    keys: ['грустн', 'печал', 'тоск', 'sad', 'unhappy', 'حزين', 'حزن', 'زعلان'],
    reply: {
      ru: 'Мне жаль это слышать. Попробуйте поделиться своими чувствами с кем-то близким. Я здесь, чтобы поддержать вас. 💙',
      en: 'I am sorry to hear that. Try sharing your feelings with someone close to you. I am here to support you. 💙',
      ar: 'يؤسفني سماع ذلك. حاول مشاركة مشاعرك مع شخص قريب منك. أنا هنا لدعمك. 💙',
    },
  },
  {
    keys: ['одинок', 'lonely', 'alone', 'وحيد', 'وحدة'],
    reply: {
      ru: 'Одиночество бывает тяжёлым. Может быть, попробуете найти новое хобби или поговорите с другом? Я рядом! 🤗',
      en: 'Loneliness can be hard. Maybe try a new hobby or talk to a friend? I am right here! 🤗',
      ar: 'الوحدة قد تكون صعبة. ربما تجرّب هواية جديدة أو تتحدث مع صديق؟ أنا بجانبك! 🤗',
    },
  },
  {
    keys: ['деньг', 'финанс', 'money', 'financ', 'فلوس', 'مال', 'مادي'],
    reply: {
      ru: 'Финансовые трудности могут быть стрессовыми. Может, стоит составить план или поговорить с кем-то, кто может помочь? 💰',
      en: 'Financial difficulties can be stressful. Maybe make a plan or talk to someone who can help? 💰',
      ar: 'الضغوط المادية مرهقة. ربما تضع خطة أو تتحدث مع شخص يمكنه المساعدة؟ 💰',
    },
  },
  {
    keys: ['тревож', 'тревог', 'паник', 'anxious', 'anxiety', 'panic', 'قلق', 'توتر', 'هلع'],
    reply: {
      ru: 'Тревога — это нормально, особенно в сложных ситуациях. Глубокое дыхание и медитация могут помочь. Попробуйте! 🧘',
      en: 'Anxiety is normal, especially in hard situations. Deep breathing and meditation can help. Give it a try! 🧘',
      ar: 'القلق أمر طبيعي، خاصة في المواقف الصعبة. التنفس العميق والتأمل قد يساعدانك. جرّب ذلك! 🧘',
    },
  },
  {
    keys: ['устал', 'нет сил', 'tired', 'exhausted', 'تعبان', 'متعب', 'إرهاق'],
    reply: {
      ru: 'Отдых очень важен. Дайте себе время расслабиться и восстановить силы. 😴',
      en: 'Rest is very important. Give yourself time to relax and recover. 😴',
      ar: 'الراحة مهمة جدًا. امنح نفسك وقتًا للاسترخاء واستعادة طاقتك. 😴',
    },
  },
  {
    keys: ['не понимает', 'не понимают', 'understand me', 'محدش فاهم', 'لا أحد يفهم', 'لا احد يفهم'],
    reply: {
      ru: 'Иногда кажется, что никто не понимает нас, но это не так. Возможно, стоит поговорить с тем, кому вы доверяете? 💞',
      en: 'Sometimes it feels like nobody understands us, but that is not true. Maybe talk to someone you trust? 💞',
      ar: 'أحيانًا نشعر أن لا أحد يفهمنا، لكن هذا غير صحيح. ربما تتحدث مع شخص تثق به؟ 💞',
    },
  },
  {
    keys: ['стресс', 'stress', 'ضغط', 'مضغوط'],
    reply: {
      ru: 'Попробуйте отвлечься на что-то приятное: музыку, прогулку или книгу. Это поможет снизить уровень стресса. 🎶',
      en: 'Try switching to something pleasant: music, a walk or a book. It helps lower stress. 🎶',
      ar: 'حاول أن تنشغل بشيء ممتع: موسيقى أو مشي أو كتاب. هذا يساعد على تخفيف التوتر. 🎶',
    },
  },
  {
    keys: ['мотивац', 'motivat', 'حافز', 'تحفيز', 'شغف'],
    reply: {
      ru: 'Попробуйте вспомнить, зачем вы начали. Маленькие шаги приведут вас к большой цели. 🚀',
      en: 'Try to remember why you started. Small steps lead to big goals. 🚀',
      ar: 'تذكّر لماذا بدأت. الخطوات الصغيرة تقودك إلى أهداف كبيرة. 🚀',
    },
  },
  {
    keys: ['психолог', 'запис', 'специалист', 'therapist', 'psycholog', 'book', 'appointment', 'طبيب', 'معالج', 'حجز', 'أخصائي', 'مختص'],
    reply: {
      ru: 'Вы можете записаться к специалисту на странице «Специалисты» и выбрать удобное время. 📅',
      en: 'You can book a specialist on the “Specialists” page and pick a convenient time. 📅',
      ar: 'يمكنك حجز جلسة مع مختص من صفحة «المختصون» واختيار الوقت المناسب. 📅',
    },
  },
  {
    keys: ['плохо', 'bad', 'awful', 'وحش', 'سيء', 'سيئ'],
    reply: {
      ru: 'Простите, что вы так себя чувствуете. Может быть, стоит поговорить со специалистом? Я здесь для вас. 🤝',
      en: 'I am sorry you feel this way. Maybe it is worth talking to a specialist? I am here for you. 🤝',
      ar: 'آسف لأنك تشعر بهذا. ربما من المفيد التحدث مع مختص؟ أنا هنا من أجلك. 🤝',
    },
  },
  {
    keys: ['привет', 'здравств', 'hello', 'hi ', 'hey', 'مرحبا', 'السلام', 'اهلا', 'أهلا'],
    reply: {
      ru: 'Здравствуйте! Расскажите, что вас беспокоит, — я выслушаю. 🙂',
      en: 'Hello! Tell me what is bothering you — I am listening. 🙂',
      ar: 'أهلًا بك! أخبرني بما يزعجك، وأنا أستمع إليك. 🙂',
    },
  },
];

const DEFAULT_REPLY = {
  ru: 'Я здесь, чтобы поддержать вас. Расскажите мне больше. 💙',
  en: 'I am here to support you. Tell me more. 💙',
  ar: 'أنا هنا لدعمك. أخبرني المزيد. 💙',
};

const pick = (map, lang) => map[lang] || map[DEFAULT_LANG];

function keywordReply(message, lang) {
  const text = `${message.toLowerCase()} `;
  const match = RESPONSES.find(({ keys }) => keys.some((k) => text.includes(k)));
  return pick(match ? match.reply : DEFAULT_REPLY, lang);
}

async function modelReply(message, lang) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${config.aiServiceUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply.trim() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Crisis messages always get the fixed safety reply; otherwise try the model service, then fall back to keywords.
export async function getReply(message, lang = DEFAULT_LANG) {
  const text = message.toLowerCase();
  if (CRISIS_KEYWORDS.some((k) => text.includes(k))) return pick(CRISIS_REPLY, lang);

  if (config.aiServiceUrl) {
    const reply = await modelReply(message, lang);
    if (reply) return reply;
  }
  return keywordReply(message, lang);
}
