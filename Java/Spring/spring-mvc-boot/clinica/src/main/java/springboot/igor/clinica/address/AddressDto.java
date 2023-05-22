package springboot.igor.clinica.address;

public record AddressDto(String logradouro, String bairro, String cep, String cidade, String uf, String numero,
    String complemento) {
}
