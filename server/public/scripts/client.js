$(document).ready(readyNow);

function readyNow() {
    console.log('document on ready');
    $('#submitButton').on('click', addRestaurant);
    $('#viewRestaurants').on('click', '.deleteButton', deleteMe);
    $('#viewRestaurants').on('click', '.saveButton', saveMe);
    getRestaurants();
}; //end readynow

//ajax get request from db
function getRestaurants() {
    console.log('in ajax get');
    $.ajax({
        method: 'GET',
        url: '/restaurants'
    }).then(function (response) {
        console.log('GET request response', response);
        //append tasks to dom
        //make sure to empty first so no repeats
        $('#viewRestaurants').empty();
        for (let restaurant of response) {
            let newRow = $(`<tr>
                <td>${restaurant.name}</td>
                <td>${restaurant.type}</td>
                <td class="ratingChange">${restaurant.rating}</td>
                <td><button class="saveButton" data-id="${restaurant.id}">Save</button></td>
                <td><button class="deleteButton" data-id="${restaurant.id}">Delete</button></td>
                </tr>`);
            newRow.data('id', restaurant.id);
            $('#viewRestaurants').append(newRow);
        }; //end appending loop
    }); // end ajax GET
}; //end get restaurant

//ajax POST - to add a restaurant to the server as well
function addRestaurant() {
    console.log('button clicked');
    const objectToSend = {
        name: $('#nameIn').val(),
        type: $('#typeIn').val(),
        rating: $('#ratingIn').val()
    } //end object to send
    $.ajax({
        method: 'POST',
        url: '/restaurants',
        data: objectToSend
    }).then(function (response) {
        console.log('in POST back from server', response);
        //call function to empty inputs
        //emptyInputs();
        //call appending function
        getRestaurants();
    }).catch(function (error) {
        console.log('error in POST', error);
    }); // end ajax POST
}; //end add restaurant

//delete route
function deleteMe() {
    console.log('delete button clicked');
    //ajax DELETE request
    //let restaurantId = $(this).data().id;
    console.log('return restaurant id');
    $.ajax({
        method: 'DELETE',
        url: `/restaurants/${$(this).data().id}`
    }).then(function() {
        getRestaurants();
        console.log('in DELETE back from server');
    }).catch(function(error) {
        console.log('error getting delete back', error);
    }); //end delete error
}; //end delete me function

//ajax put save button
function saveMe() {
    console.log('save button clicked');
    console.log('delete button clicked');
    //ajax put request
    let restaurantId = $(this).data().id;
    console.log('return restaurant id');
    $.ajax({
        method: 'PUT',
        url: `/restaurants/${restaurantId}`
    }).then(function() {
        getRestaurants();
        console.log('in PUT back from server');
    }).catch(function(error) {
        console.log('error getting PUT back', error);
    }); //end delete error
}; //end save me