import axios from "axios";
import { useState, useEffect } from 'react';

const API_BASE_URL = "https://shi.studio/api/v1";
const MEDIA_BASE_URL = `${API_BASE_URL}/media/`;

// Navigation links
export const navLinks = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/works", name: "Works" },
  { path: "/services", name: "Services" },
  { path: "/contact", name: "Contact" },
];

export const navigationFooterList = [
  ...navLinks,
  { path: "/works", name: "Works" },
];

export const ourServicesList = [
  { path: "/services", name: "UX/UI Design" },
  { path: "/services", name: "Web Development" },
  { path: "/services", name: "Complete website" },
  { path: "/services", name: "Support" },
];

// Utility function for API calls
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    // If it's a network error, we'll return some mock data
    if (error.message === 'Network Error') {
      console.warn(`Network error occurred. Returning mock data for ${endpoint}`);
      return getMockData(endpoint);
    }
    return [];
  }
};

// Add this function to provide mock data
const getMockData = (endpoint) => {
  // You can expand this with more mock data for different endpoints
  const mockData = {
    '/social-media/': [
      { url: 'https://linkedin.com', icon: 1, name: 'LinkedIn' },
      { url: 'https://behance.com', icon: 2, name: 'Behance' },
    ],
    '/projects/': [
      { id: 1, name: 'Project 1', description: 'A sample project' },
      { id: 2, name: 'Project 2', description: 'Another sample project' },
    ],
    '/services/': [
      { id: 1, name: 'Web Development', description: 'Custom web development services' },
      { id: 2, name: 'UX/UI Design', description: 'User experience and interface design' },
    ],
    // Add more mock data for other endpoints as needed
  };

  return mockData[endpoint] || [];
};

// Social Media
export const socialMediaList = [];

const getElementName = (iconId) => {
  const iconMap = {
    1: "LinkedinLogo", 2: "BehanceLogo", 3: "WhatsappLogo",
    4: "InstagramLogo", 5: "FacebookLogo", 6: "TelegramLogo",
  };
  return iconMap[iconId] || "DefaultLogo";
};

export const populateSocialMediaList = async () => {
  const socialMedia = await fetchData("/social-media/");
  socialMediaList.length = 0;
  socialMedia.forEach((item) => {
    socialMediaList.push({
      link: item.url || "/",
      element: getElementName(item.icon),
      name: item.name,
      iconUrl: `${MEDIA_BASE_URL}${item.icon}/path`,
    });
  });
};

// Works
export const works = [];

export const populateWorks = async () => {
  const projects = await fetchData("/projects/");
  works.length = 0;
  projects.forEach((project) => {
    works.push({
      id: project.id,
      title: project.name,
      image: project.image ? `${MEDIA_BASE_URL}${project.image}/path` : null,
      description: project.description,
      tags: project.services.map((service, index) => ({ id: index + 1, name: service })),
      badges: project.badges.map((badge, index) => ({
        id: index + 1,
        name: badge.name,
        image: `<svg><!-- Placeholder for badge SVG --></svg>`,
      })),
      hoverImage: null,
      project_url: project.project_url,
      project_behance_url: project.project_behance_url,
      year: project.year,
      client: project.client,
      industry: project.industry,
      collaborators: project.collaborators,
    });
  });
};

// Services
export const services = [];

export const populateServices = async () => {
  const servicesData = await fetchData("/services/");
  services.length = 0;
  servicesData.forEach((service) => {
    services.push({
      id: service.id,
      icon: `${API_BASE_URL}${service.icon_url}`,
      title: service.name,
      contentName: service.title,
      description: service.description,
      tags: service.tags.map(tag => ({ id: tag.id, name: tag.name })),
    });
  });
};

// Plans
export const plans = [
  {
    id: 1,
    title: "Reach out",
    description: "We'd love to hear from you! Whether you have a question or want to chat about your project, just drop us a message. Let's connect!",
    buttonText: "Let's talk",
    offers: [
      { id: 1, title: "Quick Response" },
      { id: 2, title: "Flexible Timing" },
      { id: 3, title: "Personalized Service" },
    ],
  },
];

// Hoverable Items
export const hoverableItems = [];

export const populateHoverableItems = async () => {
  const progressData = await fetchData("/progress/");
  hoverableItems.length = 0;
  progressData.forEach((item) => {
    hoverableItems.push({
      id: item.order,
      column: item.order.toString().padStart(2, '0'),
      title: item.title,
      description: item.description,
    });
  });
};

// Partnerships
export const parntershipsListExpanded = [];
export const parntershipsList = [];

export const populatePartnershipsList = async () => {
  const partners = await fetchData("/partners/");
  parntershipsListExpanded.length = 0;
  parntershipsList.length = 0;
  partners.forEach((partner) => {
    const partnerData = {
      path: `${MEDIA_BASE_URL}${partner.image}/path`,
      desc: partner.name,
    };
    parntershipsListExpanded.push(partnerData);
    parntershipsList.push(partnerData);
  });
};

// Contact Navbar
export const contactNavbar = [
  { path: "/contact/contact-us", name: "Contact us" },
  { path: "/contact/work-together", name: "Work together" },
  { path: "/contact/join-our-team", name: "Join our team" },
  { path: "/contact/become-our-partner", name: "Become our partner" },
];

