export function renderUsers(users){
    const usersContainer = document.getElementById("users")

    if(users.length === 0){
        usersContainer.innerHTML = "<p>No Users Found</p>"
        return;
    }
    const html = users.map(user =>{
        return `
           <div class = "user-card">
               <h3>${user.name}</h3>
               <p><b>Email :</b>${user.email}</p>
               <p><b>City :</b>${user.address.city}</p>
               <p><b>Phone :</b>${user.phone}</p>
                
               <div class= "actions">
               <button class="edit-btn" data-id="${user.id}">Edit</button>
               <button class="delete-btn" data-id="${user.id}">Delete</button>
               </div>
           </div>
        `
    }).join("");

    usersContainer.innerHTML = html
}