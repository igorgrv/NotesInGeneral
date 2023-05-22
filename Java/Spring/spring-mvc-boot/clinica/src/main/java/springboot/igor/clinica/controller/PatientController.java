package springboot.igor.clinica.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.igor.clinica.paciente.PatientDto;

@RestController
@RequestMapping("patient")
public class PatientController {

  @PostMapping
  public ResponseEntity addPatient(@RequestBody PatientDto patient) {
    return ResponseEntity.ok(patient);
  }
}
