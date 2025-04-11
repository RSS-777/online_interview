"use client"
import { useState, useRef } from 'react';
import styles from '../styles/components/InformationProfession.module.scss';

type TypeRoles = {
    title: string,
    description: string
};

const roles: TypeRoles[] = [
    {
        title: "Frontend Developer",
        description: "Розробляє інтерфейси веб-сайтів і додатків, працює з HTML, CSS, JavaScript та фреймворками (React, Vue.js, Angular)."
    },
    {
        title: "Backend Developer",
        description: "Створює серверну частину додатків, працює з базами даних, серверними мовами програмування (Node.js, Python, Java, PHP)."
    },
    {
        title: "Full Stack Developer",
        description: "Займається як фронтенд, так і бекенд розробкою, має досвід роботи з усіма частинами веб-додатку."
    },
    {
        title: "Mobile Developer",
        description: "Розробляє мобільні додатки для платформ Android та iOS, використовує мови програмування, такі як Swift, Kotlin, або фреймворки, як React Native."
    },
    {
        title: "UI/UX Designer",
        description: "Створює інтерфейси користувача, орієнтуючись на зручність та привабливість, займається прототипуванням і дослідженнями користувачів."
    },
    {
        title: "Project Manager",
        description: "Керує розробкою проєктів, визначає вимоги, організовує роботу команди, слідкує за виконанням термінів і бюджету."
    },
    {
        title: "QA Tester",
        description: "Перевіряє програмне забезпечення на наявність помилок, виконує ручне та автоматизоване тестування, забезпечує якість продукту."
    },
    {
        title: "System Administrator",
        description: "Відповідає за налаштування, підтримку та управління серверами, мережами та іншою інфраструктурою."
    },
    {
        title: "DevOps Engineer",
        description: "Забезпечує безперервну інтеграцію та доставку, автоматизує інфраструктуру та процеси розгортання програмного забезпечення."
    },
    {
        title: "Data Scientist",
        description: "Аналізує дані для прийняття бізнес-рішень, створює звіти та візуалізації для керівництва компанії."
    }
];

type TypeInformationProfession = {
    hideInfo: boolean
};

export const InformationProfession = ({ hideInfo }: TypeInformationProfession) => {
    const [text, setText] = useState<string>('')
    const paragrafRef = useRef<HTMLParagraphElement>(null);

    const handleShowInfo = (value: string) => {
        if (!paragrafRef.current) return

        paragrafRef.current.classList.remove(styles['show-element']);
        void paragrafRef.current.offsetWidth;

        roles.forEach(elem => {
            if (elem.title === value) {
                setText(elem.description)
            }
        })

        paragrafRef.current.classList.add(styles['show-element'])
    }

    return (
        <div className={hideInfo ? styles.hideInfo : styles["container-info"]}>
            <ul>
                <li onClick={() => handleShowInfo('Frontend Developer')}>Фронтенд розробник</li>
                <li onClick={() => handleShowInfo('Backend Developer')}>Бекенд розробник</li>
                <li onClick={() => handleShowInfo('Full Stack Developer')}>Full Stack розробник</li>
                <li onClick={() => handleShowInfo('Mobile Developer')}>Мобільний розробник</li>
                <li onClick={() => handleShowInfo('UI/UX Designer')}>UI/UX дизайнер</li>
                <li onClick={() => handleShowInfo('Project Manager')}>Менеджер проєктів</li>
                <li onClick={() => handleShowInfo('QA Tester')}>Тестувальник (QA)</li>
                <li onClick={() => handleShowInfo('System Administrator')}>Системний адміністратор</li>
                <li onClick={() => handleShowInfo('DevOps Engineer')}>Інженер DevOps</li>
                <li onClick={() => handleShowInfo('Data Scientist')}>Аналітик даних</li>
            </ul>
            <div className={styles['block-text-info']}>
                <p ref={paragrafRef}>{text}</p>
            </div>
        </div>
    )
};
