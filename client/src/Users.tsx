import React from 'react'
import {gql,useQuery} from "@apollo/client"


const USER_QUERY = gql`
query USERS_QUERY{
    users{
        id
        name
    }
}`
interface User{
    name: string
}

export default function Users() {
    const {loading,error,data}= useQuery(USER_QUERY);
    if(loading) return <p>loading...</p>
    if(error) return <p>error</p>
    return (
        <div>
            
            data.users.map{
                (user: User) => {<p>{user.name}</p>}
            }
            
        </div>
    )
}
