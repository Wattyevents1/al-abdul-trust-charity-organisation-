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
  { slug: "food-donation", title: "Food Donation", category: "Hunger Relief",
    description: "Provide warm meals and food packages to families facing food insecurity across rural Africa.",
    image: food, raised: 48230, goal: 75000 },
  { slug: "education-support", title: "Education Support", category: "Education",
    description: "Send children to school with books, uniforms, and qualified teachers in underserved villages.",
    image: education, raised: 62100, goal: 100000 },
  { slug: "medical-outreach", title: "Medical Outreach", category: "Healthcare",
    description: "Mobile clinics bringing essential healthcare, vaccines and maternal care to remote communities.",
    image: medical, raised: 31500, goal: 60000 },
  { slug: "clean-water", title: "Clean Water Projects", category: "Water & Sanitation",
    description: "Build wells and water pumps so families can drink safe water and protect their children's health.",
    image: water, raised: 88400, goal: 120000 },
  { slug: "emergency-relief", title: "Emergency Relief", category: "Crisis Response",
    description: "Rapid response with shelter, food and medical aid for families displaced by conflict or disaster.",
    image: relief, raised: 25800, goal: 50000 },
  { slug: "child-sponsorship", title: "Child Sponsorship", category: "Children",
    description: "Sponsor an orphan with food, education, healthcare and a loving foster community.",
    image: orphan, raised: 41200, goal: 80000 },
  { slug: "women-empowerment", title: "Women Empowerment", category: "Empowerment",
    description: "Vocational training, microloans and leadership programs that lift entire families out of poverty.",
    image: women, raised: 36900, goal: 70000 },
  { slug: "community-development", title: "Community Development", category: "Development",
    description: "Building schools, clinics and infrastructure that transform villages for generations.",
    image: community, raised: 54300, goal: 90000 },
];
