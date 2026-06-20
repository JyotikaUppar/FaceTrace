import React from 'react'

const SearchButton = ({ onInputChange, onSearch, currentValue }) => {
  return (
    <div className="search-bar">
      <input 
        type="search" 
        placeholder='search location by adhaar' 
        name="search" 
        pattern=".*\S.*" 
        required 
        onChange={onInputChange}
        value={currentValue}
      />
      <button className="search-btn" onClick={onSearch} />
    </div>
  )
}

export default SearchButton
