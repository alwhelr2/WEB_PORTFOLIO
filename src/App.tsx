import { connect } from "react-redux";
import { RootState } from "./store/reducers/rootReducer";
import { useEffect } from "react";
import { fetchGuildRequest, fetchGuildsRequest } from "./store/actions/guildActions";
import { fetchUserRequest, fetchUsersRequest } from "./store/actions/userActions";
import './App.css';
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./portfolio/Home";
import Navbar from "./navbar";
import Resume from "./portfolio/Resume";
import Footer from "./footer";
import BotNav from "./bot/BotNav";
import BotHome from "./bot/BotHome";
import BotGuilds from "./bot/BotGuilds";
import BotUsers from "./bot/BotUsers";
import BotGuild from "./bot/BotGuild";
import BotUser from "./bot/BotUser";
import BotTriggers from "./bot/BotTriggers";
import BotTrigger from "./bot/BotTrigger";
import BotReactRoles from "./bot/BotReactRoles";
import BotReactRole from "./bot/BotReactRole";
import Devicon from "./pages/Devicon";
import OAuth2 from "./bot/OAuth2";

const App = () => {

    useEffect( () => {

    }, [] );

    return (
        <div className='App roboto-condensed-font d-flex flex-column'>
            <Navbar />
            <Routes>
                <Route element={
                    <>
                        <Outlet />
                        <Footer />
                    </>
                }>
                    <Route path='*' element={ <Devicon /> } />
                    <Route path='/' element={ <Home /> } />
                    <Route path='/resume' element={ <Resume /> } />
                    {/* <Route path='/oauth2' element={ <OAuth2 /> } /> */}
                </Route>
                <Route path='/discord-bot' element={
                    <div className='BotMain d-flex flex-row flex-grow-1'>
                        <BotNav />
                        <div className='discord-bot d-flex flex-column flex-grow-1'>
                            <div className='discord-bot-card flex-grow-1'>
                                <Outlet />
                            </div>
                            <Footer />
                        </div>
                    </div>
                }>
                    <Route path='' element={ <BotHome /> } />
                    <Route path='servers' element={ <BotGuilds /> } />
                    <Route path='users' element={ <BotUsers /> } />
                    <Route path='server/:id' element={ <BotGuild /> } />
                    <Route path='user/:id' element={ <BotUser /> } />
                    <Route path='triggers' element={ <BotTriggers /> } />
                    <Route path='trigger/:id' element={ <BotTrigger /> } />
                    <Route path='reactionroles' element={ <BotReactRoles /> } />
                    <Route path='reactionrole/guild/:guildid/message/:messageid/emoji/:emojiid' element={ <BotReactRole /> } />
                </Route>
            </Routes>
        </div>
    );

}

const mapStateToProps = ( state: RootState ) => ( {
    guildState: state.guildReducer,
    userState: state.userReducer
} );

const mapDispatchToProps = {
    fetchGuildsRequest,
    fetchUsersRequest,
    fetchGuildRequest,
    fetchUserRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( App );