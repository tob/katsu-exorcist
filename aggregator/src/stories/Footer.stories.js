import React from 'react';
import { action } from '@storybook/addon-actions';
import Footer from '../components/footer'

export default {
    title: 'Footer',
};


export const plain = () => {
    return (
        <>
            <Footer />
            <Footer emoji={'whatever'} />
    </>)
}
