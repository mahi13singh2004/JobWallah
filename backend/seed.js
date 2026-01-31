import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Resume from './models/resume.model.js';
import Application from './models/application.model.js';
import Payment from './models/payment.model.js';
import connectDB from './db/connectDB.js';

dotenv.config();

// Modern names with some having surnames
const names = [
    'Arjun Sharma', 'Priya', 'Rahul Gupta', 'Ananya', 'Vikram Singh', 'Kavya',
    'Aditya Patel', 'Shreya', 'Rohan Kumar', 'Isha', 'Karan Mehta', 'Riya',
    'Siddharth Jain', 'Nisha', 'Abhishek Verma', 'Pooja', 'Varun Agarwal', 'Meera',
    'Nikhil Shah', 'Tanya', 'Harsh Bansal', 'Divya', 'Akash Reddy', 'Sneha',
    'Yash Kapoor', 'Aditi', 'Rohit Malhotra', 'Sakshi', 'Aryan Sinha', 'Neha',
    'Dev Chandra', 'Kriti', 'Ayush Pandey', 'Rhea', 'Shubham Rao', 'Anjali',
    'Kartik Nair', 'Simran', 'Arnav Bhatt', 'Diya', 'Rishabh Goyal', 'Palak',
    'Ishan Saxena', 'Avni', 'Arpit Tiwari', 'Mansi', 'Gaurav Mishra', 'Tanvi',
    'Pranav Joshi', 'Ritu', 'Samarth Dubey', 'Kiara', 'Vivek Thakur', 'Ishita',
    'Aman Gupta', 'Naina', 'Deepak Singh', 'Radhika', 'Mohit Sharma', 'Aarohi',
    'Tushar Patel', 'Sanya', 'Ankit Kumar', 'Zara', 'Mayank Jain', 'Alia',
    'Shivam Verma', 'Khushi', 'Utkarsh Agarwal', 'Myra'
];

const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb',
    'Spotify', 'Tesla', 'Nvidia', 'Adobe', 'Salesforce', 'Oracle', 'IBM',
    'Infosys', 'TCS', 'Wipro', 'HCL', 'Tech Mahindra', 'Cognizant', 'Accenture',
    'Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'PhonePe', 'Razorpay', 'Freshworks',
    'Zoho', 'Byju\'s', 'Unacademy', 'Ola', 'BookMyShow', 'MakeMyTrip'
];

const roles = [
    'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Data Scientist', 'Machine Learning Engineer', 'DevOps Engineer', 'Product Manager',
    'UI/UX Designer', 'Quality Assurance Engineer', 'Mobile App Developer',
    'Cloud Architect', 'Cybersecurity Analyst', 'Business Analyst', 'Technical Writer'
];

const skills = {
    languages: ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin'],
    frameworks: ['React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Cassandra', 'DynamoDB', 'Firebase'],
    aiTools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'Hugging Face', 'LangChain'],
    coreCS: ['Data Structures', 'Algorithms', 'System Design', 'Computer Networks', 'Operating Systems']
};

const universities = [
    'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'BITS Pilani', 'NIT Trichy', 'NIT Warangal', 'IIIT Hyderabad', 'DTU',
    'VIT Vellore', 'Manipal Institute', 'SRM University', 'Amity University',
    'Indian Institute of Science (IISc)', 'R.V. College of Engineering', 'PES University',
    'BMS College of Engineering', 'Cambridge Institute of Technology', 'MS Ramaiah Institute of Technology',
    'Bangalore Institute of Technology', 'Sir M. Visvesvaraya Institute of Technology', 'Dayananda Sagar College of Engineering',
    'New Horizon College of Engineering'
];

const degrees = [
    'B.Tech Computer Science', 'B.Tech Information Technology', 'B.E Computer Science',
    'M.Tech Computer Science', 'MCA', 'B.Sc Computer Science'
];

// Helper functions
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomElements = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateEmail = (name) => {
    const cleanName = name.toLowerCase().replace(/\s+/g, '.');
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    return `${cleanName}${Math.floor(Math.random() * 100)}@${getRandomElement(domains)}`;
};

const generatePhone = () => {
    return `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`;
};

