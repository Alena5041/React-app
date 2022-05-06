import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = ({ name }) => {

    const [elephants, setElephants] = useState([]);
    const [elephantsSex, setElephantsSex] = useState("")
    const [elephantsSpecies, setElephantsSpecies] = useState("")
    const [sexMale, setSexMale] = useState(false)
    const [sexFemale, setSexFemale] = useState(false)
    const [speciesAsian, setSpeciesAsian] = useState(false)
    const [speciesAfrican, setSpeciesAfrican] = useState(false)

    const changeSexMale = () => {
        setSexMale(!sexMale);
    }

    const changeSexFemale = () => {
        setSexFemale(!sexFemale);
    }

    const changeSpeciesAsian = () => {
        setSpeciesAsian(!speciesAsian);
    }

    const changeSpeciesAfrican = () => {
        setSpeciesAfrican(!speciesAfrican);
    }

    const submitFilter = () => {
        if (speciesAsian && !speciesAfrican) {
            setElephantsSpecies("Asian");
        } else if (speciesAfrican && !speciesAsian) {
            setElephantsSpecies("African");
        } else if ((speciesAsian && speciesAfrican) || (!speciesAsian && !speciesAfrican)) {
            setElephantsSpecies("");
        }
        if (sexMale && !sexFemale) {
            setElephantsSex("Male");
        } else if (sexFemale && !sexMale) {
            setElephantsSex("Female");
        } else if ((sexMale && sexFemale) || (!sexMale && !sexFemale)) {
            setElephantsSex("");
        }
    };

    const resetFilter = () => {
        resetSexFilter();
        resetSpeciesFilter();
    }

    const resetSexFilter = () => {
        setSexMale(false);
        setSexFemale(false);
        setElephantsSex("");
    }

    const resetSpeciesFilter = () => {
        setSpeciesAsian(false);
        setSpeciesAfrican(false);
        setElephantsSpecies("");
    }

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                <span>{label}</span>
            </label>
        );
    };

    useEffect(() => {
        fetch("/elephants")
        .then(res => res.json())
        .then(data => setElephants(data))
    }, [name, elephantsSex, elephantsSpecies]);

    const checkFilter = (e) => {
        const id = e.index;
        if ((id && e.sex === elephantsSex && e.species === elephantsSpecies) ||
            (id && e.sex === elephantsSex && elephantsSpecies === "") ||
            (id && elephantsSex === "" && e.species === elephantsSpecies) ||
            (id && elephantsSex === "" && elephantsSpecies === ""))
        {
            return true;
        }
    };

    const sortedElephants = elephants.filter(checkFilter);

    return (
        <div className="content">
            <div className="filters">
                <div className="filter">
                    <h4>Sex</h4>
                    <ul>
                        <li>
                            <Checkbox
                                label="Male"
                                value={sexMale}
                                onChange={changeSexMale}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="Female"
                                value={sexFemale}
                                onChange={changeSexFemale}
                            />
                        </li>
                    </ul>
                </div>
                <div className="filter">
                    <h4>Species</h4>
                    <ul>
                        <li>
                            <Checkbox
                                label="Asian"
                                value={speciesAsian}
                                onChange={changeSpeciesAsian}
                            />
                        </li>
                        <li>
                            <Checkbox
                                label="African"
                                value={speciesAfrican}
                                onChange={changeSpeciesAfrican}
                            />
                        </li>
                    </ul>
                </div>
                <button className="filters-button" onClick={submitFilter}>Apply filter</button>
                <button className="filters-button" onClick={resetFilter}>Reset filter</button>
            </div>
            <div className="cards">
                {sortedElephants.map((elephant) => {
                    return (
                        <article className="card" key={elephant._id} >
                            <div className="image">
                                <Link key={elephant._id} className="image-link" to={`/detail/${elephant._id}`}>
                                    <img src={elephant.image} alt={elephant.name}/>
                                </Link>
                            </div>
                            <div className="text">
                                <Link key={elephant._id} to={`/detail/${elephant._id}`}>
                                    <h3>{elephant.name}</h3>
                                </Link>
                                <ul className="parameters">
                                    <li><span>Affiliation:</span> {elephant.affiliation}</li>
                                    <li><span>Species:</span> {elephant.species}</li>
                                    <li><span>Sex:</span> {elephant.sex}</li>
                                </ul>
                                <p className="description">
                                    {elephant.note}
                                </p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export {Homepage}
