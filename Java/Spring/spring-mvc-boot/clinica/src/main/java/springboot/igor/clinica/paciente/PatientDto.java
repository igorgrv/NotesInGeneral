package springboot.igor.clinica.paciente;

import springboot.igor.clinica.address.AddressDto;

public record PatientDto(String nome,
    String email,
    String telefone,
    String cpf,
    AddressDto endereco) {

}
