 export async function getUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if(!response.ok){
        throw new Error("Failed to fetch users")
    }
    const users= await response.json();

    return users;
}

export async function createUser(user) {

    const response = await fetch("https://jsonplaceholder.typicode.com/users",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
       }
    )
    
    if(!response.ok){
        throw new Error("Failed to Add user")
    }

    const newUser = await response.json(); 
    return newUser;
}

export async function updateUser(id,user) {

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
        {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
       }
    )

    if(!response.ok){
        throw new Error("Failed to update user")
    }

    const updatedUser = await response.json(); 
    return updatedUser;
}

export async function deleteUser(id) {

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
   
    return true;
}