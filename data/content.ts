// كل محتوى الموقع في مكان واحد — عدّلي هنا فقط (en = الإنجليزي، ar = العربي)
import type { Locale } from "@/lib/i18n";

export const projectGradients = [
  "linear-gradient(135deg,#f7a8c0,#e26d8e 55%,#b14d86)",
  "linear-gradient(135deg,#c9b8ff,#9b87f5 50%,#6f5bd6)",
  "linear-gradient(135deg,#ffd0b8,#f4a98a 50%,#e2789a)",
  "linear-gradient(135deg,#ffc6dc,#c49cf2 60%,#8d7cf0)",
  "linear-gradient(135deg,#ffb5a0,#ef8fae 55%,#9b87f5)",
];

/* ---------------------------------------------------------------
   المشاريع — الأجزاء التقنية مشتركة بين اللغتين، والنصوص مترجمة تحت
   قصة كل مشروع (صفحة /work/slug) مسودة، عدّلي التفاصيل لتطابق ما بنيتِه فعلاً
   --------------------------------------------------------------- */
// الترتيب نفس ترتيب المشاريع في الـ CV
const projectBase = [
  {
    slug: "flight-reservations",
    motif: "plane",
    year: "2024",
    tags: ["Laravel", "MySQL", "Reservations"],
    stack: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript"],
    schema: [
      { table: "airlines", fields: ["name", "code"] },
      { table: "cities", fields: ["name"] },
      { table: "routes", fields: ["from_city_id →", "to_city_id →"] },
      { table: "flights", fields: ["airline_id →", "route_id →", "departs_at", "arrives_at", "seats_total"] },
      { table: "passengers", fields: ["name", "phone", "passport_no"] },
      { table: "reservations", fields: ["flight_id →", "passenger_id →", "seat_no", "status"] },
    ],
  },
  {
    slug: "hotel-management",
    motif: "hotel",
    year: "2024",
    tags: ["Laravel", "MySQL", "Admin"],
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    schema: [
      { table: "room_types", fields: ["name", "price", "capacity"] },
      { table: "rooms", fields: ["number", "floor", "status", "room_type_id →"] },
      { table: "guests", fields: ["name", "phone", "national_id"] },
      { table: "bookings", fields: ["guest_id →", "room_id →", "check_in", "check_out", "status"] },
      { table: "users", fields: ["name", "email", "role"] },
    ],
  },
  {
    slug: "school-system",
    motif: "school",
    year: "2025",
    tags: ["Laravel", "Blade", "Records"],
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    schema: [
      { table: "classes", fields: ["name", "grade", "year"] },
      { table: "students", fields: ["name", "birth_date", "guardian_phone", "class_id →"] },
      { table: "subjects", fields: ["name"] },
      { table: "marks", fields: ["student_id →", "subject_id →", "term", "score"] },
      { table: "users", fields: ["name", "email", "role"] },
    ],
  },
  {
    slug: "invoice-system",
    motif: "invoice",
    year: "2025",
    tags: ["Laravel", "Blade", "Finance"],
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    schema: [
      { table: "clients", fields: ["name", "email", "phone"] },
      { table: "products", fields: ["name", "price"] },
      { table: "invoices", fields: ["number", "client_id →", "issued_at", "due_at", "status", "total"] },
      { table: "invoice_items", fields: ["invoice_id →", "product_id →", "quantity", "unit_price"] },
    ],
  },
  {
    slug: "smart-pharmacy",
    motif: "pharmacy",
    year: "2026",
    tags: ["Laravel", "API", "Sanctum"],
    stack: ["Laravel", "PHP", "MySQL", "Sanctum", "Postman", "Git"],
    schema: [
      { table: "users", fields: ["name", "email", "phone", "password", "role"] },
      { table: "categories", fields: ["name"] },
      { table: "medicines", fields: ["name", "active_ingredient", "manufacturer", "strength", "price", "stock", "needs_prescription", "category_id →"] },
      { table: "orders", fields: ["user_id →", "status", "total"] },
      { table: "order_items", fields: ["order_id →", "medicine_id →", "quantity", "price"] },
    ],
  },
  {
    slug: "posts-studio",
    motif: "post",
    year: "2024",
    tags: ["Laravel", "CRUD", "Blade"],
    stack: ["Laravel", "PHP", "MySQL", "Blade"],
    schema: [
      { table: "users", fields: ["name", "email", "password"] },
      { table: "categories", fields: ["name", "slug"] },
      { table: "posts", fields: ["user_id →", "category_id →", "title", "body", "image", "published_at"] },
    ],
  },
  {
    slug: "movie-corner",
    motif: "film",
    year: "2023",
    tags: ["PHP", "UI", "MySQL"],
    stack: ["PHP", "MySQL", "HTML & CSS", "JavaScript"],
    schema: [
      { table: "movies", fields: ["title", "year", "rating", "poster", "story"] },
      { table: "genres", fields: ["name"] },
      { table: "movie_genre", fields: ["movie_id →", "genre_id →"] },
    ],
  },
];

type ProjectText = {
  title: string;
  kind: string;
  desc: string;
  role: string;
  duration: string;
  team: string;
  overview: string;
  challenge: string;
  approach: string;
  features: { title: string; text: string }[];
  steps: string[];
  learned: string[];
};

