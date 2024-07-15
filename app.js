const dotenv = require('dotenv');
dotenv.config();
const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

console.log('Welcome to the CRM\n');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log('Connected to Mongo DB')
    await runQueries();
    await mongoose.disconnect();
    // console.log('Disconnecting from Mongo DB')
    process.exit();
};

const runQueries = async () => {
    let inputNumber;
    while (true) {
        console.log('What would you like to do?\n');
        console.log('1. Create a customer');
        console.log('2. View all customers');
        console.log('3. Update a customer');
        console.log('4. Delete a customer');
        console.log('5. Quit\n');

        inputNumber = prompt('Number of action to run: ');
        let id;

        if (inputNumber === '5') {
            console.log('Exiting CRM. Goodbye!');
            break;
        }

        // Handle other options here
        switch (inputNumber) {
            case '1':
                // Code to create a customer
                console.log('Create a customer');
                const name = prompt('Enter the name of the customer: ');
                const age = prompt('Enter the age of the customer: ');
                await createCustomer(name, age);
                break;
            case '2':
                // Code to view all customers
                console.log('View all customers');
                await viewAllCustomers();
                break;
            case '3':
                // Code to update a customer
                console.log('Update a customer\n');
                await getIds();
                id = prompt("Copy and paste the id of the customer you would like to update here: ");
                const newName = prompt("What is the customer's new name? ");
                const newAge = prompt("What will be the customer's new age? ");
                await updateCustomer(id, newName, newAge);
                
                break;
            case '4':
                // Code to delete a customer
                console.log('Delete a customer');
                await getIds();
                id = prompt("Copy and paste the id of the customer you would like to delete: ");
                await removeCustomer(id);

                break;
            default:
                console.log('Invalid option, please try again.');
        }
    }
};

const Customer = require('./models/customer');

const createCustomer = async (name, age) => {
    const customerData = {
        name: name,
        age: age,
    };
    const customer = await Customer.create(customerData);
    console.log("New Customer: ", customer);
};

const viewAllCustomers = async () => {
    const customers = await Customer.find();
    console.log("All customers: ", customers);
};

const getIds = async () => {
    const customers = await Customer.find();
    console.log("Below is a list of customers. \n")
    let customerString = ""
    customers.forEach(customer => {
        customerString = "id: " + customer._id.toString() + " -- Name: " + customer.name + ", Age: " + customer.age;
        console.log(customerString);
    })
}

const updateCustomer = async (id, newName, newAge) => {
    const customer = await Customer.findById(id);

    customer.name = newName; 
    customer.age = newAge; 
    await customer.save();
    console.log("Updated customer:\n", customer)
}

const removeCustomer = async (id) => {
    const customer = await Customer.findById(id);
    await customer.deleteOne()
}

connect()


