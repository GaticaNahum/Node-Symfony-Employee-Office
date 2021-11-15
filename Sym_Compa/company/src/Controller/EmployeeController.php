<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use DateTime;

class EmployeeController extends AbstractController
{
    public function findAllEmployees(){
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, e.updated, e.status, e.idOffice FROM App:Employee e');
        $listEmployees = $query ->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontraron resultados'
        ];

        if(count($listEmployees) > 0){
            $data = [
            'status' => 200,
            'message' => 'Se encontraron: ' . count($listEmployees) . ' resultados',
            'listEmployees' => $listEmployees
            ];
        }
        return new JsonResponse($data);
    }

    public function findById($id){
        $em =  $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, e.updated, e.status, e.idOffice FROM App:Employee e WHERE e.id = :e');
        $query -> setParameter(':e',$id);
        $employee = $query ->getResult();

        $data = [
            'status' => 404,
            'message' => 'No existe el registro'
        ];

        if(count($employee) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontro el registro',
                'employee' => $employee
            ];
        }
            return new JsonResponse($data);
    }

    public function createEmployee(Request $request){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name',null);
        $adress = $request->get('address',null);
        $salary = $request->get('salary',null);
        $created = new DateTime ('NOW');
        $updated = new DateTime ('NOW');  
        $idOffice = $request->get('idOffice',null);
        $status = 1;

        $employee = new \App\Entity\Employee();

        $employee->setName($name);
        $employee->setAddress($adress);
        $employee->setSalary($salary);
        $employee->setRegistered($created);
        $employee->setStatus($status);
        $employee->setUpdated($updated);
        $employee->setIdOffice($idOffice);
            
        $em->persist($employee);
        $em->flush();

            $data = [
                'status'=> 200,
                'message' => 'Se ha creado correctamente',
            ];
        return new JsonResponse($data);
    }

    public function updateEmployee(Request $request, $id){
        $em = $this->getDoctrine()->getManager();


        $name = $request->get('name',null);
        $address = $request->get('address',null);
        $salary = $request->get('salary',null);
        $updated = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));  
        $idOffice = $request->get('id_office',null);

        $query =  $em->createQuery('UPDATE App:Employee e set e.name = :name, e.address = :address, e.salary = :salary,
                                                        e.updated = :updated, e.idOffice = :idOffice
                                        WHERE e.id = :id');

        $query->setParameter(':id', $id);                                
        $query->setParameter(':name',$name);
        $query->setParameter(':address',$address);
        $query->setParameter(':salary',$salary);
        $query->setParameter(':updated',$updated);
        $query->setParameter(':idOffice',$idOffice);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [
                'status' => 200,
                'message' => 'Se ha actualizado correctamente',
            ];
        }else{
            $data = [
                'status' => 404,
                'message' => 'Hubo un error',
            ];
        }
    return new JsonResponse($data);
    }

    public function delete_employee($id){
        $em = $this->getDoctrine()->getManager();

        $query =  $em->createQuery('UPDATE App:Employee e set e.status = 0 WHERE e.id = :id');
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se ha deshabilitado correctamente',
            'school' => $school
        ];

        return new JsonResponse($data);
    }


}
