import React from 'react'

import "./styles.css"
const Pagination = ({repsPerPage, totalReps, paginate}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalReps / repsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li className="page-item" key={number}>
                            <a href="!#" className="page-link" onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pagination;