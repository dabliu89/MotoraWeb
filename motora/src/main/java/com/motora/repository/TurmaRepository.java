package com.motora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motora.entity.Aluno;
import com.motora.entity.Turma;

public interface TurmaRepository extends JpaRepository<Aluno, Long> {

  Turma save(Turma turma);
}