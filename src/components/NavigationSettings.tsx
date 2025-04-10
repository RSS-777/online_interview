"use client"

import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setProfession, setCategory } from "@/store/settings/settingsSlice";
import { AppDispatch, RootState } from "@/store/store";

import styles from '../styles/components/navigation-settings.module.scss';

export type TypeProfession = {
    frontend: string[];
    backend: string[];
    fullstack: string[];
    mobile: string[];
    designer: string[];
    projectManager: string[];
    qa: string[];
    sysadmin: string[];
    devops: string[];
    dataScientist: string[];
};

const profession: TypeProfession = {
    frontend: ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Vue.js', 'Angular'],
    backend: ['Node.js', 'Express', 'Java', 'PHP', 'Python', 'Ruby', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
    fullstack: ['HTML', 'CSS', 'JS', 'React', 'Node.js', 'Java', 'Python', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    mobile: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Java', 'SQLite'],
    designer: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD'],
    projectManager: ['Agile', 'Scrum', 'Jira', 'Trello', 'Kanban'],
    qa: ['Manual Testing', 'Automated Testing', 'Selenium', 'Cypress'],
    sysadmin: ['Linux', 'Windows Server', 'Networking', 'SSH', 'Bash scripting', 'MySQL', 'PostgreSQL'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'MySQL', 'PostgreSQL'],
    dataScientist: ['Machine Learning', 'Deep Learning', 'Python', 'R', 'TensorFlow', 'Pandas', 'SQL', 'MongoDB', 'PostgreSQL']
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
                        <option value="project-manager">Менеджер проєктів</option>
                        <option value="qa">Тестувальник (QA)</option>
                        <option value="sysadmin">Системний адміністратор</option>
                        <option value="devops">Інженер DevOps</option>
                        <option value="data-scientist">Аналітик даних</option>
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