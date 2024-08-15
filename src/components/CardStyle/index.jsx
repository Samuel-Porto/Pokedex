import classes from './CardStyle.module.css';

function CardStyle({ children, iconImage }) {
    return ( <div className={classes.card}>
        <figure className={classes.icon}>
            <img src={iconImage} />
        </figure>
        <div className={classes.content}>
            {children}
        </div>
    </div> );
}

export default CardStyle;