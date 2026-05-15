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
  details: string;
  image: string;
  raised: number;
  goal: number;
  category: string;
};

export const causes: Cause[] = [
  {
    slug: "water-wells", title: "Construction of Water Wells", category: "Water & Sanitation",
    description: "Drilling wells and installing hand pumps to deliver safe, clean drinking water to thirsty villages.",
    details: "Millions of families still walk hours each day for water that often makes them sick. We drill shallow and deep boreholes, install hand pumps and solar-powered systems, and build community taps so every home has dependable access to clean water. Each completed well is named in honour of the donor or a loved one and serves on average 500–1,000 people for decades.",
    image: water, raised: 88400, goal: 120000,
  },
  {
    slug: "orphan-care", title: "Care for Orphans", category: "Children",
    description: "Monthly sponsorship covering food, clothing, education, healthcare and emotional support for orphaned children.",
    details: "Our orphan care programme provides each sponsored child with monthly food rations, school fees and uniforms, medical check-ups, clothing for Eid, and a caring guardian who reports on their wellbeing. Sponsors receive regular updates, photos and letters from their child, building a lasting bond that restores dignity and hope.",
    image: orphan, raised: 41200, goal: 80000,
  },
  {
    slug: "ramadan-iftar", title: "Ramadan Iftar Projects", category: "Ramadan",
    description: "Hot Iftar meals and Suhoor food packs distributed to fasting families throughout the blessed month.",
    details: "Every Ramadan we serve hot Iftar meals at mosques and community centres and deliver dry-ration food parcels (rice, flour, oil, dates, sugar, lentils) sufficient to feed a family for the entire month. Your gift lets a struggling family break their fast with dignity and share in the joy of Ramadan.",
    image: food, raised: 32500, goal: 60000,
  },
  {
    slug: "qurban-sadaqah", title: "Qurban & Sadaqah", category: "Qurban",
    description: "Udhiyah/Qurbani sacrifices and Sadaqah distributions delivered as fresh meat to the poorest families.",
    details: "We perform your Qurban on the days of Eid al-Adha in countries of greatest need, dividing the meat into family portions and delivering it to widows, orphans and displaced families who may not taste meat all year. Sadaqah and Aqiqah orders are accepted year-round and fulfilled to the highest Islamic standards.",
    image: community, raised: 27800, goal: 55000,
  },
  {
    slug: "mosque-construction", title: "Construction & Rehabilitation of Mosques", category: "Mosques",
    description: "Building new mosques and restoring damaged ones so communities have a place to pray, learn and gather.",
    details: "From small village masjids to larger Jami' mosques with attached madrasas and ablution facilities, we partner with local communities to design, build and refurbish houses of worship. Projects include roofing, carpets, lighting, water tanks and minarets — each mosque becomes ongoing Sadaqah Jariyah for the donor.",
    image: community, raised: 46200, goal: 90000,
  },
  {
    slug: "orphanage-construction", title: "Construction of Orphanages", category: "Children",
    description: "Building safe, loving homes that provide shelter, schooling and family for children without parents.",
    details: "Our orphanages provide dormitories, classrooms, dining halls, clinics and play areas — a complete home where orphaned children grow up safe, educated and loved. Each facility is staffed with trained caregivers, teachers and a resident imam, raising the next generation of confident, faith-rooted young people.",
    image: orphan, raised: 38900, goal: 110000,
  },
  {
    slug: "school-construction", title: "Construction of Schools", category: "Education",
    description: "Constructing classrooms, libraries and learning facilities for children in underserved communities.",
    details: "We build full schools and extend existing ones with classrooms, libraries, science labs, toilets and teacher housing. Curricula combine national education with Qur'anic studies, giving children the tools to escape poverty while staying connected to their faith and community.",
    image: education, raised: 62100, goal: 100000,
  },
  {
    slug: "quran-distribution", title: "Quran Distribution", category: "Da'wah",
    description: "Printing and distributing copies of the Holy Qur'an to mosques, madrasas and new Muslims worldwide.",
    details: "We supply printed Mushafs, translations in local languages, large-print and Braille editions, and digital audio Qur'ans to mosques, schools, prisons and reverts. Every recitation from a distributed copy becomes continuous reward for the donor.",
    image: women, raised: 14500, goal: 30000,
  },
  {
    slug: "food-urgent-appeals", title: "Food Provision & Urgent Appeals", category: "Crisis Response",
    description: "Rapid food, shelter and medical relief for families hit by conflict, drought, floods and famine.",
    details: "When disaster strikes — Gaza, Sudan, Yemen, Somalia, earthquake and flood zones — we deliver emergency food parcels, clean water, blankets, hygiene kits and medical aid within days. Year-round we also run hot meal kitchens and monthly food packs for the chronically food-insecure.",
    image: relief, raised: 51800, goal: 100000,
  },
];
