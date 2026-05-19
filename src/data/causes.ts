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
};

export const causes: Cause[] = [
  { slug: "water-wells", title: "Construction of Water Wells", category: "Water & Sanitation",
    description: "We drill and construct deep-water boreholes and hand-dug wells in drought-stricken villages so families no longer walk hours for unsafe water. Each well serves up to 500 people daily, dramatically reducing waterborne disease, freeing children — especially girls — to attend school, and giving communities a sustainable source of clean drinking, cooking and irrigation water. Every well is named in honour of the donor or a loved one and maintained by a trained local committee.",
    image: water, raised: 88400, goal: 120000 },
  { slug: "orphan-care", title: "Care for Orphans", category: "Children",
    description: "We sponsor orphaned and vulnerable children with monthly stipends covering food, clothing, healthcare, schooling and emotional support. Through our kafala (sponsorship) programme, each child is placed with a vetted foster family or guardian and assigned a caseworker who tracks their wellbeing, academic progress and Islamic education. Sponsors receive regular updates, photos and letters from their sponsored child.",
    image: orphan, raised: 41200, goal: 80000 },
  { slug: "ramadan-iftar", title: "Ramadan Iftar Project", category: "Ramadan",
    description: "During the blessed month of Ramadan, we serve hot, nutritious iftar meals to fasting families, orphans, widows, refugees and the elderly across our communities. We also distribute Ramadan food parcels containing rice, flour, oil, dates, sugar and other essentials to last a family the full month. Your donation feeds the fasting and earns the reward of their fast — without diminishing theirs.",
    image: food, raised: 32500, goal: 60000 },
  { slug: "qurban-sadaq", title: "Qurban & Sadaqah", category: "Udhiyah",
    description: "Fulfil your Qurban (Udhiyah) obligation during Eid al-Adha by sponsoring the slaughter of a sheep, goat, cow or camel share. The fresh meat is distributed to orphans, widows, refugees and the poorest families — many of whom only taste meat during Eid. We handle every step from purchase to humane slaughter to distribution, and send you confirmation once your Qurban is complete.",
    image: relief, raised: 25800, goal: 50000 },
  { slug: "mosque-construction", title: "Construction & Rehabilitation of Mosques", category: "Mosques",
    description: "We build new masjids and restore damaged ones in villages that have no proper place of worship. Each project includes a prayer hall, ablution facilities, a minaret and often an attached madrasa for Qur'an classes. Building a mosque is an ongoing sadaqah jariyah — you continue to receive reward for every prayer, dhikr and lesson held within its walls long after it is complete.",
    image: community, raised: 64200, goal: 110000 },
  { slug: "orphanage-construction", title: "Construction of Orphanages", category: "Children",
    description: "We build safe, modern orphanage homes that provide shelter, nutritious meals, medical care, schooling and a loving family environment for children who have lost their parents. Each orphanage is staffed with trained carers, teachers and counsellors, and includes dormitories, classrooms, a clinic, a kitchen and play areas — giving every child a chance to grow with dignity and faith.",
    image: orphan, raised: 54300, goal: 150000 },
  { slug: "school-construction", title: "Construction of Schools", category: "Education",
    description: "We construct fully-equipped schools in underserved villages, complete with classrooms, libraries, toilets, clean water, desks, books and trained teachers. Our schools combine quality secular education with Islamic studies, opening the doors of literacy and opportunity to thousands of children — particularly girls — who would otherwise have no path out of poverty.",
    image: education, raised: 62100, goal: 100000 },
  { slug: "quran-distribution", title: "Qur'an Distribution", category: "Dawah",
    description: "We print and distribute beautifully bound copies of the Holy Qur'an — along with translations and tafsir — to mosques, madrasas, prisons, new Muslims and families who cannot afford one. Every copy you sponsor becomes a continuous sadaqah jariyah, earning reward for you with every verse recited from it, insha'Allah.",
    image: community, raised: 18400, goal: 40000 },
  { slug: "food-provision", title: "Food Provision & Urgent Appeals", category: "Emergency Relief",
    description: "We respond rapidly to famines, floods, earthquakes and conflict zones with emergency food parcels, hot meals, clean water, blankets and medical aid. Our food provision programme also delivers monthly grocery packs year-round to widows, the elderly and food-insecure families. When disaster strikes, your donation puts food in hungry hands within days.",
    image: relief, raised: 47600, goal: 90000 },
];
