const navData = [
    {
        id: 'services',
        label: 'Services',
        path: '/services',
        categoryLabel: 'Core Services', 
        dropdown: [
            { title: 'Search & Growth Strategy', path: '/services/search', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.14.49.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=aec6b230473b13e5be3032641e65eb8b' },
            { title: 'Onsite SEO', path: '/services/onsite', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/WhatsApp-Image-2025-06-03-at-08.34.50.jpeg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1766399268&s=bd5ddabe7f73037f1ac719756f037a85' },
            { title: 'Content Experience', path: '/services/content', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.16.14.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847627&s=dd0310bea5e91b3a6e94556b442d1ce8' },
            { title: 'B2B Marketing', path: '/services/b2b', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/0B5A6875.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1774455015&s=2333f65323bdf4bce22a77aa1830b8fa' },
            { title: 'Digital PR', path: '/services/digital-pr', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-22.39.35.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=ca4a2c3891fedbd3ca3a3d46af0e6362' },
            { title: 'Social Media & Campaigns', path: '/services/social', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/temp_image_43CEDE6C-4430-479F-9DBF-B348FA9AC991.WEBP?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750858840&s=6edf12d36935a77a24f6b26b34e34a55' },
            { title: 'Data & Insights', path: '/services/data', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/data.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1751376823&s=b916fc0ffe9583f7510c82b59325d8c5' },
            { title: 'Social SEO/Search', path: '/services/social-seo', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-09-24-at-11.47.25.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1758739812&s=3420a95a68e65982ee23fc1b2f82dbae' },
        ],
    },
    {
        id: 'nndustries',
        label: 'Industries',
        path: '/industries',
        categoryLabel: '',
        dropdown: [
            { title: 'B2B Marketing', path: '/industries/b2b', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/0B5A6875.jpg?w=2000&h=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1774455015&s=df051a63ff34be86c30633107a8ae59a' },
        ],
    },
    {
        id: 'international',
        label: 'International',
        path: '/international',
        categoryLabel: '',
        dropdown: [
            { title: 'US Digital PR', path: '/international/us', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/d4df0d30-d590-4e94-9056-9491f4beacba.JPG?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847714&s=adefb293215e963a4d99827a8910457b' },
            { title: 'Spain Digital PR', path: '/international/spain', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos_2026-04-23-101020_frxy.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1776939020&s=398dbf3f84888a2f970754cec5f69f44' },
            { title: 'Germany Digital PR', path: '/international/germany', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/27.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1776937869&s=fe91a90e6b282a2e493d9da8a4bce281' },
            { title: 'Netherlands Digital PR', path: '/international/netherlands', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos_2026-04-23-095313_xfhk.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1776937993&s=61fd7e7d028968a79adf7d721518cb54' },
        ],
    },
    {
        id: 'about',
        label: 'About',
        path: '/about',
        categoryLabel: '',
        dropdown: [
            { title: 'About Us', path: '/about', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/0B5A7487.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1751838846&s=571b2353f435df70a1c43006fdb0bf92' },
            { title: 'Meet The Risers', path: '/team', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.14.49.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=aec6b230473b13e5be3032641e65eb8b' },
            { title: 'Culture', path: '/culture', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/IMG_4280-2.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750846538&s=197c82e07b7345844e031bc84f8ffb04' },
            { title: 'Testimonials', path: '/testimonials', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/d4df0d30-d590-4e94-9056-9491f4beacba.JPG?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847714&s=adefb293215e963a4d99827a8910457b' },
        ],
    },
    { id: 'work', label: 'Work', path: '/work', badge: '25' },
    { id: 'careers', label: 'Careers', path: '/careers' },
    {
        id: 'blog',
        label: 'Blog & Resources',
        path: '/blog',
        categoryLabel: '',
        dropdown: [
            { title: 'Blog', path: '/blog', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/987a2051e11c80faa2a669c0eb61c514c7cc2314.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750846498&s=3a9217318f21c0f858c70ee343aea5c7' },
            { title: 'Category Leaderboard', path: '/category-leaderboard', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/RA7-CL-VERSION-1-3-1_2026-05-05-132743_kfxk.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1777987663&s=ce1b58fc83816ab1ec4383a8aff8d80a' },
            { title: 'Multi-channel Search Report', path: '/multi-channel-search-report', image: 'https://rise-atseven.transforms.svdcdn.com/production/images/homepage-image.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.4856&fp-y=0.5205&dm=1762943735&s=0780b793038609dcea73e9419ed2e964' },
        ]
    },
    { id: 'webinar', label: 'Webinar', path: '/webinar' },
]

export default navData