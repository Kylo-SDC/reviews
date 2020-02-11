import React, { useState } from 'react';

const Toolbar = ({ sortReviews }) => {
  const [rating, setRating] = useState('');
  const [filters, setFilters] = useState([]);

  const handleSelection = (e) => {
    setRating(e.target.value);
    sortReviews(e.target.value, filters);
  };

  const handleCheck = (e) => {
    const tempArray = filters.slice();
    if (e.target.checked) {
      tempArray.push(e.target.value);
    } else {
      const i = filters.indexOf(e.target.value);
      tempArray.splice(i, 1);
    }
    setFilters(tempArray);
    sortReviews(rating, tempArray);
  };

  return (
    <div>
      <div className="dropdown">
        <div className="dropbtn" role="button">{ rating || 'Sort by' }</div>
        <div className="dropdown-content">
          <div className="drop">
            <span className="select-drop">
              <input className="radio" type="radio" value="Newest" id="radio-1" checked={rating === 'Newest'} onChange={(e) => handleSelection(e)} />
              <label className="tool-txt" htmlFor="radio-1">Newest</label>
            </span>
            <span className="select-drop">
              <input className="radio" type="radio" value="Highest" id="radio-2" checked={rating === 'Highest'} onChange={(e) => handleSelection(e)} />
              <label className="tool-txt" htmlFor="radio-2">Highest rating</label>
            </span>
            <span className="select-drop">
              <input className="radio" type="radio" value="Lowest" id="radio-3" checked={rating === 'Lowest'} onChange={(e) => handleSelection(e)} />
              <label className="tool-txt" htmlFor="radio-3">Lowest rating</label>
            </span>

          </div>
        </div>
      </div>

      <div className="filter-header">Filters</div>
      <div className="boxes">
        <div className="filter-name">
          <input
            type="checkbox"
            id="checkbox-1"
            className="regular-checkbox"
            value="Good for groups"
            onChange={(e) => handleCheck(e)}
          />
          <label htmlFor="checkbox-1" />
          <label className="tag" htmlFor="checkbox-1"> Good for groups</label>
        </div>
        <div className="filter-name">
          <input
            type="checkbox"
            id="checkbox-2"
            className="regular-checkbox"
            value="Appetizers"
            onChange={(e) => handleCheck(e)}
          />
          <label htmlFor="checkbox-2" />
          <label className="tag" htmlFor="checkbox-2"> Appetizers</label>
        </div>
        <div className="filter-name">
          <input
            type="checkbox"
            id="checkbox-3"
            className="regular-checkbox"
            value="Drinks"
            onChange={(e) => handleCheck(e)}
          />
          <label htmlFor="checkbox-3" />
          <label className="tag" htmlFor="checkbox-3"> Drinks</label>
        </div>
      </div>
      <div className="boxes">
        <div className="filter-name">
          <input
            type="checkbox"
            id="checkbox-4"
            className="regular-checkbox"
            value="Desserts"
            onChange={(e) => handleCheck(e)}
          />
          <label htmlFor="checkbox-4" />
          <label className="tag" htmlFor="checkbox-4"> Desserts</label>
        </div>
        <div className="filter-name">
          <input
            type="checkbox"
            id="checkbox-5"
            className="regular-checkbox"
            value="Kid friendly"
            onChange={(e) => handleCheck(e)}
          />
          <label htmlFor="checkbox-5" />
          <label className="tag" htmlFor="checkbox-5"> Kid friendly</label>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
