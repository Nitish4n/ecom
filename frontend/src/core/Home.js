import React from 'react';
import Layout from './Layout';
import { API } from '../config';
const Home = () => {
    return (
        <div>
            <Layout title="Ecommerce" description="Ecommerce App Home Page" >
                {API}
            </Layout>
        </div>
    )
}

export default Home;