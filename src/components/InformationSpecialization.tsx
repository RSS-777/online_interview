"use client"

import { useRef, useState } from 'react';
import styles from '../styles/components/InformationSpecialization.module.scss';

type SpecializationInfo = {
    id: string;
    label: string;
    description: string;
};

const specializationDetails: SpecializationInfo[] = [
    {
        id: 'frontend',
        label: 'Фронтенд-розробник',
        description: 'Розробляє інтерфейси вебсайтів і застосунків, працює з HTML, CSS, JavaScript та сучасними фреймворками на кшталт React, Vue або Angular.'
    },
    {
        id: 'backend',
        label: 'Бекенд-розробник',
        description: 'Створює серверну логіку застосунків, працює з базами даних, API, авторизацією та інфраструктурою бекенду.'
    },
    {
        id: 'fullstack',
        label: 'Full Stack-розробник',
        description: 'Поєднує фронтенд- і бекенд-розробку, розуміє повний цикл створення вебпродукту та може працювати з різними частинами системи.'
    },
    {
        id: 'mobile',
        label: 'Мобільний розробник',
        description: 'Створює мобільні застосунки для Android та iOS, використовуючи нативні мови або кросплатформні інструменти, як-от Flutter чи React Native.'
    },
    {
        id: 'designer',
        label: 'UI/UX дизайнер',
        description: 'Проєктує інтерфейси та користувацький досвід, працює з прототипами, дослідженнями, дизайн-системами та візуальною логікою продукту.'
    },
    {
        id: 'project-manager',
        label: 'Менеджер проєктів',
        description: 'Організовує роботу команди, планує етапи розробки, контролює строки, пріоритети та комунікацію між учасниками проєкту.'
    },
    {
        id: 'qa',
        label: 'Тестувальник (QA)',
        description: 'Перевіряє якість продукту, знаходить помилки, готує тест-кейси та допомагає команді випускати стабільніші версії застосунку.'
    },
    {
        id: 'sysadmin',
        label: 'Системний адміністратор',
        description: 'Підтримує сервери, мережі та інфраструктуру, стежить за доступністю сервісів, безпекою та стабільною роботою систем.'
    },
    {
        id: 'devops',
        label: 'DevOps-інженер',
        description: 'Автоматизує процеси розгортання, налаштовує CI/CD, працює з контейнерами, хмарними сервісами та інфраструктурою.'
    },
    {
        id: 'data-scientist',
        label: 'Data Scientist',
        description: 'Аналізує дані, будує моделі, шукає закономірності та допомагає бізнесу приймати рішення на основі даних.'
    }
];

type InformationSpecializationProps = {
    hideInfo: boolean;
};

export const InformationSpecialization = ({ hideInfo }: InformationSpecializationProps) => {
    const [selectedDescription, setSelectedDescription] = useState('')
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const handleSpecializationSelect = (specializationId: string) => {
        if (!descriptionRef.current) return

        descriptionRef.current.classList.remove(styles['show-element']);
        void descriptionRef.current.offsetWidth;

        const selectedSpecialization = specializationDetails.find((specialization) => specialization.id === specializationId);
        setSelectedDescription(selectedSpecialization?.description ?? '')

        descriptionRef.current.classList.add(styles['show-element'])
    }

    return (
        <div className={hideInfo ? styles.hideInfo : styles["container-info"]}>
            <ul>
                {specializationDetails.map((specialization) => (
                    <li key={specialization.id} onClick={() => handleSpecializationSelect(specialization.id)}>
                        {specialization.label}
                    </li>
                ))}
            </ul>
            <div className={styles['block-text-info']}>
                <p ref={descriptionRef}>{selectedDescription}</p>
            </div>
        </div>
    )
};
