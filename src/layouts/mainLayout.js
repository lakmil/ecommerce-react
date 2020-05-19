import React from 'react';
import Header from './../Components/Header/index';
import Footer from './../Components/Footer/index';

const MainLayout = (props) => {
    return (
        <div>
            <Header {...props} />
            <div className="main">
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;