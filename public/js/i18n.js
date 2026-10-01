// Client-side translations. Elements opt in with:
//   data-i18n="key"              -> textContent
//   data-i18n-placeholder="key"  -> placeholder
//   data-i18n-aria-label="key"   -> aria-label
//   <html data-title="key">      -> document.title
const dictionaries = {
  ru: {
    brand: 'Рядом',
    'meta.home': 'Рядом — онлайн-поддержка',
    'meta.chat': 'Чат поддержки — Рядом',
    'meta.booking': 'Специалисты — Рядом',
    'meta.login': 'Вход — Рядом',
    'meta.register': 'Регистрация — Рядом',
    'meta.forgot': 'Восстановление пароля — Рядом',
    'meta.payment': 'Оплата — Рядом',
    'meta.notFound': 'Страница не найдена — Рядом',

    'nav.menu': 'Открыть меню',
    'nav.about': 'О нас',
    'nav.plans': 'Тарифы',
    'nav.specialists': 'Специалисты',
    'nav.library': 'Библиотека',
    'nav.login': 'Вход',
    'nav.mySessions': 'Мои записи',
    'nav.logout': 'Выйти',
    'nav.chat': 'Чат с ИИ ➔',
    'lang.label': 'Язык',

    'footer.home': 'Главная',
    'footer.about': 'О нас',
    'footer.plans': 'Тарифы',
    'footer.specialists': 'Найти специалиста',
    'footer.chat': 'Чат поддержки',
    'footer.login': 'Личный кабинет',
    'footer.rights': 'Все права защищены.',

    'hero.title': 'Вас слышат и понимают.',
    'hero.titleHighlight': 'Рядом — вы в безопасности.',
    'hero.lead': 'Поделитесь с нами своими чувствами — мы всегда будем рядом. Выберите, с чего начать.',
    'hero.specialist.title': 'Сессия со специалистом',
    'hero.specialist.text': 'Видео-, аудио- или чат-сессия с психологом в удобное время.',
    'hero.ai.title': 'ИИ-помощник 24/7',
    'hero.ai.text': 'Поговорите прямо сейчас — анонимно и бесплатно.',

    'plans.title': 'Тарифы',
    'plans.subtitle': 'Выберите пакет, который подходит именно вам. Отменить подписку можно в любой момент.',
    'plans.popular': 'Популярный',
    'plans.cta': 'Начать сейчас',
    'plans.safety.name': 'Пакет «Безопасность»',
    'plans.safety.saving': 'Экономия 100 ₽ на первой сессии',
    'plans.safety.price': '299,99 ₽',
    'plans.safety.period': 'за первую неделю, затем 400 ₽ в неделю',
    'plans.hope.name': 'Пакет «Надежда»',
    'plans.hope.saving': 'Экономия 150 ₽',
    'plans.hope.price': '650 ₽',
    'plans.hope.period': 'оплата ежемесячно',
    'plans.satisfaction.name': 'Пакет «Удовлетворение»',
    'plans.satisfaction.saving': 'Экономия 380 ₽',
    'plans.satisfaction.price': '1119,99 ₽',
    'plans.satisfaction.period': 'оплата каждые 3 месяца',
    'plans.f.oneSession': 'Одна видео- или аудиосессия с психологом',
    'plans.f.fourSessions': '4 видео/аудио сессии в месяц',
    'plans.f.twelveSessions': '12 видео/аудио сессий за период',
    'plans.f.duration': 'Сессия поведенческой терапии — 45 минут',
    'plans.f.psychiatrist': 'Консультация психиатра — 15–30 минут',
    'plans.f.cancel': 'Отмена подписки в любое время',
    'plans.f.messaging': 'Переписка с терапевтом весь срок подписки',

    'about.title': 'Добро пожаловать в',
    'about.text': 'Мы — платформа психологической поддержки. Наша цель — сделать помощь доступной: удобные инструменты для общения со специалистами и ИИ-помощник, который всегда на связи.',
    'about.item1': 'Поддержка 24/7',
    'about.item2': 'Удобный и быстрый интерфейс',
    'about.item3': 'Полная конфиденциальность и безопасность',
    'about.cta': 'Выбрать специалиста',

    'library.title': 'Библиотека знаний',
    'library.subtitle': 'Полезные материалы о психологическом благополучии.',
    'library.search': 'Найти материалы…',
    'library.all': 'Все',
    'library.articles': 'Статьи',
    'library.videos': 'Видео',
    'library.files': 'Файлы',
    'library.empty': 'Ничего не найдено.',
    'library.stress.title': 'Как справляться со стрессом',
    'library.stress.text': 'Полезные советы и методы для снижения стресса.',
    'library.stress.link': 'Читать →',
    'library.meditation.title': 'Медитация для расслабления',
    'library.meditation.text': 'Короткое видео о том, как расслабиться и снять напряжение.',
    'library.meditation.link': 'Смотреть видео →',
    'library.guide.title': 'PDF: руководство по самопомощи',
    'library.guide.text': 'Бесплатное руководство ВОЗ/IASC по психологическому благополучию.',
    'library.guide.link': 'Скачать файл →',

    'specialists.title': 'Наши специалисты',
    'specialists.subtitle': 'Опытные психологи и психотерапевты, готовые помочь.',
    'specialists.prev': 'Назад',
    'specialists.next': 'Вперёд',
    'specialists.loading': 'Загрузка…',
    'specialists.empty': 'Специалисты скоро появятся.',
    'specialists.loadError': 'Не удалось загрузить специалистов: {error}',
    'specialists.all': 'Все специалисты',
    'doctor.experience': 'Опыт: {years}',
    'doctor.book': 'Записаться',

    'chat.title': 'ИИ-помощник «Рядом»',
    'chat.status': 'Онлайн · отвечает сразу',
    'chat.greeting': 'Привет! Как я могу вам помочь?',
    'chat.placeholder': 'Введите сообщение…',
    'chat.send': 'Отправить',
    'chat.typing': 'Печатает…',
    'chat.error': 'Не удалось получить ответ: {error}',
    'chat.disclaimer': 'ИИ-помощник не заменяет специалиста. В экстренной ситуации звоните 112.',

    'login.title': 'Вход в систему',
    'login.submit': 'Войти',
    'login.submitting': 'Входим…',
    'login.forgot': 'Забыли пароль?',
    'login.noAccount': 'Нет аккаунта?',
    'login.register': 'Зарегистрироваться',

    'form.name': 'Имя и фамилия',
    'form.email': 'Email',
    'form.phone': 'Номер телефона',
    'form.password': 'Пароль',
    'form.passwordHint': 'Минимум 8 символов',
    'form.confirmPassword': 'Подтвердите пароль',
    'form.gender': 'Пол',
    'form.male': 'Мужской',
    'form.female': 'Женский',
    'form.birthDate': 'Дата рождения',
    'form.optional': '(необязательно)',

    'register.title': 'Создать аккаунт',
    'register.submit': 'Зарегистрироваться',
    'register.submitting': 'Создаём аккаунт…',
    'register.haveAccount': 'Уже есть аккаунт?',
    'register.login': 'Войти',
    'register.mismatch': 'Пароли не совпадают',

    'forgot.title': 'Восстановление пароля',
    'forgot.text': 'Введите email, указанный при регистрации, и мы отправим инструкцию.',
    'forgot.submit': 'Отправить',
    'forgot.submitting': 'Отправляем…',
    'forgot.back': 'Вспомнили пароль? Войти',

    'booking.title': 'Выберите специалиста',
    'booking.subtitle': 'Запишитесь на сессию в удобное для вас время.',
    'booking.mySessions': 'Мои записи',
    'booking.loginToSee': 'Войдите, чтобы записаться и видеть свои сессии.',
    'booking.empty': 'У вас пока нет записей.',
    'booking.loadError': 'Не удалось загрузить записи: {error}',
    'booking.cancel': 'Отменить',
    'booking.cancelConfirm': 'Отменить эту запись?',
    'booking.cancelling': 'Отмена…',
    'booking.created': 'Запись создана! Специалист подтвердит её в ближайшее время.',
    'booking.modalTitle': 'Запись на сессию',
    'booking.startsAt': 'Дата и время',
    'booking.startsAtRequired': 'Укажите дату и время',
    'booking.format': 'Формат',
    'booking.note': 'Комментарий',
    'booking.notePlaceholder': 'Что бы вы хотели обсудить? (необязательно)',
    'booking.submit': 'Записаться',
    'booking.submitting': 'Записываем…',
    'booking.close': 'Закрыть',
    'booking.cancelBtn': 'Отмена',
    'format.video': 'Видео',
    'format.audio': 'Аудио',
    'format.chat': 'Чат',
    'status.pending': 'Ожидает подтверждения',
    'status.confirmed': 'Подтверждена',
    'status.cancelled': 'Отменена',
    'status.completed': 'Завершена',

    'payment.title': 'Оплата',
    'payment.notice': 'Демо-режим: оплата не проводится, данные карты не отправляются на сервер.',
    'payment.plan': 'Тариф',
    'payment.holder': 'Имя владельца карты',
    'payment.holderPlaceholder': 'IVAN IVANOV',
    'payment.card': 'Номер карты',
    'payment.expiry': 'Срок действия',
    'payment.cvv': 'CVV',
    'payment.submit': 'Оплатить',
    'payment.done': 'Демо-режим: оплата не проводилась, данные карты никуда не отправлялись. Подключение платёжной системы — следующий этап.',

    'notFound.text': 'Такой страницы нет. Возможно, она была перемещена.',
    'notFound.home': 'На главную',

    'error.network': 'Нет соединения с сервером',
    'error.generic': 'Ошибка запроса',
  },

  en: {
    brand: 'Ryadom',
    'meta.home': 'Ryadom — online support',
    'meta.chat': 'Support chat — Ryadom',
    'meta.booking': 'Specialists — Ryadom',
    'meta.login': 'Sign in — Ryadom',
    'meta.register': 'Sign up — Ryadom',
    'meta.forgot': 'Password recovery — Ryadom',
    'meta.payment': 'Payment — Ryadom',
    'meta.notFound': 'Page not found — Ryadom',

    'nav.menu': 'Open menu',
    'nav.about': 'About',
    'nav.plans': 'Plans',
    'nav.specialists': 'Specialists',
    'nav.library': 'Library',
    'nav.login': 'Sign in',
    'nav.mySessions': 'My sessions',
    'nav.logout': 'Sign out',
    'nav.chat': 'AI chat ➔',
    'lang.label': 'Language',

    'footer.home': 'Home',
    'footer.about': 'About us',
    'footer.plans': 'Plans',
    'footer.specialists': 'Find a specialist',
    'footer.chat': 'Support chat',
    'footer.login': 'My account',
    'footer.rights': 'All rights reserved.',

    'hero.title': 'You are heard and understood.',
    'hero.titleHighlight': 'With Ryadom you are safe.',
    'hero.lead': 'Share your feelings with us — we will always be by your side. Choose where to start.',
    'hero.specialist.title': 'Session with a specialist',
    'hero.specialist.text': 'Video, audio or chat session with a psychologist at a time that suits you.',
    'hero.ai.title': 'AI assistant 24/7',
    'hero.ai.text': 'Talk right now — anonymously and for free.',

    'plans.title': 'Plans',
    'plans.subtitle': 'Choose the package that suits you. You can cancel your subscription at any time.',
    'plans.popular': 'Popular',
    'plans.cta': 'Get started',
    'plans.safety.name': '“Safety” plan',
    'plans.safety.saving': 'Save 100 ₽ on your first session',
    'plans.safety.price': '299.99 ₽',
    'plans.safety.period': 'for the first week, then 400 ₽ per week',
    'plans.hope.name': '“Hope” plan',
    'plans.hope.saving': 'Save 150 ₽',
    'plans.hope.price': '650 ₽',
    'plans.hope.period': 'billed monthly',
    'plans.satisfaction.name': '“Satisfaction” plan',
    'plans.satisfaction.saving': 'Save 380 ₽',
    'plans.satisfaction.price': '1119.99 ₽',
    'plans.satisfaction.period': 'billed every 3 months',
    'plans.f.oneSession': 'One video or audio session with a psychologist',
    'plans.f.fourSessions': '4 video/audio sessions per month',
    'plans.f.twelveSessions': '12 video/audio sessions per term',
    'plans.f.duration': 'Behavioral therapy session — 45 minutes',
    'plans.f.psychiatrist': 'Psychiatrist consultation — 15–30 minutes',
    'plans.f.cancel': 'Cancel anytime',
    'plans.f.messaging': 'Messaging with your therapist during the whole term',

    'about.title': 'Welcome to',
    'about.text': 'We are a psychological support platform. Our goal is to make help accessible: convenient tools for talking to specialists and an AI assistant that is always online.',
    'about.item1': 'Support 24/7',
    'about.item2': 'Simple and fast interface',
    'about.item3': 'Full privacy and security',
    'about.cta': 'Choose a specialist',

    'library.title': 'Knowledge library',
    'library.subtitle': 'Helpful materials about mental well-being.',
    'library.search': 'Search materials…',
    'library.all': 'All',
    'library.articles': 'Articles',
    'library.videos': 'Videos',
    'library.files': 'Files',
    'library.empty': 'Nothing found.',
    'library.stress.title': 'How to cope with stress',
    'library.stress.text': 'Useful tips and techniques to reduce stress.',
    'library.stress.link': 'Read →',
    'library.meditation.title': 'Relaxation meditation',
    'library.meditation.text': 'A short video on how to relax and release tension.',
    'library.meditation.link': 'Watch video →',
    'library.guide.title': 'PDF: self-help guide',
    'library.guide.text': 'Free WHO/IASC guide on psychological well-being.',
    'library.guide.link': 'Download →',

    'specialists.title': 'Our specialists',
    'specialists.subtitle': 'Experienced psychologists and therapists ready to help.',
    'specialists.prev': 'Previous',
    'specialists.next': 'Next',
    'specialists.loading': 'Loading…',
    'specialists.empty': 'Specialists will appear soon.',
    'specialists.loadError': 'Could not load specialists: {error}',
    'specialists.all': 'All specialists',
    'doctor.experience': 'Experience: {years}',
    'doctor.book': 'Book',

    'chat.title': 'Ryadom AI assistant',
    'chat.status': 'Online · replies instantly',
    'chat.greeting': 'Hi! How can I help you?',
    'chat.placeholder': 'Type a message…',
    'chat.send': 'Send',
    'chat.typing': 'Typing…',
    'chat.error': 'Could not get a reply: {error}',
    'chat.disclaimer': 'The AI assistant does not replace a specialist. In an emergency call 112.',

    'login.title': 'Sign in',
    'login.submit': 'Sign in',
    'login.submitting': 'Signing in…',
    'login.forgot': 'Forgot password?',
    'login.noAccount': 'No account?',
    'login.register': 'Sign up',

    'form.name': 'Full name',
    'form.email': 'Email',
    'form.phone': 'Phone number',
    'form.password': 'Password',
    'form.passwordHint': 'At least 8 characters',
    'form.confirmPassword': 'Confirm password',
    'form.gender': 'Gender',
    'form.male': 'Male',
    'form.female': 'Female',
    'form.birthDate': 'Date of birth',
    'form.optional': '(optional)',

    'register.title': 'Create account',
    'register.submit': 'Sign up',
    'register.submitting': 'Creating account…',
    'register.haveAccount': 'Already have an account?',
    'register.login': 'Sign in',
    'register.mismatch': 'Passwords do not match',

    'forgot.title': 'Password recovery',
    'forgot.text': 'Enter the email you registered with and we will send instructions.',
    'forgot.submit': 'Send',
    'forgot.submitting': 'Sending…',
    'forgot.back': 'Remembered it? Sign in',

    'booking.title': 'Choose a specialist',
    'booking.subtitle': 'Book a session at a time that suits you.',
    'booking.mySessions': 'My sessions',
    'booking.loginToSee': 'Sign in to book and see your sessions.',
    'booking.empty': 'You have no sessions yet.',
    'booking.loadError': 'Could not load sessions: {error}',
    'booking.cancel': 'Cancel',
    'booking.cancelConfirm': 'Cancel this session?',
    'booking.cancelling': 'Cancelling…',
    'booking.created': 'Session booked! The specialist will confirm it soon.',
    'booking.modalTitle': 'Book a session',
    'booking.startsAt': 'Date and time',
    'booking.startsAtRequired': 'Please choose a date and time',
    'booking.format': 'Format',
    'booking.note': 'Comment',
    'booking.notePlaceholder': 'What would you like to discuss? (optional)',
    'booking.submit': 'Book',
    'booking.submitting': 'Booking…',
    'booking.close': 'Close',
    'booking.cancelBtn': 'Cancel',
    'format.video': 'Video',
    'format.audio': 'Audio',
    'format.chat': 'Chat',
    'status.pending': 'Awaiting confirmation',
    'status.confirmed': 'Confirmed',
    'status.cancelled': 'Cancelled',
    'status.completed': 'Completed',

    'payment.title': 'Payment',
    'payment.notice': 'Demo mode: no payment is made and card data is not sent to the server.',
    'payment.plan': 'Plan',
    'payment.holder': 'Cardholder name',
    'payment.holderPlaceholder': 'JOHN SMITH',
    'payment.card': 'Card number',
    'payment.expiry': 'Expiry date',
    'payment.cvv': 'CVV',
    'payment.submit': 'Pay',
    'payment.done': 'Demo mode: no payment was made and card data was not sent anywhere. Payment provider integration is the next step.',

    'notFound.text': 'This page does not exist. It may have been moved.',
    'notFound.home': 'Go home',

    'error.network': 'No connection to the server',
    'error.generic': 'Request failed',
  },

  ar: {
    brand: 'ريادوم',
    'meta.home': 'ريادوم — دعم نفسي أونلاين',
    'meta.chat': 'محادثة الدعم — ريادوم',
    'meta.booking': 'المختصون — ريادوم',
    'meta.login': 'تسجيل الدخول — ريادوم',
    'meta.register': 'إنشاء حساب — ريادوم',
    'meta.forgot': 'استعادة كلمة المرور — ريادوم',
    'meta.payment': 'الدفع — ريادوم',
    'meta.notFound': 'الصفحة غير موجودة — ريادوم',

    'nav.menu': 'فتح القائمة',
    'nav.about': 'من نحن',
    'nav.plans': 'الباقات',
    'nav.specialists': 'المختصون',
    'nav.library': 'المكتبة',
    'nav.login': 'تسجيل الدخول',
    'nav.mySessions': 'حجوزاتي',
    'nav.logout': 'تسجيل الخروج',
    'nav.chat': 'تحدث مع الذكاء الاصطناعي ⬅',
    'lang.label': 'اللغة',

    'footer.home': 'الرئيسية',
    'footer.about': 'من نحن',
    'footer.plans': 'الباقات',
    'footer.specialists': 'ابحث عن مختص',
    'footer.chat': 'محادثة الدعم',
    'footer.login': 'حسابي',
    'footer.rights': 'جميع الحقوق محفوظة.',

    'hero.title': 'نسمعك ونفهمك.',
    'hero.titleHighlight': 'مع ريادوم أنت في أمان.',
    'hero.lead': 'شاركنا مشاعرك، وسنكون دائمًا بجانبك. اختر من أين تبدأ.',
    'hero.specialist.title': 'جلسة مع مختص',
    'hero.specialist.text': 'جلسة فيديو أو صوت أو محادثة مع أخصائي نفسي في الوقت المناسب لك.',
    'hero.ai.title': 'مساعد ذكي على مدار الساعة',
    'hero.ai.text': 'تحدث الآن، بسرية تامة ومجانًا.',

    'plans.title': 'الباقات',
    'plans.subtitle': 'اختر الباقة المناسبة لك. يمكنك إلغاء الاشتراك في أي وقت.',
    'plans.popular': 'الأكثر طلبًا',
    'plans.cta': 'ابدأ الآن',
    'plans.safety.name': 'باقة «الأمان»',
    'plans.safety.saving': 'وفّر 100 روبل في الجلسة الأولى',
    'plans.safety.price': '299.99 ₽',
    'plans.safety.period': 'للأسبوع الأول، ثم 400 روبل أسبوعيًا',
    'plans.hope.name': 'باقة «الأمل»',
    'plans.hope.saving': 'وفّر 150 روبل',
    'plans.hope.price': '650 ₽',
    'plans.hope.period': 'تُدفع شهريًا',
    'plans.satisfaction.name': 'باقة «الرضا»',
    'plans.satisfaction.saving': 'وفّر 380 روبل',
    'plans.satisfaction.price': '1119.99 ₽',
    'plans.satisfaction.period': 'تُدفع كل 3 أشهر',
    'plans.f.oneSession': 'جلسة فيديو أو صوت واحدة مع أخصائي نفسي',
    'plans.f.fourSessions': '4 جلسات فيديو/صوت شهريًا',
    'plans.f.twelveSessions': '12 جلسة فيديو/صوت خلال مدة الاشتراك',
    'plans.f.duration': 'جلسة العلاج السلوكي — 45 دقيقة',
    'plans.f.psychiatrist': 'استشارة طبيب نفسي — 15–30 دقيقة',
    'plans.f.cancel': 'إلغاء الاشتراك في أي وقت',
    'plans.f.messaging': 'التواصل مع المعالج طوال مدة الاشتراك',

    'about.title': 'مرحبًا بك في',
    'about.text': 'نحن منصة للدعم النفسي. هدفنا أن نجعل المساعدة في متناول الجميع: أدوات سهلة للتواصل مع المختصين ومساعد ذكي متاح دائمًا.',
    'about.item1': 'دعم على مدار الساعة',
    'about.item2': 'واجهة سهلة وسريعة',
    'about.item3': 'سرية وأمان تامّان',
    'about.cta': 'اختر مختصًا',

    'library.title': 'مكتبة المعرفة',
    'library.subtitle': 'مواد مفيدة عن الصحة النفسية.',
    'library.search': 'ابحث في المواد…',
    'library.all': 'الكل',
    'library.articles': 'مقالات',
    'library.videos': 'فيديو',
    'library.files': 'ملفات',
    'library.empty': 'لا توجد نتائج.',
    'library.stress.title': 'كيف تتعامل مع التوتر',
    'library.stress.text': 'نصائح وأساليب مفيدة لتخفيف التوتر.',
    'library.stress.link': 'اقرأ ⬅',
    'library.meditation.title': 'تأمل للاسترخاء',
    'library.meditation.text': 'فيديو قصير عن كيفية الاسترخاء وتخفيف الضغط.',
    'library.meditation.link': 'شاهد الفيديو ⬅',
    'library.guide.title': 'PDF: دليل المساعدة الذاتية',
    'library.guide.text': 'دليل مجاني من منظمة الصحة العالمية للصحة النفسية.',
    'library.guide.link': 'تحميل الملف ⬅',

    'specialists.title': 'مختصونا',
    'specialists.subtitle': 'أخصائيون ومعالجون نفسيون ذوو خبرة جاهزون لمساعدتك.',
    'specialists.prev': 'السابق',
    'specialists.next': 'التالي',
    'specialists.loading': 'جارٍ التحميل…',
    'specialists.empty': 'سيظهر المختصون قريبًا.',
    'specialists.loadError': 'تعذّر تحميل المختصين: {error}',
    'specialists.all': 'كل المختصين',
    'doctor.experience': 'الخبرة: {years}',
    'doctor.book': 'احجز',

    'chat.title': 'مساعد ريادوم الذكي',
    'chat.status': 'متصل · يرد فورًا',
    'chat.greeting': 'مرحبًا! كيف يمكنني مساعدتك؟',
    'chat.placeholder': 'اكتب رسالتك…',
    'chat.send': 'إرسال',
    'chat.typing': 'يكتب…',
    'chat.error': 'تعذّر الحصول على رد: {error}',
    'chat.disclaimer': 'المساعد الذكي لا يغني عن المختص. في حالات الطوارئ اتصل بـ 112.',

    'login.title': 'تسجيل الدخول',
    'login.submit': 'دخول',
    'login.submitting': 'جارٍ الدخول…',
    'login.forgot': 'نسيت كلمة المرور؟',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.register': 'أنشئ حسابًا',

    'form.name': 'الاسم الكامل',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.password': 'كلمة المرور',
    'form.passwordHint': '8 أحرف على الأقل',
    'form.confirmPassword': 'تأكيد كلمة المرور',
    'form.gender': 'الجنس',
    'form.male': 'ذكر',
    'form.female': 'أنثى',
    'form.birthDate': 'تاريخ الميلاد',
    'form.optional': '(اختياري)',

    'register.title': 'إنشاء حساب',
    'register.submit': 'تسجيل',
    'register.submitting': 'جارٍ إنشاء الحساب…',
    'register.haveAccount': 'لديك حساب بالفعل؟',
    'register.login': 'سجّل الدخول',
    'register.mismatch': 'كلمتا المرور غير متطابقتين',

    'forgot.title': 'استعادة كلمة المرور',
    'forgot.text': 'أدخل البريد الإلكتروني المسجّل وسنرسل لك التعليمات.',
    'forgot.submit': 'إرسال',
    'forgot.submitting': 'جارٍ الإرسال…',
    'forgot.back': 'تذكرت كلمة المرور؟ سجّل الدخول',

    'booking.title': 'اختر مختصًا',
    'booking.subtitle': 'احجز جلسة في الوقت المناسب لك.',
    'booking.mySessions': 'حجوزاتي',
    'booking.loginToSee': 'سجّل الدخول لتتمكن من الحجز ورؤية جلساتك.',
    'booking.empty': 'ليست لديك حجوزات بعد.',
    'booking.loadError': 'تعذّر تحميل الحجوزات: {error}',
    'booking.cancel': 'إلغاء',
    'booking.cancelConfirm': 'هل تريد إلغاء هذا الحجز؟',
    'booking.cancelling': 'جارٍ الإلغاء…',
    'booking.created': 'تم الحجز! سيؤكده المختص قريبًا.',
    'booking.modalTitle': 'حجز جلسة',
    'booking.startsAt': 'التاريخ والوقت',
    'booking.startsAtRequired': 'اختر التاريخ والوقت',
    'booking.format': 'نوع الجلسة',
    'booking.note': 'ملاحظة',
    'booking.notePlaceholder': 'ما الذي تود مناقشته؟ (اختياري)',
    'booking.submit': 'احجز',
    'booking.submitting': 'جارٍ الحجز…',
    'booking.close': 'إغلاق',
    'booking.cancelBtn': 'تراجع',
    'format.video': 'فيديو',
    'format.audio': 'صوت',
    'format.chat': 'محادثة',
    'status.pending': 'بانتظار التأكيد',
    'status.confirmed': 'مؤكد',
    'status.cancelled': 'ملغى',
    'status.completed': 'مكتمل',

    'payment.title': 'الدفع',
    'payment.notice': 'وضع تجريبي: لا يتم أي دفع ولا تُرسل بيانات البطاقة إلى الخادم.',
    'payment.plan': 'الباقة',
    'payment.holder': 'اسم حامل البطاقة',
    'payment.holderPlaceholder': 'AHMED ALI',
    'payment.card': 'رقم البطاقة',
    'payment.expiry': 'تاريخ الانتهاء',
    'payment.cvv': 'CVV',
    'payment.submit': 'ادفع',
    'payment.done': 'وضع تجريبي: لم يتم أي دفع ولم تُرسل بيانات البطاقة إلى أي مكان. ربط بوابة الدفع هو الخطوة التالية.',

    'notFound.text': 'هذه الصفحة غير موجودة. ربما تم نقلها.',
    'notFound.home': 'العودة للرئيسية',

    'error.network': 'لا يوجد اتصال بالخادم',
    'error.generic': 'فشل الطلب',
  },
};

