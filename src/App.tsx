import React from 'react';

import GlobalStyles from './styles/GlobalStyles';
import PomodoroTimer from './components/PomodoroTimer';

export default function App(): JSX.Element {
    return (
        <>
            <GlobalStyles />
            <PomodoroTimer workTime={1500} shortRestTime={300} longRestTime={600} cycles={4} />
        </>
    );
}