export type Project = (typeof projectBase)[number] & ProjectText;

const projectText: Record<Locale, Record<string, ProjectText>> = {
  en: {
    "hotel-management": {
      title: "Hotel Management System",
      kind: "Management System",
      desc: "Web application for managing rooms, guests and hotel-related information.",
      role: "Full-stack developer",
      duration: "~6 weeks",
      team: "Solo project",
      overview:
        "A back-office system for a hotel front desk. Staff can see which rooms are free, check guests in and out, and keep a clean history of every stay — all in one place instead of paper registers and spreadsheets.",
      challenge:
        "Front-desk work depends on knowing, at a glance, which rooms are free tonight. When bookings, guest details and room states live in different places, double-bookings and lost records happen easily.",
      approach:
        "I started from the database: rooms, room types, guests and bookings, and the relationships between them. Once the data was right, the screens followed naturally — a dashboard of today's arrivals and departures, then management screens for every entity, protected by staff roles.",
      features: [
        { title: "Room availability", text: "Live room status (free, occupied, cleaning) with filters by type, floor and date." },
        { title: "Bookings & check-in", text: "Create a booking, check the guest in and out, and keep each stay's dates and status." },
        { title: "Guest records", text: "A searchable guest list with contact details and the full history of their stays." },
        { title: "Roles & permissions", text: "Admins manage rooms and prices; receptionists handle bookings and guests." },
      ],
      steps: [
        "Mapped the front-desk workflow and listed the entities it needs.",
        "Designed the tables and wrote Laravel migrations with foreign keys.",
        "Built Eloquent models, relationships and resource controllers.",
        "Added authentication and role-based access for staff.",
        "Polished the Blade views and tested everyday booking scenarios.",
      ],
      learned: [
        "Preventing overlapping bookings with date-range validation.",
        "Using Eloquent relationships (belongsTo / hasMany) in a real workflow.",
        "A good schema makes every screen that comes after it simpler.",
      ],
    },
    "flight-reservations": {
      title: "Flight Management & Reservation System",
      kind: "Booking System",
      desc: "System for managing flights and booking reservations in Syria, including flight, airline and passenger data.",
      role: "Backend & database",
      duration: "~5 weeks",
      team: "Solo project",
      overview:
        "A system for domestic routes between Syrian cities. Staff manage airlines and flight schedules, while passengers search a route and a date, pick a flight and reserve a seat — and the system keeps seat counts accurate.",
      challenge:
        "Seats are limited, and two passengers must never end up with the same seat. Schedules also change, so every reservation has to stay linked to the right flight.",
      approach:
        "I modelled cities, routes and flights separately so a route can have many flights over time. Reservations are saved inside a database transaction that checks the remaining seats first, so the count can't go below zero.",
      features: [
        { title: "Route & date search", text: "Choose departure and arrival cities and a date to see the matching flights." },
        { title: "Seat reservation", text: "Reserve a seat on a flight with live checks on how many seats remain." },
        { title: "Passenger records", text: "Passenger details are stored once and reused for later bookings." },
        { title: "Airlines & flights", text: "Admins manage airlines, flights and schedules; reservations can be cancelled or updated." },
      ],
      steps: [
        "Sketched the booking flow from search to confirmation.",
        "Designed the routes / flights / reservations tables.",
        "Built the Laravel models, relationships and controllers.",
        "Wrapped reservations in transactions to protect seat counts.",
        "Built the search and booking pages and tested edge cases.",
      ],
      learned: [
        "Why transactions matter when many users touch the same data.",
        "Eloquent's query builder keeps queries safe from SQL injection by default.",
        "Separating a route from its flights keeps the data flexible.",
      ],
    },
    "school-system": {
      title: "School System",
      kind: "Management System",
      desc: "Management system for school data such as students, classes and records.",
      role: "Full-stack developer",
      duration: "~4 weeks",
      team: "Solo project",
      overview:
        "A management system for a school office: students, classes, subjects and marks in one place, so staff can find any student's record in seconds instead of searching through paper files.",
      challenge:
        "School data is connected — every student belongs to a class, every mark belongs to a student, a subject and a term. Keeping it consistent by hand leads to duplicated students and missing marks.",
      approach:
        "I modelled classes, students, subjects and marks as related tables, then built Blade screens for each one with validation, search and filters, and an admin login to protect the records.",
      features: [
        { title: "Student records", text: "Add, edit and search students with their class and guardian contact details." },
        { title: "Classes", text: "Organise students into classes per grade and school year." },
        { title: "Marks", text: "Record marks per subject and term, and view a student's full record." },
        { title: "Staff access", text: "Authentication so only school staff can view and change the data." },
      ],
      steps: [
        "Listed the school's entities and how they relate.",
        "Designed the tables and wrote Laravel migrations.",
        "Built Eloquent models, relationships and controllers.",
        "Created the Blade views with validation, search and filters.",
        "Added authentication and tested everyday scenarios.",
      ],
      learned: [
        "Modelling one-to-many and many-to-many relations in a real domain.",
        "Validation rules keep records clean from the very first entry.",
        "Search and filters matter as much as the data itself.",
      ],
    },
    "invoice-system": {
      title: "Invoice System",
      kind: "Business Tool",
      desc: "Application for creating, tracking and managing invoices.",
      role: "Full-stack developer",
      duration: "~3 weeks",
      team: "Solo project",
      overview:
        "An application for creating invoices from a list of clients and products, tracking which ones are paid or overdue, and keeping every invoice easy to find later.",
      challenge:
        "Invoices need to be accurate: totals must always match their line items, and the status of each invoice has to be clear at a glance.",
      approach:
        "I separated invoices from their line items so an invoice can hold any number of products. Totals are calculated from the items when the invoice is saved, and each invoice carries a status that drives the filters on the main screen.",
      features: [
        { title: "Create invoices", text: "Pick a client, add products and quantities, and the total is calculated automatically." },
        { title: "Status tracking", text: "Mark invoices as paid, unpaid or overdue, and filter the list by status." },
        { title: "Clients & products", text: "Manage the client list and product prices used in invoices." },
        { title: "Invoice details", text: "A clear details page for every invoice with its items and totals." },
      ],
      steps: [
        "Defined the invoice flow from draft to paid.",
        "Designed the clients, products, invoices and items tables.",
        "Built the controllers and Blade views for full CRUD.",
        "Added total calculation and status filters.",
        "Tested invoices with different items and edge cases.",
      ],
      learned: [
        "Master–detail data: an invoice and its line items.",
        "Calculating totals on the server keeps the numbers trustworthy.",
        "Clear statuses make a list of records much easier to manage.",
      ],
    },
    "smart-pharmacy": {
      title: "Smart Pharmacy",
      kind: "Pharmacy Platform",
      desc: "Pharmacy management web application for medicines and orders.",
      role: "Back-end developer",
      duration: "In progress",
      team: "Team project",
      overview:
        "A pharmacy platform where users browse medicines, check their details and place orders, with a Laravel back-end that serves the data through a secure API.",
      challenge:
        "Pharmacy data is sensitive and detailed: every medicine has an active ingredient, strength, price and stock, some need a prescription, and every request has to come from an authenticated user.",
      approach:
        "I set up the Laravel back-end from scratch, starting with the authentication system: register and login APIs with clear validation, using Laravel Sanctum to issue tokens. Every case was tested in Postman, and each feature was built on its own Git branch and merged into main.",
      features: [
        { title: "Token authentication", text: "Register and login APIs that return a Sanctum token, with clear validation errors." },
        { title: "Medicines catalogue", text: "Each medicine with its active ingredient, manufacturer, strength, price and stock." },
        { title: "Orders", text: "Users place orders for medicines, and each order keeps its items and status." },
        { title: "Tested API", text: "A Postman collection covering success and error cases for every endpoint." },
      ],
      steps: [
        "Created the Laravel project, configured .env and the database.",
        "Pushed the setup to GitHub and opened a feature branch.",
        "Built the users migration and model.",
        "Added register and login APIs with validation and Sanctum tokens.",
        "Tested every case in Postman and merged the work into main.",
      ],
      learned: [
        "Building token-based authentication with Laravel Sanctum.",
        "Testing an API thoroughly with Postman — including the error cases.",
        "A clean Git workflow: feature branches, small commits, then merge.",
      ],
    },
    "posts-studio": {
      title: "Posts Management Website",
      kind: "Content Platform",
      desc: "Platform for creating and managing posts with full CRUD operations.",
      role: "Full-stack developer",
      duration: "~3 weeks",
      team: "Solo project",
      overview:
        "A small content platform where users write, edit and publish posts, organise them into categories and browse everything in a clean, paginated feed.",
      challenge:
        "CRUD sounds simple, but doing it cleanly means validating every input, giving clear feedback, and making sure people can only edit their own posts.",
      approach:
        "I followed Laravel's MVC conventions closely: resource routes, a single controller per resource, Blade layouts and components for shared UI, and policies so authors can only change what they wrote.",
      features: [
        { title: "Write & edit", text: "Create, update and delete posts with validation and friendly error messages." },
        { title: "Categories", text: "Organise posts into categories and filter the feed by them." },
        { title: "Images", text: "Attach a cover image to a post, stored with Laravel's file storage." },
        { title: "Ownership", text: "Authentication plus policies so only the author can edit or delete a post." },
      ],
      steps: [
        "Set up authentication and the base Blade layout.",
        "Created the posts and categories migrations and models.",
        "Built resource routes and controllers for full CRUD.",
        "Added validation, flash messages and pagination.",
        "Protected edit and delete actions with policies.",
      ],
      learned: [
        "Laravel conventions save time when you follow them closely.",
        "Blade components keep repeated UI in one place.",
        "Policies are a clean way to express \"who can do what\".",
      ],
    },
    "movie-corner": {
      title: "Movie Website",
      kind: "Showcase Website",
      desc: "Website for browsing movies and their details.",
      role: "Design & development",
      duration: "~3 weeks",
      team: "Solo project",
      overview:
        "A movie showcase where visitors browse films by genre, search by title and open a details page with the story, year, rating and poster.",
      challenge:
        "This project was as much about presentation as data: a catalogue of films should feel inviting, load quickly and stay easy to browse on a phone.",
      approach:
        "I designed the pages first — a poster grid and a cinematic details view — then built the PHP pages and MySQL queries behind them, with a many-to-many link between movies and genres.",
      features: [
        { title: "Browse by genre", text: "A poster grid that can be filtered by one or more genres." },
        { title: "Search", text: "Find a film quickly by typing part of its title." },
        { title: "Details page", text: "Poster, story, release year and rating presented in a calm, cinematic layout." },
        { title: "Responsive UI", text: "Hand-written CSS that adapts from large screens down to phones." },
      ],
      steps: [
        "Designed the look of the grid and the details page.",
        "Created the movies and genres tables with a pivot table.",
        "Wrote the PHP pages and queries for listing and filtering.",
        "Added search and the details view.",
        "Tuned the layout for phones and tablets.",
      ],
      learned: [
        "Many-to-many relationships and pivot tables.",
        "Designing the interface first makes the data needs clearer.",
        "Small CSS details change how a whole site feels.",
      ],
    },
  },
  ar: {
    "hotel-management": {
      title: "نظام إدارة الفنادق",
      kind: "نظام إدارة",
      desc: "تطبيق ويب لإدارة الغرف والنزلاء والمعلومات المتعلقة بالفندق.",
      role: "مطوّرة Full‑stack",
      duration: "حوالي 6 أسابيع",
      team: "مشروع فردي",
      overview:
        "نظام إداري لمكتب الاستقبال في فندق. يرى الموظفون الغرف المتاحة، ويسجّلون دخول النزلاء وخروجهم، ويحتفظون بسجلّ واضح لكل إقامة — كل ذلك في مكان واحد بدلاً من الدفاتر الورقية وجداول Excel.",
      challenge:
        "يعتمد عمل الاستقبال على معرفة الغرف المتاحة الليلة بنظرة واحدة. وعندما تتوزّع الحجوزات وبيانات النزلاء وحالة الغرف في أماكن مختلفة، يصبح الحجز المزدوج وضياع السجلات أمراً سهل الحدوث.",
      approach:
        "بدأت من قاعدة البيانات: الغرف وأنواعها والنزلاء والحجوزات، والعلاقات بينها. وعندما أصبحت البيانات صحيحة جاءت الشاشات بشكل طبيعي — لوحة بوصول ومغادرة اليوم، ثم شاشات إدارة لكل كيان، محمية بصلاحيات الموظفين.",
      features: [
        { title: "توفّر الغرف", text: "حالة الغرف لحظياً (متاحة، مشغولة، قيد التنظيف) مع فلترة حسب النوع والطابق والتاريخ." },
        { title: "الحجز وتسجيل الدخول", text: "إنشاء حجز، وتسجيل دخول النزيل وخروجه، وحفظ تواريخ وحالة كل إقامة." },
        { title: "سجلات النزلاء", text: "قائمة نزلاء قابلة للبحث مع بيانات التواصل وتاريخ إقاماتهم كاملاً." },
        { title: "الأدوار والصلاحيات", text: "المدير يدير الغرف والأسعار، وموظف الاستقبال يتولّى الحجوزات والنزلاء." },
      ],
      steps: [
        "رسمت سير عمل الاستقبال وحدّدت الكيانات التي يحتاجها.",
        "صمّمت الجداول وكتبت Laravel migrations مع المفاتيح الأجنبية.",
        "بنيت نماذج Eloquent والعلاقات و resource controllers.",
        "أضفت المصادقة والتحكم بالصلاحيات حسب دور الموظف.",
        "حسّنت واجهات Blade واختبرت سيناريوهات الحجز اليومية.",
      ],
      learned: [
        "منع تداخل الحجوزات بالتحقق من نطاقات التواريخ.",
        "استخدام علاقات Eloquent (belongsTo / hasMany) في سير عمل حقيقي.",
        "المخطط الجيد لقاعدة البيانات يجعل كل شاشة بعده أبسط.",
      ],
    },
    "flight-reservations": {
      title: "نظام إدارة وحجز الرحلات الجوية",
      kind: "نظام حجز",
      desc: "نظام لإدارة الرحلات وحجوزاتها في سوريا، يشمل بيانات الرحلات وشركات الطيران والمسافرين.",
      role: "الخلفية وقواعد البيانات",
      duration: "حوالي 5 أسابيع",
      team: "مشروع فردي",
      overview:
        "نظام للرحلات الداخلية بين المدن السورية. يدير الموظفون شركات الطيران ومواعيد الرحلات، ويبحث المسافر عن خط وتاريخ، ويختار رحلة ويحجز مقعداً — بينما يحافظ النظام على دقة عدد المقاعد.",
      challenge:
        "المقاعد محدودة، ولا يجوز أن يحصل مسافران على المقعد نفسه. كما أن المواعيد تتغيّر، فيجب أن يبقى كل حجز مرتبطاً بالرحلة الصحيحة.",
      approach:
        "فصلت المدن والخطوط والرحلات في جداول مستقلة، بحيث يمكن لخط واحد أن يملك رحلات كثيرة عبر الزمن. ويُحفظ الحجز داخل transaction يتحقق أولاً من المقاعد المتبقية، فلا يمكن أن ينزل العدد تحت الصفر.",
      features: [
        { title: "البحث بالخط والتاريخ", text: "اختيار مدينة الانطلاق والوصول والتاريخ لعرض الرحلات المطابقة." },
        { title: "حجز المقاعد", text: "حجز مقعد على رحلة مع تحقق فوري من عدد المقاعد المتبقية." },
        { title: "سجلات المسافرين", text: "تُحفظ بيانات المسافر مرة واحدة وتُستخدم في حجوزاته اللاحقة." },
        { title: "شركات الطيران والرحلات", text: "يدير المدير شركات الطيران والرحلات والمواعيد، ويمكن إلغاء الحجوزات أو تعديلها." },
      ],
      steps: [
        "رسمت مسار الحجز من البحث حتى التأكيد.",
        "صمّمت جداول الخطوط والرحلات والحجوزات.",
        "بنيت نماذج Laravel والعلاقات والـ controllers.",
        "وضعت الحجوزات داخل transactions لحماية عدد المقاعد.",
        "بنيت صفحات البحث والحجز واختبرت الحالات الحدّية.",
      ],
      learned: [
        "أهمية الـ transactions عندما يتعامل مستخدمون كثر مع البيانات نفسها.",
        "الـ query builder في Eloquent يحمي الاستعلامات من SQL injection افتراضياً.",
        "فصل الخط عن رحلاته يجعل البيانات أكثر مرونة.",
      ],
    },
    "school-system": {
      title: "النظام المدرسي",
      kind: "نظام إدارة",
      desc: "نظام لإدارة بيانات المدرسة مثل الطلاب والصفوف والسجلات.",
      role: "مطوّرة Full‑stack",
      duration: "حوالي 4 أسابيع",
      team: "مشروع فردي",
      overview:
        "نظام إدارة لمكتب المدرسة: الطلاب والصفوف والمواد والعلامات في مكان واحد، بحيث يصل الموظف إلى سجل أي طالب خلال ثوانٍ بدلاً من البحث في الملفات الورقية.",
      challenge:
        "بيانات المدرسة مترابطة — فكل طالب ينتمي إلى صف، وكل علامة ترتبط بطالب ومادة وفصل دراسي. والحفاظ على اتساقها يدوياً يؤدي إلى تكرار الطلاب وضياع العلامات.",
      approach:
        "صمّمت الصفوف والطلاب والمواد والعلامات كجداول مترابطة، ثم بنيت شاشات Blade لكل منها مع التحقق والبحث والفلترة، وتسجيل دخول للمدير لحماية السجلات.",
      features: [
        { title: "سجلات الطلاب", text: "إضافة الطلاب وتعديلهم والبحث عنهم مع صفّهم وبيانات التواصل مع ولي الأمر." },
        { title: "الصفوف", text: "تنظيم الطلاب في صفوف حسب المرحلة والعام الدراسي." },
        { title: "العلامات", text: "تسجيل العلامات لكل مادة وفصل، وعرض سجل الطالب كاملاً." },
        { title: "صلاحيات الموظفين", text: "مصادقة بحيث لا يطّلع على البيانات ويعدّلها إلا موظفو المدرسة." },
      ],
      steps: [
        "حدّدت كيانات المدرسة والعلاقات بينها.",
        "صمّمت الجداول وكتبت Laravel migrations.",
        "بنيت نماذج Eloquent والعلاقات والـ controllers.",
        "أنشأت واجهات Blade مع التحقق والبحث والفلترة.",
        "أضفت المصادقة واختبرت السيناريوهات اليومية.",
      ],
      learned: [
        "نمذجة علاقات one-to-many و many-to-many في مجال حقيقي.",
        "قواعد التحقق تحافظ على نظافة السجلات منذ أول إدخال.",
        "البحث والفلترة لا يقلّان أهمية عن البيانات نفسها.",
      ],
    },
    "invoice-system": {
      title: "نظام الفواتير",
      kind: "أداة أعمال",
      desc: "تطبيق لإنشاء الفواتير ومتابعتها وإدارتها.",
      role: "مطوّرة Full‑stack",
      duration: "حوالي 3 أسابيع",
      team: "مشروع فردي",
      overview:
        "تطبيق لإنشاء الفواتير من قائمة العملاء والمنتجات، ومتابعة المدفوع منها والمتأخر، وإبقاء كل فاتورة سهلة الوصول لاحقاً.",
      challenge:
        "الفواتير يجب أن تكون دقيقة: فالمجموع يجب أن يطابق بنودها دائماً، وحالة كل فاتورة يجب أن تكون واضحة بنظرة واحدة.",
      approach:
        "فصلت الفاتورة عن بنودها بحيث تحتوي أي عدد من المنتجات. يُحسب المجموع من البنود عند حفظ الفاتورة، ولكل فاتورة حالة تعتمد عليها الفلترة في الشاشة الرئيسية.",
      features: [
        { title: "إنشاء الفواتير", text: "اختيار العميل وإضافة المنتجات والكميات، ويُحسب المجموع تلقائياً." },
        { title: "متابعة الحالة", text: "تحديد الفاتورة كمدفوعة أو غير مدفوعة أو متأخرة، وفلترة القائمة حسب الحالة." },
        { title: "العملاء والمنتجات", text: "إدارة قائمة العملاء وأسعار المنتجات المستخدمة في الفواتير." },
        { title: "تفاصيل الفاتورة", text: "صفحة واضحة لكل فاتورة مع بنودها ومجموعها." },
      ],
      steps: [
        "حدّدت مسار الفاتورة من المسودة حتى الدفع.",
        "صمّمت جداول العملاء والمنتجات والفواتير والبنود.",
        "بنيت الـ controllers وواجهات Blade لعمليات CRUD كاملة.",
        "أضفت حساب المجموع والفلترة حسب الحالة.",
        "اختبرت فواتير ببنود مختلفة وحالات حدّية.",
      ],
      learned: [
        "بيانات الرأس والتفاصيل (master–detail): الفاتورة وبنودها.",
        "حساب المجاميع على الخادم يجعل الأرقام موثوقة.",
        "الحالات الواضحة تجعل إدارة قائمة السجلات أسهل بكثير.",
      ],
    },
    "smart-pharmacy": {
      title: "الصيدلية الذكية",
      kind: "منصة صيدلية",
      desc: "تطبيق ويب لإدارة الصيدلية والأدوية والطلبات.",
      role: "مطوّرة Back-end",
      duration: "قيد التطوير",
      team: "مشروع جماعي",
      overview:
        "منصة صيدلية يتصفّح فيها المستخدمون الأدوية ويطّلعون على تفاصيلها ويقدّمون طلباتهم، مع خلفية مبنية بـ Laravel تقدّم البيانات عبر API آمن.",
      challenge:
        "بيانات الصيدلية حساسة ومفصّلة: لكل دواء مادة فعّالة وتركيز وسعر ومخزون، وبعض الأدوية تحتاج وصفة طبية، وكل طلب يجب أن يأتي من مستخدم مُصادَق عليه.",
      approach:
        "جهّزت خلفية Laravel من البداية، وبدأت بنظام المصادقة: واجهتا تسجيل حساب وتسجيل دخول مع تحقق واضح، واستخدمت Laravel Sanctum لإصدار التوكن. اختبرت كل حالة عبر Postman، وبنيت كل ميزة على فرع Git مستقل ثم دمجتها في main.",
      features: [
        { title: "المصادقة بالتوكن", text: "واجهتا تسجيل حساب ودخول تُرجعان توكن Sanctum مع رسائل تحقق واضحة." },
        { title: "كتالوج الأدوية", text: "كل دواء مع مادته الفعّالة والشركة المصنّعة والتركيز والسعر والمخزون." },
        { title: "الطلبات", text: "يطلب المستخدم الأدوية، ويحتفظ كل طلب ببنوده وحالته." },
        { title: "API مُختبَر", text: "مجموعة Postman تغطي حالات النجاح والخطأ لكل endpoint." },
      ],
      steps: [
        "أنشأت مشروع Laravel وجهّزت ملف .env وقاعدة البيانات.",
        "رفعت التهيئة على GitHub وأنشأت فرعاً للميزة.",
        "بنيت migration ونموذج المستخدمين.",
        "أضفت واجهتي التسجيل والدخول مع التحقق وتوكن Sanctum.",
        "اختبرت كل الحالات عبر Postman ودمجت العمل في main.",
      ],
      learned: [
        "بناء مصادقة تعتمد على التوكن باستخدام Laravel Sanctum.",
        "اختبار الـ API بشكل كامل عبر Postman — بما في ذلك حالات الخطأ.",
        "سير عمل Git نظيف: فروع للميزات، و commits صغيرة، ثم الدمج.",
      ],
    },
    "posts-studio": {
      title: "موقع إدارة المنشورات",
      kind: "منصة محتوى",
      desc: "منصة لإنشاء المنشورات وإدارتها مع عمليات CRUD كاملة.",
      role: "مطوّرة Full‑stack",
      duration: "حوالي 3 أسابيع",
      team: "مشروع فردي",
      overview:
        "منصة محتوى صغيرة يكتب فيها المستخدمون منشوراتهم ويعدّلونها وينشرونها، وينظّمونها في تصنيفات، ويتصفّحون كل شيء في صفحة مرتبة ومقسّمة.",
      challenge:
        "تبدو عمليات CRUD بسيطة، لكن تنفيذها بشكل نظيف يعني التحقق من كل مدخل، وإعطاء رسائل واضحة، والتأكد من أن كل شخص لا يعدّل إلا منشوراته.",
      approach:
        "التزمت بأعراف MVC في Laravel: resource routes، و controller واحد لكل مورد، وقوالب ومكوّنات Blade للواجهة المشتركة، و policies بحيث لا يغيّر الكاتب إلا ما كتبه.",
      features: [
        { title: "الكتابة والتعديل", text: "إنشاء المنشورات وتعديلها وحذفها مع تحقق ورسائل خطأ واضحة." },
        { title: "التصنيفات", text: "تنظيم المنشورات في تصنيفات وفلترة الصفحة حسبها." },
        { title: "الصور", text: "إرفاق صورة غلاف بالمنشور، تُخزَّن عبر نظام الملفات في Laravel." },
        { title: "الملكية", text: "مصادقة و policies بحيث لا يعدّل المنشور أو يحذفه إلا كاتبه." },
      ],
      steps: [
        "جهّزت المصادقة وقالب Blade الأساسي.",
        "أنشأت migrations ونماذج المنشورات والتصنيفات.",
        "بنيت resource routes و controllers لعمليات CRUD كاملة.",
        "أضفت التحقق ورسائل التنبيه وتقسيم الصفحات.",
        "حميت عمليات التعديل والحذف باستخدام policies.",
      ],
      learned: [
        "اتباع أعراف Laravel بدقة يوفّر الكثير من الوقت.",
        "مكوّنات Blade تجمع الواجهة المتكررة في مكان واحد.",
        "الـ policies طريقة نظيفة للتعبير عن «من يستطيع فعل ماذا».",
      ],
    },
    "movie-corner": {
      title: "موقع الأفلام",
      kind: "موقع عرض",
      desc: "موقع لتصفّح الأفلام وتفاصيلها.",
      role: "التصميم والتطوير",
      duration: "حوالي 3 أسابيع",
      team: "مشروع فردي",
      overview:
        "موقع لعرض الأفلام يتصفّح فيه الزوار الأفلام حسب النوع، ويبحثون بالعنوان، ويفتحون صفحة تفاصيل فيها القصة والسنة والتقييم والملصق.",
      challenge:
        "كان هذا المشروع عن طريقة العرض بقدر ما هو عن البيانات: يجب أن يكون كتالوج الأفلام جذاباً، سريع التحميل، وسهل التصفح على الهاتف.",
      approach:
        "صمّمت الصفحات أولاً — شبكة ملصقات وصفحة تفاصيل بطابع سينمائي — ثم بنيت صفحات PHP واستعلامات MySQL خلفها، مع علاقة many-to-many بين الأفلام والأنواع.",
      features: [
        { title: "التصفح حسب النوع", text: "شبكة ملصقات يمكن فلترتها حسب نوع أو أكثر." },
        { title: "البحث", text: "الوصول إلى الفيلم بسرعة بكتابة جزء من عنوانه." },
        { title: "صفحة التفاصيل", text: "الملصق والقصة وسنة الإصدار والتقييم في تصميم هادئ وسينمائي." },
        { title: "واجهة متجاوبة", text: "CSS مكتوب يدوياً يتكيّف من الشاشات الكبيرة حتى الهواتف." },
      ],
      steps: [
        "صمّمت شكل شبكة الأفلام وصفحة التفاصيل.",
        "أنشأت جداول الأفلام والأنواع مع جدول وسيط.",
        "كتبت صفحات PHP والاستعلامات للعرض والفلترة.",
        "أضفت البحث وصفحة التفاصيل.",
        "ضبطت التصميم ليناسب الهواتف والأجهزة اللوحية.",
      ],
      learned: [
        "علاقات many-to-many والجداول الوسيطة (pivot tables).",
        "تصميم الواجهة أولاً يجعل احتياجات البيانات أوضح.",
        "تفاصيل CSS الصغيرة تغيّر إحساس الموقع بالكامل.",
      ],
    },
  },
};

