package com.motora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motora.entity.Aluno;
import com.motora.entity.Turma;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

	List<Aluno> findByTurma(Turma turma);}