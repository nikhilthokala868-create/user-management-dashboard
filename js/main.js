import { createUser, getUsers, updateUser ,deleteUser} from "./api.js";
import { renderUsers } from "./ui.js";

const loading = document.getElementById("loading")
const searchInput = document.getElementById("search")

let users =[];

async function loadUsers() {

    try{
        loading.textContent="Loading Users...";
        
        users = await getUsers();
        renderUsers(users)
    
        
        loading.textContent="";
        
    }catch(error){
        loading.textContent="Failed to fetch Users";
        console.log("ERROR :",error.message)
       
    }
}
searchInput.addEventListener("input",function(){
    const searchValue = searchInput.value.trim().toLowerCase();

    if(searchValue === ""){
        renderUsers(users)
        return;
        }

        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchValue)

            );

            renderUsers(filteredUsers)
});



loadUsers()
    

const userform = document.getElementById("userForm")
userform.addEventListener("submit",async function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;


  const newUser = await createUser({
        name: name,
        email: email,
        address:{city: city},
        phone : phone
    });
    users.push(newUser);
            
    renderUsers(users);

    userform.reset();

    console.log("User added",newUser)

    // console.log("name:",name)  
    // console.log("Email:",email)  
    // console.log("City:",city)  
})

const usersContainer = document.getElementById("users");

usersContainer.addEventListener("click", async function(event) {

    if (event.target.classList.contains("edit-btn")) {

        const userId = event.target.dataset.id;

        console.log("Edit User ID:", userId);

        const newName = prompt("Enter New Name:");
        const newEmail = prompt("Enter New Email:");
        const newCity = prompt("Enter New City:");
        const newPhone = prompt("Enter New Phone:");

        try {

            const updatedUser = await updateUser(userId, {
                name: newName,
                email: newEmail,
                address: {
                    city: newCity
                },
                phone: newPhone
            });
           
            console.log("Updated User:", updatedUser);

        } catch (error) {

            console.log("Update Failed:", error.message);

        }
    }

    if (event.target.classList.contains("delete-btn")) {

    const userId = event.target.dataset.id;

    try {

        await deleteUser(userId);

        users = users.filter(user => user.id != userId);

        renderUsers(users);

        console.log("User deleted successfully");


    } catch (error) {

        console.log("Delete failed:", error.message);
    }
}
});