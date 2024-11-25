<?php

namespace App\Repositories;

use App\Contracts\UserContract;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserContract
{
    private User $repository;

    public function __construct()
    {
        $this->repository = app(User::class);
    }

    public function create(array $data): ?object
    {
        return $this->repository->create($data);
    }

    public function findById(int $id): ?object
    {
        return $this->repository->find($id);
    }

    public function findByEmail(string $email): ?object
    {
        return $this->repository->where('email', $email)->first();
    }

    public function findPatientInformation(int $id): ?array
    {
        return  DB::select('SELECT  patient_details.value,
                                    helth_metrics.name,
                                    patient_details.date_emission 
                        FROM    users,
                                patient_details,
                                helth_metrics
                        WHERE   patient_details.user_id = users.id
                        AND patient_details.helth_metrics_id = helth_metrics.id
                        AND users.id = :user_id
                        AND patient_details.date_emission BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                        ORDER BY patient_details.date_emission;', [
                            'user_id' => $id
                    ]);
    }

    public function getDoctorConsults(int $id): ?array
    {
        return  DB::select('SELECT 	users.id AS id_usuario,
		                            users.name AS nome_paciente,
		                            medical_schedulings.appointment_date AS data_consulta
                        FROM    users, 
                                medical_consultations,
                                medical_schedulings
                        WHERE   medical_consultations.patient_id = users.id
                        AND     medical_consultations.medical_scheduling_id = medical_schedulings.id
                        AND     medical_schedulings.doctor_id = :doctor_id
                        AND     DATE(medical_schedulings.appointment_date) = CURDATE()  
                        ORDER BY medical_schedulings.appointment_date;', [
                            'doctor_id' => $id
                ]);
    }
}
