import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";

const Detail = () => {
    const {id} = useParams();
    const [elephants, setElephants] = useState([]);

    useEffect(() => {
        fetch("/elephants")
            .then(res => res.json())
            .then(data => setElephants(data))
    }, []);

    const checkId = (e) => {
        if (e.index && e._id === id) {
            return true;
        }
    };

    const sortedElephant = elephants.filter(checkId);

    return (
        <div>
            {sortedElephant.map((elephant) => {
                return (
                    <div className="detail">
                        <div className="detail-image">
                            <a key={elephant._id} className="detail-image-link" href={elephant.wikilink}>
                                <img src={elephant.image} alt={elephant.name}/>
                            </a>
                        </div>
                        <div className="detail-text">
                            <a key={elephant._id} href={elephant.wikilink}>
                                <h1>{elephant.name}</h1>
                            </a>
                            <ul className="detail-parameters">
                                <li><span>Affiliation:</span> {elephant.affiliation}</li>
                                <li><span>Species:</span> {elephant.species}</li>
                                <li><span>Sex:</span> {elephant.sex}</li>
                                <li><span>Fictional:</span> {elephant.fictional}</li>
                                <li><span>Dob:</span> {elephant.dob}</li>
                                <li><span>Dod:</span> {elephant.dod}</li>
                            </ul>
                            <p className="detail-description">
                                {elephant.note}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export {Detail}
