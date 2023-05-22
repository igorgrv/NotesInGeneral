package springboot.igor.clinica.doctor;

import springboot.igor.clinica.address.AddressDto;

public record DoctorDto(Long id, String nome, String email, String crm, EspecialidadeEnum especialidade,
    AddressDto endereco) {

  public DoctorDto(Doctor doctor) {
    this(doctor.getId(), doctor.getNome(), doctor.getEmail(), doctor.getCrm(), doctor.getEspecialidade(),
        doctor.getEndereco());
  }

}
