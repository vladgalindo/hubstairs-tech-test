import React, {Fragment, useEffect, useRef, useState} from 'react';

export const Prime = () => {

    const primeFormRef = useRef();
    const primeInputRef = useRef();
    const [primeHistory, setPrimeHistory] = useState([]);
    const [latestPrime, setLatestPrime] = useState({});
    const DEFAULT_START_NUMBER = 1;
    const DEFAULT_START_INDEX = 1;

    const calculatePrime = async (e) => {
        e.preventDefault();

        const primeIdx = parseInt(primeInputRef.current.value);
        if (!(primeIdx > 0)) {
            throw new Error(`the prime index must a positive number grather than zero, received value: ${primeIdx}`)
        }

        let currentNumber = DEFAULT_START_NUMBER;
        let primeFound = DEFAULT_START_INDEX;

        while(primeFound <= primeIdx) {
            currentNumber += 1;
            for (let idx = 2; idx <= currentNumber; idx++) {
                if (currentNumber % idx === 0) {
                    if (currentNumber === idx) {
                        await setPrimeHistory(prevState => [...prevState, {index: primeFound, value: currentNumber}]);
                        primeFound += 1;
                    }
                    break;
                }
            }
        }

        console.log({index: primeFound, value: currentNumber});
        setLatestPrime({index: primeFound, value: currentNumber});
    };

    return (
        <Fragment>
            <h1 className="title">Prime</h1>
            <div className="columns">
                <div className="column is-4">
                    <section>
                        <form onSubmit={calculatePrime} ref={primeFormRef}>
                            <input type="text" className="input is-primary" name="primeIdx" ref={primeInputRef} placeholder="Introduce an index to calculate the corresponding Prime number"/>
                            <button className="button is-primary is-small">Calculate</button>
                        </form>
                        { latestPrime.index && (`The prime number for the index ${latestPrime.index} is ${latestPrime.value}`)}
                    </section>
                </div>
                <div className="column is-4">
                    <section id={'history'}>
                        Prime query history
                    </section>
                </div>
            </div>
        </Fragment>
    )
};
