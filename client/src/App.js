import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./components/routes/AppRoute";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {Context} from "./index";
import {check} from "./http/userApi";
import {TailSpin} from "react-loader-spinner";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const {user} = React.useContext(Context)
    const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
        }, 1000)
    }, [user])

    if (loading) {
        return <div className="loader">
            <TailSpin
                height="100"
                width="80"
                color="#0F3072"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    return (
        <BrowserRouter>
            <Header/>
            <main className="main">
                <AppRoute/>
            </main>
            <Footer/>
        </BrowserRouter>
    );
});

export default App;