const generateResume = (userId, userName, userEmail) => {
    const hasResume = Math.random() > 0.3; // 70% chance of having a resume
    if (!hasResume) return null;

    return {
        userId,
        title: `${userName.split(' ')[0]}'s Resume`,
        personalInfo: {
            name: userName,
            email: userEmail,
            phone: generatePhone(),
            location: getRandomElement(['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune']),
            linkedin: `linkedin.com/in/${userName.toLowerCase().replace(/\s+/g, '-')}`,
            github: `github.com/${userName.toLowerCase().replace(/\s+/g, '')}`
        },
        summary: `Passionate ${getRandomElement(['software engineer', 'developer', 'programmer'])} with ${Math.floor(Math.random() * 5) + 1} years of experience in building scalable applications.`,
        education: [{
            institution: getRandomElement(universities),
            degree: getRandomElement(degrees),
            location: getRandomElement(['Mumbai', 'Delhi', 'Bangalore', 'Chennai']),
            startDate: '2018',
            endDate: '2022'
        }],
        experience: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
            role: getRandomElement(roles),
            company: getRandomElement(companies),
            location: getRandomElement(['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad']),
            startDate: '2022',
            endDate: Math.random() > 0.5 ? '2024' : 'Present',
            bullets: [
                'Developed and maintained web applications using modern technologies',
                'Collaborated with cross-functional teams to deliver high-quality software',
                'Optimized application performance and improved user experience'
            ]
        })),
        projects: Array.from({ length: Math.floor(Math.random() * 4) + 2 }, () => ({
            name: `${getRandomElement(['E-commerce', 'Social Media', 'Task Management', 'Weather', 'Chat'])} App`,
            techStack: getRandomElements([...skills.languages, ...skills.frameworks], 3),
            startDate: '2023',
            endDate: '2024',
            bullets: [
                'Built responsive user interface with modern design principles',
                'Implemented secure authentication and authorization',
                'Integrated third-party APIs for enhanced functionality'
            ]
        })),
        skills: {
            languages: getRandomElements(skills.languages, Math.floor(Math.random() * 4) + 2),
            frameworks: getRandomElements(skills.frameworks, Math.floor(Math.random() * 3) + 2),
            databases: getRandomElements(skills.databases, Math.floor(Math.random() * 3) + 1),
            aiTools: Math.random() > 0.6 ? getRandomElements(skills.aiTools, 2) : [],
            coreCS: getRandomElements(skills.coreCS, Math.floor(Math.random() * 3) + 2)
        },
        achievements: [
            'Winner of college hackathon 2023',
            'Published research paper on machine learning',
            'Contributed to open source projects'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
    };
};

const generateApplications = (userId) => {
    const applicationCount = Math.floor(Math.random() * 7) + 1; // 1-7 applications
    const applications = [];

    for (let i = 0; i < applicationCount; i++) {
        applications.push({
            user: userId,
            company: getRandomElement(companies),
            role: getRandomElement(roles),
            status: getRandomElement(['Applied', 'Interview', 'Offer', 'Rejected']),
            appliedDate: getRandomDate(new Date(2024, 0, 1), new Date()),
            notes: Math.random() > 0.5 ? 'Followed up via email' : ''
        });
    }

    return applications;
};

const generatePayment = (userId) => {
    return {
        userId,
        razorpayOrderId: `order_${Math.random().toString(36).substr(2, 9)}`,
        razorpayPaymentId: `pay_${Math.random().toString(36).substr(2, 9)}`,
        amount: 129,
        currency: 'INR',
        status: 'completed',
        plan: 'premium_lifetime'
    };
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Resume.deleteMany({});
        await Application.deleteMany({});
        await Payment.deleteMany({});

        console.log('Creating users...');
        const users = [];
        const resumes = [];
        const applications = [];
        const payments = [];

        // Create 70 users
        for (let i = 0; i < 70; i++) {
            const name = names[i % names.length];
            const email = generateEmail(name);
            const hashedPassword = await bcrypt.hash('password123', 10);
            const isPremium = i < 17; // First 17 users are premium

            const user = {
                name,
                email,
                password: hashedPassword,
                jobSearchCount: Math.floor(Math.random() * 20),
                lastJobSearch: Math.random() > 0.3 ? getRandomDate(new Date(2024, 0, 1), new Date()) : null,
                isPremium,
                premiumPurchaseDate: isPremium ? getRandomDate(new Date(2024, 0, 1), new Date()) : null,
                razorpayOrderId: isPremium ? `order_${Math.random().toString(36).substr(2, 9)}` : null,
                razorpayPaymentId: isPremium ? `pay_${Math.random().toString(36).substr(2, 9)}` : null
            };

            users.push(user);
        }

        // Insert users
        const insertedUsers = await User.insertMany(users);
        console.log(`Created ${insertedUsers.length} users`);

        // Create resumes and applications for each user
        for (const user of insertedUsers) {
            // Generate resume (70% chance)
            const resume = generateResume(user._id, user.name, user.email);
            if (resume) {
                resumes.push(resume);
            }

            // Generate applications (all users have at least 1)
            const userApplications = generateApplications(user._id);
            applications.push(...userApplications);

            // Generate payment for premium users
            if (user.isPremium) {
                payments.push(generatePayment(user._id));
            }
        }

        // Insert resumes
        if (resumes.length > 0) {
            await Resume.insertMany(resumes);
            console.log(`Created ${resumes.length} resumes`);
        }

        // Insert applications
        await Application.insertMany(applications);
        console.log(`Created ${applications.length} applications`);

        // Insert payments
        if (payments.length > 0) {
            await Payment.insertMany(payments);
            console.log(`Created ${payments.length} payments`);
        }

        console.log('Database seeded successfully!');
        console.log(`Summary:
        - Users: ${insertedUsers.length}
        - Premium Users: ${insertedUsers.filter(u => u.isPremium).length}
        - Resumes: ${resumes.length}
        - Applications: ${applications.length}
        - Payments: ${payments.length}`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the seed function
seedDatabase();