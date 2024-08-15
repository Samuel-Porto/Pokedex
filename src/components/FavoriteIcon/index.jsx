import { FaRegHeart as EmptyHeartIcon, FaHeart as HeartIcon } from 'react-icons/fa'

function FavoriteIcon({ isFavorite }) {
    return ( <span>
        {isFavorite?
            <HeartIcon size={28} color='var(--highlighted-color)' />:
            <EmptyHeartIcon size={28} color='var(--highlighted-color)' />
        }
    </span> );
}

export default FavoriteIcon;