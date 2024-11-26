import axios from "axios"; 

export default class Service {

    static guildAxios = axios.create( { baseURL: `https://adrianwheeler.tech` } );
    static discordAxios = axios.create( { baseURL: `https://discord.com/api` } );

}