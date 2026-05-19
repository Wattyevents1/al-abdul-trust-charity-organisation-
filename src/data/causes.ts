import food from "@/assets/cause-food.jpg";
import education from "@/assets/cause-education.jpg";
import medical from "@/assets/cause-medical.jpg";
import water from "@/assets/cause-water.jpg";
import women from "@/assets/cause-women.jpg";
import community from "@/assets/cause-community.jpg";
import orphan from "@/assets/cause-orphan.jpg";
import relief from "@/assets/cause-relief.jpg";

export type Cause = {
  slug: string;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  category: string;
  highlights: { stat: string; label: string }[];
  faqs: { q: string; a: string }[];
  gallery: string[];
};

export const causes: Cause[] = [
  {
    slug: "water-wells",
    title: "Construction of Water Wells",
    category: "Water & Sanitation",
    description: "We drill and construct deep-water boreholes and hand-dug wells in drought-stricken villages so families no longer walk hours for unsafe water. Each well serves up to 500 people daily, dramatically reducing waterborne disease, freeing children — especially girls — to attend school, and giving communities a sustainable source of clean drinking, cooking and irrigation water. Every well is named in honour of the donor or a loved one and maintained by a trained local committee.",
    image: water,
    raised: 88400,
    goal: 120000,
    highlights: [
      { stat: "500+", label: "People served per well" },
      { stat: "20+ yrs", label: "Average well lifespan" },
      { stat: "82%", label: "Drop in waterborne illness" },
      { stat: "300+", label: "Wells completed to date" },
    ],
    faqs: [
      { q: "How long does it take to build a well?", a: "From survey to completion, most wells take 4–8 weeks depending on terrain, depth and weather conditions." },
      { q: "Can I dedicate a well to a loved one?", a: "Yes. Every well carries a plaque with the donor's chosen name or that of a loved one, and we email you photos and GPS coordinates on completion." },
      { q: "Who maintains the well afterwards?", a: "We train a local water committee and provide spare parts and tools so the community owns and maintains the well long-term." },
    ],
    gallery: [water, community, education, relief],
  },
  {
    slug: "orphan-care",
    title: "Care for Orphans",
    category: "Children",
    description: "We sponsor orphaned and vulnerable children with monthly stipends covering food, clothing, healthcare, schooling and emotional support. Through our kafala (sponsorship) programme, each child is placed with a vetted foster family or guardian and assigned a caseworker who tracks their wellbeing, academic progress and Islamic education. Sponsors receive regular updates, photos and letters from their sponsored child.",
    image: orphan,
    raised: 41200,
    goal: 80000,
    highlights: [
      { stat: "1,200+", label: "Orphans actively sponsored" },
      { stat: "$45/mo", label: "Sponsors a child fully" },
      { stat: "98%", label: "School enrolment rate" },
      { stat: "12", label: "Countries reached" },
    ],
    faqs: [
      { q: "What does my monthly sponsorship cover?", a: "Food, clothing, schooling, healthcare, Islamic education and a caseworker who visits the child regularly." },
      { q: "Will I receive updates about my sponsored child?", a: "Yes — you receive a welcome pack, then progress reports, photos and letters at least twice a year." },
      { q: "Can I sponsor for a one-off period?", a: "Yes. While monthly sponsorship is most impactful, we accept one-off or short-term sponsorships too." },
    ],
    gallery: [orphan, education, food, community],
  },
  {
    slug: "ramadan-iftar",
    title: "Ramadan Iftar Project",
    category: "Ramadan",
    description: "During the blessed month of Ramadan, we serve hot, nutritious iftar meals to fasting families, orphans, widows, refugees and the elderly across our communities. We also distribute Ramadan food parcels containing rice, flour, oil, dates, sugar and other essentials to last a family the full month. Your donation feeds the fasting and earns the reward of their fast — without diminishing theirs.",
    image: food,
    raised: 32500,
    goal: 60000,
    highlights: [
      { stat: "150,000+", label: "Iftar meals served yearly" },
      { stat: "$5", label: "Feeds one fasting person" },
      { stat: "$75", label: "Family food parcel (30 days)" },
      { stat: "18", label: "Countries served" },
    ],
    faqs: [
      { q: "When are iftars distributed?", a: "Every day of Ramadan, just before maghrib, across our partner mosques, refugee camps and community kitchens." },
      { q: "What goes in a Ramadan food parcel?", a: "Staples such as rice, flour, lentils, oil, sugar, dates, tea and milk powder — calibrated to feed a family of 5–7 for the full month." },
      { q: "Can I donate before Ramadan?", a: "Yes — early donations help us bulk-purchase and pre-position parcels, which makes every pound go further." },
    ],
    gallery: [food, relief, community, orphan],
  },
  {
    slug: "qurban-sadaq",
    title: "Qurban & Sadaqah",
    category: "Udhiyah",
    description: "Fulfil your Qurban (Udhiyah) obligation during Eid al-Adha by sponsoring the slaughter of a sheep, goat, cow or camel share. The fresh meat is distributed to orphans, widows, refugees and the poorest families — many of whom only taste meat during Eid. We handle every step from purchase to humane slaughter to distribution, and send you confirmation once your Qurban is complete.",
    image: relief,
    raised: 25800,
    goal: 50000,
    highlights: [
      { stat: "10,000+", label: "Qurban shares distributed" },
      { stat: "100%", label: "Sharia-compliant slaughter" },
      { stat: "3 days", label: "Distributed within Eid" },
      { stat: "20+", label: "Countries served" },
    ],
    faqs: [
      { q: "Which animals can I sponsor?", a: "Sheep and goats (one share each), or a share in a cow or camel (one-seventh per person)." },
      { q: "How do you ensure it is Sharia-compliant?", a: "Trained, certified butchers carry out Dhabihah slaughter under scholarly supervision in each country." },
      { q: "Will I get confirmation?", a: "Yes — you receive an email confirmation, and where possible photos, once your Qurban is completed." },
    ],
    gallery: [relief, food, community, orphan],
  },
  {
    slug: "mosque-construction",
    title: "Construction & Rehabilitation of Mosques",
    category: "Mosques",
    description: "We build new masjids and restore damaged ones in villages that have no proper place of worship. Each project includes a prayer hall, ablution facilities, a minaret and often an attached madrasa for Qur'an classes. Building a mosque is an ongoing sadaqah jariyah — you continue to receive reward for every prayer, dhikr and lesson held within its walls long after it is complete.",
    image: community,
    raised: 64200,
    goal: 110000,
    highlights: [
      { stat: "45+", label: "Mosques built or restored" },
      { stat: "Sadaqah", label: "Jariyah — ongoing reward" },
      { stat: "Madrasa", label: "Included in most builds" },
      { stat: "$25k", label: "Avg. full mosque build" },
    ],
    faqs: [
      { q: "Can I contribute to a mosque rather than fund a whole one?", a: "Absolutely — any amount goes into the next scheduled build or restoration project." },
      { q: "Are mosques named after donors?", a: "Yes — donors funding a complete masjid may dedicate it to themselves or a loved one." },
      { q: "Do you also restore old mosques?", a: "Yes. Restoring an existing masjid is often faster and reaches communities sooner than a new build." },
    ],
    gallery: [community, education, water, orphan],
  },
  {
    slug: "orphanage-construction",
    title: "Construction of Orphanages",
    category: "Children",
    description: "We build safe, modern orphanage homes that provide shelter, nutritious meals, medical care, schooling and a loving family environment for children who have lost their parents. Each orphanage is staffed with trained carers, teachers and counsellors, and includes dormitories, classrooms, a clinic, a kitchen and play areas — giving every child a chance to grow with dignity and faith.",
    image: orphan,
    raised: 54300,
    goal: 150000,
    highlights: [
      { stat: "8", label: "Orphanages operational" },
      { stat: "600+", label: "Children housed" },
      { stat: "24/7", label: "Care, schooling & medical" },
      { stat: "Lifelong", label: "Support until independence" },
    ],
    faqs: [
      { q: "Who lives in the orphanage?", a: "Children who have lost one or both parents and have no relative able to care for them, prioritised by need." },
      { q: "What schooling do the children receive?", a: "Both secular and Islamic education, on-site or at partner schools, with tutoring support." },
      { q: "Can donors visit?", a: "Yes — verified donors can arrange supervised visits via our country offices." },
    ],
    gallery: [orphan, education, community, food],
  },
  {
    slug: "school-construction",
    title: "Construction of Schools",
    category: "Education",
    description: "We construct fully-equipped schools in underserved villages, complete with classrooms, libraries, toilets, clean water, desks, books and trained teachers. Our schools combine quality secular education with Islamic studies, opening the doors of literacy and opportunity to thousands of children — particularly girls — who would otherwise have no path out of poverty.",
    image: education,
    raised: 62100,
    goal: 100000,
    highlights: [
      { stat: "32", label: "Schools built" },
      { stat: "11,000+", label: "Children enrolled" },
      { stat: "55%", label: "Girls in enrolment" },
      { stat: "Free", label: "Tuition for all pupils" },
    ],
    faqs: [
      { q: "Do you employ local teachers?", a: "Yes — we hire and train teachers from the surrounding community to keep schools sustainable." },
      { q: "Is education free for families?", a: "Yes. Tuition, books and basic uniforms are provided so no child is turned away for cost." },
      { q: "Can I sponsor a specific classroom or library?", a: "Yes — speak to our team to dedicate a named classroom, library or computer lab." },
    ],
    gallery: [education, community, orphan, water],
  },
  {
    slug: "quran-distribution",
    title: "Qur'an Distribution",
    category: "Dawah",
    description: "We print and distribute beautifully bound copies of the Holy Qur'an — along with translations and tafsir — to mosques, madrasas, prisons, new Muslims and families who cannot afford one. Every copy you sponsor becomes a continuous sadaqah jariyah, earning reward for you with every verse recited from it, insha'Allah.",
    image: community,
    raised: 18400,
    goal: 40000,
    highlights: [
      { stat: "50,000+", label: "Qur'ans distributed" },
      { stat: "$10", label: "Sponsors one Mushaf" },
      { stat: "12", label: "Languages of translation" },
      { stat: "Sadaqah", label: "Jariyah for every recitation" },
    ],
    faqs: [
      { q: "Where are the Qur'ans printed?", a: "Mostly in regional print houses near the recipient communities to keep costs low and quality high." },
      { q: "Can I dedicate copies in someone's name?", a: "Yes — each batch can carry a dedication sticker in honour of a loved one." },
      { q: "Do you include translations?", a: "Yes — we print Arabic-only Mushafs as well as bilingual editions in English, French, Swahili, Urdu and more." },
    ],
    gallery: [community, education, orphan, food],
  },
  {
    slug: "food-provision",
    title: "Food Provision & Urgent Appeals",
    category: "Emergency Relief",
    description: "We respond rapidly to famines, floods, earthquakes and conflict zones with emergency food parcels, hot meals, clean water, blankets and medical aid. Our food provision programme also delivers monthly grocery packs year-round to widows, the elderly and food-insecure families. When disaster strikes, your donation puts food in hungry hands within days.",
    image: relief,
    raised: 47600,
    goal: 90000,
    highlights: [
      { stat: "72 hrs", label: "Average emergency response" },
      { stat: "2.3M+", label: "Meals delivered" },
      { stat: "$60", label: "Monthly family food pack" },
      { stat: "25+", label: "Crisis zones reached" },
    ],
    faqs: [
      { q: "How quickly do you respond to emergencies?", a: "We aim to have first food and water shipments on the ground within 72 hours of a major incident." },
      { q: "How do you choose who receives parcels?", a: "Local partners identify the most vulnerable — widows, elderly, disabled and displaced families — and we verify on the ground." },
      { q: "Can my donation go to a specific crisis?", a: "Yes — when an urgent appeal is active, you can ring-fence your gift to that response." },
    ],
    gallery: [relief, food, medical, women],
  },
];
