"use client"

import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setQuestionCount, setSpecialization, setTechnology } from "../store/settings/settingsSlice";
import { AppDispatch, RootState } from "../store/store";
import styles from '../styles/components/navigation-settings.module.scss';

type SpecializationKey = 'frontend' | 'backend' | 'mobile' | 'designer';

type TechnologyOptionsBySpecialization = Record<SpecializationKey, string[]>;

const technologyOptionsBySpecialization: TechnologyOptionsBySpecialization = {
    frontend: ['OOP', 'HTML', 'CSS', 'JavaScript (ES6+)', 'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Redux', 'Zustand', 'MobX', 'SASS / SCSS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'styled-components', 'emotion', 'Vite', 'Webpack', 'Parcel', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'npm', 'yarn', 'REST API', 'GraphQL', 'Fetch API', 'Axios', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Playwright', 'Lazy loading', 'Code splitting', 'Lighthouse', 'SEO', 'Performance audit', 'Chrome DevTools', 'Responsive Design', 'Mobile-first design', 'Figma', 'Zeplin', 'HTTP/HTTPS basics', 'CORS', 'Cookies/Storage', 'CI/CD basics', 'UX/UI principles', 'Production optimization'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'Fastify', 'Koa', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'Flask', 'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'Kotlin', 'Go', 'Fiber', 'C#', '.NET', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'MariaDB', 'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'GraphQL', 'Apollo Server', 'REST API', 'WebSockets', 'JWT', 'OAuth2', 'Passport.js', 'Bcrypt', 'Zod', 'Yup', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'PM2', 'Linux basics', 'SSH', 'Cron jobs', 'File uploads', 'Email sending', 'Stripe', 'PayPal', 'Socket.IO', 'RabbitMQ', 'Kafka', 'gRPC'],
    mobile: ['Java', 'Kotlin', 'Swift', 'Objective-C', 'Dart', 'Flutter', 'React Native', 'Xamarin', 'Ionic', 'Cordova', 'Android SDK', 'Xcode', 'Android Studio', 'Firebase', 'GraphQL', 'REST API', 'SQLite', 'Realm', 'Core Data', 'Redux', 'MobX', 'Flutter Bloc', 'Provider', 'Jetpack Compose', 'UIKit', 'Jetpack', 'SwiftUI', 'Firebase Authentication', 'Push Notifications', 'WebSockets', 'OAuth2', 'JWT', 'Google Maps API', 'Stripe', 'Payment Integration', 'Crashlytics', 'CI/CD', 'Fastlane', 'TestFlight', 'Android Emulator', 'Xcode Simulator', 'App Store', 'Google Play Store', 'App Store Connect', 'Google Play Console', 'App Distribution', 'Push Notifications', 'GraphQL subscriptions', 'Unit Testing', 'UI Testing', 'Jest', 'Mockito', 'Espresso', 'Detox', 'App Performance Optimization'],
    designer: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Zeplin', 'Illustrator', 'Photoshop', 'Affinity Designer', 'Canva', 'CorelDRAW', 'Principle', 'Prototyping', 'Wireframing', 'UI Design', 'UX Design', 'Interaction Design', 'Responsive Design', 'Mobile-first Design', 'Design Systems', 'Typography', 'Color Theory', 'Icons', 'Branding', 'User Flows', 'User Personas', 'A/B Testing', 'Usability Testing', 'Accessibility (a11y)', 'HTML/CSS Basics', 'SVG', 'Motion Design', 'Animation', 'Web Design', 'Print Design', 'Video Editing', 'After Effects', 'Illustration', '3D Design', 'UI Kits', 'Storyboarding', 'Design Handoff', 'Collaborative Design', 'Version Control for Design', 'Design Thinking', 'Agile Methodology', 'Creative Suite', 'Wireframe', 'Mockup', 'UI Prototyping']
};

type NavigationSettingsProps = {
    onClick: () => void;
    hideSetting: boolean;
};

export const NavigationSettings = ({ onClick, hideSetting }: NavigationSettingsProps) => {
    const selectedLanguage = useSelector((state: RootState) => state.settings.language)
    const selectedSpecialization = useSelector((state: RootState) => state.settings.specialization)
    const selectedTechnology = useSelector((state: RootState) => state.settings.technology)
    const selectedQuestionCount = useSelector((state: RootState) => state.settings.questionCount)
    const dispatch = useDispatch<AppDispatch>()

    const handleLanguageChange = (language: string) => {
        dispatch(setLanguage(language))
    }

    const handleSpecializationChange = (specialization: string) => {
        dispatch(setSpecialization(specialization))
        dispatch(setTechnology(''))
        dispatch(setQuestionCount(null))
    }

    const handleTechnologyChange = (technology: string) => {
        dispatch(setTechnology(technology))
    }

    const handleQuestionCountChange = (questionCount: number | null) => {
        dispatch(setQuestionCount(questionCount))
    }

    return (
        <nav className={hideSetting ? styles['navigation-settings-hide'] : styles['navigation-settings']}>
            <div>
                <select
                    name="language"
                    id="language"
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                >
                    <option value="">Мова спілкування</option>
                    <option value="uk-UA">Українська</option>
                    <option value="ru-RU">Русский</option>
                    <option value="en-US">English</option>
                    <option value="pl-PL">Polski</option>
                </select>
            </div>
            {selectedLanguage &&
                <div>
                    <select
                        name="specialization"
                        id="specialization"
                        value={selectedSpecialization}
                        onChange={(e) => handleSpecializationChange(e.target.value)}
                    >
                        <option value="">Спеціалізація</option>
                        <option value="frontend">Frontend-розробка</option>
                        <option value="backend">Backend-розробка</option>
                        <option value="mobile">Мобільна розробка</option>
                        <option value="designer">UI/UX дизайн</option>
                    </select>
                </div>
            }
            {selectedLanguage && selectedSpecialization &&
                <div>
                    <select
                        name="technology"
                        id="technology"
                        value={selectedTechnology}
                        onChange={(e) => handleTechnologyChange(e.target.value)}
                    >
                        <option value="">Технологія</option>
                        {technologyOptionsBySpecialization[selectedSpecialization as SpecializationKey]?.map((technology, index) => (
                            <option value={technology} key={index}>{technology}</option>
                        ))}
                    </select>
                </div>
            }
            {selectedLanguage && selectedSpecialization && selectedTechnology &&
                <div>
                    <select
                        name="questionCount"
                        id="question-count"
                        value={selectedQuestionCount ?? ''}
                        onChange={(e) => {
                            const { value } = e.target
                            handleQuestionCountChange(value === '' ? null : Number(value))
                        }}
                    >
                        <option value="">Кількість запитань</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            }
            {selectedLanguage && selectedSpecialization && selectedTechnology && selectedQuestionCount &&
                <div>
                    <button onClick={onClick}>Почати співбесіду</button>
                </div>
            }
        </nav>
    )
};
