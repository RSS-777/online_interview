import styles from '../styles/components/header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Тестова онлайн-співбесіда</h1>
            <blockquote>
                Це більше, ніж тренування — це твій перший крок до успішної кар&apos;єри. Мрія про роботу ближче, ніж здається. Реалістична співбесіда зі штучним інтелектом в безпечному середовищі, де помилки стають досвідом, а досвід — силою, що допомагає розкрити твій потенціал.
            </blockquote>
        </header>
    )
};