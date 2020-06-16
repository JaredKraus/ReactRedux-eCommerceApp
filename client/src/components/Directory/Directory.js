import React from 'react';
import ShopMens from '../../assets/ShopMens.jpg';
import ShopWomen from '../../assets/ShopWomen.jpg';
import './directoryStyles.scss';


const Directory = props => {

  return (
    <div className="directory">
      <div className="wrap">
        <div
          style={{backgroundImage: `url(${ShopWomen})`}}
          className="item"
        >
          <a>Shop Womens</a>
        </div>

        <div
          style={{backgroundImage: `url(${ShopMens})`}}
          className="item"
        >
          <a>Shop Mens</a>
        </div>
     </div>
    </div>
  );
}

export default Directory;
