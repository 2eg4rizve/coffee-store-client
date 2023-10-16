/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const CoffeeCard = ({ coffee, coffees, setCoffees }) => {

    const { _id, name, quantity, supplier, taste, category, detail, photo } = coffee;




    const handleDelete = _id => {

        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(` https://coffee-store-server-fllbaqyqq-2eg4rizve.vercel.app/coffee/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your coffee has been deleted.',
                                'success'
                            )

                            const remaining = coffees.filter(cof => cof._id !== _id)
                            setCoffees(remaining)
                        }

                    })

            }
        })
    }


    return (
        <div>

            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img className="h-[100px]" src={photo} alt="Movie" /></figure>
                <div className="flex w-full justify-between px-4">
                    <div>
                        <h2 className="card-title">Name : {name}</h2>
                        <p className="card-title">{quantity}</p>
                        <p className="card-title">{supplier}</p>
                        <p className="card-title">{taste}</p>
                    </div>
                    <div className="card-actions justify-end space-y-4">
                        <div className="btn-group btn-group-vertical space-y-4">
                            <button className="btn">View</button>
                            <Link to={`updateCoffee/${_id}`}>
                                <button className="btn ">Edit</button>
                            </Link>
                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn bg-orange-300">X</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CoffeeCard;