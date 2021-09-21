import React, { useEffect, useState } from 'react';

import { Container } from '../../styles/styled.components';
import secondsToTime from '../../utils/secondsToTime';

import { Title, Time, Controls, Details } from './styled';

type propTypes = {
    workTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
};

export default function PomodoroTimer(props: propTypes): JSX.Element {
    const [mainTime, setMainTime] = useState(props.shortRestTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [currentCycles, setCurrentCycles] = useState(1);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [completedPomodoros, setCompletedPomodoros] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);

    const startWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setMainTime(props.workTime);
        console.log('Working...');
    };

    const startRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setMainTime(long ? props.longRestTime : props.shortRestTime);
        console.log('Resting...');
    };

    const nextCycle = () => {
        if (currentCycles < props.cycles) {
            startRest(false);
            setCurrentCycles(currentCycles + 1);
        } else if (currentCycles === props.cycles) {
            startRest(true);
            setCurrentCycles(1);
            setCompletedCycles(completedCycles + 1);
        }
        setCompletedPomodoros(completedPomodoros + 1);
    };

    useEffect(() => {
        if (mainTime === 0) setTimeCounting(false);
        if (!timeCounting) return;

        const interval = setInterval(() => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [mainTime, fullWorkingTime, timeCounting]);

    useEffect(() => {
        working ? document.body.classList.add('working') : document.body.classList.remove('working');
        if (mainTime > 0) return;
        working ? nextCycle() : startWork();
    }, [working, mainTime]);

    return (
        <Container>
            <Title>You are: {working ? 'Working' : 'Resting'}</Title>
            <Time>{secondsToTime(mainTime)}</Time>
            <Controls>
                <button onClick={() => startWork()}>Working</button>
                <button onClick={() => startRest(false)}>Resting</button>
                <button onClick={() => setTimeCounting(!timeCounting)}>{timeCounting ? 'Pause' : 'Play'}</button>
            </Controls>
            <Details>
                <p>Ciclos concluídos: {completedCycles}</p>
                <p>Pomodoros concluídos: {completedPomodoros}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime, true)}</p>
            </Details>
        </Container>
    );
}
