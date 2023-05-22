package springboot.igor.clinica.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springboot.igor.clinica.doctor.DoctorDto;
import springboot.igor.clinica.doctor.DoctorRepository;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("doctor")
public class DoctorController {

  private final DoctorRepository repository;

  @PostMapping
  public ResponseEntity addDoctor(@RequestBody DoctorDto doctor) {
    log.info(doctor.toString());
    return ResponseEntity.ok(doctor);
  }

@GetMapping("/findAll")
public List<DoctorDto> getAllDoctors() {
  return repository.findAll().stream().map(DoctorDto::new).toList();
}
}
