import React from 'react';
import Header from './../Components/Header/index';
import Footer from './../Components/Footer/index';

const HomepageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header {...props} />
            {props.children}
            <Footer />
        </div>
    );
}

export default HomepageLayout;