export const LANGS = [
  { code: 'ar', label: 'العربية', dir: 'rtl', locale: 'ar' },
  { code: 'en', label: 'English', dir: 'ltr', locale: 'en-GB' },
  { code: 'ru', label: 'Русский', dir: 'ltr', locale: 'ru-RU' },
];
const DEFAULT_LANG = 'ru';
const STORAGE_KEY = 'ryadom_lang';

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (dictionaries[saved]) return saved;
  } catch {
    /* storage unavailable */
  }
  const fromBrowser = (navigator.languages || [navigator.language || ''])
    .map((l) => l.slice(0, 2).toLowerCase())
    .find((l) => dictionaries[l]);
  return fromBrowser || DEFAULT_LANG;
}

let current = detectLang();

export const getLang = () => current;
export const getLocale = () => LANGS.find((l) => l.code === current).locale;

export function t(key, params = {}) {
  const template = dictionaries[current][key] ?? dictionaries[DEFAULT_LANG][key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => (params[name] ?? `{${name}}`));
}

const YEAR_FORMS = {
  ru: { one: '{n} год', few: '{n} года', many: '{n} лет', other: '{n} года' },
  en: { one: '{n} year', other: '{n} years' },
  ar: { zero: '{n} سنة', one: 'سنة واحدة', two: 'سنتان', few: '{n} سنوات', many: '{n} سنة', other: '{n} سنة' },
};

export function yearsLabel(n) {
  const forms = YEAR_FORMS[current];
  const rule = new Intl.PluralRules(getLocale()).select(n);
  return (forms[rule] || forms.other).replace('{n}', n);
}

// Picks a translated field from records that carry { translations: { en: {...}, ar: {...} } }.
export function localized(record, field) {
  return record?.translations?.[current]?.[field] || record?.[field] || '';
}

export function applyTranslations(root = document) {
  const lang = LANGS.find((l) => l.code === current);
  document.documentElement.lang = lang.code;
  document.documentElement.dir = lang.dir;

  const titleKey = document.documentElement.dataset.title;
  if (titleKey) document.title = t(titleKey);

  root.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));
  root.querySelectorAll('[data-i18n-aria-label]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
}

export function setLang(code) {
  if (!dictionaries[code] || code === current) return;
  current = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage unavailable: choice lasts for this page only */
  }
  applyTranslations();
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: code } }));
}

applyTranslations();
