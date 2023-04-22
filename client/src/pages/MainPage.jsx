import React from 'react';
import Categories from "../components/main/Categories";
import Advantages from "../components/main/Advantages";

const MainPage = () => {
    return (
        <section className={"section-page site-container"}>
            <Categories />
            <Advantages />
        </section>
    );
};

export default MainPage;