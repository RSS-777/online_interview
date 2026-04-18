import styles from '../styles/components/header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Тестова онлайн-співбесіда</h1>
            <blockquote>
                Це більше, ніж тренування. Це перший крок до впевненішої співбесіди:
                безпечне середовище, реалістичні запитання та можливість спокійно
                прокачати свої відповіді разом зі штучним інтелектом.
            </blockquote>
        </header>
    )
};
