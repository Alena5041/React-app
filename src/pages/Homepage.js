import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";

const Homepage = ({ name }) => {

    const [elephants, setElephants] = useState([]);
    const [elephant, setElephant] = useState({});
    const [elephantsSex, setElephantsSex] = useState("")
    const [elephantsSpecies, setElephantsSpecies] = useState("")
    const [sexMale, setSexMale] = useState(false)
    const [sexFemale, setSexFemale] = useState(false)
    const [speciesAsian, setSpeciesAsian] = useState(false)
    const [speciesAfrican, setSpeciesAfrican] = useState(false)

    const changeSexMale = () => {
        setSexMale(!sexMale);
        resetSpeciesFilter();
    }

    const changeSexFemale = () => {
        setSexFemale(!sexFemale);
        resetSpeciesFilter();
    }

    const resetSexFilter = () => {
        setSexMale(false);
        setSexFemale(false);
        setElephantsSex("");
    }

    const changeSpeciesAsian = () => {
        setSpeciesAsian(!speciesAsian);
        resetSexFilter();
    }

    const changeSpeciesAfrican = () => {
        setSpeciesAfrican(!speciesAfrican);
        resetSexFilter();
    }

    const resetSpeciesFilter = () => {
        setSpeciesAsian(false);
        setSpeciesAfrican(false);
        setElephantsSpecies("");
    }

    const filterSex = () => {
        if (sexMale && !sexFemale) {
            setElephantsSex("Male");
        } else if (sexFemale && !sexMale) {
            setElephantsSex("Female");
        } else if ((sexMale && sexFemale) || (!sexMale && !sexFemale)) {
            setElephantsSex("");
        }
    };

    const filterSpecies = () => {
        if (speciesAsian && !speciesAfrican) {
            setElephantsSpecies("Asian");
        } else if (speciesAfrican && !speciesAsian) {
            setElephantsSpecies("African");
        } else if ((speciesAsian && speciesAfrican) || (!speciesAsian && !speciesAfrican)) {
            setElephantsSpecies("");
        }
    };

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                <span>{label}</span>
            </label>
        );
    };

    useEffect(() => {
        if (name) {
            fetch(`/elephants/name/${name}`)
            .then(res => res.json())
            .then(data => setElephant(data))
        } else if (elephantsSex) {
            fetch(`/elephants/sex/${elephantsSex}`)
                .then(res => res.json())
                .then(data => setElephants(data))
        } else if (elephantsSpecies) {
            fetch(`/elephants/species/${elephantsSpecies}`)
                .then(res => res.json())
                .then(data => setElephants(data))
        } else {
            fetch("/elephants")
            .then(res => res.json())
            .then(data => setElephants(data))
        }
    }, [name, elephantsSex, elephantsSpecies]);

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
                    <button className="filters-button" onClick={filterSex}>Filter by sex</button>
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
                    <button className="filters-button" onClick={filterSpecies}>Filter by species</button>
                </div>
            </div>
            <div className="cards">
                {name.length > 0 && (
                    <article className="card" key={elephant._id} >
                        <div className="image">
                            <div className="image-link">
                                <img src={elephant.image} alt={elephant.name}/>
                            </div>
                        </div>
                        <div className="text">
                            <h3>{elephant.name}</h3>
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
                )}
                {name.length === 0 && (
                    // eslint-disable-next-line array-callback-return
                    elephants.map((elephant, index) => {
                        if(elephant.index) { return (

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
                                        <li><span>Affiliation:</span> {elephant.affiliation}</li>
                                        <li><span>Species:</span> {elephant.species}</li>
                                        <li><span>Sex:</span> {elephant.sex}</li>
                                    </ul>
                                    <p className="description">
                                        {elephant.note}
                                    </p>
                                </div>
                            </article>
                        )} else {
                            return false
                        }
                    })
                )}
            </div>
        </div>
    )
}

export {Homepage}
