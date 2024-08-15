import classes from './Popup.module.css';

function Popup({ children, iconImage, setIsPopupHidden }) {
    return ( <div className={classes.popup} onClick={() => setIsPopupHidden(true)}>
        {iconImage && <img src={iconImage} />}
        <span onClick={e => e.stopPropagation()}>
            {children}
        </span>
    </div> );
}

export default Popup;