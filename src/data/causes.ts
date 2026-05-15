import food from "@/assets/cause-food.jpg";
import education from "@/assets/cause-education.jpg";
import water from "@/assets/cause-water.jpg";
import women from "@/assets/cause-women.jpg";
import community from "@/assets/cause-community.jpg";
import orphan from "@/assets/cause-orphan.jpg";
import relief from "@/assets/cause-relief.jpg";

export type PriceTier = {
  label: string;
  amount: number | null; // null = "ask / depends"
  note?: string;
};

export type Cause = {
  slug: string;
  title: string;
  description: string;
  details: string;
  image: string;
  category: string;
  tiers: PriceTier[];
};

export const CURRENCY = "EUR";
export const CURRENCY_SYMBOL = "€";

export const causes: Cause[] = [
  {
    slug: "water-wells",
    title: "Construction of Water Wells",
    category: "Water & Sanitation",
    description: "Drilling boreholes and traditional wells to deliver safe, clean drinking water to thirsty villages.",
    details:
      "Millions of families still walk hours each day for water that often makes them sick. We drill boreholes with hand pumps and build simple shaduf-style wells where appropriate, so every home has dependable access to clean water. Each completed well is named in honour of the donor or a loved one and serves on average 500–1,000 people for decades.",
    image: water,
    tiers: [
      { label: "Borehole", amount: 700 },
      { label: "Traditional water well (shaduf)", amount: 450 },
    ],
  },
  {
    slug: "orphan-care",
    title: "Care for Orphans",
    category: "Children",
    description: "Sponsorship covering food, clothing, education, healthcare and emotional support for orphaned children.",
    details:
      "Our orphan care programme provides each sponsored child with monthly food rations, school fees and uniforms, medical check-ups, clothing for Eid, and a caring guardian who reports on their wellbeing. Sponsors receive regular updates and letters, building a lasting bond that restores dignity and hope.",
    image: orphan,
    tiers: [{ label: "Any amount helps — give what you can", amount: null }],
  },
  {
    slug: "ramadan-iftar",
    title: "Ramadan Iftar Projects",
    category: "Ramadan",
    description: "Hot Iftar meals served to fasting families throughout the blessed month.",
    details:
      "Every Ramadan we serve hot Iftar meals at mosques and community centres so struggling families can break their fast with dignity and share in the joy of Ramadan. Just €1 feeds one person — €100 feeds an entire community gathering.",
    image: food,
    tiers: [
      { label: "1 Iftar meal", amount: 1 },
      { label: "100 Iftar meals", amount: 100 },
    ],
  },
  {
    slug: "qurban",
    title: "Qurban (Udhiyah)",
    category: "Qurban",
    description: "Eid al-Adha sacrifices delivered as fresh meat to widows, orphans and displaced families.",
    details:
      "We perform your Qurban on the days of Eid al-Adha in countries of greatest need, dividing the meat into family portions and delivering it to those who may not taste meat all year. Choose the animal that matches your intention.",
    image: community,
    tiers: [
      { label: "Cow (shared)", amount: 300 },
      { label: "Sheep", amount: 60 },
      { label: "Goat", amount: 65 },
    ],
  },
  {
    slug: "mosque-construction",
    title: "Construction & Rehabilitation of Mosques",
    category: "Mosques",
    description: "Building new mosques and restoring damaged ones so communities have a place to pray, learn and gather.",
    details:
      "From small village masjids to larger Jami' mosques with ablution facilities and madrasa space, we partner with local communities to design, build and refurbish houses of worship. Each mosque becomes ongoing Sadaqah Jariyah for the donor — reward continues with every prayer offered inside.",
    image: community,
    tiers: [
      { label: "Small mosque", amount: 6000 },
      { label: "Large mosque", amount: 10000 },
    ],
  },
  {
    slug: "orphanage-construction",
    title: "Construction of Orphanages",
    category: "Children",
    description: "Building safe, loving homes — dormitories, classrooms, clinics and play areas for children without parents.",
    details:
      "Our orphanages provide dormitories, classrooms, dining halls, clinics and play areas — a complete home where orphaned children grow up safe, educated and loved. Costs depend on size, location and capacity; contact us for a tailored proposal.",
    image: orphan,
    tiers: [{ label: "Cost depends on size and location — contact us", amount: null }],
  },
  {
    slug: "school-construction",
    title: "Construction of Schools",
    category: "Education",
    description: "Constructing classrooms, libraries and learning facilities for children in underserved communities.",
    details:
      "We build full schools and extend existing ones with classrooms, libraries, toilets and teacher housing. Curricula combine national education with Qur'anic studies. Costs depend on the project scope; contact us to sponsor a classroom, a wing, or an entire school.",
    image: education,
    tiers: [{ label: "Cost depends on scope — contact us", amount: null }],
  },
  {
    slug: "quran-distribution",
    title: "Quran Distribution",
    category: "Da'wah",
    description: "Printing and distributing copies of the Holy Qur'an to mosques, madrasas and new Muslims worldwide.",
    details:
      "We supply printed Mushafs and translations in local languages to mosques, schools, prisons and reverts. Every recitation from a distributed copy becomes continuous reward for the donor.",
    image: women,
    tiers: [{ label: "1 Qur'an", amount: 4 }],
  },
  {
    slug: "tree-planting",
    title: "Tree Planting",
    category: "Environment",
    description: "Plant fruit and shade trees that nourish families and restore the land — Sadaqah Jariyah for years to come.",
    details:
      "Every tree planted feeds families, cools villages and absorbs carbon. The Prophet ﷺ said: 'If a Muslim plants a tree, whatever is eaten from it is charity for him.' At just €3 per tree, this is one of the easiest and most rewarding forms of ongoing Sadaqah.",
    image: community,
    tiers: [{ label: "1 tree", amount: 3 }],
  },
  {
    slug: "zakat",
    title: "Zakat",
    category: "Zakat",
    description: "Fulfil your annual Zakat obligation — 100% distributed to eligible recipients under strict Shariah guidelines.",
    details:
      "Zakat is the third pillar of Islam — 2.5% of qualifying wealth held for one lunar year, paid annually to the eight categories of recipients defined in the Qur'an (Surah At-Tawbah 9:60). Your Zakat is kept in a separate account and distributed only to eligible recipients: the poor, the needy, those in debt, travellers in distress and others. Calculate your Zakat or give any amount you owe.",
    image: relief,
    tiers: [{ label: "Pay any amount of Zakat owed", amount: null }],
  },
  {
    slug: "food-urgent-appeals",
    title: "Food Provision & Urgent Appeals",
    category: "Crisis Response",
    description: "Rapid food, shelter and medical relief for families hit by conflict, drought, floods and famine.",
    details:
      "When disaster strikes — Gaza, Sudan, Yemen, Somalia, earthquake and flood zones — we deliver emergency food parcels, clean water, blankets, hygiene kits and medical aid within days. Year-round we also run hot meal kitchens and monthly food packs for the chronically food-insecure.",
    image: relief,
    tiers: [{ label: "Any amount helps — give what you can", amount: null }],
  },
];
