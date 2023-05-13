import React from 'react';
import Categories from "../components/main/Categories";
import Advantages from "../components/main/advantages/Advantages";
import TopBrands from "../components/main/TopBrands";
import Socials from "../components/main/Socials";

const MainPage = () => {
    return (
        <section className={"section-page"}>
            <Categories />
            <Advantages />
            <TopBrands />
            <Socials />
        </section>
    );
};

export default MainPage;