const url = "http://localhost/Sym_Compa/Company/public/index.php";


const getEmployees = async() => {
    await $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost/Sym_Compa/Company/public/'
    }).done(res => {
        let listEmployees = res.listEmployees;
        let table = $("#contenido");
        table.append(
            "<tr class='bg-dark text-light'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'>Salary</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>Detalles</th>" +
            "<th scope='col'>Actualizar</th>" +
            "<th scope='col'>Eliminar</th>" +
            "</tr>")

        for (let i = 0; i < listEmployees.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + listEmployees[i].id + "</td>" +
                "<td>" + listEmployees[i].name + "</td>" +
                "<td>" + listEmployees[i].address + "</td>" +
                "<td>" + listEmployees[i].salary + "</td>" +
                "<td>" + listEmployees[i].status + "</td>" +
                "<td><button class='btn btn-primary' data-toggle='modal' onclick='getInfo(" + listEmployees[i].id + ")' data-target='#detalles'><i class='fas fa-info-circle'></i></button></td>" +
                "<td><button class='btn btn-warning' data-toggle='modal' onclick='getInfoUpdate(" + listEmployees[i].id + ")' data-target='#updatePerson'><i class='fas fa-pen'></i></button></td>" +
                "<td><button class='btn btn-danger' data-toggle='modal' onclick='getId(" + listEmployees[i].id + ")' data-target='#delete'><i class='fas fa-trash'></i></button></td>" +
                "</tr>")
        }
    });
};
getEmployees();

const getById = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/employee/' + id
    }).done(res => res);
}

const getInfo = async id => {
    let employee = await getById(id);
    let date = new Date(employee.employee[0].registered.date);

    document.getElementById('name').value = employee.employee[0].name
    document.getElementById('address').value = employee.employee[0].address
    document.getElementById('status').value = employee.employee[0].status ? 'Activo' : 'Inactivo'
    document.getElementById('salary').value = employee.employee[0].salary
    document.getElementById('idOffice').value = employee.employee[0].idOffice
    document.getElementById('registered').value = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    if (employee.employee[0].updated == null) {
        document.getElementById('updated').value = 'Aún sin actualizar';
    } else {
        let date2 = new Date(employee.employee[0].updated.date);
        document.getElementById('updated').value = date2.getDate() + "/" + date2.getMonth() + "/" + date2.getFullYear();
    }

}

const registerPerson = async() => {
    let name = document.getElementById('name_register').value;
    let address = document.getElementById('address_register').value;
    let salary = document.getElementById('salary_register').value;
    let idOffice = document.getElementById('idoffice_register').value;

    console.log(name + " " + address + " " + salary + " " + idOffice);


    await $.ajax({
        type: "POST",
        url: url + "/employee/create/",
        data: { name, address, salary, idOffice }
    }).done(function(res) {
        console.log(res);
    });
}

const deletePerson = async() => {
    let id = document.getElementById('id_delete').value;
    await $.ajax({
        type: 'GET',
        url: url + '/employee/delete/' + id
    }).done(res => {
        console.log(res);
        getPersons();
    });
}

const getId = async id => {
    document.getElementById("id_delete").value = id;
};

const getInfoUpdate = async id => {
    let employee = await getById(id);

    document.getElementById('id_update').value = id
    document.getElementById('name_update').value = employee.employee[0].name
    document.getElementById('address_update').value = employee.employee[0].address
    document.getElementById('salary_update').value = employee.employee[0].salary
    document.getElementById('idOffice_update').value = employee.employee[0].idOffice
}

const updatePerson = async() => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let address = document.getElementById('address_update').value;
    let salary = document.getElementById('salary_update').value;
    let idOffice = document.getElementById('idOffice_update').value;

    await $.ajax({
        type: 'POST',
        url: url + "/employee/update/" + id,
        data: { name, address, salary, idOffice }
    }).done(function(res) {

    })
};