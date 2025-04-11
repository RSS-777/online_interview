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
    projectManager: string[];
    qa: string[];
    sysadmin: string[];
    devops: string[];
    dataScientist: string[];
};

const profession: TypeProfession = {
    frontend: ['HTML', 'CSS', 'JavaScript (ES6+)', 'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Redux', 'Zustand', 'MobX', 'SASS / SCSS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'styled-components', 'emotion', 'Vite', 'Webpack', 'Parcel', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'npm', 'yarn', 'REST API', 'GraphQL', 'Fetch API', 'Axios', 'Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Playwright', 'Lazy loading', 'Code splitting', 'Lighthouse', 'SEO', 'Performance audit', 'Chrome DevTools', 'Responsive Design', 'Mobile-first design', 'Figma', 'Zeplin', 'HTTP/HTTPS basics', 'CORS', 'Cookies/Storage', 'CI/CD basics', 'UX/UI principles', 'Production optimization'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'Fastify', 'Koa', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'Flask', 'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'Kotlin', 'Go', 'Fiber', 'C#', '.NET', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'MariaDB', 'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'GraphQL', 'Apollo Server', 'REST API', 'WebSockets', 'JWT', 'OAuth2', 'Passport.js', 'Bcrypt', 'Zod', 'Yup', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'PM2', 'Linux basics', 'SSH', 'Cron jobs', 'File uploads', 'Email sending', 'Stripe', 'PayPal', 'Socket.IO', 'RabbitMQ', 'Kafka', 'gRPC'],
    mobile: ['Java', 'Kotlin', 'Swift', 'Objective-C', 'Dart', 'Flutter', 'React Native', 'Xamarin', 'Ionic', 'Cordova', 'Android SDK', 'Xcode', 'Android Studio', 'Firebase', 'GraphQL', 'REST API', 'SQLite', 'Realm', 'Core Data', 'Redux', 'MobX', 'Flutter Bloc', 'Provider', 'Jetpack Compose', 'UIKit', 'Jetpack', 'SwiftUI', 'Firebase Authentication', 'Push Notifications', 'WebSockets', 'OAuth2', 'JWT', 'Google Maps API', 'Stripe', 'Payment Integration', 'Crashlytics', 'CI/CD', 'Fastlane', 'TestFlight', 'Android Emulator', 'Xcode Simulator', 'App Store', 'Google Play Store', 'App Store Connect', 'Google Play Console', 'App Distribution', 'Push Notifications', 'GraphQL subscriptions', 'Unit Testing', 'UI Testing', 'Jest', 'Mockito', 'Espresso', 'Detox', 'App Performance Optimization'],
    designer: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Zeplin', 'Illustrator', 'Photoshop', 'Affinity Designer', 'Canva', 'CorelDRAW', 'Principle', 'Prototyping', 'Wireframing', 'UI Design', 'UX Design', 'Interaction Design', 'Responsive Design', 'Mobile-first Design', 'Design Systems', 'Typography', 'Color Theory', 'Icons', 'Branding', 'User Flows', 'User Personas', 'A/B Testing', 'Usability Testing', 'Accessibility (a11y)', 'HTML/CSS Basics', 'SVG', 'Motion Design', 'Animation', 'Web Design', 'Print Design', 'Video Editing', 'After Effects', 'Illustration', '3D Design', 'UI Kits', 'Storyboarding', 'Design Handoff', 'Collaborative Design', 'Version Control for Design', 'Design Thinking', 'Agile Methodology', 'Creative Suite', 'Wireframe', 'Mockup', 'UI Prototyping'],
    projectManager: ['Agile', 'Scrum', 'Kanban', 'Waterfall', 'Lean', 'PMI (Project Management Institute)', 'PMP (Project Management Professional)', 'Jira', 'Trello', 'Asana', 'Basecamp', 'Monday.com', 'ClickUp', 'Microsoft Project', 'Wrike', 'Smartsheet', 'TeamGantt', 'Slack', 'Zoom', 'Google Workspace', 'Confluence', 'Notion', 'Miro', 'Figma (for collaboration)', 'GitHub (for issue tracking)', 'GitLab (for issue tracking)', 'Bitbucket', 'Stakeholder Management', 'Risk Management', 'Budgeting', 'Time Management', 'Resource Allocation', 'Project Scheduling', 'Gantt Charts', 'Critical Path Method (CPM)', 'Work Breakdown Structure (WBS)', 'Scope Management', 'Change Management', 'Requirements Gathering', 'Project Documentation', 'Milestone Tracking', 'Team Collaboration', 'Conflict Resolution', 'Task Prioritization', 'Project Reporting', 'Quality Assurance', 'Test Plans', 'Project Lifecycle', 'Deliverables', 'KPIs (Key Performance Indicators)', 'OKRs (Objectives and Key Results)', 'SWOT Analysis', 'Project Portfolio Management', 'Remote Team Management', 'Customer Relationship Management (CRM)', 'Cost Control', 'Risk Assessment', 'Resource Management', 'Stakeholder Communication'],
    qa: ['Manual Testing', 'Automated Testing', 'Unit Testing', 'Integration Testing', 'Functional Testing', 'Regression Testing', 'Smoke Testing', 'Acceptance Testing', 'Exploratory Testing', 'Performance Testing', 'Load Testing', 'Stress Testing', 'Usability Testing', 'Security Testing', 'API Testing', 'Database Testing', 'Mobile Testing', 'Cross-browser Testing', 'Test Plans', 'Test Cases', 'Test Suites', 'Bug Tracking', 'Defect Management', 'Jira', 'TestRail', 'Selenium', 'Appium', 'Cypress', 'JUnit', 'Mocha', 'Chai', 'Jest', 'Karma', 'Postman', 'SoapUI', 'Jenkins', 'CI/CD', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'Kubernetes', 'Test Automation Frameworks', 'TDD (Test-Driven Development)', 'BDD (Behavior-Driven Development)', 'Continuous Testing', 'LoadRunner', 'JUnit', 'Mockito', 'Cucumber', 'Rest Assured', 'TestNG', 'Protractor', 'VRT (Visual Regression Testing)', 'Quality Metrics', 'Test Coverage', 'Static Code Analysis', 'SonarQube', 'Performance Monitoring', 'Test Environments', 'Smoke Tests', 'Agile Testing', 'DevOps', 'Version Control', 'Bug Reporting', 'Automated Build Pipelines', 'API Mocking', 'Virtualization'],
    sysadmin: ['Linux', 'Windows Server', 'macOS', 'Unix', 'Bash', 'PowerShell', 'Zsh', 'SSH', 'FTP', 'SFTP', 'NFS', 'DNS', 'DHCP', 'HTTP/HTTPS', 'Apache', 'Nginx', 'IIS', 'Load Balancing', 'Reverse Proxy', 'Firewalls', 'iptables', 'ufw', 'iptables', 'VPN', 'OpenVPN', 'WireGuard', 'TLS/SSL', 'Docker', 'Kubernetes', 'Virtualization', 'VMware', 'Hyper-V', 'Vagrant', 'Proxmox', 'Ansible', 'Puppet', 'Chef', 'Terraform', 'Git', 'GitHub', 'GitLab', 'CI/CD', 'Nagios', 'Zabbix', 'Prometheus', 'Grafana', 'System Monitoring', 'Log Management', 'ELK Stack', 'Syslog', 'LAMP Stack', 'LEMP Stack', 'Database Administration', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'MariaDB', 'Backup Solutions', 'rsync', 'Bacula', 'Timeshift', 'NFS', 'Samba', 'Cloud Platforms', 'AWS', 'Azure', 'Google Cloud', 'Backup & Recovery', 'RAID', 'Disk Management', 'Network Configuration', 'Network Troubleshooting', 'SSL Certificates', 'SELinux', 'AppArmor', 'Scripting', 'Automation', 'System Performance Tuning', 'User Management', 'Cron Jobs', 'NTP', 'LDAP', 'Active Directory', 'OpenLDAP', 'Kubernetes Monitoring', 'Apache Kafka', 'ELB', 'S3', 'SFTP Servers', 'SMTP Servers', 'Postfix', 'Mail Servers', 'Apache Tomcat', 'Jenkins', 'Web Servers', 'Load Balancers', 'Networking Protocols', 'Security Hardening', 'Patching', 'Vulnerability Scanning', 'Penetration Testing', 'Firewalls', 'VPN Management'],
    devops: ['Linux', 'Windows Server', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Puppet', 'Chef', 'Jenkins', 'Git', 'GitLab', 'GitHub', 'CI/CD', 'Travis CI', 'CircleCI', 'Argo CD', 'Spinnaker', 'Helm', 'Prometheus', 'Grafana', 'ELK Stack', 'Nagios', 'Zabbix', 'JIRA', 'Slack', 'AWS', 'Azure', 'Google Cloud', 'DigitalOcean', 'OpenStack', 'VMware', 'Hyper-V', 'Load Balancing', 'Nginx', 'Apache', 'HAProxy', 'Reverse Proxy', 'Firewall', 'SSL/TLS', 'VPN', 'OpenVPN', 'WireGuard', 'Network Monitoring', 'DNS', 'DHCP', 'NFS', 'SFTP', 'SMTP', 'Postfix', 'MariaDB', 'MySQL', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Redis', 'RabbitMQ', 'Apache Kafka', 'Docker Swarm', 'Vagrant', 'K3s', 'Consul', 'Vault', 'Helm Charts', 'GitOps', 'CloudFormation', 'Azure DevOps', 'AWS Lambda', 'Google Cloud Functions', 'Serverless Framework', 'Terraform Cloud', 'Cloud Security', 'IAM', 'Secrets Management', 'Continuous Monitoring', 'Infrastructure as Code', 'Configuration Management', 'CI/CD Pipelines', 'Infrastructure Automation', 'Cluster Management', 'Logging and Monitoring', 'Microservices Architecture', 'Container Orchestration', 'Release Management', 'Automated Testing', 'Load Testing', 'Blue-Green Deployment', 'Canary Releases', 'Rolling Updates', 'Scripting', 'Bash', 'PowerShell', 'Python', 'Go', 'Ruby', 'Selenium', 'Cypress', 'Test Automation', 'Chaos Engineering', 'GitOps', 'Serverless', 'Cloud-native Apps'],
    dataScientist: ['Python', 'R', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'XGBoost', 'LightGBM', 'CatBoost', 'SQL', 'NoSQL', 'Hadoop', 'Spark', 'BigQuery', 'Tableau', 'Power BI', 'D3.js', 'Matplotlib', 'Plotly', 'Bokeh', 'JupyterLab', 'Google Colab', 'Machine Learning', 'Deep Learning', 'Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Natural Language Processing (NLP)', 'Computer Vision', 'Time Series Analysis', 'Feature Engineering', 'Model Evaluation', 'Cross-validation', 'Confusion Matrix', 'ROC Curve', 'Precision-Recall', 'Hyperparameter Tuning', 'Grid Search', 'Random Forest', 'K-Nearest Neighbors', 'Support Vector Machines (SVM)', 'Naive Bayes', 'Logistic Regression', 'Linear Regression', 'K-Means Clustering', 'Principal Component Analysis (PCA)', 'Dimensionality Reduction', 'Bayesian Inference', 'Ensemble Learning', 'Markov Chains', 'Monte Carlo Simulation', 'Data Cleaning', 'Data Preprocessing', 'Data Wrangling', 'Anomaly Detection', 'Clustering', 'Association Rule Learning', 'Collaborative Filtering', 'Recommender Systems', 'Data Visualization', 'SQL Databases', 'MongoDB', 'Apache Kafka', 'Apache Hive', 'Google Cloud ML', 'AWS SageMaker', 'Azure Machine Learning', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'Data Pipelines', 'ETL', 'Cloud Computing', 'Model Deployment', 'Model Monitoring', 'TensorFlow Serving', 'Flask', 'FastAPI', 'Docker', 'CI/CD for Machine Learning', 'MLflow', 'Data Version Control (DVC)', 'ML Ops', 'Jenkins', 'TDD', 'GitLab', 'Cloud Data Warehouses', 'ETL Pipelines', 'Model Interpretability', 'Shap', 'LIME', 'Explainability', 'Reproducibility', 'Experiment Tracking']
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
                        <option value="fullstack">Full Stack розробник</option>
                        <option value="mobile">Мобільний розробник</option>
                        <option value="designer">UI/UX дизайнер</option>
                        <option value="projectManager">Менеджер проєктів</option>
                        <option value="qa">Тестувальник (QA)</option>
                        <option value="sysadmin">Системний адміністратор</option>
                        <option value="devops">Інженер DevOps</option>
                        <option value="dataScientist">Аналітик даних</option>
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