// Team
export const teamList = [];

export const populateTeamList = async () => {
  const teamData = await fetchData("/team-members/");
  teamList.length = 0;
  teamData.forEach((member) => {
    teamList.push({
      id: member.id,
      name: member.full_name,
      profession: member.position,
      profile_img: member.image ? `${MEDIA_BASE_URL}${member.image}/path` : "/images/team_profile_img.jpg",
      social_media: member.social_media.map(social => ({
        path: "/",
        component: social.name
      }))
    });
  });
};

// Leader Info
export const leaderInfo = [
  {
    id: 1,
    icon: "/images/web-development.gif",
    title: "Experience",
    description: "Zahra, the founder of our studio, previously worked at Safaroff Agency, where she honed her expertise in creative design. She has contributed to numerous state projects, showcasing her exceptional skills and vision. Currently, Zahra shares her knowledge as a mentor at Turing Academy, guiding the next generation of designers.",
  },
  {
    id: 2,
    icon: "/images/web-development.gif",
    title: "Interests",
    description: "Zahra has a deep passion for music, art, and design, which inspires her creative approach. Her love for these forms of expression fuels her innovative thinking in every project. She believes that the intersection of these disciplines leads to truly unique and impactful designs. This blend of interests drives the artistic vision behind our studio's work.",
  },
];

// Leader Social Media
export const leaderSocialMediaList = [];

export const populateLeaderSocialMediaList = async () => {
  const teamData = await fetchData("/team-members/");
  const founder = teamData.find(member => member.position.toLowerCase() === "founder");
  if (founder) {
    leaderSocialMediaList.length = 0;
    founder.social_media.forEach((social) => {
      leaderSocialMediaList.push({
        link: "/",
        element: social.name
      });
    });
  } else {
    console.warn("No founder found in the team data.");
  }
};

// Other static data
export const professionList = [
  { id: 1, name: "UX/UI Design" },
  { id: 2, name: "Web Development" },
  { id: 3, name: "Complete website" },
  { id: 4, name: "Support" },
];

export const vacanciesList = [
  { id: 1, name: "UX/UI Designer" },
  { id: 2, name: "Front-end Developer" },
  { id: 3, name: "Back-end Developer" },
  { id: 4, name: "Other" },
];

export const budgetList = [
  { id: 1, name: "<1 000 AZN" },
  { id: 2, name: "1 000-5 000 AZN" },
  { id: 3, name: "5 000-10 000 AZN" },
  { id: 4, name: "10 000+ AZN" },
];

export const categories = [
  { id: 1, title: "All projects" },
  { id: 2, title: "Case study" },
  { id: 3, title: "State" },
  { id: 4, title: "Corporate" },
  { id: 5, title: "App" },
];

// Gallery
export const parallaxImages = [];

export const populateParallaxImages = async () => {
  const galleryData = await fetchData("/gallery/");
  parallaxImages.length = 0;
  galleryData.forEach((item) => {
    parallaxImages.push({
      id: item.id,
      image: `${MEDIA_BASE_URL}${item.image}/path`,
      description: item.description
    });
  });
};

export const contactData = [
  { id: 1, link: "/work-together", text: "Work together" },
  { id: 2, link: "/join-our-team", text: "Join our team" },
  { id: 3, link: "/become-our-partner", text: "Become our partner" },
];

// Work Info
export const useWorkInfoData = () => {
  const [workInfoData, setWorkInfoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const projects = await fetchData("/projects/");
        const formattedProjects = projects.map((project) => ({
          id: project.id,
          title: project.name,
          image: project.image ? `${MEDIA_BASE_URL}${project.image}/path` : null,
          description: project.description,
          short_description: project.short_description,
          tags: project.services.map((service, index) => ({ id: index + 1, name: service })),
          badges: project.badges.map((badge, index) => ({
            id: index + 1,
            name: badge.name,
            image: `<svg><!-- Placeholder for badge SVG --></svg>`,
          })),
          project_url: project.project_url,
          project_behance_url: project.project_behance_url,
          year: project.year,
          client: project.client,
          industry: Array.isArray(project.industry) ? project.industry : [project.industry],
          collaborators: project.collaborators,
          primaryImage: project.image ? `${MEDIA_BASE_URL}${project.image}/path` : null,
          childImageOne: project.gallery?.primaryImage?.image?.file,
          childImageTwo: project.gallery?.childImage1?.image?.file,
          childImageThree: project.gallery?.childImage2?.image?.file,
        }));

        setWorkInfoData(formattedProjects);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching works data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, []);

  return { workInfoData, isLoading, error };
};

export const workInfoCommon = {
  viewFullSiteText: "View full site",
};

// Initialize data
const initializeData = async () => {

  populatePartnershipsList(),

  await Promise.all([
    populateSocialMediaList(),
    populateWorks(),
    populateServices(),
    populateHoverableItems(),
    populateTeamList(),
    populateParallaxImages(),
    populateLeaderSocialMediaList(),
  ]);
  console.log("All data populated successfully");
};

initializeData();

