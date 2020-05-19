import React from 'react';
import Man from '../../assets/Man.jpg';
import Women from '../../assets/Women.jpg';
import './styles.scss';

const Directory = (props) => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{ backgroundImage: `url(${Man})` }}>
                    <a href="">Shop Mens</a>
                </div>
                <div className="item" style={{ backgroundImage: `url(${Women})` }}>
                    <a href="">Shop Womens</a>
                </div>
            </div>
        </div>
    );
}

export default Directory;