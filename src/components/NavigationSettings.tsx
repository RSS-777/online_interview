"use client"

import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setProfession, setCategory } from "@/store/settings/settingsSlice";
import { AppDispatch, RootState } from "@/store/store";

import styles from '../styles/components/navigation-settings.module.scss';

export type TypeProfession = {
    frontend: string[];
    backend: string[];
    mobile: string[];
    designer: string[];
};

const profession: TypeProfession = {
    frontend: ['HTML', 'CSS', 'JavaScript (ES6+)', 'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Redux', 'Zustand', 'MobX', 'SASS / SCSS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'styled-components', 'emotion', 'Vite', 'Webpack', 'Parcel', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'npm', 'yarn', 'REST API', 'GraphQL', 'Fetch API', 'Axios', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Playwright', 'Lazy loading', 'Code splitting', 'Lighthouse', 'SEO', 'Performance audit', 'Chrome DevTools', 'Responsive Design', 'Mobile-first design', 'Figma', 'Zeplin', 'HTTP/HTTPS basics', 'CORS', 'Cookies/Storage', 'CI/CD basics', 'UX/UI principles', 'Production optimization'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'Fastify', 'Koa', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'Flask', 'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'Kotlin', 'Go', 'Fiber', 'C#', '.NET', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'MariaDB', 'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'GraphQL', 'Apollo Server', 'REST API', 'WebSockets', 'JWT', 'OAuth2', 'Passport.js', 'Bcrypt', 'Zod', 'Yup', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'PM2', 'Linux basics', 'SSH', 'Cron jobs', 'File uploads', 'Email sending', 'Stripe', 'PayPal', 'Socket.IO', 'RabbitMQ', 'Kafka', 'gRPC'],
    mobile: ['Java', 'Kotlin', 'Swift', 'Objective-C', 'Dart', 'Flutter', 'React Native', 'Xamarin', 'Ionic', 'Cordova', 'Android SDK', 'Xcode', 'Android Studio', 'Firebase', 'GraphQL', 'REST API', 'SQLite', 'Realm', 'Core Data', 'Redux', 'MobX', 'Flutter Bloc', 'Provider', 'Jetpack Compose', 'UIKit', 'Jetpack', 'SwiftUI', 'Firebase Authentication', 'Push Notifications', 'WebSockets', 'OAuth2', 'JWT', 'Google Maps API', 'Stripe', 'Payment Integration', 'Crashlytics', 'CI/CD', 'Fastlane', 'TestFlight', 'Android Emulator', 'Xcode Simulator', 'App Store', 'Google Play Store', 'App Store Connect', 'Google Play Console', 'App Distribution', 'Push Notifications', 'GraphQL subscriptions', 'Unit Testing', 'UI Testing', 'Jest', 'Mockito', 'Espresso', 'Detox', 'App Performance Optimization'],
    designer: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Zeplin', 'Illustrator', 'Photoshop', 'Affinity Designer', 'Canva', 'CorelDRAW', 'Principle', 'Prototyping', 'Wireframing', 'UI Design', 'UX Design', 'Interaction Design', 'Responsive Design', 'Mobile-first Design', 'Design Systems', 'Typography', 'Color Theory', 'Icons', 'Branding', 'User Flows', 'User Personas', 'A/B Testing', 'Usability Testing', 'Accessibility (a11y)', 'HTML/CSS Basics', 'SVG', 'Motion Design', 'Animation', 'Web Design', 'Print Design', 'Video Editing', 'After Effects', 'Illustration', '3D Design', 'UI Kits', 'Storyboarding', 'Design Handoff', 'Collaborative Design', 'Version Control for Design', 'Design Thinking', 'Agile Methodology', 'Creative Suite', 'Wireframe', 'Mockup', 'UI Prototyping']
};

type TypeComponentProps = {
    onClick: () => void;
    hideSetting: boolean;
};

export const NavigationSettings = ({ onClick, hideSetting }: TypeComponentProps) => {
    const languageChoice = useSelector((state: RootState) => state.settings.language)
    const professionChoice = useSelector((state: RootState) => state.settings.profession)
    const categoryChoice = useSelector((state: RootState) => state.settings.category)
    const dispatch = useDispatch<AppDispatch>()

    const handleLanguageChoice = (value: string) => {
        dispatch(setLanguage(value))
    }

    const handleProfessionChoice = (value: string) => {
        dispatch(setProfession(value))
        dispatch(setCategory(''))
    }

    const handleCategoryChoice = (value: string) => {
        dispatch(setCategory(value))
    }

    return (
        <nav className={hideSetting ? styles['navigation-settings-hide'] : styles['navigation-settings']}>
            <div>
                <select
                    name="language"
                    id="language"
                    onChange={(e) => handleLanguageChoice(e.target.value)}
                >
                    <option value="">Оберіть мову співбесіди</option>
                    <option value="uk-UA">Українська</option>
                    <option value="ru-RU">Русский</option>
                    <option value="en-US">English</option>
                    <option value="pl-PL">Polski</option>
                </select>
            </div>
            {languageChoice &&
                <div>
                    <select
                        name="profession"
                        id="profession"
                        onChange={(e) => handleProfessionChoice(e.target.value)}
                    >
                        <option value="">Виберіть професію</option>
                        <option value="frontend">Фронтенд розробник</option>
                        <option value="backend">Бекенд розробник</option>
                        <option value="mobile">Мобільний розробник</option>
                        <option value="designer">UI/UX дизайнер</option>
                    </select>
                </div>
            }
            {languageChoice && professionChoice &&
                <div>
                    <select
                        name="category"
                        id="category"
                        onChange={(e) => handleCategoryChoice(e.target.value)}
                        value={categoryChoice}
                    >
                        <option value="">Оберіть категорію</option>
                        {profession[professionChoice as keyof TypeProfession]?.map((pro, index) => (
                            <option value={pro} key={index}>{pro}</option>
                        ))}

                    </select>
                </div>
            }
            {languageChoice && professionChoice && categoryChoice &&
                <div>
                    <button onClick={onClick}>Почати співбесіду</button>
                </div>
            }
        </nav>
    )
};