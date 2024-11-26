import { useEffect } from "react";
import Service from "../../store/service";
import { useParams, useSearchParams } from "react-router-dom";

export default function OAuth2() {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const code = searchParams.get( `code` );

    useEffect( () => {

        if ( code ) {

            Service.discordAxios.post( `/oauth2/token`,
                `client_id=${ `1223544374101671976` }&client_secret=${ `4BsnmrT0SpgbFfXQwt5NFXkcQA5RcMdm` }&code=${ code }&grant_type=authorization_code&redirect_uri=https://adrianwheeler.tech/oauth2&scope=identify+guilds`, {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            } ).then( async ( response ) => {

                const { data: userData } = await Service.discordAxios.get( `/users/@me/guilds`, {
                    headers: {
                        Authorization: `${ response.data.token_type } ${ response.data.access_token }`
                    }
                } );
                console.log( `userData`, userData );

            } ).catch( console.error );

        }

        // const fragment = new URLSearchParams( window.location.hash.slice( 1 ) );
        // const [ accessToken, tokenType ] = [ fragment.get( 'access_token' ), fragment.get( 'token_type' ) ];

        // console.log( `accessToken`, accessToken );
        // console.log( `tokenType`, tokenType );
        // if ( accessToken ) {

        //     Service.discordAxios.get( `/users/@me`, { headers: {
        //         Authorization: `${ tokenType } ${ accessToken }`
        //     } } ).then( ( response ) => {

        //         console.log( `response`, response.data )

        //     } ).catch( console.error );

        // }

    }, [] );

    return (
        <div>
        </div>
    );

}