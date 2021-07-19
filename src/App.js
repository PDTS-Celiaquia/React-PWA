import React, { Suspense } from 'react'
import { Provider } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import MainRouter from './router/MainRouter'
import getStore from './store';

const Loader = () => <CircularProgress />


export default function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Provider store={getStore()}>
                <MainRouter />
            </Provider>
        </Suspense>
    )
}
