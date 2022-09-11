import React from 'react'

export default function TextInput({ searchValue, handleChange }) {
    return (
        <input type='search' className='text-input' onChange={handleChange} value={searchValue}  placeholder='type your search'></input>
    )
}
