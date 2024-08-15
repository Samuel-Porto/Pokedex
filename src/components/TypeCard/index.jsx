import classes from './TypeCard.module.css';
import colors from '../../hooks/typeColors.json';

function TypeCard({ type, damage = null }) {
    return ( <div
        className={classes.card}
        style={{
            backgroundColor: colors[type],
            border: `3px solid color-mix(in srgb, ${colors[type]}, black 25%)`
        }}
    >
        <img src={`./img/typesImage/${type}.png`} alt="" />
        <p>{type}</p>
        {damage !== null && <span>{damage}x</span>}
    </div> );
}

export default TypeCard;