/* ---------------------------------------------------------------
   باقي المحتوى
   --------------------------------------------------------------- */
const shared = {
  email: "shahedrina48@gmail.com",
  phone: "+963 946 591 255",
  github: "github.com/ShahedRina",
  // ملف الـ CV موجود في public/cv — عند تحديثه استبدلي الملف بنفس الاسم
  cv: "/cv/Shahed-Al-Rina-CV.pdf",
  available: true,
};

const en = {
  profile: {
    ...shared,
    name: "Shahed Al Rina",
    firstName: "Shahed",
    lastName: "Al Rina",
    role: "Web Developer",
    stack: "PHP & Laravel",
    tagline:
      "I grow ideas into web applications — thoughtful, database-driven systems built with PHP & Laravel.",
    summary:
      "Web developer and fourth-year Informatics Engineering student at the University of Aleppo, specializing in back-end development with PHP and Laravel. I've built 5+ database-driven web applications, including management and reservation systems, with hands-on experience in CRUD operations, authentication and relational database design.",
    location: "Aleppo, Syria",
  },
  stats: [
    { value: 5, suffix: "+", label: "Web apps built" },
    { value: 4, suffix: "th", label: "Year of engineering" },
    { value: 3, suffix: "", label: "Certified courses" },
  ],
  skillGroups: [
    { title: "Back-End", hue: "rose", items: ["PHP", "Laravel", "MVC", "Eloquent ORM", "Blade", "Authentication", "C#"] },
    { title: "Database", hue: "lilac", items: ["MySQL", "SQL", "Relational Design", "Migrations", "CRUD"] },
    { title: "Front-End & Tools", hue: "peach", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git & GitHub", "Advanced Excel"] },
  ],
  experience: [
    {
      period: "2024 — 2025",
      title: "Freelance Web Developer",
      place: "Self-employed · Aleppo",
      points: [
        "Developed 5+ websites and web-based management systems using PHP, Laravel and MySQL.",
        "Designed relational database schemas and implemented full CRUD functionality across projects.",
        "Built admin dashboards and user authentication for management and reservation systems.",
        "Delivered projects both independently and as part of a team, from requirements to deployment.",
      ],
    },
    {
      period: "2022 — 2023",
      title: "Data Entry & Reports Specialist",
      place: "Al Wasit Library · Aleppo",
      points: ["Entered, organized and maintained accurate records; prepared periodic reports using Microsoft Excel."],
    },
  ],
  education: [
    { year: "2023 — Now", title: "B.Sc. in Informatics Engineering", place: "University of Aleppo · 4th year" },
    { year: "2022", title: "Diploma in Software Engineering", place: "Aleppo" },
  ],
  courses: [
    { title: "Laravel Web Development", where: "2024" },
    { title: "C# Programming & Database Management", where: "CPC Center · 2022" },
    { title: "Advanced Excel", where: "Edraak · 2022" },
  ],
  softSkills: [
    "Problem Solving",
    "Teamwork",
    "Independent Work",
    "Time Management",
    "Communication",
    "Continuous Learning",
  ],
  languages: [
    { name: "Arabic", level: 5 },
    { name: "English", level: 3 },
  ],
};

const ar: typeof en = {
  profile: {
    ...shared,
    name: "شهد الرينا",
    firstName: "شهد",
    lastName: "الرينا",
    role: "مطوّرة ويب",
    stack: "PHP و Laravel",
    tagline: "أزرع الأفكار لتنمو تطبيقاتِ ويب — أنظمة مدروسة تعتمد على قواعد البيانات، مبنية بـ PHP و Laravel.",
    summary:
      "مطوّرة ويب وطالبة في السنة الرابعة بالهندسة المعلوماتية في جامعة حلب، متخصّصة في البرمجة الخلفية باستخدام PHP و Laravel. بنيت أكثر من 5 تطبيقات ويب تعتمد على قواعد البيانات، منها أنظمة إدارة وحجوزات، مع خبرة عملية في عمليات CRUD والمصادقة وتصميم قواعد البيانات العلائقية.",
    location: "حلب، سوريا",
  },
  stats: [
    { value: 5, suffix: "+", label: "تطبيقات ويب منجزة" },
    { value: 4, suffix: "", label: "سنوات في الهندسة" },
    { value: 3, suffix: "", label: "دورات معتمدة" },
  ],
  skillGroups: [
    { title: "البرمجة الخلفية", hue: "rose", items: ["PHP", "Laravel", "MVC", "Eloquent ORM", "Blade", "المصادقة", "C#‎"] },
    { title: "قواعد البيانات", hue: "lilac", items: ["MySQL", "SQL", "التصميم العلائقي", "Migrations", "CRUD"] },
    { title: "الواجهات والأدوات", hue: "peach", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git و GitHub", "Excel المتقدّم"] },
  ],
  experience: [
    {
      period: "2024 — 2025",
      title: "مطوّرة ويب مستقلة",
      place: "عمل حر · حلب",
      points: [
        "طوّرت أكثر من 5 مواقع وأنظمة إدارة تعمل على الويب باستخدام PHP و Laravel و MySQL.",
        "صمّمت مخططات قواعد بيانات علائقية ونفّذت عمليات CRUD كاملة في المشاريع.",
        "بنيت لوحات تحكم للمدراء ومصادقة المستخدمين لأنظمة الإدارة والحجوزات.",
        "أنجزت المشاريع بشكل مستقل وضمن فريق، من جمع المتطلبات حتى النشر.",
      ],
    },
    {
      period: "2022 — 2023",
      title: "أخصائية إدخال بيانات وتقارير",
      place: "مكتبة الوسيط · حلب",
      points: ["إدخال السجلات وتنظيمها والحفاظ على دقتها، وإعداد تقارير دورية باستخدام Microsoft Excel."],
    },
  ],
  education: [
    { year: "2023 — الآن", title: "إجازة في الهندسة المعلوماتية", place: "جامعة حلب · السنة الرابعة" },
    { year: "2022", title: "دبلوم في هندسة البرمجيات", place: "حلب" },
  ],
  courses: [
    { title: "تطوير الويب باستخدام Laravel", where: "2024" },
    { title: "برمجة C#‎ وإدارة قواعد البيانات", where: "مركز CPC · 2022" },
    { title: "Excel المتقدّم", where: "إدراك · 2022" },
  ],
  softSkills: ["حل المشكلات", "العمل الجماعي", "العمل المستقل", "إدارة الوقت", "التواصل", "التعلّم المستمر"],
  languages: [
    { name: "العربية", level: 5 },
    { name: "الإنجليزية", level: 3 },
  ],
};

const content = { en, ar };

export function getContent(locale: Locale) {
  const projects: Project[] = projectBase.map((p) => ({ ...p, ...projectText[locale][p.slug] }));
  return { ...content[locale], projects };
}

export type Content = ReturnType<typeof getContent>;
export const projectSlugs = projectBase.map((p) => p.slug);
