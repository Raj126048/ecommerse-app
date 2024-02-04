const gettoken =localStorage.getItem("auth")?JSON.parse(localStorage.getItem("auth")):null;

export const config={
    headers:{
        Authorization:` ${gettoken!==null?gettoken.token:''}`,
        Accept:"application/json"
    }
}