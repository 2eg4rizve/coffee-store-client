import { useState } from "react";
import { useLoaderData } from "react-router-dom";


const Users = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = id => {

        //make sure user delete

        fetch(` https://coffee-store-server-fllbaqyqq-2eg4rizve.vercel.app/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log("Delete successfully")
                    //remove the user from the UI
                    const remainingUsers = users.filter(user => user._id !== id)
                    setUsers(remainingUsers);

                }

            })



    }

    return (
        <div>
            <h1>Users : {loadedUsers.length}</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Last Logged In</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1,2,3...... */}
                            {
                                users.map(user => <tr key={user._id}>
                                    <th>1</th>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.lastLoggedAt}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Users;