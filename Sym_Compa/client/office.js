const urlOffice = 'http://localhost:4000';


const findAll = async() => {
    await $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: urlOffice + '/office'
    }).done(res => {
        let listOffices = res.listOffices;
        let table = $("#office");
        table.append(
            "<tr class='bg-dark text-light'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>OfficeCode</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'>Actualizar</th>" +
            "<th scope='col'>Eliminar</th>" +
            "</tr>")

        for (let i = 0; i < listOffices.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + listOffices[i].id + "</td>" +
                "<td>" + listOffices[i].officeCode + "</td>" +
                "<td>" + listOffices[i].address + "</td>" +
                "<td><button class='btn btn-warning' data-toggle='modal' onclick='getInfoUpdateOffice(" + listOffices[i].id + ")' data-target='#updateOffice'><i class='fas fa-pen'></i></button></td>" +
                "<td><button class='btn btn-danger' data-toggle='modal' onclick='getIdOffice(" + listOffices[i].id + ")' data-target='#deleteOffice'><i class='fas fa-trash'></i></button></td>" +
                "</tr>")
        }
    });
};
findAll();

const getIdOffice = async id => {
    document.getElementById("idOffice_delete").value = id;
};

const registerOffice = async() => {
    let officeCode = document.getElementById('officeCode_register').value;
    let address = document.getElementById('addressOffice_register').value;

    console.log(officeCode + " " + address);

    await $.ajax({
        type: "POST",
        url: urlOffice + "/office/create/",
        data: { officeCode, address }
    }).done(function(res) {
        console.log(res);
    });
}

const getByIdOffice = async id => {
    return await $.ajax({
        type: 'GET',
        url: urlOffice + '/office/' + id
    }).done(res => res);
}

const getInfoUpdateOffice = async id => {
    let office = await getByIdOffice(id);

    document.getElementById('idOffice_update').value = id
    document.getElementById('officeCode_update').value = office.office[0].officeCode
    document.getElementById('addressOffice_update').value = office.office[0].address
}

const updateOffice = async() => {
    let id = document.getElementById('idOffice_update').value;
    let officeCode = document.getElementById('officeCode_update').value;
    let address = document.getElementById('addressOffice_update').value;


    await $.ajax({
        type: 'POST',
        url: urlOffice + "/office/update/" + id,
        data: { officeCode, address }
    }).done(function(res) {

    })
};

const deleteOffice = async() => {
    let id = document.getElementById('idOffice_delete').value;
    await $.ajax({
        type: 'GET',
        url: urlOffice + '/office/delete/' + id
    }).done(res => {
        console.log(res);
        findAll();
    });
}