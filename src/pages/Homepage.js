import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";

const Card = () => {

    const [elephants, setElephants] = useState([]);

    useEffect(() => {
        fetch("/elephants")
        .then(res => res.json())
        .then(data => setElephants(data))
    }, []);

    return (
        <div className="cards">
            {elephants.map((elephant, index) => {
                if(elephant.index) return (

                    <article className="card" key={elephant._id} >
                        <div className="image">
                            <Link key={elephant._id} className="image-link" to={`/detail/${index}`}>
                                <img src={elephant.image} alt={elephant.name}/>
                            </Link>
                        </div>
                        <div className="text">
                            <Link key={elephant._id} to={`/detail/${index}`}>
                                <h3>{elephant.name}</h3>
                            </Link>
                            <ul className="parameters">
                                <li><span>affiliation:</span> {elephant.affiliation}</li>
                                <li><span>species:</span> {elephant.species}</li>
                                <li><span>sex:</span> {elephant.sex}</li>
                            </ul>
                            <p className="description">
                                {elephant.note}
                            </p>
                        </div>
                    </article>
                );
            })}
        </div>
    )
}

export {Card}
